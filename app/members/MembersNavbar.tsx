'use client';

import { useState } from 'react';

import HomeButton from '../components/HomeButton';

const MembersNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav id="members-navbar">
      <HomeButton />
      <button className="hamburger-menu" onClick={toggleMobileMenu}>
        ☰
      </button>
      <ul className={isMobileMenuOpen ? 'mobile-menu' : 'desktop-menu'}>
        <li><a href='#calendar'>Calendar</a></li>
        <li className="hide-this-bar">|</li>
        <li><a href='#lessons'>Lessons</a></li>
        <li className="hide-this-bar">|</li>
        <li><a href='#workshop'>Workshop</a></li>
        <li className="hide-this-bar">|</li>
        <li><a href='#contact'>Contact</a></li>
      </ul>
    </nav>
  );
};

export default MembersNavbar;
