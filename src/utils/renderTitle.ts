import figlet from "figlet";
import gradient from "gradient-string";

// colors brought in from vscode poimandres theme
const poimandresTheme = {
  blue: "#add7ff",
  cyan: "#89ddff",
  green: "#5de4c7",
  magenta: "#fae4fc",
  red: "#d0679d",
  yellow: "#fffac2",
};

export const renderTitle = () => {
  const text = figlet.textSync("BAGSTACK-CLI", { font: "Small" });
  const cliGradient = gradient(Object.values(poimandresTheme));
  console.log(cliGradient.multiline(text));
};
