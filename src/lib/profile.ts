import fs from "fs";
import path from "path";

const profileFile = path.join(process.cwd(), "data", "profile.json");

export type Profile = {
  name: string;
  bio: string;
  avatar: string;
};

export function getProfile(): Profile {
  try {
    return JSON.parse(fs.readFileSync(profileFile, "utf-8"));
  } catch {
    return { name: "Xuhang", bio: "", avatar: "https://github.com/Xuhang404.png" };
  }
}

export function updateProfile(data: Partial<Profile>): Profile {
  const current = getProfile();
  const updated = { ...current, ...data };
  fs.mkdirSync(path.dirname(profileFile), { recursive: true });
  fs.writeFileSync(profileFile, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}
