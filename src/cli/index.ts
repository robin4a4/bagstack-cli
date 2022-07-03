import {
  availableFrameworks,
  AvailableFrameworks,
  AvailablePackages,
} from "../installers/index.js";
import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import { BAGSTACK_CLI, DEFAULT_APP_NAME } from "../consts.js";
import { availablePackages } from "../installers/index.js";
import { logger } from "../utils/logger.js";
import { validateAppName } from "../utils/validateAppName.js";

interface CliResults {
  appName: string;
  framework: AvailableFrameworks;
  packages: AvailablePackages[];
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  framework: "react",
  packages: ["prisma"],
};

export const runCli = async () => {
  const cliResults = defaultOptions;

  const program = new Command().name(BAGSTACK_CLI);

  program
    .description("A CLI for creating web applications with the t3 stack")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
    .addHelpText(
      "afterAll",
      `\n The t3 stack was inspired by ${chalk
        .hex("#E8DCFF")
        .bold(
          "@t3dotgg"
        )} and has been used to build awesome fullstack applications like ${chalk
        .hex("#E24A8D")
        .underline("https://ping.gg")} \n`
    )
    .parse(process.argv);

  // Needs to be seperated outside the if statement to correctly infer the type as string | undefined
  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  // Explained below why this is in a try/catch block
  try {
    if (!cliProvidedName) {
      const { appName } = await inquirer.prompt<Pick<CliResults, "appName">>({
        name: "appName",
        type: "input",
        message: "What will your project be called?",
        default: defaultOptions.appName,
        validate: validateAppName,
        transformer: (input: string) => {
          return input.trim();
        },
      });
      cliResults.appName = appName;
    }

    const { framework } = await inquirer.prompt<Pick<CliResults, "framework">>({
      name: "framework",
      type: "list",
      message: "Which framework would you like to use?",
      choices: availableFrameworks.map((framework) => ({
        name: framework,
        value: framework,
      })),
    });

    cliResults.framework = framework;

    const { packages } = await inquirer.prompt<Pick<CliResults, "packages">>({
      name: "packages",
      type: "checkbox",
      message: "Which packages would you like to enable?",
      choices: availablePackages.map((pkgName) => ({
        name: pkgName,
        checked: false,
      })),
    });

    cliResults.packages = packages;
  } catch (err) {
    // If the user is not calling create-t3-app from an interactive terminal, inquirer will throw an error with isTTYError = true
    // If this happens, we catch the error, tell the user what has happened, and then contiue to run the program with a default t3 app
    // eslint-disable-next-line -- Otherwise we have to do some fancy namespace extension logic on the Error type which feels overkill for one line
    if (err instanceof Error && (err as any).isTTYError) {
      logger.warn(
        `${BAGSTACK_CLI} needs an interactive terminal to provide options`
      );
      logger.info(`Bootsrapping a default t3 app in ./${cliResults.appName}`);
    } else {
      throw err;
    }
  }

  return cliResults;
};
