
export interface CodeBlock {
    language: string;
    code: string;
}

export function preprocessBlogContent(content: string): string {
    const multiLangRegex = /<!-- MULTILANG_START -->([\s\S]*?)<!-- MULTILANG_END -->/g;

    return content.replace(multiLangRegex, (match, blockContent) => {
        const parts = blockContent.split('<!-- LANG_DIVIDER -->');
        const codeBlocks: CodeBlock[] = [];

        parts.forEach((part: string) => {
            // Match markdown code blocks: ```language ... ```
            const codeMatch = part.match(/```(\w+)\s*([\s\S]*?)```/);
            if (codeMatch) {
                codeBlocks.push({
                    language: codeMatch[1],
                    code: codeMatch[2].trim() // Keep trimmed code
                });
            }
        });

        if (codeBlocks.length === 0) return match;

        // Serialize to JSON and wrap in a special code block
        const json = JSON.stringify(codeBlocks);
        return `\`\`\`multilang\n${json}\n\`\`\``;
    });
}
