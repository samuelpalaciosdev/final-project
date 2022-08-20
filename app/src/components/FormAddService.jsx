import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";


const FormAddService = (props) => {
  // Using context
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => { }, []);

  //   // If user signed in, redirect to home page
  useEffect(() => {
    if (store.currentUser !== null) navigate("/");
  }, [store.currentUser]);

  //   // React hook form
  const {
    register,
    handleSubmit,
 
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = () => {
         //   If input is not filled
    if (
      //       // HOW TO MAKE IT NOT WORK IF USER ALREADY EXISTS, like
      //       // if (message === "User already exists") {

      //       // }
      
      errors.name ||
      errors.description ||
      errors.price ||
      errors.time
      
    ) {
      console.log("Form data not filled");
    } else {
      // If input is filled, go to the next step
      props.nextStep();
    }
  };

  const submitForm = (e) => {
    handleSubmit();
  };

 
  return (
    <>
      <div className="bg-primary py-4">
        <div
          className="card appointment-step-container py-4 mx-auto"
          style={{ minHeight: "505px", borderRadius: "5px", width:"500px"}}
        >
          <div className="container d-flex justify-content-md-center align-items-center mb-3">
            <div className="col-md-10">
              <div className="step-num-container d-flex align-items-center">
                {/* <span className="step-num rounded-circle bg-primary text-center pt-2 fw-semibold text-light me-3">
                    1
                  </span> */}
                <h5 className="fw-semibold p-2">Añadir servicio</h5>
              </div>
            </div>
          </div>
          <div className="register-form">
            <div className="container">
              {/* onSubmit={handleSubmit(onSubmit)}  */}
              <form
                onSubmit={(e) => {
                  handleSubmit(onSubmit)(e);
                  actions.handleRegister(e, navigate);
                }}
                // ACTIVATE THIS AFTER TEST
                id="form"
              >
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <label htmlFor="inputName" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Añade el nombre del servicio"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        pattern: {
                          value: /^[A-zÀ-ú]+$/,
                          message: "El formato no es el correcto",
                        },
                      })}
                      // If error, then add invalid-input class
                      className={`form-control ${errors.name && "invalid-input"
                        }`}
                      value={store.name}
                      onChange={actions.handleChange}
                      id="inputName"
                    />

                    {errors.name && (
                      <span className="text-danger">
                        {errors.name?.message}
                      </span>
                    )}
                  </div>
                  </div>

                  <div className="row justify-content-center">
                  <div className="col-md-10">
                    <label htmlFor="inputDescription" className="form-label">
                      Descripción
                    </label>
                    <input
                      type="text"
                      name="description"
                      style={{height:"80px"}}
                      placeholder="Añade una descripción del servicio"
                      {...register("description", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        pattern: {
                          value: /^[\w\d\s\.\'\,\-\!\@\#\$\&\*\`\~\[\]\?\<\>\"\:\;\\\/\{\}\|\%\^\(\)\+\=]{4,500}$/,
                          message: "El formato no es el correcto",
                        },
                      })}
                      // If error, then add invalid-input class
                      className={`form-control ${errors.description && "invalid-input"
                        }`}
                      value={store.description}
                      onChange={actions.handleChange}
                      id="inputDescription"
                    />

                    {errors.description && (
                      <span className="text-danger">
                        {errors.description?.message}
                      </span>
                    )}
                  </div>
                  </div>
                
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <label htmlFor="inputPrice" className="form-label">
                      Tarifa
                    </label>
                    <input
                      type="text"
                      name="price"
                      placeholder="Indica la tarifa del servicio"
                      {...register("price", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        pattern: {
                          value: /^[0-9][0-9]+$/,
                          message: "Minimo 8 caracters, Maximo 12",
                        },
                      })}
                      // If error, then add invalid-input class
                      className={`form-control ${errors.price && "invalid-input"
                        }`}
                      value={store.price}
                      onChange={actions.handleChange}
                      pattern="^\d{8,12}$"
                      id="inputPrice"
                    />

                    {errors.price && (
                      <span className="text-danger">
                        {errors.price?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <label htmlFor="inputTime" className="form-label">
                      Duración
                    </label>
                    <input
                      type="texto"
                      name="time"
                      placeholder="Indica la duración del servicio"
                      {...register("time", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        pattern: {
                          value:
                            // RFC 5322 regex
                            /^[0-9][0-9]+$/,
                          message: "Asegúrate de que el formato sea el correcto",
                        },
                      })}
                      // If error, then add invalid-input class
                      className={`form-control ${errors.time && "invalid-input"
                        }`}
                      value={store.time}
                      onChange={actions.handleChange}
                      id="inputTime"
                    />
                    {errors.time && (
                      <span className="text-danger">
                        {errors.time?.message}
                      </span>
                    )}
                  </div>
                </div>


                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <label htmlFor="inputImage" className="form-label">
                      Imagen
                    </label>
                    <input
                      type="text"
                      name="image"
                      placeholder="Imagen"
                      {...register("image", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        pattern: {
                          value: /^[a-z A-Z]+$/,
                          message: "Minimo 8 caracters, Maximo 12",
                        },
                      })}
                      // If error, then add invalid-input class
                      className={`form-control ${errors.image && "invalid-input"
                        }`}
                      value={store.image}
                      onChange={actions.handleChange}
                      pattern="^\d{8,12}$"
                      id="inputImage"
                    />

                    {errors.image && (
                      <span className="text-danger">
                        {errors.image?.message}
                      </span>
                    )}
                  </div>
                </div>
                
                

                <div className="container d-flex justify-content-md-center align-items-center mt-4 mb-3">
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "6.5rem" }}
                    >
                      Agregar servicio
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormAddService;