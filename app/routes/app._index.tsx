import type { LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  // Redirect to popups dashboard
  return redirect('/app/popups');
};

