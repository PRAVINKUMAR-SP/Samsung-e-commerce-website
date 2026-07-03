import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const empty = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState("");

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async () => {
    setMsg("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setMsg("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMsg("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (response.ok) {
        setMsg("Registration Successful!");
        setForm(empty);
        setMode("login");
      } else {
        const error = await response.text();
        setMsg(error || "Registration Failed");
      }
    } catch (err) {
      setMsg("Server Error");
      console.error(err);
    }
  };

  const login = async () => {
    setMsg("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (response.ok) {
        const user = await response.json();

        localStorage.setItem("currentUser", JSON.stringify(user));

        navigate("/");
        window.location.reload();
      } else {
        setMsg("Invalid Email or Password");
      }
    } catch (err) {
      setMsg("Server Error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-yellow-400 flex items-center justify-center p-4 md:p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          RajaRam AIRCON
        </h1>

        <p className="text-center text-gray-500 mb-6">
          {mode === "login"
            ? "Login to your account"
            : "Create New Account"}
        </p>

        {mode === "register" && (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={change}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-blue-600"
          />
        )}

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={change}
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-blue-600"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={change}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-blue-600"
        />

        {mode === "register" && (
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={change}
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-blue-600"
          />
        )}

        {msg && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {msg}
          </p>
        )}

        {mode === "login" ? (
          <>
            <button
              onClick={login}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
              Login
            </button>

            <p className="text-center mt-5">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setMode("register");
                  setMsg("");
                }}
                className="text-blue-600 font-semibold"
              >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <button
              onClick={register}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg transition"
            >
              Create Account
            </button>

            <p className="text-center mt-5">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  setMsg("");
                }}
                className="text-blue-600 font-semibold"
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>

    </div>
  );
}