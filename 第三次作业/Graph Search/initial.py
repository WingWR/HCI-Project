from upstash_vector import Index
import os
from transformers import CLIPModel
from datasets import load_dataset
import matplotlib.pyplot as plt

os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = '1'

index = Index(url="https://pleased-stallion-40342-us1-vector.upstash.io", token="ABoFMHBsZWFzZWQtc3RhbGxpb24tNDAzNDItdXMxYWRtaW5OakJtTWpNME5USXRabVl3TUMwMFlqWTFMVGhrTVRVdE1HTTNOamN3TURnME1XVXg=")

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")

dataset = load_dataset("data/wonders/", split="train")
query_images = load_dataset("data/query/", split="train")

print(f"Dataset size: {len(dataset)}")

# 显示前3张图片
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
for i in range(3):
    img = dataset[i]['image']
    axes[i].imshow(img)
    axes[i].axis('off')  # 关闭坐标轴
plt.show()