import { useState, useEffect } from 'react';
import {
    FaMapMarkerAlt,
    FaPhone,
    FaBuilding,
    FaTree,
    FaGlobeAfrica,
    FaMap,
    FaHeadset,
    FaCertificate,
    FaTimes,
    FaHeart,
    FaEnvelope
} from "react-icons/fa";
import image from "../../assets/easter.jpg";
import { Link } from "react-router-dom";

// Helper function to check if celebration is active
const isCelebrationActive = (celebration) => {
    const today = new Date();
    const year = today.getFullYear();

    switch (celebration) {
        case 'easter': {
            const calculateEaster = (year) => {
                const a = year % 19;
                const b = Math.floor(year / 100);
                const c = year % 100;
                const d = Math.floor(b / 4);
                const e = b % 4;
                const f = Math.floor((b + 8) / 25);
                const g = Math.floor((b - f + 1) / 3);
                const h = (19 * a + b - d - g + 15) % 30;
                const i = Math.floor(c / 4);
                const k = c % 4;
                const l = (32 + 2 * e + 2 * i - h - k) % 7;
                const m = Math.floor((a + 11 * h + 22 * l) / 451);
                const month = Math.floor((h + l - 7 * m + 114) / 31);
                const day = ((h + l - 7 * m + 114) % 31) + 1;
                return new Date(year, month - 1, day);
            };

            const easter = calculateEaster(year);
            const start = new Date(easter);
            start.setDate(easter.getDate() - 7);
            const end = new Date(easter);
            end.setDate(easter.getDate() + 1);

            return today >= start && today <= end;
        }

        case 'christmas': {
            return today >= new Date(year, 11, 20) && today <= new Date(year, 11, 27);
        }

        case 'newyear': {
            return today >= new Date(year - 1, 11, 30) && today <= new Date(year, 0, 3);
        }

        default:
            return false;
    }
};

// Modal Component
const CelebrationModal = ({ isOpen, onClose, celebration }) => {
    if (!isOpen) return null;

    const getContent = () => {
        switch (celebration) {
            case 'easter':
                return {
                    title: "Happy Easter!",
                    greeting: "Wishing you a blessed Easter celebration!",
                    message: "Thank you for being a valued part of our Naya Success Axis family. May this season bring you joy, peace, and wonderful moments with your loved ones.",
                    signature: "With warm regards,",
                    signatureName: "The Naya Success Axis Team",
                    buttonColor: "bg-amber-500 hover:bg-amber-600"
                };

            case 'christmas':
                return {
                    title: "Merry Christmas!",
                    greeting: "Wishing you a joyful Christmas!",
                    message: "Thank you for your trust and support throughout the year. May your Christmas be filled with warmth, laughter, and cherished moments with family.",
                    signature: "Warmest wishes,",
                    signatureName: "The Naya Success Axis Team",
                    buttonColor: "bg-red-600 hover:bg-red-700"
                };

            case 'newyear':
                return {
                    title: "Happy New Year!",
                    greeting: "Welcome to a new year of possibilities!",
                    message: "Thank you for being part of our journey. We wish you health, happiness, and success in the coming year. Here's to growing together!",
                    signature: "Cheers to new beginnings,",
                    signatureName: "The Naya Success Axis Team",
                    buttonColor: "bg-blue-600 hover:bg-blue-700"
                };
        }
    };

    const content = getContent();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-scale-up">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10 bg-black/40 rounded-full p-1.5 hover:bg-black/60"
                >
                    <FaTimes className="text-sm" />
                </button>

                {/* Split Layout: Image Left + Content Right - Responsive */}
                <div className="flex flex-col md:flex-row h-auto md:h-80">

                    {/* Image Section - Left Side (Top on mobile) */}
                    <div className="w-full md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                        <img
                            src={image}
                            alt="Easter celebration"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:bg-gradient-to-r" />
                        {/* Mobile gradient overlay at bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-900 to-transparent md:hidden" />
                    </div>

                    {/* Content Section - Right Side (Bottom on mobile) */}
                    <div className="w-full md:w-3/5 p-5 text-left">
                        {/* Title */}
                        <h2 className="text-xl font-bold text-white mb-1">
                            {content.title}
                        </h2>

                        <div className="w-10 h-0.5 bg-gradient-to-r from-lime-500 to-amber-500 my-2" />

                        {/* Greeting */}
                        <p className="text-lime-400 text-md font-medium mb-2">
                            {content.greeting}
                        </p>

                        {/* Message */}
                        <p className="text-gray-200 text-sm mb-3 leading-relaxed">
                            {content.message}
                        </p>

                        {/* Signature */}
                        <div className="mt-3 mb-4">
                            <p className="text-gray-400 text-xs">{content.signature}</p>
                            <p className="text-amber-400 text-sm font-semibold">{content.signatureName}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition text-xs"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Floating Sticky Button Component with Swinging Animation
const CelebrationFloatingButton = ({ celebration }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(isCelebrationActive(celebration));
    }, [celebration]);

    if (!isVisible) return null;

    const getButtonStyle = () => {
        switch (celebration) {
            case 'easter':
                return {
                    bg: "bg-gradient-to-r from-amber-500 to-orange-500",
                    label: "Happy Easter!",
                };
            case 'christmas':
                return {
                    bg: "bg-gradient-to-r from-red-600 to-red-700",
                    label: "Merry Christmas!",
                };
            case 'newyear':
                return {
                    bg: "bg-gradient-to-r from-blue-600 to-cyan-600",
                    label: "Happy New Year!",
                };
        }
    };

    const style = getButtonStyle();

    return (
        <>
            {/* Sticky Button - Bottom Left with Swinging Animation */}
            <div className="fixed bottom-6 left-6 z-30 animate-swing">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className={`group flex items-center gap-3 px-5 py-3 ${style.bg} rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden relative`}
                >
                    {/* Image Circle */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <img
                            src={image}
                            alt="Celebration"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Text */}
                    <span className="text-white font-semibold text-sm">
                        {style.label}
                    </span>

                    {/* Decorative dots */}
                    <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                    <span className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse delay-100" />
                </button>
            </div>

            <CelebrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                celebration={celebration}
            />
        </>
    );
};

// Main Festival Component
const FestivalComponent = () => {
    const getActiveCelebration = () => {
        if (isCelebrationActive('easter')) return 'easter';
        if (isCelebrationActive('christmas')) return 'christmas';
        if (isCelebrationActive('newyear')) return 'newyear';
        return null;
    };

    const activeCelebration = getActiveCelebration();

    return (
        <div className="flex items-center justify-center bg-transparent">
            {activeCelebration && <CelebrationFloatingButton celebration={activeCelebration} />}
        </div>
    );
};

export default FestivalComponent;