import * as line from "@line/bot-sdk";
import config from "./config";

const client = new line.Client(config);

export default client;
