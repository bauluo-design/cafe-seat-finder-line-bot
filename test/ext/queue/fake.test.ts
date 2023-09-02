import { expect, test } from "@jest/globals";
import { FakeQueueClient } from "../../../src/ext/queue/fake";

test("FakeQueueClient", async () => {
  const client = new FakeQueueClient();
  const message = "Hello World!";

  await client.sendMessage(message);
  const receiveResponse = await client.receiveMessages();

  expect(receiveResponse.receivedMessageItems[0].messageText).toBe(message);

  const emptyReceiveResponse = await client.receiveMessages();
  expect(emptyReceiveResponse.receivedMessageItems.length).toBe(0);
});
