import signatureValidator from "../../ext/line/validator";

export async function POST(request: Request): Promise<Response> {
  if (
    !signatureValidator(
      await request.text(),
      request.headers.get("x-line-signature") || "",
    )
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  return new Response("Hello worker!", { status: 200 });
}
