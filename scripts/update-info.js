const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const builderConfigPath = path.join(rootDir, 'electron-builder.yml');
const updaterConfigPath = path.join(rootDir, 'dev-app-update.yml');
const htmlPath = path.join(rootDir, 'src', 'renderer', 'index.html');
const readmePath = path.join(rootDir, 'README.md');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query, defaultValue) => new Promise((resolve) => {
  const prompt = defaultValue ? `${query} (${defaultValue}): ` : `${query}: `;
  rl.question(prompt, (answer) => {
    resolve(answer.trim() || defaultValue);
  });
});

async function updateProjectInfo() {
  try {
    console.log('--- Updating Project Configuration ---\n');

    // 1. Read current configurations
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    let builderConfig = fs.existsSync(builderConfigPath) ? fs.readFileSync(builderConfigPath, 'utf-8') : '';
    let updaterConfig = fs.existsSync(updaterConfigPath) ? fs.readFileSync(updaterConfigPath, 'utf-8') : '';
    let htmlContent = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf-8') : '';
    let readmeContent = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf-8') : '';

    // Extract current values for defaults
    const currentName = packageJson.name;
    const currentProductNameMatch = builderConfig.match(/productName:\s*(.+)/);
    const currentProductName = currentProductNameMatch ? currentProductNameMatch[1].trim() : currentName;
    const currentAppIdMatch = builderConfig.match(/appId:\s*(.+)/);
    const currentAppId = currentAppIdMatch ? currentAppIdMatch[1].trim() : 'com.electron.app';
    const currentDescription = packageJson.description || '';
    const currentAuthor = packageJson.author || '';

    // 2. Prompt user
    const name = await question('Project Name (kebab-case)', currentName);
    const productName = await question('Product Name (Display Name)', currentProductName || name);
    const appId = await question('App ID', currentAppId);
    const description = await question('Description', currentDescription);
    const author = await question('Author', currentAuthor);

    // 3. Update package.json
    packageJson.name = name;
    packageJson.description = description;
    packageJson.author = author;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`\u2714 Updated package.json`);

    // 4. Update electron-builder.yml
    if (builderConfig) {
      builderConfig = builderConfig.replace(/appId:\s*.+/, `appId: ${appId}`);
      builderConfig = builderConfig.replace(/productName:\s*.+/, `productName: ${productName}`);
      fs.writeFileSync(builderConfigPath, builderConfig);
      console.log(`\u2714 Updated electron-builder.yml`);
    }

    // 5. Update dev-app-update.yml
    if (updaterConfig) {
      const updaterCacheName = `${name}-updater`;
      updaterConfig = updaterConfig.replace(/updaterCacheDirName:\s*.+/, `updaterCacheDirName: ${updaterCacheName}`);
      fs.writeFileSync(updaterConfigPath, updaterConfig);
      console.log(`\u2714 Updated dev-app-update.yml (updaterCacheDirName: ${updaterCacheName})`);
    }

    // 6. Update index.html title
    if (htmlContent) {
      htmlContent = htmlContent.replace(/<title>.*<\/title>/, `<title>${productName}</title>`);
      fs.writeFileSync(htmlPath, htmlContent);
      console.log(`\u2714 Updated src/renderer/index.html title`);
    }

    // 7. Update README.md title
    if (readmeContent) {
      // Assumes the first line is the title e.g. # Title
      readmeContent = readmeContent.replace(/^#\s+.+/, `# ${productName}`);
      fs.writeFileSync(readmePath, readmeContent);
      console.log(`\u2714 Updated README.md title`);
    }

    console.log('\n--- Update Complete! ---');
    console.log('Please run "pnpm install" or "npm install" if package name changes affected lockfiles (mostly unlikely).');

  } catch (error) {
    console.error('Error updating project info:', error);
  } finally {
    rl.close();
  }
}

updateProjectInfo();
