# 📰 Smart-News-Aggregator-with-AI-Summarization-Fact-Validation

A **Smart News Aggregator** that leverages **AI for real-time summarization and fact validation**, ensuring concise,
accurate, and trustworthy news updates - all in one place.

---

## 🚀 Overview

**Smart News Aggregator** is an AI-powered platform that collects news from multiple sources and uses **Natural Language
Processing (NLP)** to:

- 🧠 Generate **real-time summaries** using transformer models (BERT-based).
- ✅ Perform **fact validation** to check the authenticity of news.
- 🔎 Provide **personalized recommendations** for readers.
- ⚖️ Ensure **unbiased and credible** information delivery.

It’s built for users who want quick insights without compromising accuracy.

---

## 🧩 Features

- 📰 **Smart Aggregation:** Fetches news from verified APIs and trusted sources.
- ⚡ **AI Summarization:** Uses **Facebook’s BERT** model for high-quality text summaries.
- 🧾 **Fact Validation:** Cross-verifies claims and information for reliability.
- 🌐 **User-Friendly Interface:** Built with a responsive React frontend and Tailwind CSS.
- ⚙️ **Modular Architecture:** Node.js + Express backend with Python-based AI microservices.
- 💡 **Performance Insights:** Includes local CPU load analysis and model optimization learnings.

---

## 🧠 Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| Frontend    | React.js, Tailwind CSS             |
| Backend     | Node.js, Express.js                |
| AI Services | Python (BERT, Transformers, Flask) |
| Database    | MongoDB                            |
| Others      | REST APIs, Axios                   |          

## 🖼️ Screenshots & Demo

* Home Page
  ![Home Screenshot](assets/Screenshot%20(39).png)
* Summarization in Action
  ![Summarization Screenshot](assets/Screenshot%20(42).png)
* Fact Validation
  ![Fact Check Screenshot](assets/Screenshot%20(41).png)
* Live Demo GIF
  ![Demo GIF](assets/Demo.gif)

*(Screenshots and GIF illustrate live summarization, fact checking, and performance testing with CPU metrics.)*

--- 

## 📊 Performance & Optimization

While running **local summarization** using Facebook’s **BERT model**, I observed a **CPU utilization spike (~50%) even (~100% sometimes)** on
an Intel i3-10100 processor.  
This led to valuable learning about **AI inference optimization**

including:

- Caching models in memory to avoid reloading on each request
- Storing summaries using hashed content keys
- Applying **model quantization** (int8 / fp16) with ONNX Runtime
- Exploring **GPU acceleration** and **asynchronous processing** for smoother performance

> 💬 These insights are helping me dive deeper into optimizing local AI workloads for production-level efficiency.

![CPU/GPU Acceleration](assets/Screenshot%20(40).png)

---

## 🧑‍💻 Learning Journey

This project is part of my ongoing exploration in:

- **AI integration in full-stack systems**
- **Performance optimization of local inference models**
- **System design and scalability for real-world applications**

Currently, I’m experimenting with caching layers, quantized BERT variants, and model distillation to enhance efficiency
and response times.

> 🚀 The goal is to make local AI summarization as fast and lightweight as cloud inference - without losing accuracy.

---

## 📚 Future Scope

- 🚀 **Model Optimization:** Improve summarization performance using **ONNX Runtime** and **TensorRT** for faster and
  lighter inference.
- 🧩 **Caching & Pipeline Persistence:** Implement intelligent caching and persistent pipelines to avoid recomputation
  for repeated summaries.
- ☁️ **Hybrid Cloud + Edge Inference:** Combine local AI inference with cloud-based scalability for optimized resource
  usage and real-time response.
- 🔐 **Advanced Fact Validation:** Enhance fact-checking accuracy using multi-source validation and cross-reference APIs.
- 👤 **User Accounts & Personalization:**  Introduce secure **user authentication** and **profile-based customization**
  to deliver personalized news feeds, topic recommendations, and preference-driven summaries.

---

## 🏁 Conclusion

Building this project has been an exciting hands-on experience in connecting AI + Web Development + System Design.
It not only delivers useful functionality but also opened up deep learning opportunities around AI model optimization,
inference caching, and performance profiling.

💬 “Optimization is not just about speed - it’s about designing smarter systems.”