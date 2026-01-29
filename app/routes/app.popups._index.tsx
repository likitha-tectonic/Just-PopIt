import type { LoaderFunctionArgs } from 'react-router';

import { useLoaderData, Link } from 'react-router';
import {
    Page,
    Layout,
    Card,
    EmptyState,
    Button,
    DataTable,
    Badge,
    Text,
    BlockStack,
    InlineStack,
} from '@shopify/polaris';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { session } = await authenticate.admin(request);

    // TODO: Fetch popups from Google Sheets
    // For now, return empty array
    const popups: any[] = [];

    return {
        popups,
        shop: session.shop,
    };
};

export default function PopupsDashboard() {
    const { popups } = useLoaderData<typeof loader>();

    const rows = popups.map((popup) => [
        popup.name,
        <Badge tone={popup.status === 'active' ? 'success' : 'info'}>
            {popup.status}
        </Badge>,
        popup.type,
        popup.impressions_7d || 0,
        `${popup.ctr_7d || 0}%`,
        new Date(popup.updated_at).toLocaleDateString(),
    ]);

    return (
        <Page
            title="Pop-ups"
            primaryAction={{
                content: 'Create Pop-up',
                url: '/app/popups/new',
            }}
        >
            <Layout>
                <Layout.Section>
                    {popups.length === 0 ? (
                        <Card>
                            <EmptyState
                                heading="Create your first pop-up"
                                action={{
                                    content: 'Create Pop-up',
                                    url: '/app/popups/new',
                                }}
                                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                            >
                                <p>
                                    Start engaging your customers with targeted pop-ups. Choose from
                                    pre-built templates or create your own custom pop-up.
                                </p>
                            </EmptyState>
                        </Card>
                    ) : (
                        <Card>
                            <BlockStack gap="400">
                                <Text as="h2" variant="headingMd">
                                    All Pop-ups
                                </Text>
                                <DataTable
                                    columnContentTypes={[
                                        'text',
                                        'text',
                                        'text',
                                        'numeric',
                                        'numeric',
                                        'text',
                                    ]}
                                    headings={[
                                        'Name',
                                        'Status',
                                        'Type',
                                        'Impressions (7d)',
                                        'CTR (7d)',
                                        'Last Modified',
                                    ]}
                                    rows={rows}
                                />
                            </BlockStack>
                        </Card>
                    )}
                </Layout.Section>

                <Layout.Section variant="oneThird">
                    <BlockStack gap="400">
                        <Card>
                            <BlockStack gap="200">
                                <Text as="h3" variant="headingMd">
                                    Quick Stats
                                </Text>
                                <InlineStack gap="400">
                                    <BlockStack gap="100">
                                        <Text as="p" variant="bodyMd" tone="subdued">
                                            Active Pop-ups
                                        </Text>
                                        <Text as="p" variant="headingLg">
                                            {popups.filter((p) => p.status === 'active').length}
                                        </Text>
                                    </BlockStack>
                                    <BlockStack gap="100">
                                        <Text as="p" variant="bodyMd" tone="subdued">
                                            Total Impressions
                                        </Text>
                                        <Text as="p" variant="headingLg">
                                            0
                                        </Text>
                                    </BlockStack>
                                </InlineStack>
                            </BlockStack>
                        </Card>

                        <Card>
                            <BlockStack gap="200">
                                <Text as="h3" variant="headingMd">
                                    Getting Started
                                </Text>
                                <BlockStack gap="300">
                                    <Text as="p" variant="bodyMd">
                                        1. Create your first pop-up using a template
                                    </Text>
                                    <Text as="p" variant="bodyMd">
                                        2. Configure triggers and dismissal conditions
                                    </Text>
                                    <Text as="p" variant="bodyMd">
                                        3. Activate and test on your storefront
                                    </Text>
                                    <Button url="/app/popups/new" variant="primary">
                                        Get Started
                                    </Button>
                                </BlockStack>
                            </BlockStack>
                        </Card>
                    </BlockStack>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
