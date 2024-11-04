// /lib/fetchSnippets.ts

import sanityClient from './sanityClient';

export interface CodeSnippet {
  usage: string;
  slug: string;
  _id: string;
  title: string;
  code: string;
  description: string;
  language: string;
  imageUrl?: string;
  usageInstructions?: string;
}

export async function fetchSnippets(): Promise<CodeSnippet[]> {
  const query = `*[_type == "codeSnippet"] {
    _id,
    title,
    code,
    description,
    language,
    "imageUrl": screenshot.asset->url,
    usageInstructions
  }`;

  const snippets: CodeSnippet[] = await sanityClient.fetch(query);
  return snippets;
}

export const fetchSnippetById = async (id: string): Promise<CodeSnippet | null> => {
  const query = `*[_type == "codeSnippet" && _id == $id] {
    _id,
    title,
    code,
    description,
    language,
    "imageUrl": screenshot.asset->url,
    usageInstructions
  }[0]`; // Use [0] to get a single object instead of an array

  try {
    const snippet: CodeSnippet | null = await sanityClient.fetch(query, { id });
    return snippet;
  } catch (error) {
    console.error("Error fetching snippet by ID:", error);
    return null;
  }
};



