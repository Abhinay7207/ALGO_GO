import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
    const footerLinks = {
        'AlgoGo': [
            { name: 'About Us', href: '/about' },
            { name: 'Contact Us', href: '/contact' },
            { name: 'Careers', href: '/careers' },
            { name: 'Reviews', href: '/reviews' },
        ],
        'Learn': [
            { name: 'Blogs', href: '/blogs' },
            { name: 'System Design', href: '/system-design' },
            { name: 'Interview Prep', href: '/interview' },
        ],
        'Community': [
            { name: 'Discord', href: '#' },
            { name: 'Telegram', href: '#' },
            { name: 'Linkedin', href: '#' },
            { name: 'Youtube', href: '#' },
        ],
        'Legal': [
            { name: 'Terms', href: '/terms' },
            { name: 'Privacy', href: '/privacy' },
            { name: 'Refund', href: '/refund' },
        ]
    };

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-bold text-gray-900 mb-4">{category}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-500 hover:text-primary transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} AlgoGo. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-gray-400 hover:text-[#0077b5] transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-[#1877f2] transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="https://x.com/AbhinayTiw17775" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><Github className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
