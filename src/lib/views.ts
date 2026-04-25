import fs from "fs";
import path from "path";

const viewsFile = path.join(process.cwd(), "data", "views.json");

function readViews(): Record<string, number> {
  try {
    return JSON.parse(fs.readFileSync(viewsFile, "utf-8"));
  } catch {
    return {};
  }
}

function writeViews(views: Record<string, number>) {
  fs.mkdirSync(path.dirname(viewsFile), { recursive: true });
  fs.writeFileSync(viewsFile, JSON.stringify(views, null, 2), "utf-8");
}

export function getViews(slug: string): number {
  return readViews()[slug] ?? 0;
}

export function incrementView(slug: string): number {
  const views = readViews();
  views[slug] = (views[slug] ?? 0) + 1;
  writeViews(views);
  return views[slug];
}
