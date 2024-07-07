import React, { useState } from "react";
import { Header } from "../header/Header.jsx";
import { Footer } from "../footer/Footer.jsx";
import { urlUser } from "../../../endpoints/Endpoints.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textSuccess, setTextSuccess] = useState("");
  const [textError, setTextError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/IniciarSesion");
  }

  const userDto = {
    name: name,
    address: address,
    email: email,
    password: password,
    rol:"user"
  };

  const extraerNombre = (e) => {
    setName(e.target.value);
  };

  const extraerDireccion = (e) => {
    setAddress(e.target.value);
  };

  const extraerEmail = (e) => {
    setEmail(e.target.value);
  };

  const extraerPassword = (e) => {
    setPassword(e.target.value);
  };

  const validarDatos = () => {
    if (!name || name.length < 5 || name.length > 12) {
      setTextError("El nombre debe tener entre 5 y 12 caracteres");
      return false;
    }
    if (!address || address.length < 5 || address.length > 25) {
      setTextError("La dirección debe tener entre 5 y 25 caracteres");
      return false;
    }
    if (!email || email.length < 5 || email.length > 38) {
      setTextError("El email debe tener entre 5 y 38 caracteres");
      return false;
    }
    if (!password || password.length < 5 || password.length > 12) {
      setTextError("La contraseña debe tener entre 5 y 12 caracteres");
      return false;
    }
    return true;
  };

  const agregarUsuario = async () => {
    if (!validarDatos()) {
      return;
    }
    try {
      const response = await axios.post(`${urlUser}/Save/`, userDto, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setTextSuccess("SE HA AGREGADO CORRECTAMENTE - REDIRIGIENDO...");
        setTextError("");
        setTimeout(() => {
          navigate("/IniciarSesion");
        }, 2000);
      } else {
        setTextError(response.data);
      }
    } catch (error) {
      if (error.response) {
        setTextError(`Error al agregar usuario: ${error.response.data}`);
      } else {
        setTextError("Error al agregar usuario");
      }
      console.error("Error al agregar usuario:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="main_register">
        <section className="row">
          <article className="col section_register_img">
            <img src="/img_register.webp" alt="" className="img-fluid" />
          </article>

          <article className="col section_inputs_register">
            <h2 className="h2_register">REGISTRO</h2>
            <p className="p_register">
              NOS ALEGRA SABER, QUE QUIERES SER PARTE DE NUESTRA COMUNIDAD {":)"}
            </p>

            <div className="div_input_register">
              <input
                type="text"
                placeholder="UserName"
                className="input_register"
                onChange={extraerNombre}
                required
                maxLength={10}
                minLength={5}
              />
              <input
                type="text"
                placeholder="Address"
                className="input_register"
                onChange={extraerDireccion}
                required
                maxLength={22}
                minLength={5}
              />
              <input
                type="email"
                placeholder="Email"
                className="input_register"
                onChange={extraerEmail}
                required
                maxLength={38}
                minLength={5}
              />
              <input
                type="password"
                placeholder="Password"
                className="input_register"
                onChange={extraerPassword}
                required
                maxLength={10}
                minLength={5}
              />
            </div>

            <div className="mensaje_registro">
              {textSuccess && <p className="p_success_registro_correcto">{textSuccess}</p>}
              {textError && <p className="p_success_registro_incorrecto">{textError}</p>}
            </div>

            <div className="div_button_registrarse">
              <button
                type="button"
                className="botón_registrarse"
                onClick={agregarUsuario}
              >
                REGISTRARSE
              </button>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
