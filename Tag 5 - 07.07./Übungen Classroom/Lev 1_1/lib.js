import fs from "node:fs/promises";

const logFolder = new URL("./logs", import.meta.url);
const logFile = new URL("./logs/logs.txt", import.meta.url);

const warnFile = new URL("./logs/warn.txt");
const errorFile = new URL("./logs/error.txt");
const infoFile = new URL("./logs/info.txt");

const exists = async (path) => {
  let exists;
  try {
    await fs.access(path, fs.constants.W_OK);
    exists = true;
  } catch (err) {
    exists = false;
  }

  return exists;
};

let isSetup = false;
const setup = async () => {
  if (isSetup) return;
  const hasFolder = await exists(logFolder);

  if (!hasFolder) {
    await fs.mkdir(logFolder);
  }

  isSetup = true;
};

const createLogMessage = (txt, logLevel) => {
  const time = new Date().toUTCString();
  let message = `${time} :: ${txt}\n`;
  if (logLevel) {
    message = `${logLevel} :: ${message}`;
  }
  return message;
};

export const log = async (logtxt, logLevel = "INFO") => {
  await setup();
  const message = createLogMessage(logtxt, logLevel);
  await fs.appendFile(logFile, message, { encoding: "utf8" });
};

const error = async (logtxt) => {
  await setup();
  await log(logtxt, "ERROR");
  await fs.appendFile(errorFile, createLogMessage(logtxt), {
    encoding: "utf8",
  });
};
const warn = async (logtxt) => {
  await setup();
  await log(logtxt, "WARN");
  await fs.appendFile(warnFile, createLogMessage(logtxt), { encoding: "utf8" });
};
const info = async (logtxt) => {
  await setup();
  await log(logtxt, "INFO");
  await fs.appendFile(infoFile, createLogMessage(logtxt), { encoding: "utf8" });
};
