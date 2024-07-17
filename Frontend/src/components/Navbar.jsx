import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
// import { UserContext } from "../context/UserContext"

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  // console.log(prompt)

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);
  // console.log(user)
  // const {user}=useContext(UserContext)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-5 py-4 md:px-[200px] md:space-x-2 ">
        <h1 className="text-lg font-extrabold md:text-xl">
          <Link to="/">BlogSphere</Link>
        </h1>
        {path === "/" && (
          <div className="flex items-center space-x-2 md:space-x-0">
            <p
              onClick={() =>
                navigate(prompt ? "?search=" + prompt : navigate("/"))
              }
              className="cursor-pointer mx-3"
            >
              <BsSearch />
            </p>
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="py-2 text-center md:px-4 px-2 w-[70%] md:w-full rounded-full border-[0.5px] border-gray-300"
              placeholder="Search a post"
              type="text"
            />
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-4">
          {user ? (
            <h3>
              <Link to="/write">Write</Link>
            </h3>
          ) : (
            <h3>
              <Link to="/login">Login</Link>
            </h3>
          )}
          {user ? (
            <div onClick={showMenu}>
              <p className="relative cursor-pointer">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
          ) : (
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>
        <div onClick={showMenu} className="text-lg md:hidden">
          <p className="relative cursor-pointer">
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
