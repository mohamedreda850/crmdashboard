import NextAppointment from "./NextAppointment/NextAppointment";
import RecentDeals from "./RecentDeals/RecentDeals";
import CustomersAndDeals from "./CustomersAndDeals/CustomersAndDeals";
import DealStatus from "./DealStatus/DealStatus";
import Caustomers from "./Customers/Customers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDeals } from "../../redux/features/dealsReducer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { deals } = useSelector((state) => state.deals);
  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);
  return (
    <div className="grid xl:grid-cols-[70%30%] self- h-full ">
      <div className="grid grid-cols-1 xl:grid-cols-[40%60%] h-full gap-2 lg:gap-5 ms-5 mt-5">
        <NextAppointment deals={deals.slice(0, 1)} />
        <RecentDeals deals={deals.slice(0, 4)} />
        <CustomersAndDeals deals={deals.length} customers={0}/>
        <DealStatus deals={deals.slice(0, 1)} />
      </div>

      <Caustomers customers={0} activity={0}/>
    </div>
  );
};

export default Dashboard;
