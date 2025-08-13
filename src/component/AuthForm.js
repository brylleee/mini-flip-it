import React, { useState } from 'react';

function AuthForm({ onLogin, onRegister, togglePassword }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        onRegister(username, email, password, confirmPassword);
    };

    return (
        <div className="bg-[#23272e] rounded-xl shadow-lg p-8 text-[#e6edf3]">
            {isLogin ? (
                <div id="loginForm">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-[#38bdf8]">Login</h2>
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-[#b1bac4]" htmlFor="loginUsername">Username</label>
                            <input
                                type="text"
                                id="loginUsername"
                                className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-[#b1bac4]" htmlFor="loginPassword">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="loginPassword"
                                    className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="absolute right-3 top-3 text-[#b1bac4] hover:text-[#38bdf8]" onClick={() => togglePassword('loginPassword')}>
                                    <i className="fas fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" id="loginBtn" className="w-full bg-[#38bdf8] hover:bg-[#00bfff] text-[#181a1b] py-2 rounded-lg transition font-semibold shadow-md">Login</button>
                        <p className="text-center text-[#b1bac4]">Don't have an account? <button type="button" className="text-[#38bdf8] hover:underline" onClick={() => setIsLogin(false)}>Register</button></p>
                    </form>
                </div>
            ) : (
                <div id="registerForm">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-[#38bdf8]">Register</h2>
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-[#b1bac4]" htmlFor="registerUsername">Username</label>
                            <input
                                type="text"
                                id="registerUsername"
                                className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-[#b1bac4]" htmlFor="registerEmail">Email</label>
                            <input
                                type="email"
                                id="registerEmail"
                                className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-[#b1bac4]" htmlFor="registerPassword">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="registerPassword"
                                    className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="absolute right-3 top-3 text-[#b1bac4] hover:text-[#38bdf8]" onClick={() => togglePassword('registerPassword')}>
                                    <i className="fas fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 text-[#b1bac4]" htmlFor="confirmPassword">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="absolute right-3 top-3 text-[#b1bac4] hover:text-[#38bdf8]" onClick={() => togglePassword('confirmPassword')}>
                                    <i className="fas fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" id="registerBtn" className="w-full bg-[#38bdf8] hover:bg-[#00bfff] text-[#181a1b] py-2 rounded-lg transition font-semibold shadow-md">Register</button>
                        <p className="text-center text-[#b1bac4]">Already have an account? <button type="button" className="text-[#38bdf8] hover:underline" onClick={() => setIsLogin(true)}>Login</button></p>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AuthForm;
