import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Markdown from 'react-markdown';
import { Send, Eye, Loader2 } from 'lucide-react';
import remarkGfm from 'remark-gfm';

const WriteBlog = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showLangModal, setShowLangModal] = useState(false);
    const [selectedLang, setSelectedLang] = useState('python');

    const handlePublish = async () => {
        if (!user) {
            setError('You must be logged in to publish');
            return;
        }

        if (!title.trim() || !content.trim()) {
            setError('Title and content are required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);

            // Mock blog storage in localStorage
            const existingBlogs = JSON.parse(localStorage.getItem('userBlogs') || '[]');
            const newBlog = {
                id: Math.random().toString(36).substr(2, 9),
                title: title.trim(),
                description: description.trim() || title.trim().substring(0, 150),
                content: content.trim(),
                tags: tagsArray,
                author: user?.fullName || 'Anonymous',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
            };

            existingBlogs.push(newBlog);
            localStorage.setItem('userBlogs', JSON.stringify(existingBlogs));

            alert('Blog published successfully! (Saved locally)');
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Failed to publish blog');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-surface">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Write Your Blog</h1>
                    <p className="text-gray-600">Share your knowledge with the community</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Editor */}
                    <div className="bg-white border-2 border-black shadow-brutal rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4">Editor</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter blog title..."
                                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Short description (optional)"
                                    rows={2}
                                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="react, javascript, tutorial"
                                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Content * (Markdown supported)
                                </label>

                                {/* Markdown Toolbar */}
                                <div className="border-2 border-black rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-2">
                                    {/* Formatting Buttons */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const textarea = document.getElementById('contentArea') as HTMLTextAreaElement;
                                            const start = textarea.selectionStart;
                                            const end = textarea.selectionEnd;
                                            const selected = content.substring(start, end);
                                            const newText = content.substring(0, start) + `**${selected || 'bold text'}**` + content.substring(end);
                                            setContent(newText);
                                            setTimeout(() => textarea.focus(), 0);
                                        }}
                                        className="px-3 py-1 bg-white border-2 border-black rounded hover:bg-gray-100 font-bold text-sm"
                                        title="Bold"
                                    >
                                        B
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const textarea = document.getElementById('contentArea') as HTMLTextAreaElement;
                                            const start = textarea.selectionStart;
                                            const end = textarea.selectionEnd;
                                            const selected = content.substring(start, end);
                                            const newText = content.substring(0, start) + `*${selected || 'italic text'}*` + content.substring(end);
                                            setContent(newText);
                                            setTimeout(() => textarea.focus(), 0);
                                        }}
                                        className="px-3 py-1 bg-white border-2 border-black rounded hover:bg-gray-100 italic text-sm"
                                        title="Italic"
                                    >
                                        I
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const textarea = document.getElementById('contentArea') as HTMLTextAreaElement;
                                            const start = textarea.selectionStart;
                                            const selected = content.substring(start, textarea.selectionEnd);
                                            const newText = content.substring(0, start) + `## ${selected || 'Heading'}` + content.substring(textarea.selectionEnd);
                                            setContent(newText);
                                            setTimeout(() => textarea.focus(), 0);
                                        }}
                                        className="px-3 py-1 bg-white border-2 border-black rounded hover:bg-gray-100 font-bold text-sm"
                                        title="Heading"
                                    >
                                        H
                                    </button>

                                    <div className="w-px bg-black"></div>

                                    {/* Image Upload */}
                                    <label className="px-3 py-1 bg-white border-2 border-black rounded hover:bg-gray-100 cursor-pointer text-sm font-medium flex items-center gap-1" title="Insert Image">
                                        📸 Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (event) => {
                                                        const imageData = event.target?.result as string;
                                                        const textarea = document.getElementById('contentArea') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const newText = content.substring(0, start) + `\n![Image](${imageData})\n` + content.substring(start);
                                                        setContent(newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>

                                    {/* Code Block */}
                                    <button
                                        type="button"
                                        onClick={() => setShowLangModal(true)}
                                        className="px-3 py-1 bg-white border-2 border-black rounded hover:bg-gray-100 text-sm font-medium"
                                        title="Code Block"
                                    >
                                        💻 Code
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const textarea = document.getElementById('contentArea') as HTMLTextAreaElement;
                                            const start = textarea.selectionStart;
                                            const newText = content.substring(0, start) + `\n- Item 1\n- Item 2\n- Item 3\n` + content.substring(start);
                                            setContent(newText);
                                            setTimeout(() => textarea.focus(), 0);
                                        }}
                                        className="px-3 py-1 bg-white border-2 border-black rounded hover:bg-gray-100 text-sm font-medium"
                                        title="List"
                                    >
                                        📝 List
                                    </button>
                                </div>

                                <textarea
                                    id="contentArea"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your blog content here using Markdown..."
                                    rows={15}
                                    className="w-full px-4 py-2 border-2 border-black rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-white border-2 border-black shadow-brutal rounded-xl p-6 lg:sticky lg:top-6 self-start">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Preview</h2>
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="p-2 border-2 border-black rounded-lg hover:bg-gray-50"
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                        </div>

                        {showPreview || true ? (
                            <div className="prose prose-sm max-w-none">
                                <h1 className="text-2xl font-bold mb-2">{title || 'Your Title'}</h1>
                                {description && <p className="text-gray-600 mb-4">{description}</p>}
                                <div className="flex gap-2 mb-4">
                                    {tags.split(',').filter(Boolean).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-bold bg-gray-100 px-2 py-1 rounded border border-black"
                                        >
                                            #{tag.trim()}
                                        </span>
                                    ))}
                                </div>
                                <Markdown remarkPlugins={[remarkGfm]}>
                                    {content || '*Your content will appear here...*'}
                                </Markdown>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">Click the eye icon to preview</p>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="mt-6 bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-white text-gray-700 font-bold rounded-lg border-2 border-black shadow-brutal-sm hover:shadow-none transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePublish}
                        disabled={loading}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-lg border-2 border-black shadow-brutal hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Publish Blog
                            </>
                        )}
                    </button>
                </div>

                {/* Language Selector Modal */}
                {showLangModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLangModal(false)}>
                        <div className="bg-white border-2 border-black rounded-xl shadow-brutal p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-bold mb-4">Select Programming Language</h3>
                            <div className="grid grid-cols-3 gap-2 mb-6">
                                {['python', 'javascript', 'typescript', 'java', 'cpp', 'csharp', 'go', 'rust', 'php', 'ruby', 'swift', 'kotlin'].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setSelectedLang(lang)}
                                        className={`px-4 py-2 rounded-lg border-2 border-black font-medium transition-all ${selectedLang === lang
                                                ? 'bg-primary text-white shadow-brutal-sm'
                                                : 'bg-white hover:bg-gray-50'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowLangModal(false)}
                                    className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        const textarea = document.getElementById('contentArea') as HTMLTextAreaElement;
                                        const start = textarea.selectionStart;
                                        const codeBlock = `\n\`\`\`${selectedLang}\n// Your code here\n\`\`\`\n`;
                                        const newText = content.substring(0, start) + codeBlock + content.substring(start);
                                        setContent(newText);
                                        setShowLangModal(false);
                                        setTimeout(() => textarea.focus(), 0);
                                    }}
                                    className="px-4 py-2 bg-primary text-white border-2 border-black rounded-lg font-bold shadow-brutal-sm hover:shadow-none"
                                >
                                    Insert Code Block
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WriteBlog;
