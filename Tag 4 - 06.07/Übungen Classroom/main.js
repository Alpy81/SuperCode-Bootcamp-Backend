import { writeLog } from "./lib.js";

const timeStamp = new Date().toUTCString()
const userID = Math.floor(Math.random() * 99999999999)

let login = "successful"
let logMessage;
let logLevel;

if (login === "successful"){
    logMessage = `User ${userID} Login Successful`
    logLevel = `Log`
    console.log(logMessage);
} else if (login === "success-info") {
    logMessage = `User ${userID} Login Successful`
    logLevel = `Info`
    console.info(logMessage)
} else if (login === "success-warn"){
    logMessage = `User ${userID} Login Successful`
    logLevel = `Warn`
    console.warn(logMessage)
} else if (login === "failed"){
    logMessage = `User ${userID} Login Failed`
    logLevel = `Error`
    console.error(logMessage)
}

writeLog(logLevel, timeStamp, logMessage)