import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

interface CodeBlock {
    language: string;
    code: string;
}

interface MultiLangCodeBlockProps {
    blocks: CodeBlock[];
}

const MultiLangCodeBlock = ({ blocks }: MultiLangCodeBlockProps) => {
    const [activeLang, setActiveLang] = useState(blocks[0]?.language || '');
    const [copied, setCopied] = useState(false);

    const activeBlock = blocks.find(b => b.language === activeLang) || blocks[0];

    const copyToClipboard = async () => {
        if (!activeBlock) return;
        try {
            await navigator.clipboard.writeText(activeBlock.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    // Map common language identifiers to display names
    const getDisplayName = (lang: string) => {
        const map: Record<string, string> = {
            'cpp': 'C++',
            'python': 'Python',
            'java': 'Java',
            'js': 'JavaScript',
            'ts': 'TypeScript',
            'go': 'Go',
            'c': 'C',
            'cs': 'C#'
        };
        return map[lang.toLowerCase()] || lang.toUpperCase();
    };

    return (
        <div className="my-6 rounded-xl overflow-hidden border-2 border-black shadow-brutal bg-[#1E1E1E]">
            {/* Tab Header */}
            <div className="flex items-center bg-[#2D2D2D] border-b border-[#404040] overflow-x-auto scroolbar-hide">
                {blocks.map((block) => (
                    <button
                        key={block.language}
                        onClick={() => setActiveLang(block.language)}
                        className={`
                            px-4 py-3 text-sm font-bold transition-colors whitespace-nowrap
                            ${activeLang === block.language
                                ? 'bg-[#1E1E1E] text-white border-t-2 border-primary'
                                : 'text-gray-400 hover:text-white hover:bg-[#363636]'}
                        `}
                    >
                        {getDisplayName(block.language)}
                    </button>
                ))}

                <div className="flex-1"></div>

                <button
                    onClick={copyToClipboard}
                    className="p-2 mr-2 text-gray-400 hover:text-white transition-colors"
                    title="Copy code"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            {/* Code Content */}
            <div className="relative">
                <SyntaxHighlighter
                    language={activeBlock.language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.9rem',
                    }}
                    wrapLines={true}
                >
                    {activeBlock.code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default MultiLangCodeBlock;
