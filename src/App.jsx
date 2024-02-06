import Main from "./View/Main";
import "./index.css";
import AuthContextProvider from "./Context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
}
1
export default App;
