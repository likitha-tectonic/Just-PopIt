import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import {
  AppProvider,
  Page,
  Layout,
  Card,
  Button,
  DataTable,
  Badge,
  Text,
  BlockStack,
  InlineStack,
} from "@shopify/polaris";
import polarisTranslations from "@shopify/polaris/locales/en.json";

export const loader = async (_args: LoaderFunctionArgs) => {
  const popups = [
    {
      id: "welcome-discount",
      name: "Welcome Discount - 10% Off",
      description: "First-time visitor email capture",
      type: "Lightbox",
      status: "active",
      impressions_7d: 12453,
      ctr_7d: 8.4,
      conversion_7d: 12.3,
      aov: 87.5,
    },
    {
      id: "exit-intent",
      name: "Exit Intent - Save Your Cart",
      description: "Prevent cart abandonment",
      type: "Modal",
      status: "active",
      impressions_7d: 8721,
      ctr_7d: 5.2,
      conversion_7d: 8.7,
      aov: 124.3,
    },
    {
      id: "free-shipping",
      name: "Free Shipping Announcement",
      description: "Orders over $50",
      type: "Drawer",
      status: "active",
      impressions_7d: 15892,
      ctr_7d: 11.8,
      conversion_7d: 15.4,
      aov: 93.2,
    },
    {
      id: "holiday-sale",
      name: "Holiday Sale - 25% Off",
      description: "Limited time offer",
      type: "Lightbox",
      status: "paused",
      impressions_7d: 9344,
      ctr_7d: 6.9,
      conversion_7d: 10.2,
      aov: 78.9,
    },
  ];

  const recommendations = [
    {
      id: "valentines",
      title: "Valentine's Day Special",
      type: "Lightbox",
      description: "Promote seasonal products with a special discount",
      insight: "Valentine's Day is in 2 weeks - seasonal campaigns perform 40% better",
      impact: "+15% conversion",
    },
    {
      id: "product-quiz",
      title: "Product Recommendation Quiz",
      type: "Modal",
      description: "Help customers find the perfect product",
      insight: "Your bounce rate is 45% - interactive content can reduce it by 20%",
      impact: "+25% engagement",
    },
    {
      id: "loyalty",
      title: "Loyalty Program Sign-up",
      type: "Drawer",
      description: "Convert one-time buyers into repeat customers",
      insight: "68% of your customers are first-time buyers",
      impact: "+30% retention",
    },
  ];

  return { popups, recommendations };
};

export default function PopupsPreview() {
  const { popups, recommendations } = useLoaderData<typeof loader>();

  const rows = popups.map((popup) => [
    <BlockStack gap="100">
      <Text as="p" variant="bodyMd" fontWeight="semibold">
        {popup.name}
      </Text>
      <Text as="p" variant="bodySm" tone="subdued">
        {popup.description}
      </Text>
    </BlockStack>,
    <Badge tone="info">{popup.type}</Badge>,
    <Badge tone={popup.status === "active" ? "success" : "attention"}>
      {popup.status}
    </Badge>,
    popup.impressions_7d || 0,
    `${popup.ctr_7d || 0}%`,
    `${popup.conversion_7d || 0}%`,
    `$${popup.aov || 0}`,
    <Button variant="plain">Edit</Button>,
  ]);

  return (
    <AppProvider i18n={polarisTranslations}>
      <Page
        title="Campaign Dashboard"
        subtitle="Manage your popup campaigns and track performance"
        primaryAction={{
          content: "New Campaign",
          url: "/app/popups/new",
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  Live Campaigns
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  Currently active popups on your store
                </Text>
                <DataTable
                  columnContentTypes={[
                    "text",
                    "text",
                    "text",
                    "numeric",
                    "numeric",
                    "numeric",
                    "numeric",
                    "text",
                  ]}
                  headings={[
                    "Campaign",
                    "Type",
                    "Status",
                    "Impressions",
                    "CTR",
                    "Conversion %",
                    "AOV",
                    "Actions",
                  ]}
                  rows={rows}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  Recommended Campaigns
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  Suggested campaigns based on your store performance
                </Text>
                <BlockStack gap="300">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      style={{
                        padding: "16px 0",
                        borderTop: "1px solid #e1e3e5",
                      }}
                    >
                      <InlineStack align="space-between" blockAlign="center">
                        <BlockStack gap="100">
                          <InlineStack gap="200" blockAlign="center">
                            <Text as="h3" variant="headingSm">
                              {rec.title}
                            </Text>
                            <Badge tone="info">{rec.type}</Badge>
                          </InlineStack>
                          <Text as="p" variant="bodySm" tone="subdued">
                            {rec.description}
                          </Text>
                          <InlineStack gap="200">
                            <Text as="p" variant="bodySm" tone="subdued">
                              Why: {rec.insight}
                            </Text>
                            <Text as="p" variant="bodySm">
                              {rec.impact}
                            </Text>
                          </InlineStack>
                        </BlockStack>
                        <Button variant="plain">Create</Button>
                      </InlineStack>
                    </div>
                  ))}
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}
