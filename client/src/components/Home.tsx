import CreateQna from "./CreateQna";
import QnaState from "./QnaState";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState("");

  async function fetchName() {
    const headers: HeadersInit = {
      authorization: localStorage.getItem("jwtToken") || "",
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers,
      });
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchName();
  }, []);

  if (name) {
    return (
      <>
        
        <div className="container mx-auto px-4 py-6">
          <CreateQna />
          <QnaState />
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
          <h3 className="text-3xl font-semibold text-gray-700">
            Please signup to continue
          </h3>
        </div>
      </>
    );
  }
};

export default Home;
