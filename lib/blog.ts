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

// Add a diagnostic log to confirm the FINAL path is being sought
console.log('Post Directory Check:', postsDirectory);

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
  console.log('we are at the getPostData');
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

    console.log('now returing from post data');

    // Combine data
    return {
      slug,
      contentHtml,
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
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
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
  return allPostsData.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1,
  );
}
