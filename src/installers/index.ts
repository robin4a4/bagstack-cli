import type { PackageManager } from "../utils/getUserPkgManager.js";

import { prismaInstaller } from "./prisma.js";
import { vitestInstaller } from "./vitest.js";

// Turning this into a const allows the list to be iterated over for programatically creating prompt options
// Should increase extensability in the future
export const availablePackages = ["prisma", "vitest"] as const;
export const availableFrameworks = [
  "react",
  // "nextjs",
  "solid",
  "svelte",
  // "sveltekit",
];
export type AvailablePackages = typeof availablePackages[number];

export type AvailableFrameworks = typeof availableFrameworks[number];

export type Installer = (
  projectDir: string,
  packageManager: PackageManager,
  packages: PkgInstallerMap
) => Promise<void>;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const buildPkgInstallerMap = (
  packages: AvailablePackages[]
): PkgInstallerMap => ({
  prisma: {
    inUse: packages.includes("prisma"),
    installer: prismaInstaller,
  },
  vitest: {
    inUse: packages.includes("vitest"),
    installer: vitestInstaller,
  },
});
