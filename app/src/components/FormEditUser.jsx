import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const FormEditUser = (props) => {
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
    watch,
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
      errors.phone ||
      errors.email ||
      errors.name ||
      errors.lastname ||
      errors.password ||
      errors.image
      
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //   // React hook form method
  const password = watch("password");

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
                <h5 className="fw-semibold">Editar usuario</h5>
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
                  <div className="col-md-5">
                    <label htmlFor="inputName" className="form-label">
                      Nombres
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombres"
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
                  <div className="col-md-5">
                    <label htmlFor="inputLastName" className="form-label">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Apellidos"
                      {...register("lastname", {
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
                      className={`form-control ${errors.lastname && "invalid-input"
                        }`}
                      value={store.lastname}
                      onChange={actions.handleChange}
                      id="inputLastName"
                    />
                    {errors.lastname && (
                      <span className="text-danger">
                        {errors.lastname?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <label htmlFor="inputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="johndoe@gmail.com"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        pattern: {
                          value:
                            // RFC 5322 regex
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "El formato no es el correcto",
                        },
                      })}
                      // If error, then add invalid-input class
                      className={`form-control ${errors.email && "invalid-input"
                        }`}
                      value={store.email}
                      onChange={actions.handleChange}
                      id="inputEmail1"
                    />
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <label htmlFor="inputPassword1" className="form-label">
                      Contraseña
                    </label>
                    <div className="input-password position-relative">
                      <input
                        // type="text"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "El campo es requerido",
                            // Verify if confirm password has the same value of password
                          },
                          pattern: {
                            value:
                              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                            message:
                              "La contraseña debe tener al menos 8 caracteres, incluyendo al menos: 1 mayúscula, 1 número y 1 caracter especial",
                          },
                        })}
                        // If error, then add invalid-input class
                        className={`form-control ${errors.password && "invalid-input"
                          }`}
                        value={store.password}
                        onChange={actions.handleChange}
                        id="inputPassword1"
                      />
                      <span
                        className="eye-icon fs-5 position-absolute top-0 end-0 me-4"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                      </span>
                    </div>

                    {errors.password && (
                      <span className="text-danger">
                        {errors.password?.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* Confirm Password */}
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <label
                      htmlFor="inputConfirmPassword"
                      className="form-label"
                    >
                      Confirmar Contraseña
                    </label>
                    <div className="input-password position-relative">
                      <input
                        // type="text"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmpassword"
                        placeholder="Contraseña"
                        {...register("confirmpassword", {
                          required: {
                            value: true,
                            message: "El campo es requerido",
                            // Verify if confirm password has the same value of password
                          },
                          validate: {
                            validate: (value) =>
                              value === password ||
                              "Las contraseñas no coinciden",
                          },
                        })}
                        // If error, then add invalid-input class
                        className={`form-control ${errors.confirmpassword && "invalid-input"
                          }`}
                        id="inputConfirmPassword"
                        pattern={store.password}
                      />
                      <span
                        className="eye-icon fs-5 position-absolute top-0 end-0 me-4"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <AiFillEye />
                        ) : (
                          <AiFillEyeInvisible />
                        )}
                      </span>
                    </div>

                    {errors.confirmpassword && (
                      <span className="text-danger">
                        {errors.confirmpassword?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <label htmlFor="inputPhone" className="form-label">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Teléfono"
                      {...register("phone", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        pattern: {
                          value: /^[0-9]{8,12}$/,
                          message: "Ingresa minimo 8 caracteres numéricos, Maximo 12",
                        },
                      })}
                      // If error, then add invalid-input class
                      className={`form-control ${errors.phone && "invalid-input"
                        }`}
                      value={store.phone}
                      onChange={actions.handleChange}
                      pattern="^\d{8,12}$"
                      id="inputPhone"
                    />

                    {errors.phone && (
                      <span className="text-danger">
                        {errors.phone?.message}
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
                  <div className="col-md-10">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "6.5rem" }}
                    >
                      Confirmar
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

export default FormEditUser;



