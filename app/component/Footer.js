import React from "react";

const Footer = () => {
  return (
    <footer className="py-3 px-6 text-center mt-36">
      <p className="m">Mere Kaam Ki List</p>
      <p className="mb-2">
        Built by <span className="underline">Shaikh Adnan</span>
      </p>
      <div className="flex justify-center space-x-4 my-8    ">
        <a
          href="https://github.com/ShaikhAdnan7621"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2   "
        >
          GitHub
        </a>
        <a
          href="https://www.youtube.com/channel/UCUkVVnN7IOnAWv4uqtcv28A"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2   "
        >
          YouTube
        </a>
        <a
          href="https://www.instagram.com/mr_silent7621/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2   "
        >
          Instagram
        </a>
      </div>

      <p className="mb-0 ">Check out my YouTube channel : Code ON finGER</p>
    </footer>
  );
};

export default Footer;
