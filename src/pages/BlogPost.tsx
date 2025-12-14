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
import { preprocessBlogContent } from '../lib/blogUtils';
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

    useEffect(() => {
        fetchBlog();
        const storedIsLiked = localStorage.getItem(`blog_liked_${id}`);
        if (storedIsLiked) setIsLiked(storedIsLiked === 'true');
    }, [id]);

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

    return (
        <div className="min-h-screen bg-surface font-sans">
            <Navbar />

            <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <Link to="/blogs" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 font-bold transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
                </Link>

                <header className="mb-12">
                    <div className="flex gap-2 mb-6">
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

                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-img:rounded-xl prose-img:shadow-brutal bg-white p-8 md:p-12 border-2 border-black shadow-brutal rounded-xl">
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
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
            </article>

            <Footer />
        </div>
    );
};

export default BlogPost;
