import { useState } from "react";
import { z } from "zod";
import { User } from "../utils/validation";
import uuid from "react-uuid";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/API";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  function handleSignUp() {
    const newUser = {
      email,
      password,
      date: Date.now(),
      id: uuid(),
    };

    try {
      User.parse(newUser);
      setErrors(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
        return;
      }
    }

    if (password !== repeatPassword) {
      setErrors({ _errors: ["Passwords don't match"] });
      return;
    }

    API.getUserByParams({ email })
      .then(() =>
        setErrors({ _errors: ["A user with this email already exists"] })
      )
      .catch(() => {
        setErrors(null);
        API.sendUser(newUser);
        navigate("/login");
      });
  }

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      <h1 className="text-5xl text-center">Sign up</h1>
      <input
        type="email"
        className="w-3/4 max-w-sm p-2 text-2xl outline-none bg-gray-200"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        required
      />
      {errors?.email && (
        <div className="text-red-500">{errors?.email?._errors}</div>
      )}
      <input
        type="password"
        className="w-3/4 max-w-sm p-2 text-2xl outline-none bg-gray-200"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {errors?.password && (
        <div className="text-red-500">
          {errors?.password?._errors.map((err) => (
            <div className="text-center" key={uuid()}>
              {err}
            </div>
          ))}
        </div>
      )}
      <input
        type="password"
        className="w-3/4 max-w-sm p-2 text-2xl outline-none bg-gray-200"
        placeholder="Repeat password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        required
      />
      {errors?._errors && <div className="text-red-500">{errors?._errors}</div>}
      <button
        className="w-2/4 max-w-xs p-3 outline-none bg-gray-200 transition duration-300 ease-linear hover:bg-gray-400 hover:text-white"
        onClick={handleSignUp}
      >
        Sign up
      </button>
      <Link
        className="text-center transition duration-300 ease-linear hover:text-blue-600"
        to="/"
      >
        Already have an account? Log in
      </Link>
    </div>
  );
}
