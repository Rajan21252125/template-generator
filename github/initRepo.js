import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import run from "../utils/runCommand.js";
import { generateReadmeFromContextFromOpenRouter } from "../utils/generateReadme.js";
import { defaultStacks } from "../utils/constant.js";

const intitilizeGitHubRepo = async (projectName, targetDir, projectType) => {
  let repoUrl = '';
  const { needToGenerateReadmeByAI } = await inquirer.prompt([
    {
      name: 'needToGenerateReadmeByAI',
      type: 'confirm',
      message: 'Do you want to generate README.md using AI?',
      default: false,
    }
  ]);

  if (!needToGenerateReadmeByAI) {
    console.log("📘 Skipping README.md generation.");
  } else {
    const response = await inquirer.prompt([
      {
        name: 'repoUrl',
        type: 'input',
        message: 'Enter the GitHub repository URL (e.g., https://github.com/username/repo-name):',
      }
    ]);
    repoUrl = response.repoUrl.trim();
  }
  const { context } = await inquirer.prompt([
    {
      name: 'context',
      type: 'input',
      message: 'Enter a brief context/description for your project:',
    }
  ]);

  const defaultStack = defaultStacks[projectType] || [];
  console.log(`💡 Default Tech Stack for ${projectType}: ${defaultStack.join(', ')}`);

  const { techStack } = await inquirer.prompt([
    {
      name: 'techStack',
      type: 'input',
      message: 'Enter the tech stack used in your project (comma-separated):',
    }
  ]);

  const extraStack = techStack
    ? techStack.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const stack = Array.from(new Set([...defaultStack, ...extraStack]));
  console.log("🧱 Final Tech Stack:", stack.join(", "));
  const readmeContent = await generateReadmeFromContextFromOpenRouter(context, projectName, stack);

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent);
  console.log("📘 Generated README.md using AI");

  console.log("🔧 Initializing Git and creating GitHub repo...");

  
  try {
    run('git init', { cwd: targetDir });
    run('git add .', { cwd: targetDir });
    run('git commit -m "Initial commit"', { cwd: targetDir });
    run(`git remote add origin ${repoUrl}`, { cwd: targetDir });
    run('git branch -M main', { cwd: targetDir });
    run('git push -u origin main', { cwd: targetDir });
    console.log("✅ GitHub repo created and code pushed successfully!");
  } catch(error) {
    console.error("❌ Error creating GitHub repo or pushing code:", error);
    console.warn("⚠️ Failed to create GitHub repo. Make sure GitHub CLI is installed and authenticated.");
  }
};

export default intitilizeGitHubRepo;
