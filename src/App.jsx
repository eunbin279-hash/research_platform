import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Search from './pages/Search';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import CreateSurveyModal from './components/CreateSurveyModal';
import PrivateRoute from './components/PrivateRoute';

const API_URL = 'http://localhost:3001';

function App() {
  const [surveys, setSurveys] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch initial data from the backend
  useEffect(() => {
    fetch(`${API_URL}/api/surveys`)
      .then(res => res.json())
      .then(data => setSurveys(data))
      .catch(err => console.error("Failed to fetch surveys:", err));
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddSurvey = async (newSurvey) => {
    try {
      const response = await fetch(`${API_URL}/api/surveys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSurvey),
      });
      if (!response.ok) {
        throw new Error('Failed to add survey');
      }
      const savedSurvey = await response.json();
      setSurveys(prevSurveys => [...prevSurveys, savedSurvey]);
      handleCloseModal();
    } catch (err) {
      console.error("Error adding survey:", err);
    }
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent 
          surveys={surveys} 
          showModal={showModal} 
          handleShowModal={handleShowModal}
          handleCloseModal={handleCloseModal} 
          handleAddSurvey={handleAddSurvey} 
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppContent({ surveys, showModal, handleShowModal, handleCloseModal, handleAddSurvey }) {
  const { currentUser } = useAuth();

  return (
    <>
      <Header onShowModal={handleShowModal} />
      {currentUser && (
        <CreateSurveyModal
          show={showModal}
          onHide={handleCloseModal}
          onAddSurvey={handleAddSurvey}
        />
      )}
      
      <div className="App">
        <main style={{ paddingBottom: '80px' }}>
          <Routes>
            <Route path="/" element={<Home surveys={surveys} />} />
            <Route path="/search" element={<Search allSurveys={surveys} />} />
            <Route 
              path="/mypage" 
              element={
                <PrivateRoute>
                  <MyPage allSurveys={surveys} />
                </PrivateRoute>
              } 
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </>
  );
}

export default App;

