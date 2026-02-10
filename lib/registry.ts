
import fs from "fs";
import path from "path";
import { RegistryEntry } from "./registry-schema";

const registryDirectory = path.join(process.cwd(), "content/registry");

export function getRegistryEntries(): RegistryEntry[] {
    if (!fs.existsSync(registryDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(registryDirectory);
    const allEntriesData = fileNames
        .filter((fileName) => fileName.endsWith(".json"))
        .map((fileName) => {
            const fullPath = path.join(registryDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");

            try {
                const entry: RegistryEntry = JSON.parse(fileContents);
                return entry;
            } catch (error) {
                console.error(`Error parsing ${fileName}:`, error);
                return null;
            }
        });

    // Filter out any nulls from parsing errors and sort by date
    return allEntriesData
        .filter((entry): entry is RegistryEntry => entry !== null)
        .sort((a, b) => {
            if (a.submission_date < b.submission_date) {
                return 1;
            } else {
                return -1;
            }
        });
}
