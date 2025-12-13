import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContentGrid from '../components/ContentGrid';
import { blogs } from '../data/blogs';

const categories = ['All', 'Self Help', 'DSA', 'Web Dev', 'AI'];

const getCategoryTags = (category: string) => {
    switch (category) {
        case 'Self Help':
            return ['Life', 'Career', 'Soft Skills', 'Self Improvement'];
        case 'DSA':
            return ['DSA', 'Algorithms', 'Data Structures'];
        case 'Web Dev':
            return ['Web', 'React', 'Frontend', 'Backend', 'CSS', 'JavaScript', 'TypeScript'];
        case 'AI':
            return ['AI', 'ML', 'Machine Learning', 'Deep Learning'];
        default:
            return [];
    }
};

const AllBlogs = () => {
    const [searchParams] = useSearchParams();
    const topicsParam = searchParams.get('topics');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredBlogs = useMemo(() => {
        let result = blogs;

        // Filter by Category Tabs
        if (selectedCategory !== 'All') {
            const categoryTags = getCategoryTags(selectedCategory);
            result = result.filter(blog =>
                blog.tags.some(tag => categoryTags.some(catTag => tag.includes(catTag)))
            );
        }

        // Filter by Topic (URL param)
        if (topicsParam) {
            const topicTags = topicsParam.split(',').map(t => t.trim());
            result = result.filter(blog =>
                blog.tags.some(tag => topicTags.includes(tag))
            );
        }

        // Filter by Search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(blog =>
                blog.title.toLowerCase().includes(query) ||
                blog.description.toLowerCase().includes(query) ||
                blog.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return result;
    }, [topicsParam, searchQuery, selectedCategory]);

    const title = topicsParam
        ? `Blogs: ${topicsParam.split(',')[0]}`
        : 'All Blogs';

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-20">
                {topicsParam && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                        <Link to="/topics" className="inline-flex items-center text-gray-600 hover:text-primary font-bold transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Topics
                        </Link>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-6">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${selectedCategory === category
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-0 focus:border-primary transition-colors w-full"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                </div>

                <ContentGrid title={selectedCategory === 'All' ? title : `${selectedCategory} Blogs`} items={filteredBlogs} />
            </div>
            <Footer />
        </div>
    );
};

export default AllBlogs;
