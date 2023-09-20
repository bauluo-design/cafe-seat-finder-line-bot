import * as env from "../../config/env";

const lineConfig = {
  channelAccessToken: env.LINE_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: env.LINE_CHANNEL_SECRET || "YOUR_CHANNEL_SECRET",
};

export default lineConfig;
