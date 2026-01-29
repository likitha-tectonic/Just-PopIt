import type { LoaderFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import { ensureMerchantSpreadsheet } from "../services/merchantConfig.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const spreadsheetId = await ensureMerchantSpreadsheet(session.shop);

  return Response.json({ spreadsheetId });
};
