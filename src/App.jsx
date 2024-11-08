import { useContext } from "react";
import { UserContext, UserContextProvider } from "./ReactContext";
import { Register } from "./components"
import axios from "axios"
import Routes from "./components/Routes";

function App() {
  // define some defaults for axios
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  axios.defaults.withCredentials = true; // can be use so you can set cookies from the api  
  
  return (
    <>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
        
    </>
  )
}

export default App
