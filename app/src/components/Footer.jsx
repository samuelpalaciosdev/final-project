import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-7">
            <p className="py-2 px-2 footer-paragraph">
              En caso de emergencia, por favor utilice alguno de estos recursos
              en vez de este sitio.
            </p>
            <div className="container px-2">
              <a
                className="nav-link me-2 mb-1 footer-paragraph fw-semibold text-primary"
                target="_blank"
                href="https://www.gob.cl/saludablemente/"
              >
                Saludable Mente
              </a>
              <div className="container"></div>
              <a
                className="nav-link me-2 footer-paragraph fw-semibold text-primary"
                target="_blank"
                href="http://asistenciaalsuicida.com/telefono-de-la-esperanza-chile/"
              >
                Teléfono de la Esperanza
              </a>
            </div>
            <div className="container py-4 px-2">
              <a href="#" className="me-3 text-reset social-media-icon">
                <i className="fa-brands fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="me-3 text-reset social-media-icon">
                <i className="fa-brands fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="me-3 text-reset social-media-icon">
                <i className="fa-brands fa-linkedin-in fa-lg"></i>
              </a>
              <a
                href="https://github.com/samuelpalaciosdev/final-project"
                target="_blank"
                className=" me-1 text-reset social-media-icon fa-lg"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 col-xl-3">
            <div className="d-flex justify-content-center justify-content-lg-start">
              <Link
                className="btn btn-primary btn-md appointment-btn mb-3"
                style={{ padding: ".5em 2em" }}
                to="/appointment"
              >
                Agendar cita
              </Link>
            </div>

            <NavLink
              to="/specialists"
              className="nav-link fw-semibold link-gray me-2 mb-3"
            >
              Especialistas
            </NavLink>

            <NavLink
              className="nav-link fw-semibold link-gray me-2 mb-3"
              to="/register"
            >
              Regístrate
            </NavLink>
            <NavLink
              className="nav-link fw-semibold link-gray me-2 mb-3"
              to="/contact"
            >
              Contactar
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
