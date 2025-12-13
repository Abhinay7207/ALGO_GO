import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, PenSquare, LogIn, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const navLinks = [
        { name: 'Topics', href: '/topics' },
        { name: 'Roadmap', href: '/roadmap' },
        { name: 'Blogs', href: '/blogs' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900 tracking-tight">
                                AlgoGo
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-900 hover:text-primary transition-colors font-medium text-base"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center gap-2 focus:outline-none"
                                >
                                    {user.profilePicture ? (
                                        <img
                                            src={user.profilePicture}
                                            alt={user.fullName}
                                            className="w-10 h-10 rounded-full border-2 border-black object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full border-2 border-black bg-primary flex items-center justify-center text-white font-bold text-sm">
                                            {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </div>
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-black rounded-lg shadow-brutal-sm overflow-hidden z-50">
                                        <div className="px-4 py-3 border-b-2 border-black bg-gray-50">
                                            <p className="text-sm font-bold text-gray-900">{user.fullName}</p>
                                            <p className="text-xs text-gray-600">{user.email}</p>
                                        </div>
                                        <Link
                                            to="/write"
                                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <PenSquare className="w-4 h-4" />
                                            Write Blog
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <User className="w-4 h-4" />
                                            Profile Settings
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpen(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 transition-colors text-red-600 font-medium"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg border-2 border-black shadow-brutal-sm hover:shadow-none transition-all"
                            >
                                <LogIn className="w-4 h-4" />
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-900 hover:text-primary p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-100 bg-white"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user ? (
                                <>
                                    <Link
                                        to="/write"
                                        className="block w-full text-center mt-4 bg-secondary text-black font-bold py-3 rounded-lg border-2 border-black"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <PenSquare className="w-4 h-4 inline mr-2" />
                                        Write Blog
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-center bg-white text-gray-700 font-bold py-3 rounded-lg border-2 border-black"
                                    >
                                        <LogOut className="w-4 h-4 inline mr-2" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block w-full text-center mt-4 bg-primary text-white font-bold py-3 rounded-lg border-2 border-black"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LogIn className="w-4 h-4 inline mr-2" />
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
