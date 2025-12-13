import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Code, Database, Server, Layers, Palette, Lightbulb, Brain } from 'lucide-react';

const topics = [
    {
        name: 'Self Improvement',
        fullName: 'Self Improvement',
        description: 'Soft skills, communication, and personal growth for developers',
        icon: Brain,
        color: 'bg-pink-500',
        tags: ['Self Improvement', 'Soft Skills', 'Communication', 'Productivity']
    },
    {
        name: 'DSA',
        fullName: 'Data Structures & Algorithms',
        description: 'Master algorithms, data structures, and problem-solving techniques',
        icon: Code,
        color: 'bg-blue-500',
        tags: ['DSA', 'Algorithms', 'Dynamic Programming', 'Graph Theory', 'Sorting']
    },
    {
        name: 'System Design',
        fullName: 'System Design & Architecture',
        description: 'Learn to design scalable, distributed systems',
        icon: Layers,
        color: 'bg-purple-500',
        tags: ['System Design', 'Scalability', 'Distributed Systems']
    },
    {
        name: 'DBMS',
        fullName: 'Database Management',
        description: 'Database design, SQL optimization, and performance tuning',
        icon: Database,
        color: 'bg-green-500',
        tags: ['SQL', 'Databases', 'DBMS', 'Performance']
    },
    {
        name: 'DevOps',
        fullName: 'DevOps & Cloud',
        description: 'Microservices, containerization, and cloud architecture',
        icon: Server,
        color: 'bg-orange-500',
        tags: ['Microservices', 'DevOps', 'Backend', 'Architecture']
    },
    {
        name: 'Frontend',
        fullName: 'Frontend Development',
        description: 'React, modern web frameworks, and UI architecture',
        icon: Palette,
        color: 'bg-indigo-500',
        tags: ['React', 'Frontend', 'Architecture']
    },
    {
        name: 'Best Practices',
        fullName: 'Clean Code & Best Practices',
        description: 'Software engineering principles and design patterns',
        icon: Lightbulb,
        color: 'bg-yellow-500',
        tags: ['Clean Code', 'Best Practices', 'SOLID', 'Software Engineering']
    }
];

export default function Topics() {
    const navigate = useNavigate();

    const handleTopicClick = (topicTags: string[]) => {
        const tagsParam = topicTags.join(',');
        navigate(`/blogs?topics=${encodeURIComponent(tagsParam)}`);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-20 pt-32">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 text-gray-900">
                        Explore Topics
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Browse our curated collection of technical content organized by topic
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((topic) => {
                        const IconComponent = topic.icon;
                        return (
                            <div
                                key={topic.name}
                                onClick={() => handleTopicClick(topic.tags)}
                                className="cursor-pointer bg-white rounded-xl p-6 border-2 border-black shadow-brutal hover:shadow-none transition-all"
                            >
                                <div className={`w-14 h-14 rounded-xl ${topic.color} flex items-center justify-center mb-4`}>
                                    <IconComponent className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {topic.fullName}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4">
                                    {topic.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {topic.tags.slice(0, 3).map(tag => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {topic.tags.length > 3 && (
                                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                            +{topic.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </div>
    );
}
