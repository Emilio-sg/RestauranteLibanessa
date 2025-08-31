 import React from 'react';
import '../styles/libanessa.css';

const Footer = () => (
  <footer className="footer-libanessa bg-light text-center py-3 mt-5">
    <div className="container">
      <div className="mb-2">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon mx-2" aria-label="Instagram">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer-icon mx-2" aria-label="TikTok">
          <i className="bi bi-tiktok"></i>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon mx-2" aria-label="Facebook">
          <i className="bi bi-facebook"></i>
        </a>
      </div>
      <div className="mb-1">
        <small>&copy; {new Date().getFullYear()} Restaurante Libanessa. Todos los derechos reservados.</small>
      </div>
      <div>
        <small>Dirección: Distrito Nacional, Santo Domingo, RD.</small>
      </div>
    </div>
  </footer>
);

export default Footer;