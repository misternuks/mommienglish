'use client';

import { useEffect, useState } from 'react';

import HomeButton from './HomeButton';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const navbar = document.getElementById('navbar');

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
    <nav id="navbar">
      <HomeButton />
      <button className="hamburger-menu" onClick={toggleMobileMenu}>
        ☰
      </button>
      <ul className={isMobileMenuOpen ? 'mobile-menu' : 'desktop-menu'}>
        <li><a href='/#service'>サービス内容</a></li>
        <li className="hide-this-bar">|</li>
        <li><a href='/#fee'>料金</a></li>
        <li className="hide-this-bar">|</li>
        <li><a href='/#contact'>お問い合わせ</a></li>
        <li className="hide-this-bar">|</li>
        <li><a href='/members'>受講生専用Page</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
