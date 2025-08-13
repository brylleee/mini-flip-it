import React, { useEffect } from 'react';

function ErrorModal({ message, onClose }) {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="fixed top-6 right-6 z-50">
            <div className="bg-[#ff357a] text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-4 animate-fade-in">
                <i className="fas fa-exclamation-circle text-2xl">⚠️</i>
                <span className="font-medium">{message}</span>
                <button onClick={onClose} className="ml-2 text-white hover:text-[#181a1b] text-xl font-bold">&times;</button>
            </div>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s;
                }
                `}
            </style>
        </div>
    );
}

export default ErrorModal;