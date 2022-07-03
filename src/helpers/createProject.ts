import path from "path";
import type {
  AvailableFrameworks,
  PkgInstallerMap,
} from "../installers/index.js";
import { getUserPkgManager } from "../utils/getUserPkgManager.js";
import { installPackages } from "./installPackages.js";
import { scaffoldProject } from "./scaffoldProject.js";
import { selectIndexFile } from "./selectBoilerplate.js";

export const createProject = async (
  projectName: string,
  packages: PkgInstallerMap,
  framework: AvailableFrameworks
) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base Next.js application
  await scaffoldProject(projectName, projectDir, pkgManager, framework);

  // Install the selected packages
  await installPackages(projectDir, pkgManager, packages);

  // await selectIndexFile(projectDir);

  return projectDir;
};
