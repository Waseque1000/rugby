import "server-only";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const storageDirectory =
  process.env.JSON_STORAGE_DIR || path.join(process.cwd(), "storage");
const pendingWrites = new Map<string, Promise<void>>();

/** Persist form records as JSON outside the public, source-controlled data set. */
export async function appendJsonRecord<T extends object>(
  fileName: string,
  record: T,
  uniqueBy?: keyof T
): Promise<void> {
  const filePath = path.join(/*turbopackIgnore: true*/ storageDirectory, fileName);
  const previousWrite = pendingWrites.get(filePath) || Promise.resolve();
  const nextWrite = previousWrite.then(async () => {
    await mkdir(storageDirectory, { recursive: true });

    let records: T[] = [];
    try {
      const contents = await readFile(/*turbopackIgnore: true*/ filePath, "utf8");
      const parsed: unknown = JSON.parse(contents);
      if (!Array.isArray(parsed)) throw new Error(`${fileName} must contain a JSON array`);
      records = parsed as T[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }

    if (uniqueBy) {
      const value = record[uniqueBy];
      if (records.some((item) => item[uniqueBy] === value)) return;
    }

    records.push(record);
    const temporaryPath = `${filePath}.${process.pid}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
    await rename(temporaryPath, filePath);
  });

  pendingWrites.set(filePath, nextWrite);
  try {
    await nextWrite;
  } finally {
    if (pendingWrites.get(filePath) === nextWrite) pendingWrites.delete(filePath);
  }
}
