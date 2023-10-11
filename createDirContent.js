import * as fs from 'fs';
const CURR_DIR = process.cwd();
const createDirectoryContents = (templatePath, newProjectPath) => {
    // Read directory from templatePath passed in
    const filesToCreate = fs.readdirSync(templatePath);
    // Loop through each file in the directory
    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;
        // get stats about the current file
        const stats = fs.statSync(origFilePath);
        if (stats.isFile()) {
            // Read file content and transform it to utf8 format
            const contents = fs.readFileSync(origFilePath, 'utf8');
            // Rename .npmignore to .gitignore (fixes bug)
            if (file === '.npmignore')
                file = '.gitignore';
            // Write file to destination path
            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        }
        else if (stats.isDirectory()) {
            // If directory, create folder in destination path
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
            // Recursive call
            createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    });
};
export default createDirectoryContents;
//# sourceMappingURL=createDirContent.js.map