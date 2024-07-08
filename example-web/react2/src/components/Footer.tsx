import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{ textAlign: "center", padding: "1em", background: "#f8f9fa" }}
    >
      <div>
        <a href="https://badge.fury.io/js/ps99-api">
          <img
            src="https://badge.fury.io/js/ps99-api.svg"
            alt="npm version"
            height="18"
          />
        </a>
        &nbsp;
        <a href="https://github.com/joekiller/node-ps99-api">
          <img
            src="https://img.shields.io/badge/source-github-blue?logo=github"
            alt="GitHub source"
            height="18"
          />
        </a>
      </div>
      <p>
        &copy; {new Date().getFullYear()} Joseph "
        <a
          href="https://joekiller.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          joekiller
        </a>
        " Lawson. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
