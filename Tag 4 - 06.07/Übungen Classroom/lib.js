import fs from "node:fs/promises"

const pathLog = new URL("./logs/log.txt", import.meta.url)
const pathInfo = new URL("./logs/info.txt", import.meta.url)
const pathWarn = new URL("./logs/warn.txt", import.meta.url)
const pathError = new URL("./logs/error.txt", import.meta.url)

export const writeLog = async (logLevel, timeStamp, logMessage) => {
    try{
        await fs.appendFile(pathLog, logLevel + " :: " + timeStamp + " :: " + logMessage + "\n", {encoding: "utf8"} )
        console.log(`Daten wurden erfolgreich in log.txt geschrieben`);
        if (logLevel === `Info`){
            try {
                await fs.appendFile(pathInfo, logLevel + " :: " + timeStamp + " :: " + logMessage + "\n", {encoding: "utf8"} )
                console.log(`Daten wurden erfolgreich in info.txt geschrieben`);
            } catch (err){
                console.error(`Fehler beim Schreiben in info.txt: ${err}`);
            }
        } else if (logLevel === `Warn`){
            try {
                await fs.appendFile(pathWarn, logLevel + " :: " + timeStamp + " :: " + logMessage + "\n", {encoding: "utf8"} )
                console.log(`Daten wurden erfolgreich in warn.txt geschrieben`);
            } catch (err){
                console.error(`Fehler beim Schreiben in warn.txt: ${err}`);
            }
        } else if (logLevel === `Error`){
            try {
                await fs.appendFile(pathError, logLevel + " :: " + timeStamp + " :: " + logMessage + "\n", {encoding: "utf8"} )
                console.log(`Daten wurden erfolgreich in error.txt geschrieben`);
            } catch (err){
                console.error(`Fehler beim Schreiben in error.txt: ${err}`);
            }
        }
    } catch (err){
        console.error(`Fehler beim Schreiben in log.txt: ${err}`);
    }
}