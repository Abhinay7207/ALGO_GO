import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentItem {
    id: string;
    title: string;
    description: string;
    type: 'blog' | 'course';
    tags: string[];
    image?: string;
}

interface ContentGridProps {
    title: string;
    items: ContentItem[];
}

const ContentGrid: React.FC<ContentGridProps> = ({ title, items }) => {
    const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        // Load like counts from localStorage for all blogs
        const counts: Record<string, number> = {};
        items.forEach(item => {
            const storedLikes = localStorage.getItem(`blog_likes_${item.id}`);
            counts[item.id] = storedLikes ? parseInt(storedLikes) : 0;
        });
        setLikeCounts(counts);
    }, [items]);

    return (
        <section className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">{title}</h2>
                        <div className="h-2 w-24 bg-secondary rounded-full border-2 border-black" />
                    </div>
                    <button className="text-gray-900 font-bold hover:text-primary flex items-center gap-2 transition-colors border-b-2 border-transparent hover:border-primary">
                        View All <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-brutal flex flex-col h-full overflow-hidden group cursor-pointer"
                        >
                            <Link to={`/blogs/${item.id}`} className="flex flex-col h-full">
                                {/* Image Area */}
                                <div className="h-48 bg-accent-blue border-b-2 border-black relative flex items-center justify-center p-6 bg-paper-pattern">
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 font-bold text-xs uppercase tracking-wider border-2 border-black shadow-brutal-sm ${index % 2 === 0 ? 'bg-secondary text-black' : 'bg-primary text-white'
                                            }`}>
                                            Blog
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2 py-1 rounded-md border-2 border-black shadow-brutal-sm">
                                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                                        {likeCounts[item.id] > 0 && (
                                            <span className="text-xs font-bold text-gray-900">{likeCounts[item.id]}</span>
                                        )}
                                    </div>
                                    {/* Placeholder Graph/Icon */}
                                    <BookOpen className="w-16 h-16 text-black opacity-10" />
                                </div>

                                <div className="p-6 flex-1 flex flex-col bg-white">
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-xs font-bold text-gray-700 bg-gray-100 border border-black px-2 py-1 rounded-md">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:underline decoration-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1 font-medium">
                                        {item.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t-2 border-gray-100 text-sm font-bold text-primary">
                                        <div className="flex justify-between items-center w-full">
                                            <span>Read Article</span>
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border-2 border-transparent group-hover:border-black group-hover:bg-secondary transition-all">
                                                <ArrowRight className="w-4 h-4 text-black" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContentGrid;
