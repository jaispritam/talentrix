import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Login from "../../pages/login/Login";
import useAuthStore from "../../stores";
import Avatar from "../../assets/icons/avatar.jpg";
import { toast } from "react-toastify";
import { Axios } from "../../config";
import requests from "../../libs/request";
import MobileSidebar from "./MobileSidebar/MobileSidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { authUser, removeAuthUser } = useAuthStore();
  const [openDrop, setOpenDrop] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenDrop(false);
    setShowLink(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await Axios.post(requests.logout);
      removeAuthUser();
      toast.success("Logout Successfully", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed top-0 z-30 w-full border-b border-borderSubtle bg-surface/95 backdrop-blur">
      <div className="contain">
        <div className="h-[76px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLink(true)}
              className="lg:hidden tap-target rounded-lg border border-borderSubtle text-textPrimary"
              aria-label="Open menu"
            >
              <FaBars size={18} className="mx-auto" />
            </button>
            <Link to="/" className="text-3xl font-extrabold headline-display tracking-tight text-textPrimary">
              talentrix
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-textMuted">
            <NavLink to="/" className="hover:text-textPrimary transition-colors">
              Product
            </NavLink>
            <NavLink to="/gigs" className="hover:text-textPrimary transition-colors">
              Marketplace
            </NavLink>
            <NavLink to="/messages" className="hover:text-textPrimary transition-colors">
              Resources
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {authUser ? (
              <div className="relative" ref={modalRef}>
                <button
                  className="flex items-center gap-2 rounded-full border border-borderSubtle px-2 py-1.5"
                  onClick={() => setOpenDrop((prev) => !prev)}
                >
                  <img
                    src={authUser.img || Avatar}
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:block text-sm max-w-[130px] truncate">{authUser.username}</span>
                </button>
                <div
                  className={`absolute top-12 right-0 w-[210px] surface-card p-2 z-40 ${
                    openDrop ? "block" : "hidden"
                  }`}
                >
                  {authUser?.isSeller && (
                    <>
                      <NavLink to="/myGigs" className="tap-target px-3 rounded-md hover:bg-elevated flex items-center text-sm">
                        My Gigs
                      </NavLink>
                      <NavLink to="/add" className="tap-target px-3 rounded-md hover:bg-elevated flex items-center text-sm">
                        Add Gig
                      </NavLink>
                    </>
                  )}
                  <NavLink to="/orders" className="tap-target px-3 rounded-md hover:bg-elevated flex items-center text-sm">
                    Orders
                  </NavLink>
                  <NavLink to="/messages" className="tap-target px-3 rounded-md hover:bg-elevated flex items-center text-sm">
                    Messages
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="tap-target px-3 rounded-md hover:bg-red-50 flex items-center text-sm text-red-600 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/");
                    setLoginModal(true);
                  }}
                  className="hidden sm:flex text-sm font-semibold text-textMuted hover:text-textPrimary"
                >
                  Sign in
                </button>
                <NavLink
                  to="/join"
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-accentHover transition-colors"
                >
                  Start Hiring
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      <MobileSidebar
        show={showLink}
        setShow={setShowLink}
        setLoginModal={setLoginModal}
        authUser={authUser}
        handleLogout={handleLogout}
      />
      <Login show={loginModal} setShow={setLoginModal} />
    </header>
  );
};

export default Navbar;
