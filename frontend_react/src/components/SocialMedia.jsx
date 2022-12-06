import React from "react";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a
        href="https://facebook.com/pikesh1212"
        target="_blank"
        rel="noreferrer"
      >
        <FaFacebookF />
      </a>
    </div>
    <div>
      <a
        href="https://linkedin.com/in/its-pikesh"
        target="_blank"
        rel="noreferrer"
      >
        <BsLinkedin />
      </a>
    </div>

    <div>
      <a
        href="https://instagram.com/pikesh1212"
        target="_blank"
        rel="noreferrer"
      >
        <BsInstagram />
      </a>
    </div>
  </div>
);

export default SocialMedia;
