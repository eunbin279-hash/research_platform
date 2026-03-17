import React, { useState } from 'react';
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



const initialSurveys = [
  {
    "id": 1,
    "title": "새로운 키보드 디자인 선호도 조사",
    "description": "저희 팀에서 개발 중인 새로운 기계식 키보드 디자인에 대한 여러분의 의견을 듣고 싶습니다.",
    "url": "https://forms.gle/example1",
    "product": "기계식 키보드",
    "timeRequired": "약 5분",
    "targetAudience": "기계식 키보드 사용자"
  },
  {
    "id": 2,
    "title": "여름 시즌 신메뉴 수요 조사",
    "description": "카페 신메뉴로 어떤 종류의 음료를 원하시나요? 다양한 의견을 남겨주세요.",
    "url": "https://forms.gle/example2",
    "product": "카페 신메뉴",
    "timeRequired": "약 3분",
    "targetAudience": "20-30대 여성"
  },
  {
    "id": 3,
    "title": "스마트폰 앱 아이디어 공모",
    "description": "일상 생활을 편리하게 만들 혁신적인 스마트폰 앱 아이디어를 제안해주세요.",
    "url": "https://forms.gle/example3",
    "product": "모바일 앱",
    "timeRequired": "약 10분",
    "targetAudience": "스마트폰 사용자"
  },
  {
    "id": 4,
    "title": "온라인 강의 플랫폼 만족도 조사",
    "description": "현재 사용하고 계신 온라인 강의 플랫폼의 장단점에 대해 알려주세요.",
    "url": "https://forms.gle/example4",
    "product": "온라인 강의",
    "timeRequired": "약 7분",
    "targetAudience": "온라인 강의 수강생"
  },
  {
    "id": 5,
    "title": "친환경 제품 사용 실태 조사",
    "description": "환경 보호를 위해 어떤 친환경 제품을 사용하고 계신가요?",
    "url": "https://forms.gle/example5",
    "product": "친환경 제품",
    "timeRequired": "약 5분",
    "targetAudience": "환경에 관심 있는 사람"
  },
  {
    "id": 6,
    "title": "여행지 추천 설문",
    "description": "다음 휴가에 가고 싶은 국내 여행지를 추천해주세요.",
    "url": "https://forms.gle/example6",
    "product": "국내 여행",
    "timeRequired": "약 3분",
    "targetAudience": "여행을 좋아하는 사람"
  }
];

function App() {
  const [surveys, setSurveys] = useState(initialSurveys);
  const [showModal, setShowModal] = useState(false);

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

