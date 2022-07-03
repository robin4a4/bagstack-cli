import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "../consts.js";

// This generates the _app.tsx file that is used to render the app
export const selectAppFile = async (projectDir: string) => {
  const appFileDir = path.join(PKG_ROOT, "template/page-studs/_app");
  const appDest = path.join(projectDir, "src/pages/_app.tsx");
  await fs.copy(appFileDir, appDest);
};

// This selects the proper index.tsx to be used that showcases the chosen tech
export const selectIndexFile = async (projectDir: string) => {
  const indexFileDir = path.join(PKG_ROOT, "template/page-studs/index");

  const indexSrc = path.join(indexFileDir, "with-tw.tsx");
  const indexDest = path.join(projectDir, "src/pages/index.tsx");
  await fs.copy(indexSrc, indexDest);
};
