import { PenLine, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../Services/END_POINTS/DASHBOARD.JS";
import { DEALS_URLS } from "../../../Services/END_POINTS/DASHBOARD.JS";

const DealDetails = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState({});
  const getDeal = async () => {
    try {
      const { data } = await axiosInstance.get(DEALS_URLS.GET_DEAL(id));
      console.log(data);

      setDeal(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDeal();
  }, []);
  return (
    <div>
      <div className=" p-4 bg-[#EAEEF4]  flex items-center gap-6">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex-1 grid gr md:grid-cols-3 gap-4 text-gray-700">
          <div>
            <p className="text-sm font-semibold">Customer</p>
            <p className="font-medium">Deanna Annis</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Email</p>
            <p className="font-medium">brodrigues@gmail.com</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Phone</p>
            <p className="font-medium">617-952-4069</p>
          </div>
        </div>
      </div>
      <div className=" mx-auto p-6 bg-white shadow-lg border border-gray-200 flex justify-between">
        <div>
          {" "}
          <h2 className="text-xl lg:text-3xl font-bold text-[#092C4C]">
            {deal.city}
          </h2>
          <h3 className="ext-xl lg:text-3xl  font-bold text-[#092C4C]">
            {deal.streetAddress}
          </h3>
        </div>
        <div className=" md:flex items-center">
          <button className="mx-3">
            <Trash2
              size={38}
              className="text-[#7E92A2] border rounded-full p-2"
            />
          </button>
          <button className="mx-3">
            <PenLine
              size={38}
              className="text-[#7E92A2] border rounded-full p-2"
            />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-6 mt-4 text-gray-700 ">
          <div>
            <p className="text-sm text-[#7E92A2]">Progress</p>
            <p className="font-bold text-[#526477]">{deal.progress}</p>
          </div>
          <div>
            <p className="text-sm text-[#7E92A2]">Appointment Date</p>
            <p className="font-bold text-[#526477]">{deal.appointmentDate}</p>
          </div>
          <div>
            <p className="text-sm text-[#7E92A2]">Room Area</p>
            <p className="font-bold text-[#526477]">{deal.roomArea}</p>
          </div>
          <div>
            <p className="text-sm text-[#7E92A2]">Number of people</p>
            <p className="font-bold text-[#526477]">{deal.numberOfPeople}</p>
          </div>
          <div>
            <p className="text-sm text-[#7E92A2]">Price</p>
            <p className="font-bold text-[#526477]">{deal.price}</p>
          </div>
          <div>
            <p className="text-sm text-[#7E92A2]">Room Access</p>
            <p className="font-bold text-[#526477]">doorman</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-[#7E92A2]">Special Instructions</p>
          <p className="font-medium text-[#526477]">
            {deal.specialInstructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DealDetails;
