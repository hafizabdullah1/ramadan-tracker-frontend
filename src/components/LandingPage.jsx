// import React from 'react';
// import { FaGift, FaHeart } from 'react-icons/fa';
// import { HiOutlineSparkles } from 'react-icons/hi';
// import { IoExtensionPuzzleOutline } from 'react-icons/io5';
// import { LuBookOpenText } from 'react-icons/lu';
// import { Link } from 'react-router-dom';


// function LandingPage() {
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-700 to-red-900 text-white">
//             <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
//                 {/* Main Heading */}
//                 <div className="text-center mb-16 animate-fade-in">
//                     <h1 className="text-4xl sm:text-6xl font-bold mb-6">
//                         <span className="inline-block">🌙✨</span>
//                         <span className="mx-4 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
//                             My Ramadan Journey 1.0
//                         </span>
//                         <span className="inline-block">✨🌙</span>
//                     </h1>
//                     <p className="text-xl sm:text-2xl mb-8 font-light">
//                         A Transformative Spiritual Experience Awaits!
//                     </p>
//                 </div>

//                 {/* Hero Section */}
//                 <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-16 shadow-xl animate-slide-up">
//                     <div className="grid md:grid-cols-3 gap-8 items-center">
//                         <div className="md:col-span-2">
//                             <h2 className="text-3xl font-bold mb-6">Join Our Blessed Journey</h2>
//                             <p className="text-lg mb-6">
//                                 Engage in meaningful activities, spiritual growth challenges, and community connection this Ramadan! 🚀
//                             </p>
//                             <div className="flex flex-col sm:flex-row gap-4 mb-8">
//                                 <div className="flex-1 bg-pink-500/20 p-4 rounded-xl">
//                                     <h3 className="text-xl font-semibold mb-2">📅 Starting 1st Ramadan</h3>
//                                     <p className="opacity-90">30 Days of Spiritual Growth</p>
//                                 </div>
//                                 <div className="flex-1 bg-emerald-500/20 p-4 rounded-xl">
//                                     <h3 className="text-xl font-semibold mb-2">🎯 Interactive Tracking</h3>
//                                     <p className="opacity-90">Earn Rewards & Achievements</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="hidden md:block">
//                             <div className="bg-gradient-to-br from-yellow-300 to-pink-400 p-1 rounded-2xl">
//                                 <div className="bg-purple-900 rounded-2xl p-6">
//                                     <HiOutlineSparkles className="h-24 w-24 mx-auto text-yellow-300" />
//                                     <p className="text-center mt-4 text-lg">Special Early Bird Rewards!</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Features Grid */}
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//                     {[
//                         { icon: LuBookOpenText, title: "Power Habits", text: "Build lasting spiritual routines" },
//                         { icon: IoExtensionPuzzleOutline, title: "Brain Quizzes", text: "Test your Islamic knowledge" },
//                         { icon: FaGift, title: "Gifts & Awards", text: "Exciting rewards for achievers" },
//                         { icon: FaHeart, title: "Good Deeds Tracker", text: "Record every act of kindness" },
//                         { title: "Art Challenges", text: "Creative Islamic expression" },
//                         { title: "Charity Hub", text: "Organize & track donations" },
//                     ].map((feature, index) => (
//                         <div key={index} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all">
//                             {feature.icon && (
//                                 <feature.icon className="h-8 w-8 mb-4 text-yellow-300" />
//                             )}
//                             <h3 className="text-xl font-semibold mb-2">🔹 {feature.title}</h3>
//                             <p className="opacity-90">{feature.text}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* CTA Section */}
//                 <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-3xl shadow-2xl animate-pulse-slow">
//                     <h2 className="text-3xl font-bold mb-4">Let's Make This Ramadan Special! 🌟</h2>
//                     <p className="text-xl mb-8">Transform your spiritual journey with our guided program</p>

