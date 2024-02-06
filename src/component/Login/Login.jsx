import { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";

export default function Login() {

    const [username, setUsername] =useState("")
    const [password, setPassword] =useState("")
    const {login,errorMessage} = useAuthContext()

    function handleUsername(e){
        setUsername(e.target.value)
    }

    function handlePassword(e){
        setPassword(e.target.value)
    }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={(e)=>login(username,password,e)}>
        <div>
          <label className="label-form" htmlFor="Username">Username</label>
          <input placeholder="Username" value={username} onChange={(e)=>handleUsername(e)} />
        </div>
        <div>
          <label className="label-form" htmlFor="Password"  >Password</label>

          <input type="password" placeholder="Password" value={password} onChange={(e)=>handlePassword(e)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <span className="span-register">{errorMessage}</span>

    </div>
  );
}
