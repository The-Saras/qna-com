
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white flex justify-between items-center p-4">
      {/* Title */}
      <h2 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        QNA.Com
      </h2>

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <li
          className="cursor-pointer text-lg hover:text-green-400 transition duration-200"
          onClick={() => navigate("/signup")}
        >
          Signup
        </li>
        <li
          className="cursor-pointer text-lg hover:text-green-400 transition duration-200"
          onClick={() => navigate("/login")}
        >
          LogIn
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
