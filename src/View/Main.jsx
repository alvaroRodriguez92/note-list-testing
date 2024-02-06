import Login from "../component/Login/Login";
import Register from "../component/Register/Register"
import Note from "../component/Note/Note";
import { useAuthContext } from "../Context/AuthContext";

export default function Main() {
  const { errorMessage, user,logout } = useAuthContext();
//PASAR LO DE ABAJO AL COMPONENTE LOGIN
  return (
    <>
      {user?.userID ? (
        <div className="welcome-container">
          <h1>{errorMessage}</h1>
          <button onClick={logout} className="button-logout">Logout</button>
        </div>
      ) : (
        <div className="div-login-register"><Login /> <Register/></div> 
      )}
      <Note />
    </>
  );
}
