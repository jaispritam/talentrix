import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../config";
import { messageColumns } from "../../data/data";
import requests from "../../libs/request";
import useAuthStore from "../../stores";
import loader from "../../assets/icons/loader.svg";
import moment from "moment";

const Messages = () => {
  const { authUser } = useAuthStore();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversation"],
    queryFn: () => Axios.get(`${requests.conversations}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => Axios.put(`${requests.conversations}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const tableActions = data?.map((item) => {
    const unread = (authUser?.isSeller && !item?.readBySeller) || (!authUser?.isSeller && !item?.readByBuyer);
    return {
      buyer: <p className={`py-4 text-xs font-semibold w-[90px] md:w-full md:text-sm truncate px-2 ${unread ? "bg-elevated" : ""}`}>{authUser?.isSeller ? item.buyerId : item.sellerId}</p>,
      lastMessage: (
        <Link to={`/messages/${item.id}`} className={`w-full flex items-center text-xs md:text-sm justify-start text-textMuted border-x border-borderSubtle h-full py-4 px-2 ${unread ? "bg-elevated" : ""}`}>
          {item?.lastMessage?.substring(0, 100)}...
        </Link>
      ),
      date: (
        <p className={`w-full flex items-center text-xs md:text-sm font-semibold text-textMuted justify-start h-full py-4 border-r border-borderSubtle px-2 ${unread ? "bg-elevated" : ""}`}>
          {moment(item.updatedAt).fromNow()}
        </p>
      ),
      action: (
        <div className={`w-full flex items-start justify-start h-full py-3 px-2 ${unread ? "bg-elevated" : ""}`}>
          {unread && (
            <button className="bg-primary/85 hover:bg-primary text-white w-fit py-2 px-2 rounded text-xs md:text-sm" onClick={() => handleRead(item.id)}>
              Mark as Read
            </button>
          )}
        </div>
      ),
    };
  });

  return (
    <main className="section-pad-mobile pb-10">
      <div className="contain">
        <div className="w-full flex flex-col items-start gap-5">
          <h2 className="text-2xl font-bold headline-display">Messages</h2>
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
                alt="empty"
                className="w-full md:w-[350px]"
              />
              <h2 className="text-3xl text-primary font-medium">No Messages</h2>
            </div>
          ) : (
            <div className="w-full overflow-x-auto surface-card p-4">
              <table className="w-full min-w-[680px]">
                <thead className="h-[35px]">
                  <tr>
                    {messageColumns?.map((head, i) => (
                      <th key={i} className="text-left text-textMuted text-sm font-semibold leading-[18px] pb-2">
                        {head.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="w-full">
                  {tableActions?.map((row, i) => (
                    <tr key={i} className="text-sm leading-5 w-full border-t border-borderSubtle">
                      {messageColumns?.map((col, j) => (
                        <td key={j} className="first:text-left text-sm text-textPrimary font-medium text-center">
                          {row[col.field]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Messages;
