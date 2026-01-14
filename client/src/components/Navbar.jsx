import { useContext } from "react"
import { assets } from "../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext)

  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      <div className="flex items-center gap-2 sm:gap-5">
        { user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700 cursor-pointer"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credit left : { credit }
              </p>
            </button>

            <p className="text-gray-600 max-sm:hidden pl-4 capitalize">Hi, {user.name}</p>
            <div className="relative group cursor-pointer">
              <img
                src={assets.profile_icon}
                alt=""
                className="w-10 drop-shadow-2xl"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="m-0 p-[6px] bg-white rounded-md text-sm">
                  <li onClick={logout} className="py-1 px-2 cursor-pointer pr-10">LogOut</li>
                </ul>
              </div>
            </div>
          </div>
        ) : ( 
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>
            <button 
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 cursor-pointer text-sm rounded-full"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
