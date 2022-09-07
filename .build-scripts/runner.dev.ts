'use strict';

import chalk from "chalk";
import { ChildProcess, exec, spawn } from "child_process";
import path from "path";
import { fileURLToPath } from 'url';
import webpack from "webpack";
import WebpackDevServer, { WebpackConfiguration } from "webpack-dev-server";
import WebpackHotMiddleware from "webpack-hot-middleware";

import mainConfig from "./webpack.main.config.js";
import rendererConfig from "./webpack.renderer.config.js";
import webConfig from "./webpack.web.config.js";

import HtmlWebpackPlugin from "html-webpack-plugin";
import os from "os";


const Run_Mode_DEV = "development";
const Run_Mode_PROD = "production";
const dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.NODE_ENV = "development";

const localIPv4 = await WebpackDevServer.internalIP("v4");
console.log(localIPv4);

export default class DevRunner {

  private static electronProcess: ChildProcess | null = null;
  private static manualRestart = false;
  private static hotMiddleware: any;

  private static logStats(proc: String, data: any) {
    let log = "";

    log += chalk.yellow(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join("-")}`);
    log += "\n\n";

    if (typeof data === "object") {
      data.toString({ colors: true, chunks: false }).split(/\r?\n/)
        .forEach((line: String) => { log += "  " + line + "\n"; });
    } else {
      log += `  ${data}\n`;
    }

    log += "\n" + chalk.yellow(`┗ ${new Array(28 + 1).join("-")}`) + "\n";

    console.log(log);
  }

  private static startDevServer(config: WebpackConfiguration, port: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      config.mode = Run_Mode_DEV;
      const compiler = webpack(config);

      let hotMiddleware = WebpackHotMiddleware(compiler, { log: false, heartbeat: 2500 });

      compiler.hooks.compilation.tap("compilation", compilation => {
        HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync("html-webpack-plugin-after-emit", (data: any, cb: () => void) => {
          hotMiddleware.publish({ action: "reload" });
          cb();
        });
      });

      compiler.hooks.done.tap("done", stats => { DevRunner.logStats(`${config.target}`, stats); });

      const server = new WebpackDevServer(
        {
          port: port,
          hot: true,
          liveReload: true,
          allowedHosts: "all",
          static: { directory: path.join(dirname, "../"), },
          setupMiddlewares(middlewares, devServer) {
            devServer.app.use(hotMiddleware);
            devServer.middleware.waitUntilValid(() => { resolve(); });
            return middlewares;
          }
        }, compiler);

      server.start()
        .catch(err => { console.log(`fail to start ${config.target} server`, err); });
    });
  }

  private static startMain(): Promise<void> {
    return new Promise((resolve, reject) => {
      mainConfig.mode = Run_Mode_DEV;
      const compiler = webpack(mainConfig);
      DevRunner.hotMiddleware = WebpackHotMiddleware(compiler, { log: false, heartbeat: 2500 });
      compiler.hooks.watchRun.tapAsync("watch-run", (compilation, done) => {
        DevRunner.logStats("Main", chalk.white("compiling..."));
        DevRunner.hotMiddleware.publish({ action: "compiling" });
        done();
      });

      compiler.watch({}, (err, stats) => {
        if (err) {
          console.log(err);
          return;
        }

        DevRunner.logStats("Main", stats);

        if (DevRunner.electronProcess && DevRunner.electronProcess.kill()) {
          DevRunner.manualRestart = true;

          if (os.platform() === "darwin") {
            process.kill(DevRunner.electronProcess.pid!);
            DevRunner.electronProcess = null;
            DevRunner.startElectron();

            setTimeout(() => {
              DevRunner.manualRestart = false
            }, 5000);
          } else {
            const pid = DevRunner.electronProcess.pid;
            exec(`TASKKILL /F /IM electron.exe`, (err, data) => {
              if (err) console.log(err);
              else console.log("kill pid: " + pid + " success!");
              DevRunner.electronProcess = null;
              DevRunner.startElectron();
              DevRunner.manualRestart = false
            });
          }
        }
        resolve();
      })
    });
  }

  private static startElectron() {
    let args = [
      "--inspect=5858",
      "--remote-debugging-port=9223", // add this line
      path.join(dirname, "../dist/electron/main.js")
    ];

    // detect yarn or npm and process commandline args accordingly
    if (process.env.npm_execpath?.endsWith("yarn.js")) {
      args = args.concat(process.argv.slice(3));
    } else if (process.env.npm_execpath?.endsWith("npm-cli.js")) {
      args = args.concat(process.argv.slice(2));
    }

    DevRunner.electronProcess = spawn("electron", args);

    DevRunner.electronProcess?.stdout?.on("data", data => {
      DevRunner.electronLog(data, "blue");
    });
    DevRunner.electronProcess?.stderr?.on("data", data => {
      DevRunner.electronLog(data, "red");
    });

    DevRunner.electronProcess?.on("close", () => {
      if (!DevRunner.manualRestart) process.exit();
    });
  }

  private static electronLog(data: any, color: any) {
    let log = "";
    data = data.toString().split(/\r?\n/);
    data.forEach((line: String) => { log += `  ${line}\n`; });
    if (/[0-9A-z]+/.test(log)) {
      console.log(
        chalk[color]("┏ Electron -------------------") +
        "\n\n" +
        chalk[color](log) +
        chalk[color]("┗ ----------------------------") +
        "\n"
      );
    }
  }

  private static greeting() {
    const cols = process.stdout.columns;
    let text: String | boolean = "";

    if (cols > 104) text = "electron-vue";
    else if (cols > 76) text = "electron-|vue";
    else text = false;

    console.log(chalk.green("\n  electron-vue"));

    console.log(chalk.blue("  getting ready...") + "\n");
  }

  public static start() {
    DevRunner.greeting();

    Promise.all([
      DevRunner.startDevServer(webConfig, 9081),
      DevRunner.startDevServer(rendererConfig, 9080),
      DevRunner.startMain()])
      .then(() => { DevRunner.startElectron(); })
      .catch(err => {
        console.error(err);
      });
  }
}

DevRunner.start();