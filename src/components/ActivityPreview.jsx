import React from 'react';
import { FaMosque } from 'react-icons/fa';

const ActivityPreview = ({ activity, onClose }) => {

    const getNamazPoints = (namaz) => {
        const namazPoints = { "jamat": 10, "late": 5, "missed": 0 };
        return namazPoints[namaz] || 0;
    };

    return (
        <div className="space-y-6 text-[#ffd700]">
            <div className="text-center mb-6">
                <FaMosque className="h-12 w-12 text-[#ffd700] mx-auto mb-4" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent">
                    Day {activity.ramadan_day} Summary
                </h3>
            </div>

            <div className="space-y-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#ffd700]/20">
                {/* Prayer Section */}
                <div className="space-y-2">
                    <h4 className="text-lg font-semibold border-b border-[#ffd700]/30 pb-2">
                        Prayer Tracking
                    </h4>
                    {['fajr', 'zohar', 'asar', 'maghrib', 'isha'].map(prayer => (
                        <div key={prayer} className="flex justify-between">
                            <span className="capitalize">{prayer}:</span>
                            <span className="text-[#ffd700]/80">
                                {activity[prayer] || 'N/A'} ({getNamazPoints(activity[prayer])} pts)
                            </span>
                        </div>
                    ))}
                </div>

                {/* Activities Section */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold border-b border-[#ffd700]/30 pb-2 mt-4">
                        Daily Activities
                    </h4>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Fasting:</span>
                            <span className="text-[#ffd700]/80">
                                {activity.roza || 'N/A'} ({activity.roza === "kept" ? 10 : 0} pts)
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Quran Pages:</span>
                            <span className="text-[#ffd700]/80">
                                {activity.quran_pages} ({activity.quran_pages} pts)
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Sadqa:</span>
                            <span className="text-[#ffd700]/80">
                                {activity.sadqa || 'N/A'} ({activity.sadqa === "given" ? 5 : 0} pts)
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Taraweeh:</span>
                            <span className="text-[#ffd700]/80">
                                {activity.taraweeh} rakats ({activity.taraweeh * 2} pts)
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Good Deeds:</span>
                            <span className="text-[#ffd700]/80">
                                {activity.extra_good_deeds ? "Yes" : "No"} ({activity.extra_good_deeds ? 2 : 0} pts)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Total Points */}
                <div className="pt-4 mt-4 border-t border-[#ffd700]/20">
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total Points:</span>
                        <span className="text-[#ffd700]">{activity?.points}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onClose}
                className="w-full mt-6 px-6 py-3 bg-[#ffd700] text-[#0a3a4d] rounded-lg hover:bg-[#d4af37] transition-colors font-bold shadow-lg"
            >
                Close Summary
            </button>
        </div>
    );
};

export default ActivityPreview;
