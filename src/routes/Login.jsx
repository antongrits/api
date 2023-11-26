import { useContext, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../utils/validation";
import { z } from "zod";
import uuid from "react-uuid";
import API from "../utils/API";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogin() {
    try {
      User.parse({
        email,
        date: Date.now(),
        id: uuid(),
      });
      setErrors(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
        return;
      }
      return;
    }

    API.getUserByParams({ email, password })
      .then((user) => {
        setErrors(null);
        userContext.onChange(user);
        navigate("/");
      })
      .catch(() =>
        setErrors({
          noUser: {
            _errors: ["User not found. Incorrect email or password"],
          },
        })
      );
  }

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      <h1 className="text-5xl text-center">Log in</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-3/4 max-w-sm p-2 text-2xl outline-none bg-gray-200"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        required
      />
      {errors?.email && (
        <div className="text-red-500">{errors?.email?._errors}</div>
      )}
      <input
        type="password"
        placeholder="Password"
        className="w-3/4 max-w-sm p-2 text-2xl outline-none bg-gray-200"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        className="w-2/4 max-w-xs p-3 outline-none bg-gray-200 transition duration-300 ease-linear hover:bg-gray-400 hover:text-white"
        onClick={handleLogin}
      >
        Log in
      </button>
      {errors?.noUser?._errors && (
        <div className="text-red-500">{errors?.noUser?._errors}</div>
      )}
      <Link
        className="text-center transition duration-300 ease-linear hover:text-blue-600"
        to="/signup"
      >
        Do not have an account yet? Sign up
      </Link>
    </div>
  );
}
