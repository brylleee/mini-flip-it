import React from 'react';

function CardList({ deck, cards, loading, setShowEditCardModal, setEditingCard, showConfirmation, deleteCard }) {
    if (!deck) {
        return null; 
    }

    if (loading) {
        return (
            <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#38bdf8]"></div>
                <p className="mt-2 text-[#b1bac4]">Loading cards...</p>
            </div>
        );
    }

    return (
        <div id="cardsContainer" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!cards || cards.length === 0 ? (
                <div className="col-span-2 text-center py-10">
                    <i className="fas fa-sticky-note text-5xl text-[#38bdf8] mb-4"></i>
                    <h3 className="text-xl font-medium text-[#b1bac4]">No cards in this deck yet</h3>
                    <p className="text-[#b1bac4]">Add your first card</p>
                </div>
            ) : (
                cards.map((card, index) => (
                    <div key={card.id} className="bg-[#23272e] rounded-xl shadow-lg overflow-hidden border border-[#30363d]">
                        <div className="p-4">
                            <h3 className="font-medium text-[#e6edf3] mb-2 line-clamp-2">{card.question}</h3>
                            <p className="text-sm text-[#b1bac4] mb-3 line-clamp-3">{card.answer}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-[#38bdf8]">Card {index + 1}</span>
                                <div className="flex space-x-2">
                                    <button
                                        className="card-edit-btn text-[#38bdf8] hover:text-[#00bfff]"
                                        onClick={() => { setShowEditCardModal(true); setEditingCard(card); }}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="card-delete-btn text-[#ff357a] hover:text-[#ff0059]"
                                        onClick={() => showConfirmation('Are you sure you want to delete this card?', () => deleteCard(card.id))}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default CardList;
