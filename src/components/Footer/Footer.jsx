import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 by TheDarkStag</p>
      <div className="social-icons">
        <a 
          href="https://github.com/TheDarkStag" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <FaGithub />
        </a>
        <a 
          href="https://www.linkedin.com/in/akinbile-abdulmumeen-704a2a251/" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin />
        </a>
        <a 
          href="https://x.com/Dark_Stag" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Twitter Profile"
        >
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
}

export default Footer;