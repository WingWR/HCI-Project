import os
import clip
import torch
from PIL import Image
from upstash_vector import Index
from dotenv import load_dotenv
from tqdm import tqdm  # 进度条
from glob import glob

# 加载环境变量（UPSTASH_TOKEN和URL在.env文件中）
load_dotenv()

class CLIPVectorizer:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"CLIP 正在使用的设备: {self.device}")  # 控制台输出
        print(f"可用 GPU 名称: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else '无'}")  # 显示GPU型号

        self.model, self.preprocess = clip.load("ViT-B/32", device = self.device)

        # 确认模型实际所在设备
        print(f"模型实际运行在: {next(self.model.parameters()).device}")
        self.index = Index(
            url=os.getenv("UPSTASH_URL"),
            token=os.getenv("UPSTASH_TOKEN")
        )

    def image_to_vector(self, image_path):
        """ 单张图片转向量 """
        image = Image.open(image_path)
        image_input = self.preprocess(image).unsqueeze(0).to(self.device)
        with torch.no_grad():
            vector = self.model.encode_image(image_input)
        return vector.cpu().numpy()[0].tolist()  # 转为Python list

    def process_folder(self, folder_path, batch_size=32):
        # 递归获取所有图片（兼容嵌套结构）
        image_exts = ('*.png', '*.jpg', '*.jpeg', '*.webp')
        image_files = []
        for ext in image_exts:
            image_files.extend(glob(os.path.join(folder_path, "**", ext), recursive = True))

        print(f"找到 {len(image_files)} 张图片（包含子文件夹）")
        if not image_files:
            print("⚠️ 没有发现任何图片，请检查路径结构！")
            return

        # 批量处理逻辑
        vectors_to_upsert = []
        for img_path in tqdm(image_files, desc="Processing"):
            try:
                vector = self.image_to_vector(img_path)
                vectors_to_upsert.append({
                    "id": os.path.relpath(img_path, folder_path),
                    "vector": vector,
                    "metadata": {
                        "path": img_path,
                        "category": img_path.split(os.sep)[-2]
                    }
                })

                # 达到批次大小时批量写入
                if len(vectors_to_upsert) >= batch_size:
                    self.index.upsert(vectors_to_upsert)
                    vectors_to_upsert = []  # 清空缓存

            except Exception as e:
                print(f"处理失败 {img_path}: {str(e)}")

        # 写入最后一批数据（如果有剩余）
        if vectors_to_upsert:
            self.index.upsert(vectors_to_upsert)


if __name__ == "__main__":
    vectorizer = CLIPVectorizer()
    vectorizer.process_folder("./GroceryStoreDataset-master/dataset/train")  # 修改为你的图片路径