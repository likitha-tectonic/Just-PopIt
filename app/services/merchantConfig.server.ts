import prisma from "../db.server";
import { getGoogleSheetsService } from "./googleSheets.server";

export async function ensureMerchantSpreadsheet(shop: string): Promise<string> {
  const existing = await prisma.merchantConfig.findUnique({
    where: { shop },
  });

  if (existing) {
    return existing.spreadsheetId;
  }

  const sheets = getGoogleSheetsService();
  const spreadsheetId = await sheets.createSpreadsheet(shop);

  await prisma.merchantConfig.create({
    data: {
      shop,
      spreadsheetId,
    },
  });

  return spreadsheetId;
}
