import type { Installer } from "./index.js";
import { runPkgManagerInstall } from "../utils/runPkgManagerInstall.js";

export const vitestInstaller: Installer = async (
  projectDir,
  packageManager
) => {
  await runPkgManagerInstall({
    packageManager,
    projectDir,
    packages: ["vitest"],
    devMode: true,
  });
};
