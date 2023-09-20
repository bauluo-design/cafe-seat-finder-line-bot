import * as line from "@line/bot-sdk";
import lineSecrets from "./config";
import { IS_LOCAL } from "../../config/env";

/**
 * Validate the Line webhook request signature.
 *
 * If in local testing mode, always return true.
 *
 * @param body: the content of the request from Line webhook.
 * @param signature: the x-line-signature header of the request from Line webhook.
 * @param isLocal: whether the server is running in local testing mode.
 * @param channelSecret: Line channel secret used to verify the signature.
 */
export default function signatureValidator(
  body: string,
  signature: string,
  // The following two parameters are for testing purpose.
  isLocal: boolean = IS_LOCAL,
  channelSecret: string = lineSecrets.channelSecret,
): boolean {
  if (isLocal) {
    return true;
  }
  return line.validateSignature(body, channelSecret, signature);
}
