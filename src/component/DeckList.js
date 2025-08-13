import React, { useState } from 'react';

function DeckList({ decks, currentDeckId, setCurrentDeckId, setDecks, setShowNewDeckModal, showConfirmation, deleteDeck }) {
    const [dropdownVisible, setDropdownVisible] = useState(null); 

    const showDeckOptions = (deckId, e) => {
        e.stopPropagation(); 
        setDropdownVisible(dropdownVisible === deckId ? null : deckId);
    };

    const handleRenameDeck = (deckId) => {
        const deckToEdit = decks.find(d => d._id === deckId);
        if (deckToEdit) {
            setShowNewDeckModal(true);
            setDecks(prevDecks => prevDecks.map(d => d._id === deckId ? { ...d, isEditing: true } : d));
        }
        setDropdownVisible(null);
    };

    const handleDeleteDeck = (deckId) => {
        showConfirmation('Are you sure you want to delete this deck and all its cards?', () => deleteDeck(deckId));
        setDropdownVisible(null);
    };

    return (
        <div id="decksContainer" className="space-y-3 max-h-96 overflow-y-auto">
            {decks.length === 0 ? (
                <div className="text-center py-6 text-[#b1bac4]">
                    <i className="fas fa-inbox text-4xl mb-2 text-[#38bdf8]"></i>
                    <p>No decks yet. Create your first deck!</p>
                </div>
            ) : (
                decks.map(deck => (
                    <div
                        key={deck._id}
                        className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition
                            ${currentDeckId === deck._id ? 'bg-[#23272e] border border-[#38bdf8]' : 'bg-[#181a1b] border border-[#23272e] hover:bg-[#23272e]'}
                            shadow`}
                        onClick={() => { setCurrentDeckId(deck._id); setDropdownVisible(null); }}
                    >
                        <div className="flex items-center">
                            <div className={`h-4 w-4 rounded-full mr-3 ${currentDeckId === deck._id ? 'bg-[#38bdf8]' : 'bg-[#30363d]'}`}></div>
                            <div>
                                <h3 className="font-medium text-[#e6edf3]">{deck.name}</h3>
                                <p className="text-xs text-[#b1bac4]">
                                    {deck.description ? deck.description.substring(0, 30) + (deck.description.length > 30 ? '...' : '') : 'No description'}
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <button
                                className="deck-edit-btn text-[#b1bac4] hover:text-[#38bdf8] p-1"
                                onClick={(e) => showDeckOptions(deck._id, e)}
                            >
                                <i className="fas fa-ellipsis-v"></i>
                            </button>
                            {dropdownVisible === deck._id && (
                                <div className="deck-dropdown absolute bg-[#23272e] shadow-lg rounded-md py-1 z-10 border border-[#30363d] right-0 mt-2 w-32">
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-[#181a1b] flex items-center text-sm text-[#38bdf8]"
                                        onClick={() => handleRenameDeck(deck._id)}
                                    >
                                        <i className="fas fa-pen mr-2"></i> Edit
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-[#181a1b] flex items-center text-sm text-[#ff357a]"
                                        onClick={() => handleDeleteDeck(deck._id)}
                                    >
                                        <i className="fas fa-trash mr-2"></i> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default DeckList;
