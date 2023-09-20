import * as crypto from "crypto";
import signatureValidator from "../../../src/ext/line/validator";

/*
 * Calculate the signature of the request body.
 * This is a copy of the code from node_modules/%40line/bot-sdk/lib/validate-signature.ts.
 */
function calcSignature(body: string, channelSecret: string): string {
  return crypto
    .createHmac("SHA256", channelSecret)
    .update(body)
    .digest("base64");
}

test("Signature validation should pass for local environment", () => {
  const body = "test";
  const signature = "wrong signature";

  const actual = signatureValidator(body, signature, true);

  expect(actual).toBe(true);
});

test("Signature validation should pass for correct signature", () => {
  const body = "test";
  const fakeChannelSecret = "fake channel secret";
  const signature = calcSignature(body, fakeChannelSecret);

  const actual = signatureValidator(body, signature, false, fakeChannelSecret);

  expect(actual).toBe(true);
});

test("Signature validation should fail for correct signature", () => {
  const body = "test";
  const signature = "wrong signature";

  const actual = signatureValidator(body, signature, false);

  expect(actual).toBe(false);
});
