import { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const { register, registerMessage } = useAuthContext();

  function handleValues(e) {
    setValues((currentValue) => ({
      ...currentValue,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="login-container">
      <h1>Register</h1>
      <form
        className="login-form"
        onSubmit={(e) => register(values, setValues, e)}
      >
        <div>
          <label className="label-form" htmlFor="Username">
            Username
          </label>
          <input
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={(e) => handleValues(e)}
          />
        </div>
        <div>
          <label className="label-form" htmlFor="Password">
            Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => handleValues(e)}
          />
        </div>
        <div>
          <label className="label-form" htmlFor="RepeatPassword">
            Repeat Password
          </label>

          <input
            name="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            value={values.repeatPassword}
            onChange={(e) => handleValues(e)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <span className="span-register">{registerMessage}</span>
    </div>
  );
}
