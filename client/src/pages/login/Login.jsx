import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import CustomizeInput from "../../utils/Input/CustomizeInput";
import { Link } from "react-router-dom";
import { Axios } from "../../config";
import requests from "../../libs/request";
import { loginSchema } from "../../schemas";
import { toast } from "react-toastify";
import loader from "../../assets/icons/loader.svg";
import useAuthStore from "../../stores";

const Login = ({ show, setShow }) => {
  const { setAuthUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShow]);

  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = async (payload, actions) => {
    setLoading(true);
    try {
      const res = await Axios.post(requests.login, payload);
      setAuthUser(res.data);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      toast.success("Login Successfully", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });
      setShow(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
        toast.error(error?.response?.data, {
          position: "bottom-right",
          toastId: 1,
          autoClose: 1500,
        });
      } else {
        toast.error(error?.response?.message, {
          position: "bottom-right",
          toastId: 1,
          autoClose: 1500,
        });
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const { handleChange, values, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit,
    });

  const getError = (key) => {
    return touched[key] && errors[key];
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (show) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [show]);

  return (
    <section
      className={`fixed inset-0 z-[120] bg-black/55 p-4 sm:p-6 flex items-center justify-center transition-opacity duration-300 ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-[440px]">
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: "-150px" }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ type: "spring", duration: 0.45 }}
          className="w-full min-h-[450px] max-h-[90vh] border border-[#E2E8F0] rounded-xl bg-white p-4 md:p-8 overflow-y-auto text-darkColor flex flex-col items-center relative shadow-xl"
        >
          <h2 className="w-full text-center text-2xl font-bold">
            Sign In to Fiverr
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-full mt-10"
          >
            <CustomizeInput
              showLabel={false}
              htmlFor="username"
              label="Username"
              labelClassName="text-sm font-medium text-darkColor"
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getError("username")}
              id="username"
              placeholder="Johndoe"
              className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
            />
            <CustomizeInput
              showLabel={false}
              htmlFor="password"
              label="Password"
              labelClassName="text-sm font-medium text-darkColor"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getError("password")}
              id="password"
              placeholder="********"
              className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
            />
            <button
              type="submit"
              className="mt-5 bg-primary/80 hover:bg-primary w-full rounded-md text-white py-2 text-base font-semibold"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <img src={loader} alt="/" className="w-[40px]" />
                </div>
              ) : (
                <p className="flex items-center justify-center gap-2">Login</p>
              )}
            </button>
          </form>
          <div
            onClick={() => setShow(false)}
            className="w-full border-t absolute bottom-0 py-4 bg-white z-10 px-8 flex items-center justify-center text-sm font-semibold text-darkColor gap-2"
          >
            Not a member yet?
            <Link to="/join" className="text-primary">
              Join now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
