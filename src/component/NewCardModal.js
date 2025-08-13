import React, { useState } from 'react';

function NewCardModal({ onClose, onCreateCard }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSave = () => {
        if (question.trim() && answer.trim()) {
            onCreateCard(question, answer);
        }
    };

    return (
        <div id="newCardModal" className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#23272e] rounded-xl p-6 w-full max-w-md slide-in shadow-lg text-[#e6edf3] font-[Ubuntu]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-[#38bdf8]">Add New Card</h3>
                    <button onClick={onClose} className="text-[#b1bac4] hover:text-[#38bdf8]">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-[#b1bac4] mb-1" htmlFor="cardQuestionInput">Question</label>
                        <textarea
                            id="cardQuestionInput"
                            className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8] h-24"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Enter your question"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-[#b1bac4] mb-1" htmlFor="cardAnswerInput">Answer</label>
                        <textarea
                            id="cardAnswerInput"
                            className="w-full px-3 py-2 border border-[#30363d] rounded-lg bg-[#181a1b] text-[#e6edf3] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8] h-24"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Enter your answer"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button onClick={onClose} className="px-4 py-2 text-[#b1bac4] hover:text-[#38bdf8] transition">Cancel</button>
                        <button onClick={handleSave} className="bg-[#38bdf8] hover:bg-[#00bfff] text-[#181a1b] px-4 py-2 rounded-lg transition font-semibold shadow">Save Card</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewCardModal;
