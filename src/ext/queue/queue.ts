export interface ICommonResponse {
  errorCode?: string;
}

export interface ISendMessageResponse extends ICommonResponse {
  messageId: string;
}

export interface IPeekedMessageItem {
  messageText: string;
}

export interface IPeekMessagesResponse extends ICommonResponse {
  peekedMessageItems: IPeekedMessageItem[];
}

export interface IReceivedMessageItem {
  messageId: string;
  insertedOn: Date;
  popReceipt: string;
  messageText: string;
}

export interface IReceivedMessagesResponse extends ICommonResponse {
  receivedMessageItems: IReceivedMessageItem[];
}

export interface IQueueClient {
  sendMessage: (message: string) => Promise<ISendMessageResponse>;
  peekMessages: () => Promise<IPeekMessagesResponse>;
  receiveMessages: () => Promise<IReceivedMessagesResponse>;
  deleteMessage: (messageId: string, popReceipt: string) => Promise<{}>;
}
