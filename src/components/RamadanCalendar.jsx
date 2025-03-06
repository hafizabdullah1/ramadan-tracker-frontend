import React, { useState, useEffect } from 'react';
import ActivityForm from './ActivityForm';
import ActivityPreview from './ActivityPreview';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaMosque } from 'react-icons/fa';

const RamadanCalendar = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const [selectedDay, setSelectedDay] = useState(null);
    const [userData, setUserData] = useState(null);
    const currentDate = new Date();
    const currentDay = currentDate.getDate() - 1;
    const daysInRamadan = 30;

    const navigate = useNavigate()
    const [allActivities, setAllActivities] = useState([])
    const access_token = localStorage.getItem("accessToken")


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserData(user);
    }, []);

    const getActivities = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/activities/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
            })

            if (data) {
                setAllActivities(data)
            }
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear()
                navigate("/login")
                toast.error("Session expire! Please login again.")
            }
            // console.log(error.response.data, 'error getting activities');
            toast.error("error getting activities. Check you Network!")
        }
    }

    useEffect(() => {
        getActivities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const calculatePoints = () => {
        return Array.isArray(allActivities) ? allActivities.reduce((sum, acc) => {
            return sum += acc.points;
        }, 0) : 0;
    };

    const handleDayClick = (day) => {
        if (day <= currentDay) {
            setSelectedDay(day);
        }
    };

    const handleClosePopup = () => setSelectedDay(null);

    const renderCalendarDays = () => {
        return Array.from({ length: daysInRamadan }, (_, i) => {
            const day = i + 1;
            const isLogged = Array.isArray(allActivities) && allActivities.some(activity => activity.ramadan_day === day);
            const isDisabled = day > currentDay;
            const isToday = day === currentDay;            

            return (
                <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`
                        aspect-square flex flex-col items-center justify-center 
                        rounded-lg border-2 transition-all
                        ${isToday ? 'border-[#ffd700] bg-[#ffd700]/10' : 'border-[#ffd700]/30'}
                        ${isLogged ? 'bg-[#ffd700]/10' : 'bg-white/5'}
                        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ffd700]/10 cursor-pointer'}
                        relative p-2
                    `}
                >
                    <span className="text-lg font-semibold text-[#ffd700]">{day}</span>
                    {isLogged && (
                        <div className="absolute bottom-1 right-1 flex items-center">
                            <span className="text-[#ffd700] text-sm">✔</span>
                        </div>
                    )}
                    {isToday && (
                        <span className="absolute bottom-1 text-xs text-[#ffd700]">Today</span>
                    )}
                </div>
            );
        });
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a3a4d] via-[#1a5f6e] to-[#2d8579] p-4">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto mb-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-2">
                            <FaMosque className="h-6 w-6 text-[#ffd700]" />
                            <h1 className="text-2xl font-bold text-[#ffd700]">
                                Ramadan {new Date().getFullYear()}
                            </h1>
                        </div>
                        {userData && (
                            <p className="text-gray-200 mt-1">
                                <span className="capitalize">{userData.name}</span> • {userData.age} years
                            </p>
                        )}
                    </div>
                    <div className="bg-[#ffd700]/20 px-4 py-3 rounded-lg border border-[#ffd700]/30">
                        <p className="text-[#ffd700] font-semibold">
                            🌟 Total Points: {calculatePoints()}
                        </p>
                        <p className="text-sm text-[#ffd700]/80 mt-1">
                            Tracked Days: {allActivities.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-[#ffd700]/80 text-sm font-medium py-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {renderCalendarDays()}
                </div>
            </div>

            {/* Activity Modal */}
            {selectedDay && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-md shadow-2xl">
                        {allActivities.find(activity => activity.ramadan_day === selectedDay) ? (
                            <ActivityPreview
                                activity={allActivities.find(activity => activity.ramadan_day === selectedDay)}
                                onClose={handleClosePopup}
                            />
                        ) : (
                            <ActivityForm
                                day={selectedDay}
                                onClose={handleClosePopup}
                                activities={allActivities}
                                setActivities={setAllActivities}
                                getActivities={getActivities}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RamadanCalendar;