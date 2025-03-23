import { CalendarDays, Dot } from "lucide-react";

import { Link } from "react-router-dom";
import { openDealModal } from "../../../redux/features/dealModalReducer";
import { useDispatch } from "react-redux";

const NextAppointment = ({ deals }) => {
  const dispatch = useDispatch();
   const handleOpenModal = () => {
  
      dispatch(openDealModal("newDeal"));
    };
  const NoAppointments = () => (
  <div className="bg-[#514EF3] w-[268px] h-[355px] flex flex-col items-center justify-between rounded-[12px] border border-[#EAEEF4] px-4 py-3">
    <div className="flex flex-col items-center mt-32">
      <CalendarDays className="text-[#D6E1E6] mb-2"/>
      <p className="text-[#D6E1E6] text-sm">No upcoming appointments</p>
    </div>
    <button onClick={handleOpenModal} className="rounded-full bg-white w-full py-3 cursor-pointer">Add Deal?</button>
  </div>
);
  if (!deals || deals.length === 0) {
    return <NoAppointments />;
  }
  return (
    <div>
      <div className="bg-[#514EF3] w-[268px] h-[355px] flex flex-col rounded-[12px] border border-[#EAEEF4] px-4 py-3">
        <div className="w-full h-full baackroundImage">
          <h1 className="text-white flex justify-between items-center mb-5">
            Next Appointment{" "}
            <span className="me-5">
              <Dot size={35} />
            </span>
          </h1>
          <div className="flex my-8">
            <div className="w-10 h-10 rounded-full bg-[#ECECFE] "></div>
            <div className="flex flex-col ms-2 justify-center">
              <h2 className="text-sm text-white font-bold">{deals[0]?.city}</h2>
              <p className="text-xs font-[100] text-gray-50">
                {deals[0]?.streetAddress}
              </p>
            </div>
          </div>
          <div className="my-8">
            <p className="text-xs font-[100] text-gray-50">Appointment Date</p>
            <h1 className="text-sm text-white font-medium">
              {deals[0]?.appointmentDate}
            </h1>
          </div>
          <div className="flex my-8">
            <div className="me-8">
              {" "}
              <p className="text-xs font-[100] text-gray-50">Room Area</p>
              <h1 className="text-sm text-white font-medium">
                {deals[0]?.roomArea}m2
              </h1>
            </div>
            <div>
              {" "}
              <p className="text-xs font-[100] text-gray-50">People</p>
              <h1 className="text-sm text-white font-medium">
                {deals[0]?.numberOfPeople}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="me-8">
              {" "}
              <p className="text-xs font-[100] text-gray-50">Price</p>
              <h1 className="text-sm text-white font-medium">
                $ {deals[0]?.price}
              </h1>
            </div>
            <Link
              to={`/dashboard/deals/${deals[0]?.id}`}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900  bg-white rounded-full border border-[#EAEEF4]  "
            >
              See Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextAppointment;
