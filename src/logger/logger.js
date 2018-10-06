const logToConsole = true;

export const logInfo = message => {
  if (logToConsole) {
    console.log("Info: " + message);
  }
};

export const logError = message => {
  if (logToConsole) {
    console.log("Error: " + message);
  }
};

export const logObject = object => {
  if (logToConsole) {
    console.log(object);
  }
};
