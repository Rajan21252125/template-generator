const planeHtmlCss = (targetDir, projectName) => {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, "index.html"), `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${projectName}</title>
        <link rel="stylesheet" href="style.css" />
    </head>
    <body>
        <h1>Hello World</h1>
        <script src="script.js"></script>
    </body>
    </html>
    `.trim());

    fs.writeFileSync(path.join(targetDir, "style.css"), `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: sans-serif; }
    `.trim());
    fs.writeFileSync(path.join(targetDir, "script.js"), `console.log("Hello World");`);
}

export default planeHtmlCss;