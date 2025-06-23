import run from "./runCommand.js";

const openInVSCode = async (targetDir, openInVSCodeBoolean, projectName, projectType) => {
    if (!openInVSCodeBoolean) {
    console.log("\n✅ Project setup complete!");
    console.log(`\n👉 To get started:\ncd ${projectName}\nnpm install\nnpm run dev\n`);
    return;
  }
  if (openInVSCodeBoolean) {
    console.log("\n🚀 Opening in VS Code...");

    // Detect the dev command based on project type
    let devCommand = "npm run dev";
    if (projectType === "React Native App") {
      devCommand = "npx expo start";
    } else if (projectType === "Next.js App") {
      devCommand = "npm run dev";
    } else if (projectType === "HTML/CSS/JS App") {
      devCommand = null;
    }

    // Open VS Code and run terminal command
    run(`code ${targetDir}`);

    if (devCommand) {
      // Give VS Code a second to open before running the command
      console.log("🕓 Waiting for VS Code to launch...");
      setTimeout(() => {
        run(`code -r -g terminal:focus`);
        console.log(`🧪 To start the dev server, run:\n> ${devCommand}`);
      }, 2000);
    } else {
      console.log("ℹ️ No dev server to start for HTML/CSS/JS app.");
    }
  }
}


export default openInVSCode;