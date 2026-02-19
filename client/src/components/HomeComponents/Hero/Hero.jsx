import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { Axios } from "../../../config";
import { toast } from "react-toastify";
import useAuthStore from "../../../stores";

const Hero = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthStore();

  const handleBecomeSeller = async () => {
    if (!authUser) {
      toast.error("Please login to become a seller.", {
        position: "bottom-right",
        autoClose: 1500,
      });
      navigate("/join");
      return;
    }

    try {
      const res = await Axios.put("/api/users/become-seller");
      setAuthUser(res.data);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/add-gig");
    } catch (error) {
      toast.error(error?.response?.data || "Failed to become a seller.", {
        position: "bottom-right",
        autoClose: 1500,
      });
    }
  };

  return (
    <section className="pt-32 pb-20">
      <div className="contain">
        <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.22em] text-indigo-600 font-semibold">
              Talent infrastructure for fast teams
            </p>
            <h1 className="headline-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05]">
              Build with the world&apos;s best freelance talent network.
            </h1>
            <p className="text-lg text-textMuted max-w-[560px]">
              Talentrix helps startups and enterprises source vetted specialists, manage delivery, and scale output in days.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate("/gigs")}
                className="rounded-xl bg-primary px-6 py-3 text-white font-semibold hover:bg-accentHover transition-colors"
              >
                Hire Talent
              </button>
              <button
                onClick={handleBecomeSeller}
                className="rounded-xl border border-borderSubtle bg-white px-6 py-3 text-slate-800 font-semibold hover:bg-slate-50 transition-colors"
              >
                Become a Seller
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="surface-card p-6 rounded-2xl">
              <div className="h-[340px] rounded-2xl bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-50 border border-indigo-100 relative overflow-hidden">
                <div className="absolute top-5 left-5 bg-white rounded-xl shadow-box px-4 py-3 w-[190px]">
                  <p className="text-xs text-textMuted">Hiring Velocity</p>
                  <h3 className="headline-display text-2xl font-bold text-slate-900">+184%</h3>
                  <p className="text-xs text-indigo-600 font-semibold">last 30 days</p>
                </div>

                <div className="absolute top-24 right-6 bg-white rounded-xl shadow-box px-4 py-3 w-[170px]">
                  <p className="text-xs text-textMuted">Open Projects</p>
                  <h3 className="headline-display text-2xl font-bold text-slate-900">32</h3>
                </div>

                <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl border border-indigo-100 p-4 shadow-box">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-slate-900">Team Performance</p>
                    <span className="text-indigo-600 text-xs font-semibold flex items-center gap-1">
                      +23%
                      <HiArrowRight size={14} />
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-indigo-100">
                      <div className="h-full w-[78%] rounded-full bg-indigo-600" />
                    </div>
                    <div className="h-2 rounded-full bg-violet-100">
                      <div className="h-full w-[62%] rounded-full bg-violet-500" />
                    </div>
                    <div className="h-2 rounded-full bg-blue-100">
                      <div className="h-full w-[86%] rounded-full bg-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-violet-200/70 blur-2xl" />
                <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-indigo-200/70 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
