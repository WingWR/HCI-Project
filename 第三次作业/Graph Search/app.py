import os
import gradio as gr
import clip
import torch
from clip_vectorizer import CLIPVectorizer


class CLIPUI:
    def __init__(self):
        self.vectorizer = CLIPVectorizer()
        self.favorites = [] # 记录收藏夹图片
        self.current_preview = None  # 存储当前预览的图片路径

    def process_folder(self, folder_path):
        """处理文件夹"""
        if not folder_path:
            return "请先选择文件夹"
        self.vectorizer.process_folder(folder_path)
        return f"已完成 {len(os.listdir(folder_path))} 张图片处理"

    def image_search(self, query_image, top_k):
        if query_image is None:
            return []
        temp_path = "temp_query.jpg"
        query_image.save(temp_path)
        results = self.vectorizer.index.query(
            vector=self.vectorizer.image_to_vector(temp_path),
            top_k=top_k,
            include_metadata=True
        )
        return [(r.metadata["path"], f"{float(r.score):.4f}") for r in results]

    def text_search(self, query_text, top_k):
        if not query_text.strip():
            return []
        text_input = clip.tokenize([query_text]).to(self.vectorizer.device)
        with torch.no_grad():
            text_vec = self.vectorizer.model.encode_text(text_input)
        results = self.vectorizer.index.query(
            vector=text_vec.cpu().numpy()[0].tolist(),
            top_k=top_k,
            include_metadata=True
        )
        return [(r.metadata["path"], f"{float(r.score):.4f}") for r in results]

    def set_current_preview(self, evt: gr.SelectData):
        """记录当前预览的图片"""
        selected_item = evt.value
        path = ""

        if isinstance(selected_item, dict):
            # 新增：处理 Gradio Gallery 返回的嵌套结构
            if "image" in selected_item and isinstance(selected_item["image"], dict):
                path = selected_item["image"].get("path")
            else:
                path = selected_item.get("path") or selected_item.get("name")
        elif isinstance(selected_item, (list, tuple)) and len(selected_item) > 0:
            path = selected_item[0]
        else:
            path = str(selected_item)

        self.current_preview = path

        if self.current_preview and os.path.exists(self.current_preview):
            normalized_path = os.path.normpath(self.current_preview)
            is_favorited = any(os.path.normpath(fav) == normalized_path for fav in self.favorites)
            fav_status = "（已收藏）" if is_favorited else "（未收藏）"
            return f"当前预览: {os.path.basename(self.current_preview)} {fav_status}"
        else:
            return "未获取到有效预览"

    def add_to_favorites(self):
        """将当前预览图片添加到收藏夹"""
        if self.current_preview and os.path.exists(self.current_preview):
            # 检查是否已存在
            normalized_path = os.path.normpath(self.current_preview)
            if not any(os.path.normpath(fav) == normalized_path for fav in self.favorites):
                self.favorites.append(self.current_preview)

        return self.update_favorites()

    def update_favorites(self):
        """更新收藏夹显示"""
        # 只返回确实存在的图片
        valid_favorites = [fav for fav in self.favorites if os.path.exists(fav)]
        self.favorites = valid_favorites  # 更新收藏列表，移除无效项
        return [(path, "已收藏") for path in valid_favorites]

    def clear_favorites(self):
        """清空收藏夹"""
        self.favorites = []
        return []

# 初始化UI类
ui = CLIPUI()

with gr.Blocks(title="CLIP图像搜索引擎", theme="soft") as demo:
    gr.Markdown("## CLIP多模态搜索引擎")

    with gr.Tab("📝 文字搜索"):
        with gr.Row():
            with gr.Column():
                text_input = gr.Textbox(label="文本描述")
                text_top_k = gr.Slider(1, 100, value = 40, step = 1, label="搜索图片数量")
                text_search_btn = gr.Button("开始搜索")

            with gr.Column():
                text_output = gr.Gallery(label="搜索结果", columns=3)
                preview_status = gr.Textbox(label="当前预览状态", interactive=False)
                text_fav_btn = gr.Button("收藏当前预览图片")

                text_output.select(
                    fn=ui.set_current_preview,
                    inputs=None,
                    outputs=preview_status
                )

    with gr.Tab("🔍 图片搜索"):
        with gr.Row():
            with gr.Column():
                img_input = gr.Image(label="上传查询图片", type="pil")
                img_top_k = gr.Slider(1, 100, value = 40, step=1, label="搜索图片数量")
                img_search_btn = gr.Button("开始搜索")

            with gr.Column():
                img_output = gr.Gallery(label="搜索结果", columns=3)
                preview_status = gr.Textbox(label="当前预览状态", interactive=False)
                img_fav_btn = gr.Button("收藏当前预览图片")

                img_output.select(
                    fn=ui.set_current_preview,
                    inputs=None,
                    outputs=preview_status
                )

    with gr.Tab("⭐ 我的收藏夹"):
        with gr.Row():
            gr.Markdown("### 您收藏的图片如下：")
            clear_fav_btn = gr.Button("清空收藏夹", variant="stop")

        fav_gallery = gr.Gallery(label="收藏夹内容", columns=3)
        demo.load(fn=ui.update_favorites, outputs=fav_gallery)

    # 事件处理
    text_search_btn.click(
        fn=ui.text_search,
        inputs=[text_input, text_top_k],
        outputs=text_output
    )

    img_search_btn.click(
        fn=ui.image_search,
        inputs=[img_input, img_top_k],
        outputs=img_output
    )

    # 收藏按钮功能
    text_fav_btn.click(
        fn=ui.add_to_favorites,
        outputs=fav_gallery
    )

    img_fav_btn.click(
        fn=ui.add_to_favorites,
        outputs=fav_gallery
    )

    # 清空收藏夹
    clear_fav_btn.click(
        fn=ui.clear_favorites,
        outputs=fav_gallery
    )

if __name__ == "__main__":
    demo.launch(server_port=7860, share=True)
