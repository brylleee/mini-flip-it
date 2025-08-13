import React, { useState, useEffect } from 'react';

function ProfileModal({ currentUser, onClose, onSave, onDeleteAccount, togglePassword }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.username || '');
            setEmail(currentUser.email);
            setNewPassword('');
            setCurrentPassword('');
        }
    }, [currentUser]);

    const handleSave = () => {
        onSave(username, newPassword, currentPassword, email);
    };

    return (
        <div id="profileModal" className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#23272e] rounded-xl p-6 w-full max-w-md slide-in shadow-lg text-[#e6edf3] font-[Ubuntu]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-[#38bdf8]">Profile Settings</h3>
                    <button onClick={onClose} className="text-[#b1bac4] hover:text-[#38bdf8]">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-[#b1bac4] mb-1" htmlFor="profileUsername">Username</label>
                        <input
                            type="text"
                            id="profileUsername"
                            className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[#b1bac4] mb-1" htmlFor="profileEmail">Email</label>
                        <input
                            type="email"
                            id="profileEmail"
                            className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[#b1bac4] mb-1" htmlFor="profileNewPassword">New Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                id="profileNewPassword"
                                className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button type="button" className="absolute right-3 top-3 text-[#b1bac4] hover:text-[#38bdf8]" onClick={() => togglePassword('profileNewPassword')}>
                                <i className="fas fa-eye-slash"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[#b1bac4] mb-1" htmlFor="profileCurrentPassword">Current Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                id="profileCurrentPassword"
                                className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <button type="button" className="absolute right-3 top-3 text-[#b1bac4] hover:text-[#38bdf8]" onClick={() => togglePassword('profileCurrentPassword')}>
                                <i className="fas fa-eye-slash"></i>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between pt-4">
                        <button onClick={onDeleteAccount} id="deleteAccountBtn" className="text-[#ff357a] hover:text-[#ff0059] font-semibold">
                            <i className="fas fa-trash mr-1"></i>Delete Account
                        </button>
                        <div className="space-x-3">
                            <button onClick={onClose} className="px-4 py-2 text-[#b1bac4] hover:text-[#38bdf8] transition">Cancel</button>
                            <button onClick={handleSave} className="bg-[#38bdf8] hover:bg-[#00bfff] text-[#181a1b] px-4 py-2 rounded-lg transition font-semibold shadow">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;