//                     <div className="flex flex-col items-center gap-4">
//                         <Link
//                             to="/register"
//                             className="bg-yellow-300 text-purple-900 px-8 py-4 rounded-full text-lg font-bold 
//               hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
//                         >
//                             Start Your Journey Now 🚀
//                         </Link>
//                         <p className="flex items-center gap-2 text-sm opacity-90">
//                             <HiOutlineSparkles className="h-5 w-5 text-yellow-300" />
//                             No Registration Fee - Pure Spiritual Growth
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LandingPage;



import React from 'react';
import { FaGift, FaHeart, FaMosque } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import { LuBookOpenText } from 'react-icons/lu';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a3a4d] via-[#1a5f6e] to-[#2d8579] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
                {/* Main Heading */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                        <span className="inline-block">🌙✨</span>
                        <span className="mx-4 bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent">
                            My Ramadan Journey 1.0
                        </span>
                        <span className="inline-block">✨🌙</span>
                    </h1>
                    <p className="text-xl sm:text-2xl mb-8 font-light">
                        Embrace the Sacred Nights, Elevate Your Spirit
                    </p>
                </div>

                {/* Hero Section */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-16 shadow-xl animate-slide-up">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-2">
                            <h2 className="text-3xl font-bold mb-6">Journey of Enlightenment</h2>
                            <p className="text-lg mb-6">
                                Cultivate mindfulness, strengthen your faith, and connect with community through guided daily practices 🕋
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <div className="flex-1 bg-[#d4af37]/20 p-4 rounded-xl">
                                    <h3 className="text-xl font-semibold mb-2">📅 Starting 1st Ramadan</h3>
                                    <p className="opacity-90">30 Nights of Spiritual Ascension</p>
                                </div>
                                <div className="flex-1 bg-[#1a5f6e]/30 p-4 rounded-xl">
                                    <h3 className="text-xl font-semibold mb-2">📖 Guided Reflections</h3>
                                    <p className="opacity-90">Daily Quranic Insights & Practices</p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-gradient-to-br from-[#d4af37] to-[#ffd700] p-1 rounded-2xl">
                                <div className="bg-[#0a3a4d] rounded-2xl p-6">
                                    <FaMosque className="h-24 w-24 mx-auto text-[#ffd700]" />
                                    <p className="text-center mt-4 text-lg">Sacred Space Tracking</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {[
                        { icon: LuBookOpenText, title: "Divine Journal", text: "Document your spiritual insights" },
                        { icon: IoExtensionPuzzleOutline, title: "Faith Quizzes", text: "Deepen your Islamic knowledge" },
                        { icon: FaGift, title: "Blessing Rewards", text: "Earn spiritual milestones" },
                        { icon: FaHeart, title: "Charity Tracker", text: "Monitor your generosity journey" },
                        { title: "Moon Phase Tracking", text: "Follow the lunar calendar" },
                        { title: "Taraweeh Tracker", text: "Record nightly prayers" },
                    ].map((feature, index) => (
                        <div key={index} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all">
                            {feature.icon && (
                                <feature.icon className="h-8 w-8 mb-4 text-[#d4af37]" />
                            )}
                            <h3 className="text-xl font-semibold mb-2">🌙 {feature.title}</h3>
                            <p className="opacity-90">{feature.text}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-[#1a5f6e] to-[#d4af37] p-8 rounded-3xl shadow-2xl animate-pulse-slow">
                    <h2 className="text-3xl font-bold mb-4">Begin Your Sacred Journey! 🌟</h2>
                    <p className="text-xl mb-8">Transform your Ramadan into a journey of self-discovery</p>

                    <div className="flex flex-col items-center gap-4">
                        <Link
                            to="/register"
                            className="bg-[#ffd700] text-[#0a3a4d] px-8 py-4 rounded-full text-lg font-bold 
                            hover:bg-[#d4af37] transition-all transform hover:scale-105 shadow-lg"
                        >
                            Embrace the Journey 🌙
                        </Link>
                        <p className="flex items-center gap-2 text-sm opacity-90">
                            <HiOutlineSparkles className="h-5 w-5 text-[#ffd700]" />
                            Free Access - Purely for Spiritual Growth
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;