# Chat-LLM - 多模型支持的聊天界面

一个基于 [Gradio](https://www.gradio.app/) 和 的多轮对话 Web 应用，支持流式响应、历史对话管理和多模型切换。

[中文版](README.md) | [English](README-EN.md)

## 功能特点
- ✅ 支持多种以及自定义模型
- 🧠 保留上下文的多轮对话
- 🔄 实时流式输出
- 📚 历史会话管理（查看/切换/删除）

## 核心库说明
主要使用以下第三方库:
- Gradio
- openai
- dotenv
- typing, uuid, json等标准库

## 自定义模型
新建`.env`环境,创建不同模型的API密钥
`xxxxxx_API_KEY = xxxxxxxxx`

在`module_config.py`中设置模型以及API密钥:
```json
"OpenAI": {
        "api_key": "os.getenv(yourOpenAIkey)",
        "base_url": "base_url",
        "model_name": "gpt-3.5-turbo"
    }
```

## 启动应用
```bash
python web.py
```

## 作者信息
|  姓名  |  学号  |  学院  |
|--------|-------|--------|
|  王雷  |2351299| 软件学院|
| 李昊天 |2354400| 软件学院|