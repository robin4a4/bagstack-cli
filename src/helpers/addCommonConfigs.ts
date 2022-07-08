import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "../consts.js";

export const addTailwindcssConfig = async (projectDir: string) => {
  const indexFileDir = path.join(PKG_ROOT, "template/addons/tailwindcss");
  const indexSrc = path.join(indexFileDir, "tailwind.config.js");
  const indexDest = path.join(projectDir, "/tailwind.config.js");
  await fs.copy(indexSrc, indexDest);
};
