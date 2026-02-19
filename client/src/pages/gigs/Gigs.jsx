import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../config";
import loader from "../../assets/icons/loader.svg";
import requests from "../../libs/request";
import { useLocation } from "react-router-dom";
import { BiHomeAlt, BiChevronDown } from "react-icons/bi";
import GigsCards from "../../components/GigsContents/GigsCards/GigsCards";

const Gigs = () => {
  const { search } = useLocation();
  const [open, setOpen] = React.useState(false);
  const [sort, setSort] = React.useState("sales");
  const [cat, setCat] = React.useState("");
  const minRef = React.useRef();
  const maxRef = React.useRef();

  const reSort = (types) => {
    setSort(types);
    setOpen(false);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort, cat],
    queryFn: () =>
      Axios.get(
        `${requests.gigs}?min=${minRef.current?.value || ""}&max=${maxRef.current?.value || ""}&cat=${cat}&sort=${sort}`
      ).then((res) => res.data),
  });

  React.useEffect(() => {
    refetch();
  }, [sort, cat, refetch]);

  const apply = () => {
    refetch();
  };

  const newSearch = search.split("?cat=");
  const newCat = newSearch[1];
  const findData = data?.length === 0 ? null : data?.find((item) => item?.cat === newCat);

  return (
    <main className="section-pad-mobile pb-10">
      <div className="contain">
        <div className="flex items-start flex-col gap-5">
          <div className="flex items-center gap-3 text-textMuted font-medium text-sm">
            <BiHomeAlt size={12} />
            <span>/</span>
            <span>{findData?.shortTitle || "Design"}</span>
            <span>/</span>
            <span>{findData?.title || "Freelancers"}</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold headline-display text-textPrimary">Web Development</h2>
          <p className="text-base font-medium text-textMuted">
            Find a freelance web development expert to build your website.
          </p>

          <div className="w-full surface-card p-4 flex md:items-center justify-between flex-col md:flex-row gap-4">
            <div className="flex md:items-center items-start gap-2 flex-col md:flex-row w-full">
              <p className="text-sm font-semibold text-textMuted">Budget:</p>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  ref={minRef}
                  placeholder="min"
                  className="border border-borderSubtle bg-base w-[50%] md:w-[140px] outline-none px-3 h-[40px] rounded-md text-textPrimary placeholder:text-textMuted"
                />
                <input
                  type="text"
                  placeholder="max"
                  ref={maxRef}
                  className="border border-borderSubtle bg-base w-[50%] md:w-[140px] outline-none px-3 h-[40px] rounded-md text-textPrimary placeholder:text-textMuted"
                />
                <button onClick={apply} className="w-fit bg-primary text-white text-sm font-semibold py-2 px-5 rounded-md hover:bg-accentHover">
                  Apply
                </button>
              </div>
            </div>

            <div className="flex md:items-center justify-end gap-2">
              <p className="text-sm font-semibold text-textMuted">Sort by:</p>
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 h-[40px] rounded-md text-textPrimary border border-borderSubtle bg-base"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <p className="text-sm">{sort === "sales" ? "Best Selling" : "Newest"}</p>
                  <span className={`${open ? "rotate-180" : "rotate-0"} transition-all duration-300`}>
                    <BiChevronDown size={20} />
                  </span>
                </button>
                <div className={`${open ? "flex" : "hidden"} flex-col bg-surface border border-borderSubtle rounded-md absolute w-[150px] top-11 right-0 z-10`}>
                  {sort === "sales" ? (
                    <button onClick={() => reSort("createdAt")} className="px-4 py-2 w-full text-left text-textMuted text-sm hover:bg-elevated">
                      Newest
                    </button>
                  ) : (
                    <button onClick={() => reSort("sales")} className="px-4 py-2 w-full text-left text-textMuted text-sm hover:bg-elevated">
                      Best Selling
                    </button>
                  )}
                  <button onClick={() => reSort("sales")} className="px-4 py-2 w-full text-left text-textMuted text-sm hover:bg-elevated">
                    Popular
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center gap-3">
            <p className="text-sm font-semibold text-textMuted">Category:</p>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="border border-borderSubtle bg-base px-3 h-[40px] rounded-md text-textPrimary outline-none"
            >
              <option value="">All</option>
              <option value="web">Web Development</option>
              <option value="design">Design</option>
              <option value="music">Music</option>
              <option value="animation">Animation</option>
            </select>
          </div>

          <div className={`w-full grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 lg:grid-cols-4 items-start gap-6 ${isLoading || error || data?.length === 0 ? "flex" : "grid"}`}>
            {isLoading ? (
              <div className="flex items-center justify-center w-full py-8">
                <img src={loader} alt="loading" className="w-[40px]" />
              </div>
            ) : error ? (
              <p className="text-xl text-red-400 font-normal">Error: Something went wrong</p>
            ) : data?.length === 0 ? (
              <div className="flex items-center justify-center mt-5 flex-col w-full">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-4344461-3613889.png"
                  alt="no result"
                  className="w-[320px]"
                />
                <h2 className="text-2xl md:text-4xl text-primary font-medium text-center">No Result</h2>
              </div>
            ) : (
              data?.map((item) => <GigsCards key={item._id} item={item} />)
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Gigs;
