import signatureValidator from "../../ext/line/validator";
import lineClient from "../../ext/line/client";
import * as line from "@line/bot-sdk";

export async function POST(request: Request): Promise<Response> {
  if (
    !signatureValidator(
      await request.text(),
      request.headers.get("x-line-signature") || "",
    )
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body: line.WebhookRequestBody = await request.json();
  const events = body.events;

  for (const event of events) {
    if (event.type === "message" && event.message.type === "text") {
      const replyMessage: line.TextMessage = {
        type: "text",
        text: event.message.text,
      };
      await lineClient.replyMessage(event.replyToken, replyMessage);
    }
  }

  return new Response("", { status: 200 });
}
