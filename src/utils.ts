import * as fs from "fs/promises";

export async function readLines(filePath: string): Promise<string[]> {
    const file = await fs.readFile(filePath, "utf-8");
    const lines = file.split("\n");
    if (lines[lines.length - 1] === "") lines.pop();
    return lines;
}