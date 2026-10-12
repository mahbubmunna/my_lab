// lib/blog.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug'; // Used to assign IDs to headings
import { visit } from 'unist-util-visit'; // Used for traversing the AST
import { toString } from 'hast-util-to-string'; // Used to extract text from AST nodes

// Get the base directory path. process.cwd() is generally the project root.
const postsDirectory = path.join(process.cwd(), 'lib/posts');

// New: Interface for extracted heading data
export interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft?: boolean; // hidden from lists, RSS and static paths
  canonical?: string; // set only if the original lives elsewhere
  readingMinutes?: number;
  contentHtml?: string;
  headings?: Heading[]; // NEW: Field to store ToC data
}

/**
 * Custom remark plugin to extract headings and their IDs from the HTML AST.
 * This runs after remarkRehype (MD -> HTML AST) and rehypeSlug (Add IDs).
 */
function remarkCollectHeadings(headings: Heading[]) {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      // Only process h2 and h3 elements for the ToC
      if (node.tagName === 'h2' || node.tagName === 'h3') {
        const level = parseInt(node.tagName.substring(1));
        const text = toString(node);
        // The ID is now guaranteed to exist because rehypeSlug ran first
        const id = node.properties.id;

        if (id) {
          headings.push({ level, text, id });
        }
      }
    });
  };
}

/**
 * Gets the full data (frontmatter + HTML content + Headings) for a single post by slug.
 */
export async function getPostData(rawSlug: string): Promise<PostData> {
  const slug = rawSlug.replace(/\.md$/, '');

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const headings: Heading[] = []; // Array to store extracted headings

    const processedContent = await remark()
      .use(remarkRehype)
      .use(rehypeSlug) // Adds 'id' attributes to headings
      .use(remarkCollectHeadings, headings) // Collects heading data
      .use(rehypePrism, { showLineNumbers: true })
      .use(rehypeStringify)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    // Combine data
    const words = matterResult.content.split(/\s+/).filter(Boolean).length;

    return {
      slug,
      contentHtml,
      readingMinutes: Math.max(1, Math.round(words / 230)),
      headings, // Include extracted headings in the return
      ...(matterResult.data as Omit<
        PostData,
        'slug' | 'contentHtml' | 'headings'
      >),
    } as PostData;
  } catch (e) {
    // 4. If the read fails, log the path and throw a clearer error
    console.error(`--- FILE NOT FOUND ERROR ---`);
    console.error(`Attempted Path: ${fullPath}`);
    console.error(`Error Detail:`, (e as Error).message);
    throw new Error(`Failed to find or read Markdown file: ${slug}`);
  }
}

// ... (getAllPostSlugs and getSortedPostsData remain unchanged)
export function getAllPostSlugs(): { slug: string }[] {
  return getSortedPostsData().map(({ slug }) => ({ slug }));
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      ...(matterResult.data as Omit<PostData, 'slug'>),
    } as PostData;
  });
  return allPostsData
    .filter((post) => !post.draft)
    .sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1,
  );
}
