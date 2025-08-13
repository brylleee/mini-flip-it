import React, { useState, useEffect, useCallback } from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';

import AuthForm from './component/AuthForm'; 
import MainAppContent from './component/MainAppContent'; 
import ProfileModal from './component/ProfileModal';
import NewDeckModal from './component/NewDeckModal';
import NewCardModal from './component/NewCardModal';
import EditCardModal from './component/modals/EditCardModal';
import ConfirmModal from './component/ConfirmModal';
import ErrorModal from './component/ErrorModal';
import axios from 'axios';

// API configuration with authentication interceptor
const API = axios.create({
  baseURL: process.env.API_ENDPOINT || 'http://localhost:8080/api',
});

// Add authentication header to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
    // Core application state
    const [currentUser, setCurrentUser] = useState(null);
    const [decks, setDecks] = useState([]);
    const [currentDeckId, setCurrentDeckId] = useState(null);
    const [currentDeckCards, setCurrentDeckCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inStudyMode, setInStudyMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Modal state management
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showNewDeckModal, setShowNewDeckModal] = useState(false);
    const [showNewCardModal, setShowNewCardModal] = useState(false);
    const [showEditCardModal, setShowEditCardModal] = useState(false);
    const [editingCard, setEditingCard] = useState(null); 
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [confirmCallback, setConfirmCallback] = useState(null);

    // ===== AUTHENTICATION & USER MANAGEMENT =====

    /**
     * Handle user login with API integration
     */
    const loginUser = useCallback(async (username, password) => {
        try {
            const response = await API.post("/auth/login", {
                username,
                password
            });
            
            if (response.data.token) {
                // Store JWT token for authenticated requests
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('currentUser', username);
                
                setCurrentUser(username);

                return true;
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            setErrorMessage(errorMessage);
            return false;
        }
    }, []);

    /**
     * Handle user registration with API integration
     */
    const registerUser = useCallback(async (username, email, password, confirmPassword) => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        
        try {
            const response = await API.post("/auth/register", {
                username,
                email,
                password
            });
            
            if (response.status === 201) {
                alert('Registration successful! Please login.');
                return true;
            }
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            setErrorMessage(errorMessage);
            return false;
        }
    }, []);

    /**
     * Handle user logout - clear all user data
     */
    const logoutUser = useCallback(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        setCurrentUser(null);
        setDecks([]);
        setCurrentDeckId(null); 
    }, []);



    /**
     * Load user from localStorage on app start
     */
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    /**
     * Load all decks for the current user from API
     */
    const loadUserDecks = useCallback(async () => {
        if (!currentUser) return;
        
        setLoading(true);
        try {
            const response = await API.get('/decks');
            setDecks(response.data);
        } catch (error) {
            console.error('Error loading decks:', error);
            if (error.response?.status === 401) {
                logoutUser();
            } else {
                alert('Failed to load decks. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }, [currentUser, logoutUser]);

    /**
     * Load user's decks from API when user changes
     */
    useEffect(() => {
        if (currentUser) {
            loadUserDecks();
        } else {
            setDecks([]);
        }
    }, [currentUser, loadUserDecks]);


    /**
     * Handle profile updates (placeholder for future API integration)
     */
    const handleSaveProfileChanges = useCallback((username, newPassword, currentPassword, newEmail) => {
        alert('Profile update functionality will be implemented with API integration');
        setShowProfileModal(false);
    }, [currentUser]);

    /**
     * Show confirmation dialog for destructive actions
     */
    const showConfirmation = useCallback((message, callback) => {
        setConfirmMessage(message);
        setConfirmCallback(() => callback);
        setShowConfirmModal(true);
    }, []);

    /**
     * Handle account deletion (placeholder for future API integration)
     */
    const deleteAccount = useCallback(() => {
        showConfirmation('Are you sure you want to delete your account? All your data will be permanently lost.', () => {
            // TODO: Implement API call to delete account
            alert('Account deletion functionality will be implemented with API integration');
        });
    }, [currentUser, showConfirmation, logoutUser]);

    // ===== DECK MANAGEMENT (API INTEGRATION) =====

    /**
     * Create a new deck via API
     */
    const createNewDeck = useCallback(async (name, description) => {
        try {
            const response = await API.post('/decks/deck', {
                name,
                description
            });
            
            if (response.status === 201) {
                // Reload decks to get the updated list with the new deck
                await loadUserDecks();
                setShowNewDeckModal(false);
            }
        } catch (error) {
            console.error('Error creating deck:', error);
            const errorMessage = error.response?.data?.message || 'Failed to create deck. Please try again.';
            setErrorMessage(errorMessage);
        }
    }, [loadUserDecks]);

    /**
     * Update an existing deck via API
     */
    const updateDeck = useCallback(async (deckId, newName, newDescription) => {
        try {
            const updateData = {};
            if (newName) updateData.name = newName;
            if (newDescription) updateData.description = newDescription;
            
            const response = await API.put(`/decks/deck/meta/${deckId}`, updateData);
            
            if (response.status === 200) {
                // Reload decks to get the updated data
                await loadUserDecks();
                setShowNewDeckModal(false);
                alert('Deck updated successfully!');
            }
        } catch (error) {
            console.error('Error updating deck:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update deck. Please try again.';
            setErrorMessage(errorMessage);
        }
    }, [loadUserDecks]);

    /**
     * Delete a deck via API
     */
    const deleteDeck = useCallback(async (deckId) => {
        try {
            const response = await API.delete(`/decks/deck/meta/${deckId}`);
            
            if (response.status === 200) {
                // Remove deck from state and clear current deck if it was deleted
                setDecks(prevDecks => prevDecks.filter(deck => deck._id !== deckId));
                if (currentDeckId === deckId) {
                    setCurrentDeckId(null);
                }
                alert('Deck deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting deck:', error);
            const errorMessage = error.response?.data?.message || 'Failed to delete deck. Please try again.';
            setErrorMessage(errorMessage);
        }
    }, [currentDeckId]);

    /**
     * Load cards for a specific deck via API
     */
    const loadDeckCards = useCallback(async (deckId) => {
        try {
            const response = await API.get(`/decks/deck/${deckId}`);
            return response.data.cards || [];
        } catch (error) {
            console.error('Error loading deck cards:', error);
            const errorMessage = error.response?.data?.message || 'Failed to load deck cards.';
            setErrorMessage(errorMessage);
            return [];
        }
    }, []);

    // ===== CARD MANAGEMENT (API INTEGRATION) =====

    /**
     * Create a new card in the current deck via API
     */
    const createNewCard = useCallback(async (question, answer) => {
        if (!currentDeckId) {
            alert('Please select a deck first.');
            return;
        }

        try {
            const response = await API.post(`/decks/deck/${currentDeckId}`, {
                question,
                answer
            });
            
            if (response.status === 200) {
                // Reload cards for the current deck
                const cards = await loadDeckCards(currentDeckId);
                setCurrentDeckCards(cards);
                setShowNewCardModal(false);
            }
        } catch (error) {
            console.error('Error creating card:', error);
            const errorMessage = error.response?.data?.message || 'Failed to create card. Please try again.';
            setErrorMessage(errorMessage);
        }
    }, [currentDeckId, loadDeckCards]);

    /**
     * Update an existing card via API
     */
    const updateCard = useCallback(async (cardId, question, answer) => {
        if (!currentDeckId) {
            alert('Please select a deck first.');
            return;
        }

        try {
            const response = await API.put(`/decks/deck/${currentDeckId}`, {
                card_id: cardId,
                question,
                answer
            });
            
            if (response.status === 200) {
                // Reload decks to get the updated card data
                await loadUserDecks();
                setShowEditCardModal(false);
                setEditingCard(null);
            }
        } catch (error) {
            console.error('Error updating card:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update card. Please try again.';
            setErrorMessage(errorMessage);
        }
    }, [currentDeckId, loadUserDecks]);

    /**
     * Delete a card from the current deck via API
     */
    const deleteCard = useCallback(async (cardId) => {
        if (!currentDeckId) {
            alert('Please select a deck first.');
            return;
        }

        try {
            const response = await API.delete(`/decks/deck/${currentDeckId}/${cardId}`);
            
            if (response.status === 200) {
                // Reload decks to get the updated card data
                await loadUserDecks();
            }
        } catch (error) {
            console.error('Error deleting card:', error);
            const errorMessage = error.response?.data?.message || 'Failed to delete card. Please try again.';
            setErrorMessage(errorMessage);
        }
    }, [currentDeckId, loadUserDecks]);

    // ===== MODAL HANDLERS =====

    /**
     * Handle confirmation modal confirm action
     */
    const handleConfirm = useCallback(() => {
        if (confirmCallback) {
            confirmCallback();
        }
        setShowConfirmModal(false);
        setConfirmCallback(null);
        setConfirmMessage('');
    }, [confirmCallback]);

    /**
     * Handle confirmation modal cancel action
     */
    const handleCancelConfirm = useCallback(() => {
        setShowConfirmModal(false);
        setConfirmCallback(null);
        setConfirmMessage('');
    }, []);

    /**
     * Toggle password visibility in form inputs
     */
    const togglePassword = (inputId) => {
        const input = document.getElementById(inputId);
        if (input) {
            const icon = input.nextElementSibling?.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon?.classList.replace('fa-eye-slash', 'fa-eye');
            } else {
                input.type = 'password';
                icon?.classList.replace('fa-eye', 'fa-eye-slash');
            }
        }
    };

    // ===== RENDER =====

    return (
        <div className="gradient-bg min-h-screen p-4">
            {/* Check if authenticated, show either login form or main application */}
            {!currentUser ? (
                <div id="authContainer" className="mt-24 container mx-auto max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-[#38bdf8] mb-2">Flip-It</h1>
                        <p className="text-[#38bdf8]">Create, study, and master your knowledge</p>
                    </div>
                    <AuthForm
                        onLogin={loginUser}
                        onRegister={registerUser}
                        togglePassword={togglePassword} 
                    />
                </div>
            ) : (
                /* Main Application */
                <div id="appContainer" className="container mx-auto max-w-6xl">
                    <header className="text-center mb-8 relative">
                        <div className="absolute top-0 right-0 flex space-x-2">
                            <button onClick={() => setShowProfileModal(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition" title="Profile">
                                <i className="fas fa-user"></i>
                            </button>
                            <button onClick={logoutUser} className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition" title="Logout">
                                <i className="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </header>

                    {loading && (
                        <div className="text-center py-4">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Loading...</p>
                        </div>
                    )}

                    <MainAppContent
                        decks={decks}
                        setDecks={setDecks}
                        currentDeckId={currentDeckId}
                        setCurrentDeckId={setCurrentDeckId}
                        setShowNewDeckModal={setShowNewDeckModal}
                        setShowNewCardModal={setShowNewCardModal}
                        setShowEditCardModal={setShowEditCardModal}
                        setEditingCard={setEditingCard}
                        showConfirmation={showConfirmation}
                        deleteDeck={deleteDeck}
                        deleteCard={deleteCard}
                        loadDeckCards={loadDeckCards}
                        inStudyMode={inStudyMode}
                        setInStudyMode={setInStudyMode}
                    />
                </div>
            )}

            {/* Modal Components */}
            {showNewDeckModal && (
                <NewDeckModal
                    onClose={() => setShowNewDeckModal(false)}
                    onCreateDeck={createNewDeck}
                    onUpdateDeck={updateDeck} 
                    editingDeck={null} 
                />
            )}

            {showNewCardModal && (
                <NewCardModal
                    onClose={() => setShowNewCardModal(false)}
                    onCreateCard={createNewCard}
                />
            )}

            {showEditCardModal && editingCard && (
                <EditCardModal
                    onClose={() => { setShowEditCardModal(false); setEditingCard(null); }}
                    onUpdateCard={updateCard}
                    card={editingCard}
                />
            )}

            {showProfileModal && (
                <ProfileModal
                    currentUser={currentUser}
                    onClose={() => setShowProfileModal(false)}
                    onSave={handleSaveProfileChanges}
                    onDeleteAccount={deleteAccount}
                    togglePassword={togglePassword} 
                />
            )}

            {showConfirmModal && (
                <ConfirmModal
                    message={confirmMessage}
                    onConfirm={handleConfirm}
                    onCancel={handleCancelConfirm}
                />
            )}

            {errorMessage && (
                <ErrorModal message={errorMessage} onClose={() => setErrorMessage('')} />
            )}
        </div>
    );
}

export default App;