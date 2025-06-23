import fs from "fs";
import run from "../utility/runCommand.js";
import path from "path";
import inquirer from "inquirer";

const reactBoilerPlate = async(targetDir, projectName, location) => {
    console.log(`\n📁 Creating React + Vite project at: ${targetDir}\n`);
    run(`npm create vite@latest ${projectName} -- --template react`, { cwd: location });

    console.log(`\n🧹 Removing boilerplate files...\n`);
    const boilerplateFiles = [
    "src/App.css",
    "src/App.jsx",
    "src/index.css",
    "src/assets",
    ];
    boilerplateFiles.forEach((file) => {
    const fullPath = path.join(targetDir, file);
    if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
    }
    });

    // Clean src and add placeholder
    fs.writeFileSync(path.join(targetDir, "src/main.jsx"), `
    import React from 'react'
    import ReactDOM from 'react-dom/client';
    import App from './App.jsx'
    import './index.css'

    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
        <App />
        </React.StrictMode>,
    )
    `.trim());


    fs.writeFileSync(path.join(targetDir, "src/App.jsx"), `
    import React from 'react';

    const App = () => {
        return (
        <div className="App">
            <h1>Hello, Vite + React!</h1>
        </div>
        );
    };

    export default App;
    `.trim());

    fs.writeFileSync(path.join(targetDir, "src/index.css"), "");


    run(`cd ${targetDir} && npm install`, { cwd: targetDir });
    
    const { addTailwind } = await inquirer.prompt([
      {
        name: "addTailwind",
        type: "confirm",
        message: "Do you want to add Tailwind CSS?",
        default: true,
      },
    ]);


    if (addTailwind) {
      console.log("\n🎨 Installing Tailwind CSS...\n");
      run(`npm install tailwindcss @tailwindcss/vite`, { cwd: targetDir });


      // vite.config.js
      const viteConfigPath = path.join(targetDir, "vite.config.js");
      fs.writeFileSync(
        viteConfigPath,
        `import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react';
        import tailwindcss from '@tailwindcss/vite'

        // https://vitejs.dev/config/
        export default defineConfig({
          plugins: [react(), tailwindcss()],
        });
      `.trim()
      );

      // Add Tailwind to index.css
      fs.writeFileSync(
        path.join(targetDir, "src/index.css"),
        `@import "tailwindcss";`
      );
    }
}


export default reactBoilerPlate;