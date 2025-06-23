import run from "../utility/runCommand.js";
import fs from "fs";
import path from "path";

const reactNativeBoilerPlate = async(targetDir, projectName, location) => {
    console.log(`\n📁 Creating React Native project at: ${targetDir}\n`);
    run(`npx react-native init ${projectName}`, { cwd: location });
    console.log(`\n🧹 Removing boilerplate files...\n`);
    const rnBoilerplateFiles = [
    "App.js",
    "index.js",
    "android/app/src/main/res/drawable",
    ];
    rnBoilerplateFiles.forEach((file) => {
    const fullPath = path.join(targetDir, file);
    if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
    }
    });
    fs.writeFileSync(path.join(targetDir, "App.js"),
    `import React from 'react';
        import { View, Text, StyleSheet } from 'react-native';

        const App = () => {
        return (
            <View style={styles.container}>
            <Text>Hello, React Native!</Text>
            </View>
        );
        };

        const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        });

        export default App;
    `.trim());

    fs.writeFileSync(path.join(targetDir, "index.js"), "");

    console.log("\n📦 Installing React Native dependencies...\n");
    run(`npm install react-native`, { cwd: targetDir });

    const { addTailwind } = await inquirer.prompt([
      {
        name: "addTailwind",
        type: "confirm",
        message: "Do you want to add Tailwind CSS?",
        default: true,
      },
    ]);

    if (addTailwind) {
      console.log("\n🎨 Installing Tailwind CSS for React Native...\n");
      run(`npm install tailwindcss-react-native`, { cwd: targetDir });

      // Create tailwind.config.js
      fs.writeFileSync(
        path.join(targetDir, "tailwind.config.js"),
        `module.exports = {
          theme: {
            extend: {},
          },
        };`
      );
    }
}

export default reactNativeBoilerPlate;