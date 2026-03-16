import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSearch, FaUser } from 'react-icons/fa';
import './BottomNav.css'; // We will create this CSS file

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-link">
        <FaHome />
        <span>홈</span>
      </NavLink>
      <NavLink to="/search" className="nav-link">
        <FaSearch />
        <span>검색</span>
      </NavLink>
      <NavLink to="/mypage" className="nav-link">
        <FaUser />
        <span>마이페이지</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
