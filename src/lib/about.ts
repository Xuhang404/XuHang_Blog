import fs from "fs";
import path from "path";

const aboutFile = path.join(process.cwd(), "data", "about.json");

export type About = {
  intro: string;
  introMore: string;
  skills: string[];
  github: string;
};

export function getAbout(): About {
  try {
    return JSON.parse(fs.readFileSync(aboutFile, "utf-8"));
  } catch {
    return {
      intro: "我是 XuHang。这个博客用于记录我在技术学习和日常生活中的思考。",
      introMore: "主要关注 Web 开发、前端技术、以及各种有趣的项目。",
      skills: ["JavaScript", "TypeScript", "React", "Next.js"],
      github: "https://github.com/Xuhang404",
    };
  }
}

export function updateAbout(data: Partial<About>): About {
  const current = getAbout();
  const updated = { ...current, ...data };
  fs.mkdirSync(path.dirname(aboutFile), { recursive: true });
  fs.writeFileSync(aboutFile, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}
