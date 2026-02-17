import React, { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const MobileSidebar = ({ show, setShow, setLoginModal, authUser, handleLogout }) => {
  const showRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showRef.current && !showRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShow]);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  useEffect(() => {
    setShow(false);
  }, [pathname, setShow]);

  return (
    <div className={`fixed inset-0 z-50 bg-slate-900/20 ${show ? "block" : "hidden"}`}>
      <aside
        ref={showRef}
        className={`h-full w-[84%] max-w-[320px] bg-white shadow-soft p-5 transition-transform duration-300 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-borderSubtle">
          <h2 className="headline-display text-lg font-bold">Menu</h2>
          <button className="tap-target rounded-lg border border-borderSubtle" onClick={() => setShow(false)}>
            <FiX size={18} className="mx-auto" />
          </button>
        </div>

        <div className="pt-4 flex flex-col gap-2 text-sm font-semibold text-textPrimary">
          <NavLink to="/" className="tap-target rounded-md px-3 hover:bg-elevated flex items-center">Product</NavLink>
          <NavLink to="/gigs" className="tap-target rounded-md px-3 hover:bg-elevated flex items-center">Marketplace</NavLink>
          <NavLink to="/messages" className="tap-target rounded-md px-3 hover:bg-elevated flex items-center">Resources</NavLink>
        </div>

        <div className="mt-6 border-t border-borderSubtle pt-4 flex flex-col gap-3">
          {authUser ? (
            <>
              <NavLink to="/orders" className="tap-target rounded-md px-3 hover:bg-elevated flex items-center">Orders</NavLink>
              <NavLink to="/messages" className="tap-target rounded-md px-3 hover:bg-elevated flex items-center">Messages</NavLink>
              <button onClick={handleLogout} className="tap-target rounded-md px-3 text-left text-red-600 hover:bg-red-50">Logout</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/");
                  setShow(false);
                  setLoginModal(true);
                }}
                className="tap-target rounded-lg border border-borderSubtle text-sm font-semibold"
              >
                Sign in
              </button>
              <NavLink
                to="/join"
                className="tap-target rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center"
              >
                Start Hiring
              </NavLink>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

export default MobileSidebar;
