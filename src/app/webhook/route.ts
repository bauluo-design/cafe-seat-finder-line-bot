import signatureValidator from "../../ext/line/validator";
import getLineClient from "../../ext/line/client";
import * as line from "@line/bot-sdk";

export async function POST(request: Request): Promise<Response> {
  const rawBody = await request.text();
  if (
    !signatureValidator(rawBody, request.headers.get("x-line-signature") || "")
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  // request.json() will result in the following error:
  // > TypeError: Body is unusable
  // The root cause is still unknown at this point.
  const body = JSON.parse(rawBody);
  const events = body.events;

  for (const event of events) {
    if (event.type === "message" && event.message.type === "text") {
      const replyMessage: line.TextMessage = {
        type: "text",
        text: event.message.text,
      };
      await getLineClient().replyMessage(event.replyToken, replyMessage);
    }
  }

  return new Response("", { status: 200 });
}
