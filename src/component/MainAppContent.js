import React, { useState, useEffect, useCallback } from 'react';
import DeckList from './DeckList';
import CardList from './CardList';
import StudyMode from './StudyMode';

function MainAppContent({
    decks,
    setDecks, 
    currentDeckId,
    setCurrentDeckId,
    setShowNewDeckModal,
    setShowNewCardModal,
    setShowEditCardModal,
    setEditingCard,
    showConfirmation,
    deleteDeck,
    deleteCard,
    loadDeckCards
}) {
    const [studyMode, setStudyMode] = useState(false);
    const [shuffledOrder, setShuffledOrder] = useState([]);
    const [currentStudyCardIndex, setCurrentStudyCardIndex] = useState(0);
    const [currentDeckCards, setCurrentDeckCards] = useState([]);
    const [loadingCards, setLoadingCards] = useState(false);

    // Find current deck using MongoDB _id
    const currentDeck = decks.find(deck => deck._id === currentDeckId);

    // Load cards for the current deck when it changes
    useEffect(() => {
        if (currentDeckId && loadDeckCards) {
            loadCurrentDeckCards();
        } else {
            setCurrentDeckCards([]);
        }
    }, [currentDeckId, loadDeckCards]);

    const loadCurrentDeckCards = useCallback(async () => {
        if (!currentDeckId || !loadDeckCards) return;
        
        setLoadingCards(true);
        try {
            const cards = await loadDeckCards(currentDeckId);
            setCurrentDeckCards(cards);
        } catch (error) {
            console.error('Error loading deck cards:', error);
            setCurrentDeckCards([]);
        } finally {
            setLoadingCards(false);
        }
    }, [currentDeckId, loadDeckCards]);

    useEffect(() => {
        setStudyMode(false);
        setCurrentStudyCardIndex(0);
        if (currentDeckCards && currentDeckCards.length > 0) {
            setShuffledOrder(Array.from({ length: currentDeckCards.length }, (_, i) => i));
        }
    }, [currentDeckId, currentDeckCards]);

    const enterStudyMode = useCallback(() => {
        if (!currentDeckCards || currentDeckCards.length === 0) return;
        setStudyMode(true);
        setCurrentStudyCardIndex(0);
        setShuffledOrder(Array.from({ length: currentDeckCards.length }, (_, i) => i));
    }, [currentDeckCards]);

    const exitStudyMode = useCallback(() => {
        setStudyMode(false);
        setCurrentStudyCardIndex(0);
    }, []);

    const navigateStudyCard = useCallback((direction) => {
        if (!currentDeckCards || currentDeckCards.length === 0) return;
        let newIndex = currentStudyCardIndex + direction;
        if (newIndex < 0) {
            newIndex = currentDeckCards.length - 1;
        } else if (newIndex >= currentDeckCards.length) {
            newIndex = 0;
        }
        setCurrentStudyCardIndex(newIndex);
    }, [currentDeckCards, currentStudyCardIndex]);

    const shuffleStudyCards = useCallback(() => {
        if (!currentDeckCards || currentDeckCards.length === 0) return;
        const newShuffledOrder = [...shuffledOrder];
        for (let i = newShuffledOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newShuffledOrder[i], newShuffledOrder[j]] = [newShuffledOrder[j], newShuffledOrder[i]];
        }
        setShuffledOrder(newShuffledOrder);
        setCurrentStudyCardIndex(0);
    }, [currentDeckCards, shuffledOrder]);

    return (
        <div className="pt-20 grid grid-cols-1 md:grid-cols-4 gap-6 font-[Ubuntu]">
            {/* Deck List Section */}
            <div className="bg-[#23272e] rounded-xl shadow-lg p-6 md:col-span-1 text-[#e6edf3]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-[#38bdf8]">Your Decks</h2>
                    <button onClick={() => setShowNewDeckModal(true)} id="newDeckBtn" className="bg-[#38bdf8] hover:bg-[#00bfff] text-[#181a1b] px-4 py-2 rounded-lg transition font-semibold shadow">
                        <i className="fas fa-plus mr-2"></i>New Deck
                    </button>
                </div>
                <DeckList
                    decks={decks}
                    currentDeckId={currentDeckId}
                    setCurrentDeckId={setCurrentDeckId}
                    setDecks={setDecks} 
                    setShowNewDeckModal={setShowNewDeckModal} 
                    showConfirmation={showConfirmation}
                    deleteDeck={deleteDeck}
                />
            </div>

            {/* Cards Section */}
            <div className="bg-[#23272e] rounded-xl shadow-lg p-6 md:col-span-3 text-[#e6edf3]">
                {currentDeckId && !studyMode && (
                    <div id="deckInfo" className="mb-6">
                        <div className="flex justify-between items-center">
                            <h2 id="currentDeckTitle" className="text-2xl font-semibold text-[#38bdf8]">
                                {currentDeck?.name}
                            </h2>
                            <div className="space-x-2">
                                <button onClick={() => setShowNewCardModal(true)} id="addCardBtn" className="bg-[#00ffb3] hover:bg-[#00e6a8] text-[#181a1b] px-3 py-1 rounded-lg transition font-semibold shadow">
                                    <i className="fas fa-plus mr-1"></i>Add Card
                                </button>
                                <button onClick={enterStudyMode} id="studyDeckBtn" className="bg-[#38bdf8] hover:bg-[#00bfff] text-[#181a1b] px-3 py-1 rounded-lg transition font-semibold shadow" disabled={!currentDeckCards || currentDeckCards.length === 0}>
                                    <i className="fas fa-book-open mr-1"></i>Study
                                </button>
                                <button onClick={() => showConfirmation('Are you sure you want to delete this deck and all its cards?', () => deleteDeck(currentDeckId))} id="deleteDeckBtn" className="bg-[#ff357a] hover:bg-[#ff0059] text-white px-3 py-1 rounded-lg transition font-semibold shadow">
                                    <i className="fas fa-trash mr-1"></i>Delete
                                </button>
                            </div>
                        </div>
                        <p id="deckCardCount" className="text-[#b1bac4]">
                            {loadingCards ? 'Loading cards...' : `${currentDeckCards.length || 0} card${currentDeckCards.length !== 1 ? 's' : ''}`}
                        </p>
                        {currentDeck?.description && (
                            <p className="text-[#b1bac4] text-sm mt-1">{currentDeck.description}</p>
                        )}
                    </div>
                )}

                {!currentDeckId && !studyMode && (
                    <div id="noDeckSelected" className="col-span-2 text-center py-10">
                        <i className="fas fa-layer-group text-5xl text-[#38bdf8] mb-4"></i>
                        <h3 className="text-xl font-medium text-[#b1bac4]">Select a deck to view cards</h3>
                        <p className="text-[#b1bac4]">or create a new one</p>
                    </div>
                )}

                {currentDeckId && !studyMode && (
                    <CardList
                        deck={currentDeck}
                        cards={currentDeckCards}
                        loading={loadingCards}
                        setShowEditCardModal={setShowEditCardModal}
                        setEditingCard={setEditingCard}
                        showConfirmation={showConfirmation}
                        deleteCard={deleteCard}
                    />
                )}

                {studyMode && currentDeckCards && currentDeckCards.length > 0 && (
                    <>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={exitStudyMode}
                                className="bg-[#ff357a] hover:bg-[#ff0059] text-white px-4 py-2 rounded-lg font-semibold shadow transition"
                            >
                                Exit Study Mode
                            </button>
                        </div>
                        <StudyMode
                            deck={currentDeck}
                            cards={currentDeckCards}
                            shuffledOrder={shuffledOrder}
                            currentStudyCardIndex={currentStudyCardIndex}
                            exitStudyMode={exitStudyMode}
                            navigateStudyCard={navigateStudyCard}
                            shuffleStudyCards={shuffleStudyCards}
                        />
                    </>
                )}
                {studyMode && (!currentDeckCards || currentDeckCards.length === 0) && (
                    <div className="text-center py-10">
                        <h3 className="text-xl font-medium text-[#b1bac4]">No cards to study in this deck.</h3>
                        <button onClick={exitStudyMode} className="mt-4 text-[#38bdf8] hover:underline">Exit Study Mode</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainAppContent;
