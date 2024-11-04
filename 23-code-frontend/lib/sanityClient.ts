import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Set via environment variables
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,      // Set via environment variables
  apiVersion: '2023-10-21', // Update with today's date or the latest version used
  useCdn: true,
});

export default client;
