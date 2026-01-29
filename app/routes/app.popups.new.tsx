import type { LoaderFunctionArgs } from 'react-router';

import { useLoaderData } from 'react-router';
import {
    Page,
    Layout,
    Card,
    BlockStack,
    InlineGrid,
    Text,
    Button,
} from '@shopify/polaris';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { session } = await authenticate.admin(request);

    // TODO: Fetch templates from Google Sheets
    const templates = [
        {
            template_id: 'banner_template',
            name: 'Banner Display Pop-up',
            description: 'Full-width promotional banner for announcements and free shipping alerts',
            category: 'promotion',
            layout_type: 'banner',
        },
        {
            template_id: 'email_capture_template',
            name: 'Email Capture Form',
            description: 'Classic email opt-in pop-up with discount incentive',
            category: 'email_capture',
            layout_type: 'modal',
        },
        {
            template_id: 'gamification_wheel_template',
            name: 'Spin-to-Win Wheel',
            description: 'Interactive spinning wheel for discount reveals',
            category: 'gamification',
            layout_type: 'modal',
        },
    ];

    return {
        templates,
        shop: session.shop,
    };
};

export default function NewPopup() {
    const { templates } = useLoaderData<typeof loader>();

    return (
        <Page
            title="Create Pop-up"
            backAction={{ url: '/app/popups' }}
        >
            <Layout>
                <Layout.Section>
                    <BlockStack gap="500">
                        <Card>
                            <BlockStack gap="400">
                                <Text as="h2" variant="headingLg">
                                    Choose a Template
                                </Text>
                                <Text as="p" variant="bodyMd" tone="subdued">
                                    Start with a pre-built template and customize it to match your brand
                                </Text>
                            </BlockStack>
                        </Card>

                        <InlineGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
                            {templates.map((template) => (
                                <Card key={template.template_id}>
                                    <BlockStack gap="400">
                                        <div
                                            style={{
                                                height: '200px',
                                                backgroundColor: '#f6f6f7',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text as="p" variant="bodyMd" tone="subdued">
                                                {template.layout_type === 'banner' ? '📢' : template.layout_type === 'modal' ? '📋' : '🎡'}
                                            </Text>
                                        </div>
                                        <BlockStack gap="200">
                                            <Text as="h3" variant="headingMd">
                                                {template.name}
                                            </Text>
                                            <Text as="p" variant="bodyMd" tone="subdued">
                                                {template.description}
                                            </Text>
                                        </BlockStack>
                                        <Button
                                            variant="primary"
                                            url={`/app/popups/new/${template.template_id}`}
                                        >
                                            Use Template
                                        </Button>
                                    </BlockStack>
                                </Card>
                            ))}
                        </InlineGrid>

                        <Card>
                            <BlockStack gap="400">
                                <Text as="h3" variant="headingMd">
                                    Start from Scratch
                                </Text>
                                <Text as="p" variant="bodyMd" tone="subdued">
                                    Create a custom pop-up with full control over design and functionality
                                </Text>
                                <div>
                                    <Button url="/app/popups/new/custom">
                                        Create Custom Pop-up
                                    </Button>
                                </div>
                            </BlockStack>
                        </Card>
                    </BlockStack>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
