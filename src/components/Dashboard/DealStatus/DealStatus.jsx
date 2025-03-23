import { BriefcaseBusiness, MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const NoDealsInProgress = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <BriefcaseBusiness className="text-[#7E92A2] mx-3" />
      <h1 className="text-[#7E92A2] mx-3">No deals in progress.</h1>
    </div>
  );
};
const DealStatus = ({ deals }) => {
  return (
    <div className="w-[280px] h-[355px] md:w-[519px]  border border-[#EAEEF4] rounded-xl mb-10">
      {deals.length === 0 ? (
        <NoDealsInProgress />
      ) : (
        <>
          {" "}
          <div className="border-b border-[#EAEEF4] px-5">
            <div className="flex justify-between items-center mt-5 mb-2">
              <div className="flex ">
                <div className="w-13 h-13 rounded-full bg-[#ECECFE] hidden md:block"></div>
                <div className="flex flex-col ms-2 justify-center">
                  <h2 className="text-sm font-bold">{deals[0]?.city}</h2>
                  <p className="text-sm font-[100] text-[#7E92A2]">
                    {deals[0]?.streetAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div
                  type="button"
                  className="text-[#514EF3] bg-[#ECECFE] font-medium rounded-full text-[12px] px-5 py-2.5 text-center me-2  "
                >
                  {deals[0]?.progress}
                </div>
                <Link to={`/dashboard/deals/${deals[0]?.id}`}>
                  <MoveRight className="text-[#514EF3] hidden md:block" />
                </Link>
              </div>
            </div>
          </div>
          <div className="px-5 my-5 flex items-center">
            <div className="w-5 h-5 rounded-full bg-[#ECECFE] border-[15px] p-2 border-[#514EF3]" />
            <div className="mx-3">
              <p className="text-[#7E92A2] text-sm">17 Nov 2021</p>
              <h2 className="text-sm text-[#092C4C]">
                Installation of the new air conditioning system
              </h2>
            </div>
          </div>
          <div className="px-5 my-5 flex items-center">
            <div className="w-5 h-5 rounded-full bg-[#ECECFE] border-[15px] p-2 border-[#514EF3]" />
            <div className="mx-3">
              <p className="text-[#7E92A2] text-sm">17 Nov 2021</p>
              <h2 className="text-sm text-[#092C4C]">
                Installation of the new air conditioning system
              </h2>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <a className="text-[#514EF3]">Load More</a>
          </div>
        </>
      )}
    </div>
  );
};

export default DealStatus;
