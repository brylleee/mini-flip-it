import React, { useState, useEffect } from 'react';

function StudyMode({ deck, cards, shuffledOrder, currentStudyCardIndex, exitStudyMode, navigateStudyCard, shuffleStudyCards }) {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setIsFlipped(false);
    }, [currentStudyCardIndex]);

    if (!cards || cards.length === 0) {
        return (
            <div className="text-center py-10">
                <h3 className="text-xl font-medium text-[#b1bac4]">No cards to study in this deck.</h3>
                <button onClick={exitStudyMode} className="mt-4 text-[#38bdf8] hover:underline">Exit Study Mode</button>
            </div>
        );
    }

    const currentCard = cards[shuffledOrder[currentStudyCardIndex]];

    return (
        <div id="studyContainer" className="font-[Ubuntu]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#38bdf8]">Study Mode</h3>
                <button onClick={exitStudyMode} id="exitStudyBtn" className="text-[#b1bac4] hover:text-[#38bdf8]">
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="flex justify-center">
                <div
                    id="studyCard"
                    className="w-full max-w-md h-64 relative cursor-pointer"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <div className={`card-3d w-full h-full ${isFlipped ? 'flipped' : ''}`}>
                        <div className="card-front bg-[#23272e] rounded-xl shadow-lg p-6 flex flex-col h-full border border-[#30363d]">
                            <div className="flex-grow flex items-center justify-center">
                                <p className="text-xl text-center text-[#e6edf3]">{currentCard.question}</p>
                            </div>
                            <div className="text-center text-sm text-[#38bdf8] mt-2">
                                Click to flip
                            </div>
                        </div>
                        <div className="card-back bg-[#181a1b] rounded-xl shadow-lg p-6 flex flex-col h-full border border-[#38bdf8]">
                            <div className="flex-grow flex items-center justify-center">
                                <p className="text-xl text-center text-[#38bdf8]">{currentCard.answer}</p>
                            </div>
                            <div className="text-center text-sm text-[#38bdf8] mt-2">
                                Click to flip back
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => navigateStudyCard(-1)}
                    id="prevCardBtn"
                    className="bg-[#181a1b] hover:bg-[#23272e] text-[#b1bac4] px-4 py-2 rounded-lg transition font-semibold border border-[#30363d]"
                >
                    <i className="fas fa-arrow-left mr-2"></i>Previous
                </button>
                <button
                    onClick={() => navigateStudyCard(1)}
                    id="nextCardBtn"
                    className="bg-[#38bdf8] hover:bg-[#00bfff] text-[#181a1b] px-4 py-2 rounded-lg transition font-semibold shadow"
                >
                    Next<i className="fas fa-arrow-right ml-2"></i>
                </button>
                <button
                    onClick={shuffleStudyCards}
                    id="shuffleCardsBtn"
                    className="bg-[#a259ff] hover:bg-[#7c2fff] text-white px-4 py-2 rounded-lg transition font-semibold shadow"
                >
                    <i className="fas fa-random mr-2"></i>Shuffle
                </button>
            </div>
        </div>
    );
}

export default StudyMode;
