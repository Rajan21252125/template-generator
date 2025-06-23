import { execSync } from 'child_process';

const isGitHubCLIInstalled = async () => {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

export default isGitHubCLIInstalled;