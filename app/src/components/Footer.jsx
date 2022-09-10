import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Footer.css";
import Logo from "../img/nav-logo.png";
import Logo2 from "../img/logo-head.png";
import { AiOutlineTwitter, AiOutlineInstagram, AiOutlineGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start mt-5">
      <div className="container">
        <div className="row justify-content-center flex-column-reverse flex-lg-row">
          <div className="col-sm-12 col-lg-7">
            <div className="footer-logo pb-4">
              <img src={Logo} alt="Psicoreinventar logo" />
            </div>
            <p className="py-2 px-2 footer-paragraph">
              En caso de emergencia, por favor utilice alguno de estos recursos en vez de este
              sitio.
            </p>
            <div className="container px-2">
              <a
                className="nav-link me-2 mb-1 footer-paragraph fw-semibold text-primary"
                target="_blank"
                rel="noreferrer"
                href="https://www.gob.cl/saludablemente/"
              >
                Saludable Mente
              </a>
              <div className="container"></div>
              <a
                className="nav-link me-2 footer-paragraph fw-semibold text-primary"
                target="_blank"
                rel="noreferrer"
                href="http://asistenciaalsuicida.com/telefono-de-la-esperanza-chile/"
              >
                Teléfono de la Esperanza
              </a>
            </div>
            <div className="container py-4 px-2">
              <a
                href="/#"
                className="me-3 text-reset social-media-icon"
                aria-label="Twitter"
                title="Twitter"
              >
                <AiOutlineTwitter size="1.375rem" />
              </a>
              <a
                href="/#"
                className="me-3 text-reset social-media-icon"
                aria-label="Instagram"
                title="Instagram"
              >
                <AiOutlineInstagram size="1.375rem" />
              </a>
              <a
                href="/#"
                className="me-3 text-reset social-media-icon"
                aria-label="Linkedin"
                title="Linkedin"
              >
                <FaLinkedinIn size="1.375rem" />
              </a>
              <a
                href="https://github.com/samuelpalaciosdev/final-project"
                target="_blank"
                rel="noreferrer"
                className=" me-1 text-reset social-media-icon fa-lg"
              >
                <AiOutlineGithub size="1.375rem" />
              </a>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 col-xl-3">
            <div className="image-logo-head mt-0 mb-4">
              <img src={Logo2} alt="Psicoreinventar logo" style={{ width: "2rem" }} />
            </div>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <Link
                className="btn btn-primary btn-md footer-btn appointment-btn mb-3"
                style={{ padding: ".5em 2em" }}
                to="/appointment"
              >
                Agendar cita
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-center text-center p-2 pt-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        }}
      >
        <p className="footer-copy-paragraph">&copy; 2022 - Developed by</p>
        <p className="footer-copy-paragraph ps-2" style={{ color: "#0d6efd" }}>
          Team <i className="fa-solid fa-spa"></i> Hope
        </p>
      </div>
    </footer>
  );
};

export default Footer;
