import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, User, Heart, Share2, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { blogs as staticBlogs } from '../data/blogs';
import { preprocessBlogContent, extractHeadings } from '../lib/blogUtils';
import MultiLangCodeBlock from '../components/MultiLangCodeBlock';

interface BlogData {
    id: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    likes: number;
    created_at: string;
    author: {
        full_name: string;
    };
    readTime?: string;
    date?: string;
}

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<BlogData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);

    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [checkedHeadings, setCheckedHeadings] = useState<Record<string, boolean>>({});

    // Notes System State
    const [currentNote, setCurrentNote] = useState('');
    const [notes, setNotes] = useState<{ id: string; content: string; color: string; date: string }[]>([]);
    const [noteColor, setNoteColor] = useState('#fff');

    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

    useEffect(() => {
        fetchBlog();
        const storedIsLiked = localStorage.getItem(`blog_liked_${id}`);
        if (storedIsLiked) setIsLiked(storedIsLiked === 'true');

        // Load checklists and notes
        const storedChecklist = localStorage.getItem(`blog_checklist_${id}`);
        if (storedChecklist) setCheckedHeadings(JSON.parse(storedChecklist));

        const storedNotes = localStorage.getItem(`blog_saved_notes_${id}`);
        if (storedNotes) setNotes(JSON.parse(storedNotes));

        // Load legacy single note if exists and no new notes
        const legacyNote = localStorage.getItem(`blog_notes_${id}`);
        if (legacyNote && !storedNotes) {
            const migratedNote = {
                id: Date.now().toString(),
                content: legacyNote,
                color: '#fff',
                date: new Date().toISOString()
            };
            setNotes([migratedNote]);
            localStorage.setItem(`blog_saved_notes_${id}`, JSON.stringify([migratedNote]));
            localStorage.removeItem(`blog_notes_${id}`); // clear legacy
        }
    }, [id]);

    useEffect(() => {
        if (blog) {
            const extracted = extractHeadings(blog?.content || '');
            setHeadings(extracted);
        }
    }, [blog]);

    const handleCheck = (headingId: string) => {
        const newChecked = { ...checkedHeadings, [headingId]: !checkedHeadings[headingId] };
        setCheckedHeadings(newChecked);
        localStorage.setItem(`blog_checklist_${id}`, JSON.stringify(newChecked));
    };

    const handleSaveNote = () => {
        if (!currentNote.trim()) return;

        const newNote = {
            id: Date.now().toString(),
            content: currentNote,
            color: noteColor,
            date: new Date().toISOString()
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        localStorage.setItem(`blog_saved_notes_${id}`, JSON.stringify(updatedNotes));
        setCurrentNote(''); // Clear input
    };

    const handleDeleteNote = (noteId: string) => {
        const updatedNotes = notes.filter(n => n.id !== noteId);
        setNotes(updatedNotes);
        localStorage.setItem(`blog_saved_notes_${id}`, JSON.stringify(updatedNotes));
    };

    const fetchBlog = async () => {
        try {
            // First check static blogs
            const staticBlog = staticBlogs.find(b => b.id === id);

            if (staticBlog) {
                const storedLikes = localStorage.getItem(`blog_likes_${id}`);
                setBlog({
                    ...staticBlog,
                    likes: storedLikes ? parseInt(storedLikes) : 0,
                    created_at: staticBlog.date,
                    author: { full_name: staticBlog.author },
                    readTime: staticBlog.readTime,
                    date: staticBlog.date,
                    content: preprocessBlogContent(staticBlog.content)
                } as BlogData);
                return;
            }

            // If not found in static blogs, check user blogs
            const userBlogs = JSON.parse(localStorage.getItem('userBlogs') || '[]');
            const userBlog = userBlogs.find((b: any) => b.id === id);

            if (userBlog) {
                const storedLikes = localStorage.getItem(`blog_likes_${id}`);
                setBlog({
                    ...userBlog,
                    likes: storedLikes ? parseInt(storedLikes) : 0,
                    created_at: userBlog.date,
                    author: { full_name: userBlog.author },
                    // userBlog already has readTime and content
                    content: preprocessBlogContent(userBlog.content)
                } as BlogData);
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (!blog) return;

        const newLiked = !isLiked;
        const newLikes = newLiked ? blog.likes + 1 : blog.likes - 1;

        setIsLiked(newLiked);
        setBlog({ ...blog, likes: newLikes });

        // Save to localStorage
        localStorage.setItem(`blog_liked_${id}`, newLiked.toString());
        localStorage.setItem(`blog_likes_${id}`, newLikes.toString());
    };

    const handleShare = async () => {
        const shareData = {
            title: blog?.title || 'Blog Post',
            text: blog?.description || 'Check out this blog post!',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <p className="mt-4 text-gray-600">Loading blog...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-surface flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
                    <Link to="/" className="btn btn-primary text-white">Go Home</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const readTime = blog.readTime || `${Math.ceil(blog.content.length / 1000)} min read`;
    const date = blog.date || new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const completedSections = Object.values(checkedHeadings).filter(Boolean).length;
    const progress = headings.length > 0 ? Math.round((completedSections / headings.length) * 100) : 0;

    return (
        <div className="min-h-screen bg-surface font-sans">
            <Navbar />

            <div className="max-w-[1440px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 relative transition-all duration-300 ease-in-out">

                    {/* Left Sidebar - Table of Contents */}
                    <aside className={`lg:w-1/4 order-2 lg:order-1 transition-all duration-300 ease-in-out ${isLeftSidebarOpen ? 'opacity-100 translate-x-0' : 'hidden lg:block lg:w-0 lg:overflow-hidden lg:opacity-0 lg:-translate-x-10'}`}>
                        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto bg-white p-6 border-2 border-black shadow-brutal rounded-xl min-w-[250px]">
                            <div className="flex justify-between items-center mb-4 border-b-2 border-gray-100 pb-2">
                                <h3 className="text-xl font-bold text-gray-900">Contents</h3>
                                <button
                                    onClick={() => setIsLeftSidebarOpen(false)}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors group"
                                    title="Collapse sidebar"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between text-sm font-bold mb-1">
                                    <span>Progress</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 border border-black">
                                    <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {headings.map((heading) => (
                                    <li key={heading.id} className={`flex items-start gap-3 ${heading.level === 3 ? 'ml-4' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={!!checkedHeadings[heading.id]}
                                            onChange={() => handleCheck(heading.id)}
                                            className="mt-1 w-4 h-4 text-primary bg-gray-100 border-2 border-gray-300 rounded focus:ring-primary"
                                        />
                                        <a href={`#${heading.id}`} className={`text-sm hover:text-primary transition-colors ${checkedHeadings[heading.id] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                            {heading.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Left Toggle Button (Visible when closed) - Minimized Icon */}
                    {!isLeftSidebarOpen && (
                        <button
                            onClick={() => setIsLeftSidebarOpen(true)}
                            className="fixed left-4 bottom-4 lg:sticky lg:top-24 lg:left-auto lg:bottom-auto z-20 p-2 bg-white border-2 border-black shadow-brutal rounded-lg hover:bg-gray-50 transition-all hidden lg:flex items-center justify-center h-10 w-10 group"
                            title="Open Table of Contents"
                        >
                            <Calendar className="w-5 h-5 text-gray-600 group-hover:text-black" />
                        </button>
                    )}

                    {/* Main Content */}
                    <main className={`order-1 lg:order-2 transition-all duration-300 ease-in-out ${isLeftSidebarOpen && isRightSidebarOpen ? 'lg:w-1/2' : (isLeftSidebarOpen || isRightSidebarOpen) ? 'lg:w-3/4' : 'lg:w-[calc(100%-100px)] lg:mx-auto'}`}>
                        <div className="flex justify-between items-center mb-8">
                            <Link to="/blogs" className="inline-flex items-center text-gray-600 hover:text-primary font-bold transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
                            </Link>

                            {/* Mobile Toggles */}
                            <div className="flex lg:hidden gap-2">
                                <button
                                    onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                                    className={`p-2 border-2 border-black rounded-lg ${isLeftSidebarOpen ? 'bg-black text-white' : 'bg-white'}`}
                                >
                                    <Calendar className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                                    className={`p-2 border-2 border-black rounded-lg ${isRightSidebarOpen ? 'bg-black text-white' : 'bg-white'}`}
                                >
                                    <Clock className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <header className="mb-12">
                            <div className="flex gap-2 mb-6 flex-wrap">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="text-xs font-bold text-gray-700 bg-white border border-black px-3 py-1 rounded-md shadow-brutal-sm">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                                {blog.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500 border-b-2 border-gray-100 pb-8">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span className="text-gray-900">{blog.author.full_name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{readTime}</span>
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-img:rounded-xl prose-img:shadow-brutal bg-white p-8 md:p-12 border-2 border-black shadow-brutal rounded-xl mb-8">
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h2: ({ node, ...props }) => {
                                        const id = String(props.children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                                        return <h2 id={id} {...props}>{props.children}</h2>;
                                    },
                                    h3: ({ node, ...props }) => {
                                        const id = String(props.children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                                        return <h3 id={id} {...props}>{props.children}</h3>;
                                    },
                                    code(props: any) {
                                        const { children, className, node, ...rest } = props
                                        const match = /language-(\w+)/.exec(className || '')

                                        if (match && match[1] === 'multilang') {
                                            try {
                                                const blocks = JSON.parse(String(children).trim());
                                                return <MultiLangCodeBlock blocks={blocks} />;
                                            } catch (e) {
                                                console.error('Failed to parse multilang block', e);
                                                return <div className="text-red-500">Error rendering code block</div>;
                                            }
                                        }

                                        return match ? (
                                            <SyntaxHighlighter
                                                {...rest}
                                                PreTag="div"
                                                children={String(children).replace(/\n$/, '')}
                                                language={match[1]}
                                                style={vscDarkPlus}
                                                customStyle={{
                                                    borderRadius: '0.75rem',
                                                    padding: '1.5rem',
                                                    backgroundColor: '#1E1E1E',
                                                    fontSize: '0.9rem',
                                                    border: '2px solid #000',
                                                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
                                                }}
                                            />
                                        ) : (
                                            <code {...props} className="bg-gray-100 text-primary px-1.5 py-0.5 rounded font-bold border border-gray-200">
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {blog.content}
                            </Markdown>
                        </div>

                        <div className="mt-8 flex items-center justify-between bg-white p-6 border-2 border-black shadow-brutal rounded-xl">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all border-2 border-black ${isLiked
                                        ? 'bg-red-500 text-white shadow-brutal-sm hover:shadow-none'
                                        : 'bg-white text-gray-700 shadow-brutal-sm hover:bg-red-50'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                    <span>{blog.likes}</span>
                                </button>
                            </div>

                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold transition-all border-2 border-black shadow-brutal-sm hover:shadow-none"
                            >
                                <Share2 className="w-5 h-5" />
                                <span>Share</span>
                            </button>
                        </div>
                    </main>

                    {/* Right Toggle Button (Visible when closed) - Minimized Icon */}
                    {!isRightSidebarOpen && (
                        <button
                            onClick={() => setIsRightSidebarOpen(true)}
                            className="fixed right-4 bottom-4 lg:sticky lg:top-24 lg:right-auto lg:bottom-auto z-20 p-2 bg-white border-2 border-black shadow-brutal rounded-lg hover:bg-gray-50 transition-all hidden lg:flex items-center justify-center h-10 w-10 group"
                            title="Open Notes"
                        >
                            <Clock className="w-5 h-5 text-gray-600 group-hover:text-black" />
                        </button>
                    )}

                    {/* Right Sidebar - Notes */}
                    <aside className={`lg:w-1/4 order-3 transition-all duration-300 ease-in-out ${isRightSidebarOpen ? 'opacity-100 translate-x-0' : 'hidden lg:block lg:w-0 lg:overflow-hidden lg:opacity-0 lg:translate-x-10'}`}>
                        <div className="sticky top-24 max-h-[calc(100vh-8rem)] bg-white p-6 border-2 border-black shadow-brutal rounded-xl flex flex-col min-w-[250px]">
                            <div className="flex items-center justify-between mb-4 border-b-2 border-gray-100 pb-2">
                                <h3 className="text-xl font-bold text-gray-900">My Notes</h3>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        {['#fff', '#fef3c7', '#dbeafe', '#fce7f3'].map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setNoteColor(color)}
                                                className={`w-4 h-4 rounded-full border border-gray-300 focus:outline-none transition-transform hover:scale-110 ${noteColor === color ? 'ring-2 ring-black scale-110' : ''}`}
                                                style={{ backgroundColor: color }}
                                                title="Select color"
                                            />
                                        ))}
                                    </div>
                                    <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
                                    <button
                                        onClick={() => setIsRightSidebarOpen(false)}
                                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors group"
                                        title="Collapse sidebar"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors rotate-180" />
                                    </button>
                                </div>
                            </div>

                            {/* Note Editor */}
                            <div className="flex-shrink-0 mb-4">
                                <textarea
                                    value={currentNote}
                                    onChange={(e) => setCurrentNote(e.target.value)}
                                    placeholder="Write a new note..."
                                    className="w-full h-32 p-3 border-2 border-gray-200 rounded-lg focus:border-black focus:ring-0 resize-none font-medium text-gray-700 text-sm leading-relaxed mb-2 transition-all"
                                    style={{ backgroundColor: noteColor }}
                                />
                                <button
                                    onClick={handleSaveNote}
                                    disabled={!currentNote.trim()}
                                    className="w-full py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-brutal-sm hover:translate-y-[1px] hover:shadow-none"
                                >
                                    Save Note
                                </button>
                            </div>

                            {/* Saved Notes List */}
                            <div className="flex-1 overflow-y-auto pr-1 -mr-2 space-y-3">
                                {notes.length === 0 ? (
                                    <div className="text-center text-gray-400 py-4 text-sm font-medium">
                                        No saved notes yet.
                                    </div>
                                ) : (
                                    notes.map((note) => (
                                        <div
                                            key={note.id}
                                            className="p-3 rounded-lg border-2 border-gray-200 shadow-sm relative group transition-all hover:border-gray-300"
                                            style={{ backgroundColor: note.color }}
                                        >
                                            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed pr-6">{note.content}</p>
                                            <div className="flex justify-between items-center mt-2 border-t border-black/5 pt-2">
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{new Date(note.date).toLocaleDateString()}</span>
                                                <button
                                                    onClick={() => handleDeleteNote(note.id)}
                                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-white/50 transition-all opacity-0 group-hover:opacity-100"
                                                    title="Delete note"
                                                >
                                                    <div className="w-3 h-3 relative">
                                                        <span className="absolute top-1/2 left-0 w-full h-[2px] bg-current rotate-45 transform -translate-y-1/2"></span>
                                                        <span className="absolute top-1/2 left-0 w-full h-[2px] bg-current -rotate-45 transform -translate-y-1/2"></span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BlogPost;
