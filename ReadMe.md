# 🚀 Project QA Assistant

Project QA Assistant is a beginner-friendly web app that helps students and professionals prepare for technical interviews by generating project-based Q&A documentation using AI. Just enter your project details, and get likely interview questions with strong sample answers!

---

## ✨ Features

- **AI-Powered Q&A:** Get 10+ tailored technical questions and answers for your project.
- **Modern UI:** Clean, responsive interface built with Next.js, React, and Tailwind CSS.
- **Easy Export:** Copy, download, print, or share your Q&A documentation.
- **Secure Backend:** Powered by Flask/Node.js and Azure OpenAI GPT-4.1.
- **Beginner Friendly:** Simple to use, no coding knowledge required!

---

## 🖥️ Live Demo

👉 [Try Project QA Assistant Online](https://projectqa.vercel.app/)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Flask or Node.js (Express)
- **AI:** Azure OpenAI GPT-4.1

---

## 🚦 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/Pranesh-2005/ProjectQA.git
cd ProjectQA
```

### 2. **Setup the Backend**

#### a) **Python (Flask) Version**

1. Go to the backend folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Create a `.env` file (see `.env.example`) and add your Azure OpenAI credentials:
    ```
    AZURE_OPENAI_ENDPOINT=your-endpoint
    AZURE_OPENAI_API_KEY=your-api-key
    AZURE_OPENAI_DEPLOYMENT=your-deployment-name
    AZURE_OPENAI_API_VERSION=your-api-version
    ```
4. Start the backend server:

#### **Python(Flask) Version**

1. Go to the backend folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Create a `.env` file and add your Azure OpenAI credentials (see above).
4. Start the backend flask server:
    ```bash
    python app.py
    ```

---

### 3. **Setup the Frontend**

1. Go to the frontend folder:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend in development mode:
    ```bash
    npm run dev
    ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Usage

1. Enter your **Project Summary**, **Tech Stack**, and (optionally) **Workflow**.
2. Click **Generate Q&A**.
3. Review, copy, download, print, or share your personalized Q&A!


---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

---

## 🔗 Links

- [Live App](https://projectqa.vercel.app/)
- [GitHub Repo](https://github.com/Pranesh-2005/ProjectQA)

---

Made with ❤️ by [Pranesh](https://github.com/Pranesh-2005)