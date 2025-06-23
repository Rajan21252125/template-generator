import { execSync } from "child_process";


const run = (command, options = {}) => {
  try {
    execSync(command, { stdio: "inherit", ...options });
  } catch (err) {
    console.error("Error running command:", command);
    process.exit(1);
  }
};


export default run;