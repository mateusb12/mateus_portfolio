const { spawn } = require("child_process");

const start = Date.now();
console.log("🚀 Starting React development server...\n");

const child = spawn("npm", ["run", "start:raw"], { shell: true });

child.stdout.on("data", (data) => {
    process.stdout.write(data);

    const output = data.toString();
    if (output.includes("Compiled successfully")) {
        const end = Date.now();
        const duration = ((end - start) / 1000).toFixed(2);
        console.log(`\n✅ Webpack compiled successfully`);
        console.log(`🕒 Time to dev server ready: ${duration} seconds\n`);
    }
});

child.stderr.on("data", (data) => {
    process.stderr.write(data);
});

child.on("close", (code) => {
    process.exit(code);
});
