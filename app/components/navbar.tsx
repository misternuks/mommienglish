'use client';

import { useEffect } from 'react';

const Navbar = () => {
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

    window.addEventListener('scroll', checkStickyNavbar);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', checkStickyNavbar);
    };
  }, []);

  return (
    <nav id="navbar">
      <ul>
        <li><a href='/'>Home</a></li>
        <li>|</li>
        <li><a href='/#service'>サービス内容</a></li>
        <li>|</li>
        <li><a href='/#fee'>料金</a></li>
        <li>|</li>
        <li><a href='/#contact'>お問い合わせ</a></li>
        <li>|</li>
        <li><a href='/members'>受講生専用Page</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
