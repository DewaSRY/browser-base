import BrowserBase from "../browser-base";

const BASE_STYLE = `
      padding: 2px 5px;
      background-color: #124F5C;
      border-radius: 4px;
      color: white; 
`;
const COLOER = {
  log: "#124F5C",
  error: "#ed2939",
  warn: "#f39c12",
};

/**
 * This Loger use to print loger to borwser
 */
export default class Logger {
  constructor(private browserBase: BrowserBase) {}
  private isRunLog() {
    const { debug } = this.browserBase.config;
    return process.env.NODE_ENV == "development" && debug;
  }

  private runLog<T extends Object>(
    begraoundColor: string,
    message: string,
    object?: T
  ) {
    if (!this.isRunLog) return;
    let style = BASE_STYLE + `background-color: ${begraoundColor}`;
    if (object) {
      console.log("%clocalbase", style, message, object);
    } else {
      console.log("%clocalbase", style, message);
    }
  }
  public log<T extends Object>(message: string, object?: T) {
    this.runLog(COLOER.log, message, object);
  }
  public error<T extends Object>(message: string, object?: T) {
    this.runLog(COLOER.error, message, object);
  }

  public warn<T extends Object>(message: string, object?: T) {
    this.runLog(COLOER.warn, message, object);
  }
}
