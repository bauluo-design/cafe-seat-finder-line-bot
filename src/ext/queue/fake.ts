import {
  IPeekMessagesResponse,
  IReceivedMessagesResponse,
  ISendMessageResponse,
} from "./queue";

interface IEnqueueMessage {
  messageId: string;
  messageText: string;
  insertedOn: Date;
  expiresOn: Date;
  popReceipt: string;
  nextVisibleOn: Date;
}

/*
 * Fake Queue Client
 *
 * This is a fake queue client that stores messages in memory.
 * If AZ_STORAGE_ACCOUNT_NAME is not set, this fake queue client is used.
 *
 * Note that there are some behavior mismatches between the fake queue client and the real queue client.
 * 1. FakeQueueClient.ReceiveMessages() dequeues messages from the head of the queue and deletes them directly; whereas
 *    QueueClient.ReceiveMessages() dequeues messages from the head of the queue and hides them for a period of time.
 * */
export class FakeQueueClient {
  private _messages: IEnqueueMessage[] = [];

  public async sendMessage(message: string): Promise<ISendMessageResponse> {
    const messageId = Math.random().toString(36).substring(7);
    const popReceipt = Math.random().toString(36).substring(7);
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const enqueueMessage = {
      messageId,
      messageText: message,
      insertedOn: now,
      expiresOn: oneHourLater,
      popReceipt,
      nextVisibleOn: now,
    };
    this._messages.push(enqueueMessage);
    return { messageId };
  }

  public async peekMessages(): Promise<IPeekMessagesResponse> {
    const message = this._messages[0];
    if (!message) {
      return { peekedMessageItems: [] };
    }
    return {
      peekedMessageItems: [
        {
          messageText: message.messageText,
        },
      ],
    };
  }

  public async receiveMessages(): Promise<IReceivedMessagesResponse> {
    // TODO: implement re-queue logic
    const message = this._messages.shift();
    if (!message) {
      return { receivedMessageItems: [] };
    }
    return {
      receivedMessageItems: [
        {
          messageId: message.messageId,
          insertedOn: message.insertedOn,
          popReceipt: message.popReceipt,
          messageText: message.messageText,
        },
      ],
    };
  }

  public async deleteMessage(
    messageId: string,
    popReceipt: string,
  ): Promise<{}> {
    // TODO: implement data deletion
    return {};
  }
}
