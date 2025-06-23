Here is the full `README.md` content in **Markdown format**, ready for direct use or writing into a file:

---

````md
# 🚀 Project Boilerplate Generator CLI

A command-line tool to quickly scaffold modern web and mobile application boilerplates with built-in support for:

- ⚛️ React (Vite)
- 🌐 Next.js
- 📱 React Native
- 💻 Plain HTML/CSS/JS

---

## 📦 Features

- 🗂️ Choose project type: React, Next.js, React Native, HTML/CSS/JS
- 🧹 Clean and minimal boilerplate setup
- 🎨 Optional Tailwind CSS integration
- 📦 Add additional npm packages
- 🔧 Git initialization
- ☁️ GitHub repo creation (using GitHub CLI or manual URL)
- 🤖 AI-powered `README.md` generation using OpenRouter/OpenAI
- 🖥️ Open in VS Code and auto-start dev server

---

## 🛠️ Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/Rajan21252125/template-generator.git
cd template-generator
npm install
````

Make the CLI globally accessible:

```bash
npm link
```

---

## ⚙️ Usage

Run the CLI:

```bash
boilergen
```

Follow the interactive prompts to:

* Specify location and project name
* Choose the project type
* Add Tailwind CSS (optional)
* Install additional packages (optional)
* Generate a README using AI (optional)
* Initialize Git and push to GitHub
* Open in VS Code and run the dev server

---

## 🤖 AI README Generator

You can automatically generate a detailed and structured `README.md` using the OpenRouter API.

> 🔑 Requires an API key in a `.env` file:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

---

## 📁 Folder Structure

```text
script-for-boilerplate/
├── boilerPlate/
│   ├── next-boiler-plate.js
│   ├── plane-html-css.js
│   ├── react-boilerplate.js
│   └── react-native-boiler-plate.js
│
├── github/
│   └── githubRepo.js
│
├── utility/
│   ├── constant.js
│   ├── generateReadmeFromContext.js
│   ├── isGitHubCLIInstalled.js
│   ├── openInVsCode.js
│   └── runCommand.js
│
├── .env
├── create-vite-app.js
├── package.json
└── package-lock.json
```

---

## 📌 Tech Stack

* Node.js
* Inquirer
* OpenRouter API / OpenAI
* Git CLI
* GitHub CLI (optional fallback to manual GitHub URL)
* Shell command utilities

---

## 📸 Screenshots (Optional)

> Add screenshots or a GIF showing the CLI in action here.

---

## 🤝 Contributing

We welcome contributions! Feel free to open issues, submit PRs, or suggest new features.

---

## 📄 License

MIT License © 2025 \[Your Name]

```

---

Let me know if you'd like a version of this file dynamically generated with real project data, a license badge, or GitHub actions included!
```
