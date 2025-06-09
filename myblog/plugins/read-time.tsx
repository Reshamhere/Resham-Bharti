export const calculateReadTime = (content: any[] | string): string => {
  let text = '';
  
  if (Array.isArray(content)) {
    // Handle Portable Text
    text = content
      .filter((block) => block._type === 'block')
      .map((block) => block.children.map((child: any) => child.text).join(' '))
      .join(' ');
  } else if (typeof content === 'string') {
    // Handle Markdown
    text = content;
  }
  
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200)); // At least 1 minute
  return `${minutes} min read`;
};