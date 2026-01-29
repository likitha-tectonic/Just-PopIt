import React, { useCallback, useMemo, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import {
  Page,
  Layout,
  Card,
  Tabs,
  Button,
  Text,
  Badge,
  DataTable,
  InlineStack,
  BlockStack,
  InlineGrid,
  Box,
  Divider,
  TextField,
  Select,
  Banner,
  Modal,
  ChoiceList,
  Tooltip,
  EmptyState,
  AppProvider,
} from "@shopify/polaris";
import { PlusIcon, EditIcon, ViewIcon } from "@shopify/polaris-icons";
import polarisTranslations from "@shopify/polaris/locales/en.json";
import type { LinksFunction } from "react-router";
import styles from "../styles/app.dashboard.css?url";
import { authenticate } from "../shopify.server";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return {};
};

type PopStatus = "active" | "paused" | "draft";
type PopType = "Lightbox" | "Modal" | "Drawer" | "Bar";

type PopRow = {
  id: string;
  name: string;
  description?: string;
  type: PopType;
  status: PopStatus;
  impressions?: number;
  ctr?: number;
  conversion?: number;
  aov?: number;
  rulesSummary: string;
  updatedAt: string;
};

const statusBadge = (status: PopStatus) => {
  switch (status) {
    case "active":
      return <Badge tone="success">Active</Badge>;
    case "paused":
      return <Badge tone="warning">Paused</Badge>;
    case "draft":
      return <Badge tone="info">Draft</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const formatNumber = (n?: number) => {
  if (n === undefined || n === null) return "—";
  return n.toLocaleString();
};

const formatPercent = (p?: number) => {
  if (p === undefined || p === null) return "—";
  return `${p.toFixed(1)}%`;
};

const formatCurrency = (n?: number) => {
  if (n === undefined || n === null) return "—";
  return `$${n.toFixed(1)}`;
};

export function DashboardView() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewPop, setPreviewPop] = useState<PopRow | null>(null);
  const [draftName, setDraftName] = useState("New Popup Draft");
  const [draftType, setDraftType] = useState<PopType>("Modal");
  const [draftStatus, setDraftStatus] = useState<PopStatus>("draft");
  const [draftTitle, setDraftTitle] = useState("Welcome Discount");
  const [draftBody, setDraftBody] = useState("Get 10% off your first order.");
  const [draftCtaText, setDraftCtaText] = useState("Shop now");
  const [draftCtaUrl, setDraftCtaUrl] = useState("/collections/all");
  const [triggerType, setTriggerType] = useState<"time" | "scroll" | "exit">("time");
  const [triggerValue, setTriggerValue] = useState("5");
  const [pageTargeting, setPageTargeting] = useState<string[]>(["Any"]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("last_30");
  const [searchQuery, setSearchQuery] = useState("");

  const pops: PopRow[] = useMemo(
    () => [
      {
        id: "p_001",
        name: "Welcome Discount - 10% Off",
        description: "First-time visitor email capture",
        type: "Lightbox",
        status: "active",
        impressions: 12453,
        ctr: 8.4,
        conversion: 12.3,
        aov: 87.5,
        rulesSummary: "New visitors • After 5s • Any page • 1/session",
        updatedAt: "2026-01-29",
      },
      {
        id: "p_002",
        name: "Exit Intent - Save Your Cart",
        description: "Prevent cart abandonment",
        type: "Modal",
        status: "active",
        impressions: 8721,
        ctr: 5.2,
        conversion: 8.7,
        aov: 124.3,
        rulesSummary: "Exit intent • Cart + PDP • 1/day",
        updatedAt: "2026-01-28",
      },
      {
        id: "p_003",
        name: "Free Shipping Announcement",
        description: "Orders over $50",
        type: "Drawer",
        status: "active",
        impressions: 15892,
        ctr: 11.8,
        conversion: 15.4,
        aov: 93.2,
        rulesSummary: "After 2s • Any page • Returning visitors",
        updatedAt: "2026-01-27",
      },
      {
        id: "p_004",
        name: "Holiday Sale - 25% Off",
        description: "Limited time offer",
        type: "Lightbox",
        status: "paused",
        impressions: 9004,
        ctr: 6.9,
        conversion: 10.2,
        aov: 78.9,
        rulesSummary: "UTM=meta • After 10s • Home only",
        updatedAt: "2026-01-25",
      },
    ],
    []
  );

  const tabs = useMemo(
    () => [
      { id: "my-pops", content: "My Pops", panelID: "my-pops-panel" },
      { id: "analytics", content: "Analytics", panelID: "analytics-panel" },
      { id: "studio", content: "My Pop-Up Studio", panelID: "studio-panel" },
    ],
    []
  );

  const openPreview = useCallback((pop: PopRow) => {
    setPreviewPop(pop);
    setPreviewOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
    setPreviewPop(null);
  }, []);

  const handleTabChange = useCallback((selected: number) => setSelectedTab(selected), []);

  const popRowsForTable = useMemo(() => {
    return pops.map((p) => [
      <BlockStack gap="050" key={`name-${p.id}`}>
        <Text as="p" variant="bodyMd" fontWeight="semibold">
          {p.name}
        </Text>
        <Text as="p" variant="bodySm" tone="subdued">
          {p.description ?? ""}
        </Text>
        <Text as="p" variant="bodySm" tone="subdued">
          <span className="jp-ruleSummary">{p.rulesSummary}</span>
        </Text>
      </BlockStack>,
      <Badge key={`type-${p.id}`}>{p.type}</Badge>,
      <span key={`status-${p.id}`}>{statusBadge(p.status)}</span>,
      <Text as="span" key={`impr-${p.id}`} variant="bodyMd">
        {formatNumber(p.impressions)}
      </Text>,
      <Text as="span" key={`ctr-${p.id}`} variant="bodyMd">
        {formatPercent(p.ctr)}
      </Text>,
      <Text as="span" key={`conv-${p.id}`} variant="bodyMd">
        {formatPercent(p.conversion)}
      </Text>,
      <Text as="span" key={`aov-${p.id}`} variant="bodyMd">
        {formatCurrency(p.aov)}
      </Text>,
      <InlineStack key={`actions-${p.id}`} gap="200" align="end">
        <Tooltip content="Preview">
          <Button
            icon={ViewIcon}
            variant="tertiary"
            onClick={() => openPreview(p)}
            accessibilityLabel={`Preview ${p.name}`}
          />
        </Tooltip>
        <Tooltip content="Edit">
          <Button
            icon={EditIcon}
            variant="tertiary"
            onClick={() => setSelectedTab(2)}
            accessibilityLabel={`Edit ${p.name}`}
          />
        </Tooltip>
      </InlineStack>,
    ]);
  }, [pops, openPreview]);

  const myPopsPanel = (
    <Layout>
      <Layout.Section>
        <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="300">
          {[
            { label: "Impressions", value: "46,410", delta: "+12%" },
            { label: "CTR", value: "8.4%", delta: "+1.6%" },
            { label: "Conversion", value: "12.3%", delta: "+2.1%" },
            { label: "AOV", value: "$97.2", delta: "+4.2%" },
          ].map((stat) => (
            <Card key={stat.label}>
              <BlockStack gap="100">
                <Text as="p" variant="bodySm" tone="subdued">
                  {stat.label}
                </Text>
                <Text as="p" variant="headingLg">
                  {stat.value}
                </Text>
                <Text as="p" variant="bodySm" tone="success">
                  {stat.delta} vs last 30d
                </Text>
              </BlockStack>
            </Card>
          ))}
        </InlineGrid>
      </Layout.Section>

      <Layout.Section>
        <Card>
          <BlockStack gap="300">
            <InlineStack align="space-between" blockAlign="center" gap="400">
              <BlockStack gap="100">
                <Text as="h2" variant="headingMd">
                  Live Campaigns
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  Currently active popups on your store (data fetched from Google Sheets)
                </Text>
              </BlockStack>

              <InlineStack gap="200">
                <Button variant="secondary">Export</Button>
                <Button icon={PlusIcon} variant="primary" onClick={() => setSelectedTab(2)}>
                  New Campaign
                </Button>
              </InlineStack>
            </InlineStack>

            <Divider />

            <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="300">
              <TextField
                label="Search"
                value={searchQuery}
                onChange={setSearchQuery}
                autoComplete="off"
                placeholder="Search campaigns"
              />
              <Select
                label="Status"
                options={[
                  { label: "All", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Paused", value: "paused" },
                  { label: "Draft", value: "draft" },
                ]}
                value={statusFilter}
                onChange={setStatusFilter}
              />
              <Select
                label="Type"
                options={[
                  { label: "All", value: "all" },
                  { label: "Lightbox", value: "Lightbox" },
                  { label: "Modal", value: "Modal" },
                  { label: "Drawer", value: "Drawer" },
                  { label: "Bar", value: "Bar" },
                ]}
                value={typeFilter}
                onChange={setTypeFilter}
              />
              <Select
                label="Date range"
                options={[
                  { label: "Last 7 days", value: "last_7" },
                  { label: "Last 30 days", value: "last_30" },
                  { label: "Last 90 days", value: "last_90" },
                ]}
                value={dateFilter}
                onChange={setDateFilter}
              />
            </InlineGrid>
          </BlockStack>
        </Card>
      </Layout.Section>

      <Layout.Section>
        <Card>
          <Box padding="400">
            <DataTable
              columnContentTypes={["text", "text", "text", "numeric", "numeric", "numeric", "numeric", "text"]}
              headings={["Campaign", "Type", "Status", "Impressions", "CTR", "Conversion %", "AOV", "Actions"]}
              rows={popRowsForTable}
              stickyHeader
            />
          </Box>
        </Card>
      </Layout.Section>

      <Layout.Section>
        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Recommended Campaigns
            </Text>
            <Text as="p" variant="bodySm" tone="subdued">
              Suggestions will appear once you enable event tracking. For MVP, keep this as static placeholders.
            </Text>

            <Divider />

            <InlineStack align="space-between" blockAlign="center">
              <BlockStack gap="050">
                <InlineStack gap="200" blockAlign="center">
                  <Text as="p" variant="bodyMd" fontWeight="semibold">
                    Valentine's Day Special
                  </Text>
                  <Badge>Lightbox</Badge>
                </InlineStack>
                <Text as="p" variant="bodySm" tone="subdued">
                  Promote seasonal products with a special discount
                </Text>
              </BlockStack>
              <Button variant="tertiary" onClick={() => setSelectedTab(2)}>
                Create -&gt;
              </Button>
            </InlineStack>

            <Divider />

            <InlineStack align="space-between" blockAlign="center">
              <BlockStack gap="050">
                <InlineStack gap="200" blockAlign="center">
                  <Text as="p" variant="bodyMd" fontWeight="semibold">
                    Product Recommendation Quiz
                  </Text>
                  <Badge>Modal</Badge>
                </InlineStack>
                <Text as="p" variant="bodySm" tone="subdued">
                  Help customers find the perfect product
                </Text>
              </BlockStack>
              <Button variant="tertiary" onClick={() => setSelectedTab(2)}>
                Create -&gt;
              </Button>
            </InlineStack>
          </BlockStack>
        </Card>
      </Layout.Section>
    </Layout>
  );

  const analyticsPanel = (
    <Layout>
      <Layout.Section>
        <Card>
          <EmptyState
            heading="Analytics will appear here"
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>
              You haven't connected event tracking yet. When you start sending events, you'll see impressions to clicks
              to conversions by popup and page type.
            </p>
            <div style={{ marginTop: 12 }}>
              <Button onClick={() => setSelectedTab(2)}>Create a popup first</Button>
            </div>
          </EmptyState>
        </Card>
      </Layout.Section>

      <Layout.Section>
        <Banner tone="info" title="MVP analytics plan">
          <p>
            Start with 3 events: <b>impression</b>, <b>cta_click</b>, <b>form_submit</b>. Store them in Sheets for now if
            you must, but move to DB soon.
          </p>
        </Banner>
      </Layout.Section>
    </Layout>
  );

  const studioPanel = (
    <Layout>
      <Layout.Section>
        <Card>
          <Box padding="400">
            <InlineStack align="space-between" blockAlign="center" gap="400">
              <BlockStack gap="100">
                <Text as="h2" variant="headingMd">
                  Pop-Up Studio
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  Create drafts, preview safely, then publish (syncs to Google Sheets).
                </Text>
              </BlockStack>

              <InlineStack gap="200">
                <Button
                  variant="secondary"
                  onClick={() =>
                    openPreview({
                      id: "draft_preview",
                      name: draftName,
                      description: "Draft preview",
                      type: draftType,
                      status: "draft",
                      rulesSummary: `${triggerType.toUpperCase()}=${triggerValue} • Pages=${pageTargeting.join(", ")}`,
                      updatedAt: new Date().toISOString().slice(0, 10),
                    })
                  }
                >
                  Preview
                </Button>
                <Button variant="primary">Save draft</Button>
              </InlineStack>
            </InlineStack>
          </Box>

          <Divider />

          <Box padding="400">
            <Layout>
              <Layout.Section variant="oneThird">
                <Card>
                  <BlockStack gap="300">
                    <Text as="h3" variant="headingSm">
                      Drafts and Live
                    </Text>

                    <div className="jp-miniList">
                      {pops.map((p) => (
                        <button
                          key={p.id}
                          className="jp-miniListItem"
                          onClick={() => {
                            setDraftName(p.name);
                            setDraftType(p.type);
                            setDraftStatus(p.status === "draft" ? "draft" : "draft");
                            setDraftTitle(p.name);
                            setDraftBody(p.description ?? "");
                          }}
                          type="button"
                        >
                          <div className="jp-miniListItemTop">
                            <span className="jp-miniListItemName">{p.name}</span>
                            <span className="jp-miniListItemBadge">{p.status}</span>
                          </div>
                          <div className="jp-miniListItemSub">{p.rulesSummary}</div>
                        </button>
                      ))}
                    </div>

                    <Divider />

                    <Button variant="primary" icon={PlusIcon}>
                      New draft
                    </Button>
                  </BlockStack>
                </Card>
              </Layout.Section>

              <Layout.Section>
                <Card>
                  <BlockStack gap="400">
                    <Text as="h3" variant="headingSm">
                      Content
                    </Text>

                    <TextField label="Draft name" value={draftName} onChange={setDraftName} autoComplete="off" />
                    <Select
                      label="Popup type"
                      options={[
                        { label: "Modal", value: "Modal" },
                        { label: "Lightbox", value: "Lightbox" },
                        { label: "Drawer", value: "Drawer" },
                        { label: "Bar", value: "Bar" },
                      ]}
                      value={draftType}
                      onChange={(v) => setDraftType(v as PopType)}
                    />

                    <TextField label="Title" value={draftTitle} onChange={setDraftTitle} autoComplete="off" />
                    <TextField
                      label="Body"
                      value={draftBody}
                      onChange={setDraftBody}
                      autoComplete="off"
                      multiline={3}
                    />

                    <Divider />

                    <Text as="h3" variant="headingSm">
                      CTA
                    </Text>

                    <TextField label="Button text" value={draftCtaText} onChange={setDraftCtaText} autoComplete="off" />
                    <TextField label="Button URL" value={draftCtaUrl} onChange={setDraftCtaUrl} autoComplete="off" />

                    <Divider />

                    <Text as="h3" variant="headingSm">
                      Rules (MVP)
                    </Text>

                    <Select
                      label="Trigger"
                      options={[
                        { label: "Time after load", value: "time" },
                        { label: "Scroll depth", value: "scroll" },
                        { label: "Exit intent (desktop)", value: "exit" },
                      ]}
                      value={triggerType}
                      onChange={(v) => setTriggerType(v as "time" | "scroll" | "exit")}
                    />

                    <TextField
                      label={triggerType === "time" ? "Seconds" : triggerType === "scroll" ? "Scroll %" : "Sensitivity"}
                      value={triggerValue}
                      onChange={setTriggerValue}
                      autoComplete="off"
                    />

                    <ChoiceList
                      title="Show on pages"
                      choices={[
                        { label: "Any", value: "Any" },
                        { label: "Home", value: "Home" },
                        { label: "Product (PDP)", value: "Product" },
                        { label: "Collection (PLP)", value: "Collection" },
                        { label: "Cart", value: "Cart" },
                      ]}
                      selected={pageTargeting}
                      onChange={setPageTargeting}
                      allowMultiple
                    />

                    <Divider />

                    <InlineStack align="space-between">
                      <InlineStack gap="200">
                        <Badge tone="info">Draft</Badge>
                        <Text as="p" variant="bodySm" tone="subdued">
                          Save draft - Preview - Publish
                        </Text>
                      </InlineStack>

                      <InlineStack gap="200">
                        <Button variant="secondary">Publish</Button>
                      </InlineStack>
                    </InlineStack>
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>
          </Box>
        </Card>
      </Layout.Section>
    </Layout>
  );

  return (
    <AppProvider i18n={polarisTranslations}>
      <Page title="Campaign Dashboard" subtitle="Manage your popup campaigns and track performance">
        <div className="jp-shell">
          <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
            <div className="jp-tabPanel">
              {selectedTab === 0 && myPopsPanel}
              {selectedTab === 1 && analyticsPanel}
              {selectedTab === 2 && studioPanel}
            </div>
          </Tabs>
        </div>

        <Modal
          open={previewOpen}
          onClose={closePreview}
          title={previewPop ? `Preview: ${previewPop.name}` : "Preview"}
          primaryAction={{
            content: "Close preview",
            onAction: closePreview,
          }}
          secondaryActions={[
            {
              content: "Go to Studio",
              onAction: () => {
                closePreview();
                setSelectedTab(2);
              },
            },
          ]}
        >
          <Modal.Section>
            <BlockStack gap="300">
              <Text as="p" variant="bodySm" tone="subdued">
                This is a safe preview overlay. It won't affect live shoppers.
              </Text>

              <div className="jp-previewFrame">
                <div className="jp-previewCanvas">
                  <div className="jp-popupMock">
                    <div className="jp-popupHeader">
                      <Text as="p" variant="headingSm">
                        {draftTitle}
                      </Text>
                      <Button variant="tertiary" size="micro" onClick={closePreview}>
                        ✕
                      </Button>
                    </div>

                    <Text as="p" tone="subdued">
                      {draftBody}
                    </Text>

                    <div className="jp-popupCtaRow">
                      <Button variant="primary" onClick={() => window.open(draftCtaUrl, "_blank")}>
                        {draftCtaText}
                      </Button>
                      <Badge>{draftType}</Badge>
                    </div>

                    <Text as="p" variant="bodySm" tone="subdued">
                      Rules: {triggerType}={triggerValue} • Pages: {pageTargeting.join(", ")}
                    </Text>
                  </div>
                </div>
              </div>
            </BlockStack>
          </Modal.Section>
        </Modal>
      </Page>
    </AppProvider>
  );
}

export default function JustPopItDashboard() {
  return <DashboardView />;
}
