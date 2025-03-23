import { BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";
const NoDeals = () => {
  return (
    <div className="w-full flex mt-5">
      <BriefcaseBusiness className="text-[#7E92A2] mx-3" />
      <h1 className="text-[#7E92A2]">No deals found.</h1>
    </div>
  );
};
const RecentDeals = ({ deals }) => {
  return (
    <div className="w-[280px] h-[355px] md:w-[519px] flex flex-col rounded-[12px] border border-[#EAEEF4] px-5 py-3">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-[18px]">Recent Deals</h1>
          <Link
            to="/dashboard/deals"
            className="font-medium text-[#514EF3] text-sm"
          >
            View All
          </Link>
        </div>
        <div>
          {deals.length === 0 ? (
            <NoDeals />
          ) : (
            deals.map((deal, idx) => (
              <div key={idx} className="flex justify-between items-center mt-5">
                <div className="flex ">
                  <div className="w-13 h-13 rounded-full bg-[#ECECFE] "></div>
                  <div className="flex flex-col ms-2 justify-center">
                    <h2 className="text-sm font-bold">{deal.streetAddress}</h2>
                    <p className="text-sm font-[100] text-[#7E92A2]">
                      {deal.city}
                    </p>
                  </div>
                </div>
                <div className="text-end hidden md:block">
                  <h2 className="text-sm font-bold"> {deal.price}</h2>
                  <p className="text-sm font-[100] text-[#7E92A2]">
                    {deal.appointmentDate}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentDeals;
