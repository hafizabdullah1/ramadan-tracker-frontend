import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMosque } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ActivityForm({ day, activities, setActivities, onClose, getActivities }) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const [formData, setFormData] = useState({
        fajr: { time: '', points: 0 },
        zohar: { time: '', points: 0 },
        asar: { time: '', points: 0 },
        maghrib: { time: '', points: 0 },
        isha: { time: '', points: 0 },
        roza: { status: '', points: 0 },
        quranPages: { count: 0, points: 0 },
        sadqa: { status: '', points: 0 },
        taraweeh: { count: 0, points: 0 },
        extraGoodDeeds: { status: false, points: 0 },
        totalPoints: 0,
        ramadanDay: day
    });

    const navigate = useNavigate()

    useEffect(() => {
        if (activities && activities[day]) {
            setFormData(activities[day]);
        }
    }, [activities, day]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let updatedValue = value;

        if (type === 'checkbox') {
            updatedValue = checked;
        }

        if (name === 'roza' || name === 'sadqa') {
            setFormData({
                ...formData,
                [name]: { ...formData[name], status: updatedValue, points: calculateActivityPoints(name, updatedValue) }
            });
        } else if (name === 'quranPages') {
            setFormData({
                ...formData,
                [name]: { ...formData[name], count: Number(updatedValue), points: calculateActivityPoints(name, updatedValue) }
            });
        } else if (name === 'taraweeh') {
            setFormData({
                ...formData,
                [name]: { ...formData[name], count: Number(updatedValue), points: calculateActivityPoints(name, updatedValue) }
            });
        } else if (name === 'extraGoodDeeds') {
            setFormData({
                ...formData,
                extraGoodDeeds: { ...formData.extraGoodDeeds, status: updatedValue, points: updatedValue ? 2 : 0 },
            });
        } else {
            setFormData({
                ...formData,
                [name]: { ...formData[name], time: updatedValue, points: calculateActivityPoints(name, updatedValue) }
            });
        }
    };

    const calculateActivityPoints = (activity, value) => {
        let points = 0;
        switch (activity) {
            case 'fajr':
            case 'zohar':
            case 'asar':
            case 'maghrib':
            case 'isha':
                points = value === 'jamat' ? 10 : value === 'late' ? 5 : 0;
                break;
            case 'roza':
                points = value === 'kept' ? 10 : 0;
                break;
            case 'quranPages':
                points = Number(value);
                break;
            case 'sadqa':
                points = value === 'given' ? 5 : 0;
                break;
            case 'taraweeh':
                points = Number(value) * 2;
                break;
            case 'extraGoodDeeds':
                points = value ? 5 : 0;
                break;
            default:
                points = 0;
                break;
        }
        return points;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = [
            formData.fajr.time, formData.zohar.time, formData.asar.time, formData.maghrib.time,
            formData.isha.time, formData.roza.status, formData.quranPages.count,
            formData.sadqa.status,
        ];

        const isValid = requiredFields.every(field => field !== '' && field !== undefined);

        if (!isValid) {
            toast.error("Please fill out all the required fields.");
            return;
        }

        const activityData = {
            fajr: formData.fajr.time,
            zohar: formData.zohar.time,
            asar: formData.asar.time,
            maghrib: formData.maghrib.time,
            isha: formData.isha.time,
            roza: formData.roza.status,
            quran_pages: formData.quranPages.count,
            taraweeh: formData.taraweeh.count,
            sadqa: formData.sadqa.status,
            extra_good_deeds: formData.extraGoodDeeds.status,
            ramadan_day: formData.ramadanDay
        };

        // Calling API to send data to the backend
        const postData = async () => {
            const access_token = localStorage.getItem("accessToken");

            try {
                const response = await axios.post(
                    `${baseUrl}/api/activities/`,
                    activityData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${access_token}`
                        }
                    }
                );
                if (response.data) {
                    toast.success("Activity saved successfully!");
                    setActivities({ ...activities, [formData.ramadanDay]: formData });
                    getActivities()
                    onClose();
                }
            } catch (error) {
                if (error.status === 401) {
                    localStorage.clear()
                    navigate("/login")
                    toast.error("Session expire! Please login again.")
                }
                const errorMessages =
                    Object.entries(error.response.data)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ") || "An error occurred while saving the activity.";

                toast.error(errorMessages);
            }
        };

        postData();
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-6">
                <FaMosque className="h-12 w-12 text-[#ffd700] mx-auto mb-4" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text">
                    📅 <span className="text-transparent">Day {day} Activities</span>
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Prayer Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#ffd700] border-b border-[#ffd700]/30 pb-2">
                            Prayer Tracking
                        </h3>
                        {['fajr', 'zohar', 'asar', 'maghrib', 'isha'].map(prayer => (
                            <div key={prayer} className="space-y-1">
                                <label className="block text-sm font-medium text-[#ffd700]/90 capitalize">
                                    {prayer.replace(/([A-Z])/g, ' $1')}
                                </label>
                                <select
                                    name={prayer}
                                    value={formData[prayer].time}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white/5 border border-[#ffd700]/30 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] text-white custom-select"
                                >
                                    <option value="" className="text-[#ffd700]/50">Select Status</option>
                                    <option value="jamat" className="text-black">Jamat/On Time</option>
                                    <option value="late" className="text-black">Late</option>
                                    <option value="missed" className="text-black">Missed</option>
                                </select>
                            </div>
                        ))}
                    </div>

                    {/* Other Activities */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#ffd700] border-b border-[#ffd700]/30 pb-2">
                            Daily Activities
                        </h3>

                        {/* Roza */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-[#ffd700]/90">Roza</label>
                            <select
                                name="roza"
                                value={formData.roza.status}
                                onChange={handleChange}
                                className="w-full p-2 bg-white/5 border border-[#ffd700]/30 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] text-white custom-select"
                            >
                                <option value="" className="text-[#ffd700]/50">Select Status</option>
                                <option value="kept" className="text-black">Kept</option>
                                <option value="missed" className="text-black">Missed</option>
                            </select>
                        </div>

                        {/* Quran Pages */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-[#ffd700]/90">
                                Quran Pages Read
                            </label>
                            <input
                                type="number"
                                name="quranPages"
                                value={formData.quranPages?.count}
                                onChange={handleChange}
                                min="0"
                                className="w-full p-2 bg-white/5 border border-[#ffd700]/30 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] text-white"
                                placeholder="Enter number of pages"
                            />
                        </div>

                        {/* Sadqa */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-[#ffd700]/90">Sadqa</label>
                            <select
                                name="sadqa"
                                value={formData.sadqa.status}
                                onChange={handleChange}
                                className="w-full p-2 bg-white/5 border border-[#ffd700]/30 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] text-white custom-select"
                            >
                                <option value="" className="text-[#ffd700]/50">Select Status</option>
                                <option value="given" className="text-black">Given</option>
                                <option value="not_given" className="text-black">Not Given</option>
                            </select>
                        </div>

                        {/* Taraweeh */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-[#ffd700]/90">
                                Taraweeh Prayers
                            </label>
                            <select
                                name="taraweeh"
                                value={formData.taraweeh.count}
                                onChange={handleChange}
                                className="w-full p-2 bg-white/5 border border-[#ffd700]/30 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] text-white custom-select"
                            >
                                <option value="" className="text-[#ffd700]/50">Select Count</option>
                                <option value="0" className="text-black">0 Rakat</option>
                                <option value="2" className="text-black">2 Rakat</option>
                                <option value="4" className="text-black">4 Rakat</option>
                                <option value="6" className="text-black">6 Rakat</option>
                                <option value="8" className="text-black">8 Rakat</option>
                            </select>
                        </div>

                        {/* Extra Good Deeds */}
                        <div className="flex items-center space-x-2 pt-2">
                            <input
                                type="checkbox"
                                name="extraGoodDeeds"
                                checked={formData?.extraGoodDeeds?.status}
                                onChange={handleChange}
                                className="h-4 w-4 text-[#d4af37] focus:ring-[#d4af37] border-[#ffd700]/30 rounded"
                            />
                            <label className="text-sm text-[#ffd700]/90">
                                Performed Extra Good Deeds
                            </label>
                        </div>
                    </div>
                </div>

                {/* Points Preview */}
                <div className="bg-[#ffd700]/10 rounded-lg p-4 text-center border border-[#ffd700]/20">
                    <p className="text-sm font-semibold text-[#ffd700]">
                        🎉 Estimated Points for Today:{" "}
                        <span className="text-lg">{formData.totalPoints}</span>
                    </p>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 border border-[#ffd700]/30 text-[#ffd700] rounded-lg hover:bg-[#ffd700]/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#ffd700] text-[#0a3a4d] rounded-lg hover:bg-[#d4af37] transition-colors font-bold flex items-center justify-center shadow-lg"
                    >
                        <span>Save Activities</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ActivityForm;
