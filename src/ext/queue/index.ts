import * as env from "../../config/env";
import { FakeQueueClient } from "@/ext/queue/fake";
import { QueueClient } from "@azure/storage-queue";
import { DefaultAzureCredential } from "@azure/identity";
import { IQueueClient } from "@/ext/queue/queue";

export function getQueueClient(): IQueueClient {
  // use fake queue client
  if (!env.AZ_STORAGE_ACCOUNT_NAME) {
    return new FakeQueueClient();
  }
  return new QueueClient(
    `https://${env.AZ_STORAGE_ACCOUNT_NAME}.queue.core.windows.net/${env.AZ_STORAGE_QUEUE_NAME}`,
    new DefaultAzureCredential(),
  );
}

// export the queue client singleton.
export default getQueueClient();
