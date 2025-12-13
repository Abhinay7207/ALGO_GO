import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MultiLanguageCodeProps {
    pythonCode?: string;
    javaCode?: string;
    cppCode?: string;
    defaultLanguage?: 'python' | 'java' | 'cpp';
}

const MultiLanguageCode = ({
    pythonCode,
    javaCode,
    cppCode,
    defaultLanguage = 'python'
}: MultiLanguageCodeProps) => {
    const [activeLanguage, setActiveLanguage] = useState(defaultLanguage);

    const languages = [
        { id: 'python', label: 'Python', code: pythonCode },
        { id: 'java', label: 'Java', code: javaCode },
        { id: 'cpp', label: 'C++', code: cppCode }
    ].filter(lang => lang.code); // Only show tabs for languages that have code

    return (
        <div className="my-6">
            {/* Language Tabs */}
            <div className="flex gap-2 mb-0">
                {languages.map(lang => (
                    <button
                        key={lang.id}
                        onClick={() => setActiveLanguage(lang.id as any)}
                        className={`
                            px-4 py-2 font-bold text-sm transition-all border-2 border-black
                            ${activeLanguage === lang.id
                                ? 'bg-primary text-white shadow-brutal-sm translate-y-0'
                                : 'bg-white text-gray-700 hover:bg-gray-50 translate-y-[2px]'
                            }
                            ${lang.id === languages[0].id ? 'rounded-tl-lg' : ''}
                            ${lang.id === languages[languages.length - 1].id ? 'rounded-tr-lg' : ''}
                            border-b-0
                        `}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>

            {/* Code Display */}
            <div className="relative">
                {languages.map(lang => (
                    <div
                        key={lang.id}
                        className={activeLanguage === lang.id ? 'block' : 'hidden'}
                    >
                        <SyntaxHighlighter
                            language={lang.id === 'cpp' ? 'cpp' : lang.id}
                            style={vscDarkPlus}
                            customStyle={{
                                borderRadius: '0 0.75rem 0.75rem 0.75rem',
                                padding: '1.5rem',
                                backgroundColor: '#1E1E1E',
                                fontSize: '0.9rem',
                                border: '2px solid #000',
                                boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                                margin: 0
                            }}
                            PreTag="div"
                        >
                            {String(lang.code).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiLanguageCode;
