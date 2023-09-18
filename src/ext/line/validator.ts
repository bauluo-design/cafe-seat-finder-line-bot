import * as line from "@line/bot-sdk";
import secrets from "./config";
import { IS_LOCAL } from "../../config/env";

/**
 * Validate the Line webhook request signature.
 *
 * If in local testing mode, always return true.
 * @param body: the content of the request from Line webhook.
 * @param signature: the x-line-signature header of the request from Line webhook.
 */
export default function signatureValidator(
  body: string,
  signature: string,
): boolean {
  if (IS_LOCAL) {
    return true;
  }
  return line.validateSignature(body, secrets.channelSecret, signature);
}
