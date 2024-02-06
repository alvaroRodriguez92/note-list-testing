import { useContext, useState, useEffect, createContext } from "react";

const AuthContext = createContext({
  login: () => {},
  submitNote: () => {},
  getNotes: () => {},
  logout: () => {},
  register: () => {},
  deleteNote: () => {},
  setNotes: () => {},
  notes: null,
  user: null,
  registerMessage: null,
  errorMessage: null,
});

// eslint-disable-next-line react/prop-types
export default function AuthContextProvider({ children }) {
  //Definimos token que sera lo que determine si un usuario está logueado o no
  const [user, setUser] = useState(null);

  //Definimos las notas del usuario
  const [notes, setNotes] = useState(null);

  //Definimos mensaje de error para el formulario de login
  const [errorMessage, setErrorMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  //Definimos nuestra funcion de login que devolverá un token que almacenaremos en el localStorage, y nos redireccionará al
  //apartado de configuracion

  async function login(username, password, e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    if(response.status==200){
      const data = await response.json();
      
        setUser(data);
        setErrorMessage("Welcome " + username + " ! 😗");
        setRegisterMessage("");
    } else{
      setErrorMessage("Error introducing credentials")
    }
    
  }

  //Get notes
  async function getNotes() {
    const response = await fetch(`http://localhost:3001/notes/${user?.userID}`);
    const data = await response.json();
    console.log(data, "data de getnotes");
    setNotes(data);
  }

  useEffect(() => {
    getNotes();
  }, [user]);


  //Register

  async function register(values, setValues, e) {
    e.preventDefault();
    console.log(values);
    if (values.password == values.repeatPassword) {
      const response = await fetch("http://localhost:3001/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (response.status == 200) {
        setRegisterMessage("Gracias por registrarte! Ahora puedes hacer login");
        setValues({ username: "", password: "", repeatPassword: "" });
      } else if(response.status == 400){
        setRegisterMessage("Usuario ya registrado");
      }
      else {
        setRegisterMessage("Error al intentar registrarse.");
      }
    } else {
      setRegisterMessage(
        "Las contraseñas son distintas. Por favor intentelo de nuevo."
      );
    }
  }

    //Submit nota
    
  async function submitNote(nota, setNoteInput) {
    const response = await fetch("http://localhost:3001/notes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nota: nota, userID: user.userID }),
    });

    if (response.status == 200) {
      const data = await response.json();
      setNotes(data);
      setNoteInput("");
    } else {
      alert("Errooorrr");
    }
  }

  //Funcion de logout

  function logout() {
    setErrorMessage(null)
    setUser(null);
  }

  //Funcion para borrar nota

  async function deleteNote(id, userID) {
    const response = await fetch(`http://localhost:3001/notes/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: userID }),
    });
    if(response.status==200){
      const data = await response.json()
      setNotes(data)
    }
  }

  //Definimos los values que usaremos de nuestro context
  const value = {
    user,
    login,
    errorMessage,
    submitNote,
    notes,
    getNotes,
    logout,
    register,
    registerMessage,
    deleteNote,
    setNotes,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  return useContext(AuthContext);
}
