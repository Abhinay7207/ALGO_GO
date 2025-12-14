import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { Edit, Trash2, Calendar, Clock, Tag, BookOpen } from 'lucide-react';

interface UserBlog {
    id: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    author: string;
    date: string;
    readTime: string;
}

const MyBlogs = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<UserBlog[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Load user's blogs from localStorage
        const userBlogs = JSON.parse(localStorage.getItem('userBlogs') || '[]');
        setBlogs(userBlogs);
    }, [user, navigate]);

    const handleEdit = (blogId: string) => {
        navigate(`/write?edit=${blogId}`);
    };

    const handleDeleteClick = (blogId: string) => {
        setBlogToDelete(blogId);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (blogToDelete) {
            const updatedBlogs = blogs.filter(blog => blog.id !== blogToDelete);
            localStorage.setItem('userBlogs', JSON.stringify(updatedBlogs));
            setBlogs(updatedBlogs);
            setShowDeleteModal(false);
            setBlogToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setBlogToDelete(null);
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-surface">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Blogs</h1>
                    <p className="text-gray-600">Manage and edit your published blog posts</p>
                </div>

                {blogs.length === 0 ? (
                    <div className="bg-white border-2 border-black shadow-brutal rounded-xl p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gray-100 rounded-full border-2 border-black mx-auto mb-6 flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No blogs yet</h3>
                            <p className="text-gray-600 mb-6">Start sharing your knowledge with the community!</p>
                            <button
                                onClick={() => navigate('/write')}
                                className="px-6 py-3 bg-primary text-white font-bold rounded-lg border-2 border-black shadow-brutal hover:shadow-none transition-all"
                            >
                                Write Your First Blog
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white border-2 border-black shadow-brutal rounded-xl p-6 hover:shadow-brutal-lg transition-all"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {blog.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {blog.tags.slice(0, 3).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center gap-1 text-xs font-bold bg-gray-100 px-2 py-1 rounded border border-black"
                                        >
                                            <Tag className="w-3 h-3" />
                                            {tag}
                                        </span>
                                    ))}
                                    {blog.tags.length > 3 && (
                                        <span className="text-xs font-bold text-gray-500">
                                            +{blog.tags.length - 3} more
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {blog.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {blog.readTime}
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate(`/blogs/${blog.id}`)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-900 font-bold rounded-lg border-2 border-black shadow-brutal-sm hover:shadow-none transition-all hover:bg-gray-50"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Read
                                    </button>
                                    <button
                                        onClick={() => handleEdit(blog.id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg border-2 border-black shadow-brutal-sm hover:shadow-none transition-all"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(blog.id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-600 font-bold rounded-lg border-2 border-black shadow-brutal-sm hover:shadow-none transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white border-2 border-black rounded-xl shadow-brutal p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-2">Delete Blog?</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this blog? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={cancelDelete}
                                className="flex-1 px-4 py-2 bg-white border-2 border-black rounded-lg font-bold hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2 bg-red-600 text-white border-2 border-black rounded-lg font-bold shadow-brutal-sm hover:shadow-none transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBlogs;
