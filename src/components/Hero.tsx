import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-white pt-20 pb-16">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-left"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Plan It, Share It,<br />
                            Get It Done—<br />
                            Together!
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 max-w-lg">
                            Organize, collaborate, and stay on top of things with a productivity app that's built for teams and individuals alike.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/login"
                                className="group px-6 py-3 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition-all flex items-center justify-center gap-2 w-fit"
                            >
                                Get the app - for free!
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/blogs"
                                className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-md border-2 border-gray-300 hover:border-gray-400 transition-all flex items-center justify-center gap-2 w-fit"
                            >
                                Explore Features
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Visual - Isometric Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <img
                            src="/hero-illustration.png"
                            alt="Isometric illustration of people collaborating"
                            className="w-full h-auto"
                        />
                    </motion.div>
                </div>

                {/* Stats Section */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-12">
                    <div>
                        <div className="text-4xl font-bold text-gray-900">10,000+</div>
                        <div className="text-sm text-gray-600 font-medium mt-1">Tasks Completed Daily</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-gray-900">20+</div>
                        <div className="text-sm text-gray-600 font-medium mt-1">Integrations</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-gray-900">99%</div>
                        <div className="text-sm text-gray-600 font-medium mt-1">User Satisfaction</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
