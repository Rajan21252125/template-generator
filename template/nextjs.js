import run from "../utility/runCommand.js";
import fs from "fs";
import path from "path";

const nextBoilerplate = async(targetDir, projectName, location) => {
    console.log(`\n📁 Creating Next.js project at: ${targetDir}\n`);
    run(`npx create-next-app@latest ${projectName}`, { cwd: location });
    console.log(`\n🧹 Removing boilerplate files...\n`);

    const isTS = fs.existsSync(path.join(targetDir, "tsconfig.json"));
    const pageFileExt = isTS ? "tsx" : "jsx";
    const nextBoilerplateFiles = [
    `./src/app/page.${pageFileExt}`,
    "public/favicon.ico",
    ];
    nextBoilerplateFiles.forEach((file) => {
    const fullPath = path.join(targetDir, file);
    if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
    }
    });
    fs.writeFileSync(path.join(targetDir, "./src/app/page.tsx"), `
    import React from 'react';

    const Home = () => {
        return (
        <div>
            <h1>Hello, Next.js!</h1>
        </div>
        );
    };

    export default Home;
    `.trim());

    fs.writeFileSync(path.join(targetDir, "styles/globals.css"), `@import "tailwindcss";`);
}


export default nextBoilerplate;