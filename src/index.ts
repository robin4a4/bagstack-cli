#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import type { PackageJson } from "type-fest";
import { runCli } from "./cli/index.js";
import { createProject } from "./helpers/createProject.js";
import { initializeGit } from "./helpers/initGit.js";
import { logNextSteps } from "./helpers/logNextSteps.js";
import { buildPkgInstallerMap } from "./installers/index.js";
import { logger } from "./utils/logger.js";
import { renderTitle } from "./utils/renderTitle.js";

const main = async () => {
  renderTitle();

  // TEMPORARY WARNING WHEN USING NODE 18. SEE ISSUE #59
  if (process.versions.node.startsWith("18")) {
    logger.warn(`  WARNING: You are using Node.js version 18. This is currently not compatible with Next-Auth.
  If you want to use Next-Auth, switch to a previous version of Node, e.g. 16 (LTS).
  If you have nvm installed, use 'nvm install --lts' to switch to the latest LTS version of Node.
    `);
  }

  const { appName, packages } = await runCli();

  const usePackages = buildPkgInstallerMap(packages);

  const projectDir = await createProject(appName, usePackages);

  await initializeGit(projectDir);

  logNextSteps(appName, usePackages);

  const pkgJson = (await fs.readJSON(
    path.join(projectDir, "package.json")
  )) as PackageJson;
  pkgJson.name = appName;
  await fs.writeJSON(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unkown error has occured. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
