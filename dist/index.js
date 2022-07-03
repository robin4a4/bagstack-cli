#!/usr/bin/env node
"use strict";var X=Object.defineProperty;var a=(t,e)=>X(t,"name",{value:e,configurable:!0});import q from"fs-extra";import Y from"path";import G from"chalk";import{Command as ot}from"commander";import M from"inquirer";import T from"path";import{fileURLToPath as Q}from"url";var V=Q(import.meta.url),Z=T.dirname(V),c=T.join(Z,"../");var j="my-bagstack-app",b="bagstack-cli";import l from"path";import u from"fs-extra";import{exec as tt}from"child_process";import{promisify as et}from"util";var p=et(tt);var d=a(async t=>{let{packageManager:e,devMode:o,projectDir:s,packages:n}=t,g=`${e==="yarn"?`${e} add`:`${e} install`} ${o?"-D":""} ${n.join(" ")}`;await p(g,{cwd:s})},"runPkgManagerInstall");var N=a(async(t,e)=>{await d({packageManager:e,projectDir:t,packages:["prisma"],devMode:!0}),await d({packageManager:e,projectDir:t,packages:["@prisma/client"],devMode:!1});let o=l.join(c,"template/addons/prisma"),s=l.join(o,"schema.prisma"),n=l.join(t,"prisma/schema.prisma"),r=l.join(o,"client.ts"),w=l.join(t,"src/server/db/client.ts"),g=l.join(o,"sample-api.ts"),k=l.join(t,"src/pages/api/examples.ts"),S=l.join(t,"package.json"),$=u.readJSONSync(S);$.scripts.postinstall="prisma generate",await Promise.all([u.copy(s,n),u.copy(r,w),u.copy(g,k),u.writeJSON(S,$,{spaces:2})]);let H=e==="npm"?"npx prisma generate":`${e} prisma generate`;await p(H,{cwd:t})},"prismaInstaller");import m from"path";import P from"fs-extra";var _=a(async(t,e)=>{await d({packageManager:e,projectDir:t,packages:["tailwindcss","postcss","autoprefixer"],devMode:!0});let o=m.join(c,"template/addons/tailwind"),s=m.join(o,"tailwind.config.js"),n=m.join(t,"tailwind.config.js"),r=m.join(o,"postcss.config.js"),w=m.join(t,"postcss.config.js"),g=m.join(o,"globals.css"),k=m.join(t,"src/styles/globals.css");await Promise.all([P.copy(s,n),P.copy(r,w),P.copy(g,k)])},"tailwindInstaller");var C=["prisma","tailwind"],I=a(t=>({prisma:{inUse:t.includes("prisma"),installer:N},tailwind:{inUse:t.includes("tailwind"),installer:_}}),"buildPkgInstallerMap");import h from"chalk";var i={error(...t){console.log(h.red(...t))},warn(...t){console.log(h.yellow(...t))},info(...t){console.log(h.cyan(...t))},success(...t){console.log(h.green(...t))}};var O=a(t=>/^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(t)?!0:"App name must be lowercase, alphanumeric, and only use -, _, and @","validateAppName");var E={appName:j,packages:["prisma","tailwind"]},U=a(async()=>{let t=E,e=new ot().name(b);e.description("A CLI for creating web applications with the t3 stack").argument("[dir]","The name of the application, as well as the name of the directory to create").addHelpText("afterAll",`
 The t3 stack was inspired by ${G.hex("#E8DCFF").bold("@t3dotgg")} and has been used to build awesome fullstack applications like ${G.hex("#E24A8D").underline("https://ping.gg")} 
`).parse(process.argv);let o=e.args[0];o&&(t.appName=o);try{if(!o){let{appName:n}=await M.prompt({name:"appName",type:"input",message:"What will your project be called?",default:E.appName,validate:O,transformer:r=>r.trim()});t.appName=n}let{packages:s}=await M.prompt({name:"packages",type:"checkbox",message:"Which packages would you like to enable?",choices:C.map(n=>({name:n,checked:!1}))});t.packages=s}catch(s){if(s instanceof Error&&s.isTTYError)i.warn(`${b} needs an interactive terminal to provide options`),i.info(`Bootsrapping a default t3 app in ./${t.appName}`);else throw s}return t},"runCli");import ct from"path";var y=a(()=>{let t=process.env.npm_config_user_agent;return t?t.startsWith("yarn")?"yarn":t.startsWith("pnpm")?"pnpm":"npm":"npm"},"getUserPkgManager");import F from"chalk";import at from"ora";var L=a(async(t,e,o)=>{i.info("Installing packages...");for(let[s,n]of Object.entries(o))if(console.log(n),n.inUse){let r=at(`Installing ${s}...`).start();await n.installer(t,e,o),r.succeed(F.green(`Successfully installed ${F.green.bold(s)}`))}i.info("")},"installPackages");import st from"path";import f from"chalk";import x from"fs-extra";import nt from"inquirer";import it from"ora";var R=a(async(t,e,o)=>{let s=st.join(c,"template/base");i.info(`
Using: ${f.cyan.bold(o)}
`);let n=it(`Scaffolding in: ${e}...
`).start();if(x.existsSync(e))if(x.readdirSync(e).length===0)n.info(`${f.cyan.bold(t)} exists but is empty, continuing...
`);else{n.stopAndPersist();let{overwriteDir:r}=await nt.prompt({name:"overwriteDir",type:"confirm",message:`${f.redBright.bold("Warning:")} ${f.cyan.bold(t)} already exists and isn't empty. Do you want to overwrite it?`,default:!1});r?(n.info(`Emptying ${f.cyan.bold(t)} and creating bagstack app..
`),x.emptyDirSync(e)):(n.fail("Aborting installation..."),process.exit(0))}n.start(),await x.copy(s,e),await p(`${o} install`,{cwd:e}),n.succeed(`${f.cyan.bold(t)} scaffolded successfully!
`)},"scaffoldProject");import A from"path";import rt from"fs-extra";var z=a(async t=>{let e=A.join(c,"template/page-studs/index"),o=A.join(e,"with-tw.tsx"),s=A.join(t,"src/pages/index.tsx");await rt.copy(o,s)},"selectIndexFile");var D=a(async(t,e)=>{let o=y(),s=ct.resolve(process.cwd(),t);return await R(t,s,o),await L(s,o,e),await z(s),s},"createProject");import K from"path";import v from"chalk";import pt from"fs-extra";import lt from"ora";var W=a(async t=>{i.info("Initializing Git...");let e=lt(`Creating a new git repo...
`).start();try{await p("git init --initial-branch=main",{cwd:t}),e.succeed(`${v.green("Successfully initialized")} ${v.green.bold("git")}
`)}catch{e.fail(`${v.bold.red("Failed:")} could not initialize git
`)}await pt.rename(K.join(t,"_gitignore"),K.join(t,".gitignore"))},"initializeGit");var J=a((t,e)=>{let o=y();i.info("Next steps:"),i.info(`  cd ${t}`),e.prisma.inUse&&i.info(`  ${o==="npm"?"npx":o} prisma db push`),i.info(`  ${o==="npm"?"npm run":o} dev`)},"logNextSteps");import mt from"figlet";import ft from"gradient-string";var gt={blue:"#add7ff",cyan:"#89ddff",green:"#5de4c7",magenta:"#fae4fc",red:"#d0679d",yellow:"#fffac2"},B=a(()=>{let t=mt.textSync("BAGSTACK-CLI",{font:"Small"}),e=ft(Object.values(gt));console.log(e.multiline(t))},"renderTitle");var dt=a(async()=>{B(),process.versions.node.startsWith("18")&&i.warn(`  WARNING: You are using Node.js version 18. This is currently not compatible with Next-Auth.
  If you want to use Next-Auth, switch to a previous version of Node, e.g. 16 (LTS).
  If you have nvm installed, use 'nvm install --lts' to switch to the latest LTS version of Node.
    `);let{appName:t,packages:e}=await U(),o=I(e),s=await D(t,o);await W(s),J(t,o);let n=await q.readJSON(Y.join(s,"package.json"));n.name=t,await q.writeJSON(Y.join(s,"package.json"),n,{spaces:2}),process.exit(0)},"main");dt().catch(t=>{i.error("Aborting installation..."),t instanceof Error?i.error(t):(i.error("An unkown error has occured. Please open an issue on github with the below:"),console.log(t)),process.exit(1)});
//# sourceMappingURL=index.js.map