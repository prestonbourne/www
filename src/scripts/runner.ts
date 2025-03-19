import fs from "fs";
import { loadEnvConfig } from "@next/env";
import { inspect } from "node:util";
import path from "path";

type ScriptParams = {
  env: typeof process.env;
};

loadEnvConfig(process.cwd());


const runAsync = async () => {
  const trimmedFileName = __filename.split(path.sep).pop();
  // find all scripts in current directory
  const files = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith(".ts") && file !== trimmedFileName) // exclude self
    .sort();
  for (const file of files) {
    const {
      default: defaultFunc,
    }: { default: (params: ScriptParams) => void } = await import(
      `./${file}`
    );
    try {
      console.log(`[SCRIPT RUNNER]: running '${file}'`);
      await defaultFunc({ env: process.env });
      console.log(`[SCRIPT RUNNER]: finished '${file}'`);
    } catch (e) {
      console.error(
        `[SCRIPT RUNNER]: failed to execute script '${file}'`
      );
      console.error(e);
    }
  }
};

// Self-invocation async function
(async () => {
  await runAsync();
})().catch((err) => {
  console.error(inspect(err, { showHidden: true, depth: null }));
  throw err;
});