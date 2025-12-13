import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Hero from '../components/Hero';
import ContentGrid from '../components/ContentGrid';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { blogs as staticBlogs } from '../data/blogs';

interface Blog {
    id: string;
    title: string;
    description: string;
    tags: string[];
    type: 'blog' | 'course';
}

const Home = () => {
    const [dynamicBlogs, setDynamicBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('id, title, description, tags')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formattedBlogs: Blog[] = (data || []).map(blog => ({
                id: blog.id,
                title: blog.title,
                description: blog.description || '',
                tags: blog.tags || [],
                type: 'blog' as const,
            }));

            setDynamicBlogs(formattedBlogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    // Merge static blogs with dynamic blogs from Supabase
    const allBlogs = [...staticBlogs, ...dynamicBlogs];

    const filteredBlogs = allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-8 mt-8 relative z-10">
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Search specific topics, blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-0 focus:border-primary transition-colors w-full shadow-brutal"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center">
                    <p className="text-gray-600">Loading blogs...</p>
                </div>
            ) : (
                <ContentGrid title={searchQuery ? "Search Results" : "Latest Blogs"} items={filteredBlogs} />
            )}
            <section className="bg-primary/5 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to start writing?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join our community of content creators and share your knowledge with thousands of developers.
                    </p>
                    <button className="btn btn-primary text-lg px-10 py-3 shadow-lg hover:-translate-y-1 transform transition-all">
                        Get Started for Free
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
