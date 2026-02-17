import React from "react";
import { Link } from "react-router-dom";
import { marketsData } from "../../../data/data";
import { HiArrowRight } from "react-icons/hi";

const Marketplace = () => {
  return (
    <section className="py-20">
      <div className="contain">
        <div className="flex items-start justify-between gap-6 mb-10 flex-col md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-semibold">Specializations</p>
            <h2 className="headline-display text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Find specialists by domain
            </h2>
          </div>
          <Link to="/gigs" className="text-indigo-600 font-semibold inline-flex items-center gap-2 hover:text-indigo-700">
            Browse all categories <HiArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketsData.slice(0, 8).map((item) => (
            <Link
              to="/gigs"
              key={item.id}
              className="surface-card p-6 min-h-[240px] flex flex-col items-start justify-between hover:-translate-y-1 transition-transform"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <img src={item.icon} alt={item.title} className="w-8 h-8" />
              </div>
              <div>
                <h3 className="headline-display text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-textMuted">Top-rated experts ready to deliver for this category.</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
