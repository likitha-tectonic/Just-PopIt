import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  BlockStack,
  InlineStack,
  Tabs,
  Text,
  TextField,
  Select,
  ChoiceList,
  Button,
  InlineGrid,
  Badge,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

const TEMPLATE_LIBRARY: Record<string, { name: string; description: string; type: string }> = {
  banner_template: {
    name: "Banner Display Pop-up",
    description: "Full-width promotional banner for announcements and free shipping alerts",
    type: "banner",
  },
  email_capture_template: {
    name: "Email Capture Form",
    description: "Classic email opt-in pop-up with discount incentive",
    type: "modal",
  },
  gamification_wheel_template: {
    name: "Spin-to-Win Wheel",
    description: "Interactive spinning wheel for discount reveals",
    type: "modal",
  },
  custom: {
    name: "Custom Pop-up",
    description: "Start from scratch with full control",
    type: "custom",
  },
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  const templateId = params.templateId || "custom";
  const template = TEMPLATE_LIBRARY[templateId] || TEMPLATE_LIBRARY.custom;

  return { templateId, template };
};

export default function NewPopupFromTemplate() {
  const { templateId, template } = useLoaderData<typeof loader>();
  const [selectedTab, setSelectedTab] = useState(0);
  const [name, setName] = useState(template.name);
  const [headline, setHeadline] = useState("Get 10% Off Your First Order");
  const [subtext, setSubtext] = useState("Join our list for exclusive deals.");
  const [ctaText, setCtaText] = useState("Shop Now");
  const [ctaLink, setCtaLink] = useState("/collections/all");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#111827");
  const [position, setPosition] = useState("center");
  const [displayTrigger, setDisplayTrigger] = useState("page_load_delay");
  const [dismissalTrigger, setDismissalTrigger] = useState("close_button");
  const [displayValue, setDisplayValue] = useState("3");

  const tabs = [
    { id: "content", content: "Content", panelID: "content-panel" },
    { id: "triggers", content: "Triggers", panelID: "triggers-panel" },
    { id: "design", content: "Design", panelID: "design-panel" },
    { id: "preview", content: "Preview", panelID: "preview-panel" },
  ];

  return (
    <Page
      title="Create Pop-up"
      subtitle={template.description}
      backAction={{ url: "/app/popups/new" }}
      primaryAction={{ content: "Publish" }}
      secondaryActions={[{ content: "Save Draft" }]}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <BlockStack gap="100">
                  <Text as="h2" variant="headingMd">
                    {name}
                  </Text>
                  <InlineStack gap="200">
                    <Badge tone="info">{template.type}</Badge>
                    <Badge>{templateId}</Badge>
                  </InlineStack>
                </BlockStack>
                <Button variant="plain">Duplicate</Button>
              </InlineStack>

              <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
                <div style={{ paddingTop: "16px" }}>
                  {selectedTab === 0 && (
                    <BlockStack gap="400">
                      <TextField label="Pop-up name" value={name} onChange={setName} autoComplete="off" />
                      <TextField label="Headline" value={headline} onChange={setHeadline} autoComplete="off" />
                      <TextField label="Subtext" value={subtext} onChange={setSubtext} multiline />
                      <InlineGrid columns={{ xs: 1, sm: 2 }} gap="400">
                        <TextField label="CTA text" value={ctaText} onChange={setCtaText} autoComplete="off" />
                        <TextField label="CTA link" value={ctaLink} onChange={setCtaLink} autoComplete="off" />
                      </InlineGrid>
                    </BlockStack>
                  )}

                  {selectedTab === 1 && (
                    <BlockStack gap="500">
                      <Card>
                        <BlockStack gap="300">
                          <Text as="h3" variant="headingMd">
                            Display Triggers
                          </Text>
                          <Select
                            label="Trigger type"
                            options={[
                              { label: "Page load delay", value: "page_load_delay" },
                              { label: "Exit intent", value: "exit_intent" },
                              { label: "Scroll depth", value: "scroll_depth" },
                            ]}
                            value={displayTrigger}
                            onChange={setDisplayTrigger}
                          />
                          <TextField label="Value" value={displayValue} onChange={setDisplayValue} autoComplete="off" />
                        </BlockStack>
                      </Card>
                      <Card>
                        <BlockStack gap="300">
                          <Text as="h3" variant="headingMd">
                            Dismissal Triggers
                          </Text>
                          <ChoiceList
                            title="Allow dismissal by"
                            choices={[
                              { label: "Close button", value: "close_button" },
                              { label: "Outside click", value: "outside_click" },
                              { label: "Time auto-dismiss", value: "auto_dismiss" },
                            ]}
                            selected={[dismissalTrigger]}
                            onChange={(value) => setDismissalTrigger(value[0])}
                          />
                        </BlockStack>
                      </Card>
                    </BlockStack>
                  )}

                  {selectedTab === 2 && (
                    <BlockStack gap="400">
                      <InlineGrid columns={{ xs: 1, sm: 2 }} gap="400">
                        <TextField label="Background color" value={backgroundColor} onChange={setBackgroundColor} autoComplete="off" />
                        <TextField label="Text color" value={textColor} onChange={setTextColor} autoComplete="off" />
                      </InlineGrid>
                      <Select
                        label="Position"
                        options={[
                          { label: "Center", value: "center" },
                          { label: "Top", value: "top" },
                          { label: "Bottom", value: "bottom" },
                          { label: "Bottom right", value: "bottom_right" },
                        ]}
                        value={position}
                        onChange={setPosition}
                      />
                    </BlockStack>
                  )}

                  {selectedTab === 3 && (
                    <BlockStack gap="400">
                      <Card>
                        <BlockStack gap="300">
                          <Text as="h3" variant="headingMd">
                            Preview
                          </Text>
                          <div
                            style={{
                              borderRadius: "16px",
                              padding: "24px",
                              background: backgroundColor,
                              color: textColor,
                              border: "1px solid #E5E7EB",
                            }}
                          >
                            <Text as="h2" variant="headingLg">
                              {headline}
                            </Text>
                            <Text as="p" variant="bodyMd" tone="subdued">
                              {subtext}
                            </Text>
                            <div style={{ marginTop: "16px" }}>
                              <Button variant="primary">{ctaText}</Button>
                            </div>
                          </div>
                          <InlineStack align="space-between">
                            <Text as="p" variant="bodySm" tone="subdued">
                              Position: {position.replace("_", " ")}
                            </Text>
                            <Text as="p" variant="bodySm" tone="subdued">
                              Trigger: {displayTrigger.replace(/_/g, " ")}
                            </Text>
                          </InlineStack>
                        </BlockStack>
                      </Card>
                    </BlockStack>
                  )}
                </div>
              </Tabs>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="200">
                <Text as="h3" variant="headingMd">
                  Status
                </Text>
                <InlineStack align="space-between">
                  <Text as="p" variant="bodyMd">
                    Draft
                  </Text>
                  <Badge tone="info">Not published</Badge>
                </InlineStack>
                <Button variant="primary">Publish</Button>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text as="h3" variant="headingMd">
                  Checklist
                </Text>
                <Text as="p" variant="bodyMd">
                  Add content, set triggers, and preview before publishing.
                </Text>
                <InlineStack gap="200">
                  <Badge tone="success">Content</Badge>
                  <Badge tone="attention">Triggers</Badge>
                  <Badge tone="attention">Design</Badge>
                </InlineStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
