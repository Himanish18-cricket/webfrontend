import { useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  useEffect(() => {
    axios.get(`${API_URL}/api/jobs`)
      .then(res => console.log(res.data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  return <h1>Recruititech Frontend Connected ✅</h1>;
}

export default App;
