import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import { ensureMerchantSpreadsheet } from "../services/merchantConfig.server";
import { getGoogleSheetsService } from "../services/googleSheets.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const spreadsheetId = await ensureMerchantSpreadsheet(session.shop);

  const url = new URL(request.url);
  const popupId = url.searchParams.get("popup_id") || undefined;

  const sheets = getGoogleSheetsService();
  await sheets.connect(spreadsheetId);
  const triggers = await sheets.getDisplayTriggers(popupId);

  return Response.json({ triggers });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const spreadsheetId = await ensureMerchantSpreadsheet(session.shop);

  const sheets = getGoogleSheetsService();
  await sheets.connect(spreadsheetId);

  const contentType = request.headers.get("content-type") || "";
  let payload: Record<string, unknown> = {};

  if (contentType.includes("application/json")) {
    payload = await request.json();
  } else {
    const formData = await request.formData();
    payload = Object.fromEntries(formData.entries());
  }

  const triggerId = await sheets.createDisplayTrigger(payload);

  return Response.json({ triggerId });
};
