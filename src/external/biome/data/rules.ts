import { marked } from "marked";
import fs from "node:fs";

export const rules = marked.parse(fs.readFileSync("rules.md", "utf-8"));

console.log("rules: ", rules);
