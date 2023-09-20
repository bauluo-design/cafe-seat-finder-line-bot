import * as line from "@line/bot-sdk";
import config from "./config";

/*
Line client singleton.
 */
let client: line.Client;

function getClient() {
  if (!client) {
    client = new line.Client(config);
  }
  return client;
}

// The reason why we don't create a new client and expose it is because
// Next.js build process will execute the code and fail. Make it lazy load
// to avoid the problem.
export default getClient;
