import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Slides = ({ children, rowId, text, distance }) => {
  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowId);
    if (!slider) return;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft > 0) {
      slider.scrollLeft = slider.scrollLeft - distance;
    } else {
      slider.scrollLeft = maxScrollLeft;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById("slider" + rowId);
    if (!slider) return;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft < maxScrollLeft) {
      slider.scrollLeft = slider.scrollLeft + distance;
    } else {
      slider.scrollLeft = 0;
    }
  };

  return (
    <section className="py-12">
      <div className="contain">
        <div className="flex flex-col items-start gap-4 w-full">
          {text && <h2 className="text-2xl md:text-3xl font-bold text-textPrimary headline-display">{text}</h2>}
          <div className="relative flex items-center group w-full">
            <button
              onClick={slideLeft}
              className="bg-elevated text-textPrimary rounded-full absolute opacity-0 group-hover:opacity-100 cursor-pointer z-10 hidden md:flex tap-target items-center justify-center border border-borderSubtle"
              aria-label="Slide left"
            >
              <MdChevronLeft size={26} />
            </button>
            <div id={"slider" + rowId} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
              {children}
            </div>
            <button
              onClick={slideRight}
              className="bg-elevated right-0 text-textPrimary rounded-full absolute opacity-0 group-hover:opacity-100 cursor-pointer z-10 hidden md:flex tap-target items-center justify-center border border-borderSubtle"
              aria-label="Slide right"
            >
              <MdChevronRight size={26} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slides;
