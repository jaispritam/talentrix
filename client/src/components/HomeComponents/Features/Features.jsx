import React from "react";
import { HiOutlineClipboardDocumentCheck, HiOutlineUserGroup, HiOutlineRocketLaunch } from "react-icons/hi2";

const Features = () => {
  const steps = [
    {
      icon: HiOutlineClipboardDocumentCheck,
      title: "1. Share your scope",
      detail: "Post your project brief, budget, timeline, and required skills in less than 5 minutes.",
    },
    {
      icon: HiOutlineUserGroup,
      title: "2. Match with experts",
      detail: "Receive curated freelancer matches with proven track records and transparent pricing.",
    },
    {
      icon: HiOutlineRocketLaunch,
      title: "3. Launch and scale",
      detail: "Manage delivery from one dashboard and scale teams as your roadmap grows.",
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-borderSubtle">
      <div className="contain">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-semibold">How it works</p>
          <h2 className="headline-display text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            A 3-step system for faster execution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div key={item.title} className="surface-card p-6 relative">
              <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5 text-indigo-600">
                <item.icon size={28} />
              </div>
              <h3 className="headline-display text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-textMuted mt-3 text-sm leading-6">{item.detail}</p>
              {index !== steps.length - 1 && (
                <span className="hidden md:block absolute top-12 -right-6 w-12 border-t-2 border-dashed border-indigo-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
