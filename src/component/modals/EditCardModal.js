import React, { useState, useEffect } from 'react';

function EditCardModal({ onClose, onUpdateCard, card }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        if (card) {
            setQuestion(card.question);
            setAnswer(card.answer);
        }
    }, [card]);

    const handleSave = () => {
        if (question.trim() && answer.trim()) {
            onUpdateCard(card.id, question, answer);
        }
    };

    return (
        <div id="editCardModal">
            <div>
                <div>
                    <h3>Edit Card</h3>
                    <button onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div>
                    <div>
                        <label htmlFor="editCardQuestionInput">Question</label>
                        <textarea
                            id="editCardQuestionInput"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Enter your question"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="editCardAnswerInput">Answer</label>
                        <textarea
                            id="editCardAnswerInput"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Enter your answer"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button onClick={onClose}>Cancel</button>
                        <button onClick={handleSave}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCardModal;
