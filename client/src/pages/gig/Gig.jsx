import React from "react";
import GigsDetails from "../../components/GigsContents/SingleGigContent/GigsDetails";
import GigsOrder from "../../components/GigsContents/SingleGigContent/GigsOrder";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../config";
import loader from "../../assets/icons/loader.svg";
import requests from "../../libs/request";

const Gig = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => Axios.get(`${requests.gigs}/single/${id}`).then((res) => res.data),
  });
  const userId = data?.userId;

  return (
    <main className="section-pad-mobile pb-10">
      <div className="contain">
        {isLoading ? (
          <div className="flex items-center justify-center w-full py-8">
            <img src={loader} alt="loading" className="w-[40px]" />
          </div>
        ) : error ? (
          <p className="text-xl text-red-400 font-normal">Error: Something went wrong</p>
        ) : (
          <div className="w-full flex items-start justify-between gap-6 flex-col lg:flex-row">
            <div className="w-full lg:w-[70%]">
              <GigsDetails data={data} id={id} userId={userId} />
            </div>
            <div className="w-full lg:w-[30%] sticky top-36">
              <GigsOrder data={data} id={id} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Gig;
