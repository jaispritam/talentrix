import React from "react";
import { Link } from "react-router-dom";
import { BsTwitter, BsLinkedin, BsGithub } from "react-icons/bs";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { title: "Platform", items: ["Marketplace", "Pricing", "Security"] },
    { title: "Company", items: ["About", "Careers", "Press"] },
    { title: "Resources", items: ["Blog", "Guides", "Help Center"] },
  ];

  return (
    <footer className="border-t border-borderSubtle bg-white pt-14 pb-8">
      <div className="contain">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="headline-display text-2xl font-extrabold text-slate-900">talentrix</h3>
            <p className="text-sm text-textMuted mt-3 max-w-[260px]">
              A premium platform for hiring and scaling high-performance freelance teams.
            </p>
            <div className="flex items-center gap-3 mt-4 text-textMuted">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="tap-target flex items-center justify-center hover:text-slate-900">
                <BsTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="tap-target flex items-center justify-center hover:text-slate-900">
                <BsLinkedin />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="tap-target flex items-center justify-center hover:text-slate-900">
                <BsGithub />
              </a>
            </div>
          </div>

          {links.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-slate-900">{col.title}</h4>
              <div className="flex flex-col gap-2 mt-3">
                {col.items.map((item) => (
                  <Link key={item} to="/" className="text-sm text-textMuted hover:text-slate-900">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-borderSubtle mt-10 pt-5 flex items-center justify-between flex-col sm:flex-row gap-3">
          <p className="text-sm text-textMuted">Copyright {year} Talentrix. All rights reserved.</p>
          <div className="flex items-center gap-5 text-sm text-textMuted">
            <Link to="/" className="hover:text-slate-900">Privacy</Link>
            <Link to="/" className="hover:text-slate-900">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
