import React from "react";
import { MdMail } from "react-icons/md";
import { ordersColumns } from "../../data/data";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../config";
import requests from "../../libs/request";
import useAuthStore from "../../stores";
import loader from "../../assets/icons/loader.svg";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => Axios.get(`${requests.orders}`).then((res) => res.data),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const res = await Axios.get(`${requests.conversations}/single/${id}`);
      navigate(`/messages/${res.data.id}`);
    } catch (err) {
      if (err?.response?.status === 404) {
        const res = await Axios.post(`${requests.conversations}/`, {
          to: authUser.seller ? buyerId : sellerId,
        });
        navigate(`/messages/${res.data.id}`);
      }
    }
  };

  const tableActions = data?.map((item) => ({
    image: (
      <div className="w-14 h-14">
        <img src={item.img} alt={item.username} className="w-full h-full object-cover rounded-full border border-borderSubtle" />
      </div>
    ),
    title: <p className="w-full flex items-center justify-start text-textPrimary">{item.title}</p>,
    price: <p className="w-full flex items-center justify-start text-textPrimary">${item.price}</p>,
    actions: (
      <div
        className="w-9 h-9 cursor-pointer bg-primary hover:bg-accentHover rounded-full flex items-center justify-center text-white"
        onClick={() => handleContact(item)}
      >
        <MdMail size={18} />
      </div>
    ),
  }));

  return (
    <main className="section-pad-mobile pb-10">
      <div className="contain">
        <div className="w-full flex flex-col items-start gap-5">
          <h2 className="text-2xl font-bold headline-display">Orders</h2>
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
                className="w-[320px]"
              />
              <h2 className="text-3xl text-primary font-medium">No Order Data</h2>
            </div>
          ) : (
            <div className="w-full overflow-x-auto surface-card p-4">
              <table className="w-full min-w-[680px]">
                <thead className="h-[35px]">
                  <tr>
                    {ordersColumns?.map((head, i) => (
                      <th key={i} className="text-left text-textMuted text-sm font-semibold leading-[18px] pb-2">
                        {head.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="w-full">
                  {tableActions?.map((row, i) => (
                    <tr key={i} className="text-sm leading-5 w-full border-t border-borderSubtle even:bg-elevated/55">
                      {ordersColumns?.map((col, j) => (
                        <td key={j} className="first:text-left text-sm text-textPrimary font-medium text-center py-2">
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

export default Orders;
