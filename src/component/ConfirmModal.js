import React from 'react';

function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div id="confirmModal" className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#23272e] rounded-xl p-6 w-full max-w-md slide-in shadow-lg text-[#e6edf3] font-[Ubuntu]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-[#38bdf8]">Confirm Action</h3>
                    <button onClick={onCancel} className="text-[#b1bac4] hover:text-[#38bdf8]">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <p id="confirmMessage" className="mb-6 text-[#b1bac4]">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-[#b1bac4] hover:text-[#38bdf8] transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-[#ff357a] hover:bg-[#ff0059] text-white px-4 py-2 rounded-lg transition font-semibold shadow"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;