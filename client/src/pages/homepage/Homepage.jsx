import React from "react";
import Clients from "../../components/HomeComponents/Clients/Clients";
import Hero from "../../components/HomeComponents/Hero/Hero";
import Features from "../../components/HomeComponents/Features/Features";
import Marketplace from "../../components/HomeComponents/Marketplace/Marketplace";

const Homepage = () => {
  return (
    <main>
      <Hero />
      <Clients />
      <Marketplace />
      <Features />

      <section className="py-20">
        <div className="contain">
          <div className="surface-card p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-semibold">Get started</p>
              <h2 className="headline-display text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                Ready to build your distributed team?
              </h2>
              <p className="text-textMuted mt-3 max-w-[620px]">
                Join thousands of companies shipping faster with an on-demand expert workforce.
              </p>
            </div>
            <a
              href="/join"
              className="rounded-xl bg-primary px-6 py-3 text-white font-semibold hover:bg-accentHover transition-colors w-fit"
            >
              Create Workspace
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
