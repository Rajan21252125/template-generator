import inquirer from "inquirer";
import path from "path";
import reactBoilerPlate from "./template/react-vite.js";
import nextBoilerplate from "./template/nextjs.js";
import reactNativeBoilerPlate from "./template/react-native.js";
import isGitHubCLIInstalled from "./utils/isGitHubCLIInstalled.js";
import intitilizeGitHubRepo from "./github/initRepo.js";
import openInVSCode from "./utils/openVSCode.js";

const init = async () => {
  const { location } = await inquirer.prompt([
    {
      name: "location",
      type: "input",
      message: "Where should the project be created?",
      default: ".",
    },
  ]);

  const { projectName } = await inquirer.prompt([
    {
      name: "projectName",
      type: "input",
      message: "Enter the project name:",
      validate: (input) => input ? true : "Project name cannot be empty",
    },
  ]);

  const { projectType } = await inquirer.prompt([
    {
      name: "projectType",
      type: "list",
      message: "Which project do you want to create?",
      choices: [
        "React JS",
        "Next.js",
        "React Native",
        "HTML/CSS/JS"
      ],
      default: "React App using Vite",
    },
  ]);

  const targetDir = path.resolve(location, projectName);

  switch (projectType) {
    case "React JS":
      await reactBoilerPlate(targetDir, projectName, location);
    break;

    case "Next JS":
      await nextBoilerplate(targetDir, projectName, location);
    break;

    case "React Native":
      await reactNativeBoilerPlate(targetDir, projectName, location);
    break;

    case "HTML/CSS/JS":
      await planeHtmlCss(targetDir, projectName, location);
    break;
  }

  const { createGitHubRepo } = await inquirer.prompt([
    {
      name: 'createGitHubRepo',
      type: 'confirm',
      message: 'Do you want to create a GitHub repository and push this project?',
      default: true
    }
  ]);

  // const githubCliAvailable = await isGitHubCLIInstalled();

  // if (!githubCliAvailable) {
  //   console.log(`
  //       ❌ GitHub CLI (gh) is not installed.

  //       To use this feature, please install it from: https://cli.github.com/
  //       Or skip GitHub repo creation for now.
  //   `);

  //   console.log("Skipping GitHub repository creation. But you can create it manually by using below commands:");

  //   console.log(`
  //       1. Go to your GitHub account and create a new repository named "${projectName}".
  //       2. Run the following commands in your terminal:
  //       git init
  //       git add .
  //       git commit -m "Initial commit"
  //       git branch -M main
  //       git remote add origin https://github.com/username/${projectName}.git
  //       git push -u origin main
  //   `);
  // }

  
  // if (createGitHubRepo && githubCliAvailable) {
  //   await intitilizeGitHubRepo(targetDir, projectName);
  // }

  if (createGitHubRepo) {
    await intitilizeGitHubRepo(projectName, path.join(location, projectName), projectType);
  }


  const { openInVSCodeBoolean } = await inquirer.prompt([
    {
      name: "openInVSCodeBoolean",
      type: "confirm",
      message: "Do you want to open the project in VS Code and start the dev server?",
      default: true,
    },
  ]);
  

  await openInVSCode(targetDir, openInVSCodeBoolean, projectName, projectType);
};

init();
