import React from "react";
import { Link } from "react-router-dom";

const Projects = ({ item }) => {
  return (
    <Link to={`/`} className="relative inline-block cursor-pointer w-[240px] lg:w-[280px] mx-4 surface-card overflow-hidden">
      <div className="w-full flex items-start flex-col">
        <img
          src={item.img}
          alt={item.description}
          className="w-full h-[300px] object-cover hover:opacity-85 transition-opacity duration-300"
        />
        <div className="w-full flex items-center justify-start gap-2 px-4 bg-surface py-4 border-t border-borderSubtle">
          <div className="w-10 h-10">
            <img src={item.userImg} alt={item.description} className="w-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="text-textPrimary font-semibold text-sm">{item.title}</h2>
            <p className="text-textMuted text-sm font-normal">{item.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Projects;
