import { motion } from 'framer-motion';
import { Code2, BrainCircuit, Server, Database, ArrowLeft, Smartphone, Blocks, Shield, Gamepad2, BarChart, PenTool, Users, Cloud, TestTube, Network, Cpu, Glasses, Activity, FileText, Megaphone, Wifi, Box, MonitorPlay, FileCode, CheckSquare, Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Roadmap = () => {
    const roadmaps: { id?: string; title: string; description: string; icon: any; color: string; delay: number; items: string[] }[] = [
        {
            id: 'web-development',
            title: 'Web Development',
            description: 'Master frontend and backend technologies to build modern web applications.',
            icon: Code2,
            color: 'bg-blue-500',
            delay: 0.1,
            items: ['HTML/CSS/JS', 'React/Next.js', 'Node.js', 'Databases', 'DevOps Basics']
        },
        {
            id: 'ml-engineer',
            title: 'ML Engineer',
            description: 'Learn to build, train, and deploy machine learning models.',
            icon: BrainCircuit,
            color: 'bg-purple-500',
            delay: 0.2,
            items: ['Python/Math', 'Data Analysis', 'ML Algorithms', 'Deep Learning', 'ML Ops']
        },

        {
            id: 'devops',
            title: 'DevOps',
            description: 'Bridge the gap between development and operations.',
            icon: Server,
            color: 'bg-orange-500',
            delay: 0.3,
            items: ['Linux', 'Docker', 'AWS', 'K8s', 'Terraform']
        },
        {
            id: 'data-engineer',
            title: 'Data Engineer',
            description: 'Design systems for collecting and analyzing data.',
            icon: Database,
            color: 'bg-green-500',
            delay: 0.4,
            items: ['SQL', 'Spark', 'Kafka', 'Airflow', 'Cloud Data']
        },
        {
            id: 'mobile-dev',
            title: 'Mobile App Dev',
            description: 'Build native iOS and Android applications.',
            icon: Smartphone,
            color: 'bg-teal-500',
            delay: 0.5,
            items: ['React Native', 'Navigation', 'Native Features', 'App Store', 'Expo']
        },
        {
            id: 'blockchain',
            title: 'Blockchain',
            description: 'Build decentralized applications and smart contracts.',
            icon: Blocks,
            color: 'bg-yellow-500',
            delay: 0.6,
            items: ['Solidity', 'Smart Contracts', 'Web3.js', 'Security', 'Hardhat']
        },
        {
            id: 'cybersecurity',
            title: 'Cybersecurity',
            description: 'Protect systems and networks from digital attacks.',
            icon: Shield,
            color: 'bg-red-600',
            delay: 0.7,
            items: ['Networking', 'Ethical Hacking', 'Linux', 'Python', 'SIEM']
        },
        {
            id: 'game-dev',
            title: 'Game Developer',
            description: 'Create interactive experiences using engines.',
            icon: Gamepad2,
            color: 'bg-indigo-500',
            delay: 0.8,
            items: ['C++', 'Unity/Unreal', 'Linear Algebra', 'Physics', 'Shaders']
        },
        {
            id: 'data-science',
            title: 'Data Scientist',
            description: 'Extract insights from data using statistics and ML.',
            icon: BarChart,
            color: 'bg-emerald-600',
            delay: 0.9,
            items: ['Statistics', 'Python', 'EDA', 'Machine Learning', 'Viz']
        },
        {
            id: 'ui-ux',
            title: 'UI/UX Designer',
            description: 'Design intuitive and beautiful digital products.',
            icon: PenTool,
            color: 'bg-pink-500',
            delay: 1.0,
            items: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'UI']
        },
        {
            id: 'product-manager',
            title: 'Product Manager',
            description: 'Lead the intersection of tech, business, and UX.',
            icon: Users,
            color: 'bg-blue-600',
            delay: 1.1,
            items: ['Strategy', 'Agile', 'Metrics', 'Roadmapping', 'User Stories']
        },
        {
            id: 'cloud-architect',
            title: 'Cloud Architect',
            description: 'Design scalable and secure cloud systems.',
            icon: Cloud,
            color: 'bg-sky-500',
            delay: 1.2,
            items: ['AWS/Azure', 'Networking', 'Security', 'Cost Ops', 'Migration']
        },
        {
            id: 'qa-automation',
            title: 'QA Automation',
            description: 'Ensure software quality through automated testing.',
            icon: TestTube,
            color: 'bg-lime-500',
            delay: 1.3,
            items: ['Selenium', 'Playwright', 'Java/Python', 'CI/CD', 'API Testing']
        },
        {
            id: 'network-engineer',
            title: 'Network Engineer',
            description: 'Design and manage digital infrastructure.',
            icon: Network,
            color: 'bg-cyan-600',
            delay: 1.4,
            items: ['CCNA', 'TCP/IP', 'Routing', 'Security', 'Automation']
        },
        {
            id: 'embedded-engineer',
            title: 'Embedded Systems',
            description: 'Write code that runs on hardware.',
            icon: Cpu,
            color: 'bg-amber-600',
            delay: 1.5,
            items: ['C/C++', 'Microcontrollers', 'RTOS', 'Electronics', 'UART/I2C']
        },
        {
            id: 'ar-vr-dev',
            title: 'AR/VR Developer',
            description: 'Build immersive realities.',
            icon: Glasses,
            color: 'bg-violet-600',
            delay: 1.6,
            items: ['Unity', '3D Math', 'VR SDKs', 'ARKit', 'Optimization']
        },
        {
            id: 'sre',
            title: 'SRE',
            description: 'Ensure reliability of large-scale systems.',
            icon: Activity,
            color: 'bg-rose-500',
            delay: 1.7,
            items: ['Observability', 'Linux', 'SLOs', 'Incident Mgmt', 'Automation']
        },
        {
            id: 'technical-writer',
            title: 'Technical Writer',
            description: 'Explain complex technology clearly.',
            icon: FileText,
            color: 'bg-slate-500',
            delay: 1.8,
            items: ['Markdown', 'API Docs', 'Audience', 'Grammar', 'Git']
        },
        {
            id: 'dev-advocate',
            title: 'Developer Advocate',
            description: 'Build community and help developers succeed.',
            icon: Megaphone,
            color: 'bg-orange-400',
            delay: 1.9,
            items: ['Content', 'Community', 'Speaking', 'Empathy', 'Coding']
        },
        {
            id: 'iot-dev',
            title: 'IoT Developer',
            description: 'Connect physical devices to the internet.',
            icon: Wifi,
            color: 'bg-blue-400',
            delay: 2.0,
            items: ['MQTT', 'Sensors', 'AWS IoT', 'Edge', 'Security']
        },
        {
            id: 'systems-programmer',
            title: 'Systems Programmer',
            description: 'Build OS, databases, and browsers.',
            icon: Box,
            color: 'bg-stone-600',
            delay: 2.1,
            items: ['Rust/C++', 'OS Internals', 'Compilers', 'Memory', 'Performance']
        },
        {
            id: 'graphics-engineer',
            title: 'Graphics Engineer',
            description: 'Push pixels to the screen efficiently.',
            icon: MonitorPlay,
            color: 'bg-fuchsia-500',
            delay: 2.2,
            items: ['OpenGL/Vulkan', 'Linear Algebra', 'Shaders', 'GPU', 'Rendering']
        },
        {
            id: 'smart-contract-auditor',
            title: 'Smart Contract Auditor',
            description: 'Review and secure blockchain code.',
            icon: Search,
            color: 'bg-yellow-600',
            delay: 2.3,
            items: ['EVM', 'Security', 'DeFi', 'Auditing', 'Fuzzing']
        },
        {
            id: 'erp-consultant',
            title: 'ERP Consultant',
            description: 'Implement large scale business software.',
            icon: CheckSquare,
            color: 'bg-blue-800',
            delay: 2.4,
            items: ['SAP/Oracle', 'Business Process', 'Config', 'Data', 'Consulting']
        },
        {
            id: 'cv-engineer',
            title: 'Computer Vision',
            description: 'Teach computers to see.',
            icon: Eye,
            color: 'bg-purple-700',
            delay: 2.5,
            items: ['OpenCV', 'Deep Learning', 'CNNs', 'YOLO', 'Image Proc']
        },
        {
            id: 'no-code-dev',
            title: 'No-Code Developer',
            description: 'Build software without writing code.',
            icon: FileCode,
            color: 'bg-emerald-400',
            delay: 2.6,
            items: ['Webflow', 'Bubble', 'Zapier', 'Airtable', 'Logic']
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors font-bold">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight mb-6">
                        Developer Roadmaps
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Step-by-step guides to help you choose your path and master the skills you need to succeed in tech.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roadmaps.map((roadmap) => (
                        <motion.div
                            key={roadmap.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: roadmap.delay }}
                            className="group relative bg-white rounded-xl shadow-brutal hover:shadow-brutal-lg transition-all duration-300 border-2 border-black overflow-hidden"
                        >
                            {/* Card Content Wrapper */}
                            <div className="h-full">
                                {roadmap.id ? (
                                    <Link to={`/roadmap/${roadmap.id}`} className="block h-full cursor-pointer">
                                        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${roadmap.color.replace('bg-', 'text-')}`}>
                                            <roadmap.icon size={80} />
                                        </div>

                                        <div className="p-5">
                                            <div className={`w-10 h-10 ${roadmap.color} rounded-lg flex items-center justify-center mb-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
                                                <roadmap.icon className="text-white w-5 h-5" />
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                                {roadmap.title}
                                            </h3>

                                            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                                                {roadmap.description}
                                            </p>

                                            <div className="space-y-2 mb-4">
                                                {roadmap.items.slice(0, 3).map((item, i) => (
                                                    <div key={i} className="flex items-center text-xs font-medium text-gray-700">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${roadmap.color} mr-2`} />
                                                        {item}
                                                    </div>
                                                ))}
                                                {roadmap.items.length > 3 && (
                                                    <div className="text-xs text-gray-500 pl-3.5">
                                                        + {roadmap.items.length - 3} more
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center font-bold text-xs text-gray-900 group-hover:text-primary transition-colors">
                                                <span className="mr-2">View Roadmap</span>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    /* Non-clickable / Coming Soon State */
                                    <>
                                        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${roadmap.color.replace('bg-', 'text-')}`}>
                                            <roadmap.icon size={80} />
                                        </div>

                                        <div className="p-5">
                                            <div className={`w-10 h-10 ${roadmap.color} rounded-lg flex items-center justify-center mb-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
                                                <roadmap.icon className="text-white w-5 h-5" />
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                                {roadmap.title}
                                            </h3>

                                            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                                                {roadmap.description}
                                            </p>

                                            <div className="space-y-2 mb-4">
                                                {roadmap.items.slice(0, 3).map((item, i) => (
                                                    <div key={i} className="flex items-center text-xs font-medium text-gray-700">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${roadmap.color} mr-2`} />
                                                        {item}
                                                    </div>
                                                ))}
                                                {roadmap.items.length > 3 && (
                                                    <div className="text-xs text-gray-500 pl-3.5">
                                                        + {roadmap.items.length - 3} more
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center font-bold text-xs text-gray-900 group-hover:text-primary transition-colors">
                                                <span className="mr-2">Coming Soon</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
