import { useContext, useState } from "react";
import { useEffect } from "react";
import { Context } from "../store/appContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegCreditCard } from "react-icons/fa";
import "../styles/Card.css";

const ServiceCardShowCase = ({ index, image, name, time, price }) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="col-md-6 col-lg-4">
      <div
        className="card service-card showcase-card h-100 text-center p-3"
        id={index}
        style={{ width: "18rem" }}
      >
        {/* <img
          src={image}
          className="card-img-top mx-auto"
          alt="service-icon"
          style={{ height: "180px", width: "205px" }}
        /> */}
        <LazyLoadImage
          src={image}
          className="card-img-top mx-auto"
          alt="service-icon"
          style={{ height: "180px", width: "205px" }}
        />
        <div className="card-body">
          <h5 className="card-title mb-4 fw-bold">{name}</h5>
          <div className="service-info d-flex justify-content-between">
            <div className="service-time d-flex align-items-center me-5">
              <AiOutlineClockCircle size="1.75rem" className="me-2" />
              <span className="fw-semibold service-text">{time}</span>
            </div>
            <div className="service-price d-flex align-items-center">
              <FaRegCreditCard size="1.625rem" className="me-2" />
              <span className="fw-semibold service-text">{price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardShowCase;
