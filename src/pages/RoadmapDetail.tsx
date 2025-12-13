import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Circle, Download, Loader2, Search, Lock } from 'lucide-react';
import { roadmapsData } from '../data/roadmaps';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';

const RoadmapDetail = () => {
    const { id } = useParams<{ id: string }>();
    const roadmap = id ? roadmapsData[id] : null;
    const [downloading, setDownloading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleDownloadPDF = async () => {
        const element = document.getElementById('roadmap-content');
        if (!element) return;

        setDownloading(true);
        // Force visibility of all elements
        element.classList.add('pdf-capture');

        try {
            // Small delay to ensure styles are applied
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true, // Help with external images if any
                logging: false,
                windowWidth: element.scrollWidth, // Ensure full width
                windowHeight: element.scrollHeight // Ensure full height
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = pdfWidth / imgWidth;
            const scaledHeight = imgHeight * ratio;

            let heightLeft = scaledHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = heightLeft - scaledHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save(`${roadmap?.title.toLowerCase().replace(/\s+/g, '-')}-roadmap.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF');
        } finally {
            element.classList.remove('pdf-capture');
            setDownloading(false);
        }
    };

    const filteredSteps = useMemo(() => {
        if (!roadmap) return [];
        if (!searchQuery.trim()) return roadmap.steps;

        const query = searchQuery.toLowerCase();
        return roadmap.steps.filter(step =>
            step.title.toLowerCase().includes(query) ||
            step.description?.toLowerCase().includes(query) ||
            step.topics.some(t => t.toLowerCase().includes(query)) ||
            step.professional_toolset?.some(t => t.toLowerCase().includes(query)) ||
            step.projects.simple.some(p => p.title.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query)) ||
            step.projects.intermediate.some(p => p.title.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query)) ||
            step.projects.advanced.some(p => p.title.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query))
        );
    }, [roadmap, searchQuery]);

    if (!roadmap) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Roadmap Not Found</h2>
                    <Link to="/roadmap" className="text-primary hover:underline">Back to Roadmaps</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <Link to="/roadmap" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Roadmaps
                    </Link>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search roadmap..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-0 focus:border-primary transition-colors w-full sm:w-64"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>

                        {user ? (
                            <button
                                onClick={handleDownloadPDF}
                                disabled={downloading}
                                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-bold whitespace-nowrap shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                {downloading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Generating PDF...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4 mr-2" />
                                        Download PDF
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/login', { state: { from: location } })}
                                className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold whitespace-nowrap shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                <Lock className="w-4 h-4 mr-2" />
                                Sign in to Download
                            </button>
                        )}
                    </div>
                </div>

                <div id="roadmap-content" className="p-4 bg-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            {roadmap.title}
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {roadmap.description}
                        </p>
                    </motion.div>

                    <div className="relative border-l-4 border-gray-200 ml-4 md:ml-6 space-y-16">
                        {filteredSteps.length > 0 ? (
                            filteredSteps.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-8 md:pl-12"
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-white border-4 border-black box-content" />

                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{step.title}</h2>
                                        {step.description && (
                                            <p className="text-lg text-gray-700 font-medium mb-6 italic border-l-4 border-primary pl-4 bg-orange-50 py-2 rounded-r-lg">
                                                "{step.description}"
                                            </p>
                                        )}

                                        {step.topics.length > 0 && (
                                            <div className="mb-8">
                                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                                    <span className="bg-black text-white px-3 py-1 rounded text-sm mr-3">LEARN</span>
                                                    Core Concepts
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {step.topics.map((topic, i) => (
                                                        <div key={i} className="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                                            <span className="font-medium">{topic}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {step.professional_toolset && step.professional_toolset.length > 0 && (
                                            <div className="mb-8">
                                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                                    <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm mr-3">PRO</span>
                                                    Industry Standard Tools
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {step.professional_toolset.map((tool, i) => (
                                                        <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 font-bold border border-purple-100 rounded-lg text-sm shadow-sm">
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                                <span className="bg-primary text-white px-3 py-1 rounded text-sm mr-3">BUILD</span>
                                                Project Work
                                            </h3>

                                            <div className="space-y-6">
                                                {/* Simple Projects */}
                                                {step.projects.simple.length > 0 && (
                                                    <div className="bg-green-50 rounded-xl p-6 border-2 border-green-100">
                                                        <h4 className="text-green-800 font-bold mb-4 flex items-center uppercase tracking-wide text-sm">
                                                            <Circle className="w-4 h-4 mr-2 fill-green-500" />
                                                            Simple Projects
                                                        </h4>
                                                        <ul className="space-y-4">
                                                            {step.projects.simple.map((project, i) => (
                                                                <li key={i} className="flex flex-col sm:flex-row sm:items-baseline">
                                                                    <span className="font-bold text-gray-900 mr-2">{project.title}</span>
                                                                    <span className="text-gray-600 text-sm hidden sm:inline">—</span>
                                                                    {project.description && <span className="text-gray-600 text-sm sm:ml-2">{project.description}</span>}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Intermediate Projects */}
                                                {step.projects.intermediate.length > 0 && (
                                                    <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                                                        <h4 className="text-blue-800 font-bold mb-4 flex items-center uppercase tracking-wide text-sm">
                                                            <Circle className="w-4 h-4 mr-2 fill-blue-500" />
                                                            Intermediate Projects
                                                        </h4>
                                                        <ul className="space-y-4">
                                                            {step.projects.intermediate.map((project, i) => (
                                                                <li key={i} className="flex flex-col sm:flex-row sm:items-baseline">
                                                                    <span className="font-bold text-gray-900 mr-2">{project.title}</span>
                                                                    <span className="text-gray-600 text-sm hidden sm:inline">—</span>
                                                                    {project.description && <span className="text-gray-600 text-sm sm:ml-2">{project.description}</span>}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Advanced Projects */}
                                                {step.projects.advanced.length > 0 && (
                                                    <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-100">
                                                        <h4 className="text-purple-800 font-bold mb-4 flex items-center uppercase tracking-wide text-sm">
                                                            <Circle className="w-4 h-4 mr-2 fill-purple-500" />
                                                            Advanced Projects
                                                        </h4>
                                                        <ul className="space-y-4">
                                                            {step.projects.advanced.map((project, i) => (
                                                                <li key={i} className="flex flex-col sm:flex-row sm:items-baseline">
                                                                    <span className="font-bold text-gray-900 mr-2">{project.title}</span>
                                                                    <span className="text-gray-600 text-sm hidden sm:inline">—</span>
                                                                    {project.description && <span className="text-gray-600 text-sm sm:ml-2">{project.description}</span>}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {step.whyThisOrder && (
                                            <div className="mt-8 bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-medium flex items-start">
                                                <span className="uppercase tracking-widest text-xs text-gray-400 mr-3 mt-0.5 shrink-0">Why this order?</span>
                                                {step.whyThisOrder}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))) : (
                            <div className="py-12 text-center">
                                <p className="text-xl text-gray-500 font-medium">No steps found for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>

                    {roadmap.summary && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-20 border-t-4 border-gray-100 pt-12"
                        >
                            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                                <pre className="whitespace-pre-wrap font-sans text-gray-800 text-lg leading-relaxed">
                                    {roadmap.summary}
                                </pre>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoadmapDetail;
