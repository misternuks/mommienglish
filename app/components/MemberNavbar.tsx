'use client';

import { useEffect, useState } from 'react';

import HomeButton from './HomeButton';

const MemberNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const navbar = document.getElementById('member-navbar');

    function checkStickyNavbar() {
      if (!navbar) return;

      const navbarTop = navbar.getBoundingClientRect().top + window.scrollY;
      const offsetTop = window.scrollY;

      if (offsetTop >= navbarTop) {
        navbar.style.position = 'sticky';
        navbar.style.top = '0';
        navbar.style.bottom = '';
      } else {
        navbar.style.position = 'absolute';
        navbar.style.bottom = '0';
        navbar.style.top = '';
      }
    }

    // Add sticky navbar for larger screens only
    if (window.innerWidth > 700) {
      window.addEventListener('scroll', checkStickyNavbar);
    }

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', checkStickyNavbar);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav id="member-navbar">
      <HomeButton />
      <button className="hamburger-menu" onClick={toggleMobileMenu}>
        ☰
      </button>
      <ul className={isMobileMenuOpen ? 'mobile-menu' : 'desktop-menu'}>
        <li><a href='#calendar'>Calendar</a></li>
        <li><a href='#lessons'>Lessons</a></li>
        <li><a href='#workshop'>Workshop</a></li>
        <li><a href='#contact'>Contact</a></li>
      </ul>
    </nav>
  );
};

export default MemberNavbar;
