import { ListChecks, MoveRight, PencilLine, PenLine, SquareKanban } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { openCustomerModal } from "../../../redux/features/customerModalReducer";
const NoCustomers = () => {
  return (
    <div className="flex my-2">
      <ListChecks className="text-[#7E92A2] mx-3" />
      <h1 className="text-[#7E92A2] mx-3">No upcoming tasks found.</h1>
    </div>
  );
};
const NoActivity = () => {
  return (
    <div className="flex my-2">
      <SquareKanban className="text-[#7E92A2] mx-3" />
      <h1 className="text-[#7E92A2] mx-3">No upcoming tasks found.</h1>
    </div>
  );
};
const Customers = ({ customers, activity ,dispatch}) => {
  return (
    <div className="bg-[#EEF6FB] p-8">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-[18px] ">Customers</h1>
        <Link to="/dashboard/customers" className="text-[#514EF3] text-sm font-medium">View All</Link>
      </div>
      {customers ? (
        <>
          <div>
          {customers.map((customer ,idx)=>( <div key={idx} className="flex justify-between items-center">
              <div className="flex items-center mt-5">
                <div className="w-12 h-12 bg-[#D6E1E6] rounded-full" />
                <div className="ms-3">
                  <h2 className="text-[#092C4C] font-bold">{customer.firstName} {customer.lastName}Deanna Annis</h2>
                  <p className="text-[#7E92A2] text-sm font-light">
                    {customer.email}
                  </p>
                </div>
              </div>
              <button
                    onClick={() =>
                      dispatch(
                        openCustomerModal({
                          modalType: "editCustomer",
                          customerData: customer,
                        })
                      )
                    }
                  >
                    <PenLine className="text-gray-400 cursor-pointer" />
                  </button>
              
            </div>))}
           
            
          </div>
        </>
      ) : (
        <NoCustomers />
      )}{" "}
      <div className="flex justify-between px-5 pt-5">
        <h1 className="font-bold text-[18px] text-[#092C4C]">Tasks To Do</h1>
        <Link to="" className="text-[#514EF3] font-medium text-[14px]">
          View All
        </Link>
      </div>
      {activity ? (
        <div className="bg-[#F6FAFD] rounded-xl  mt-5">
          <div className="px-5">
            <div>
              <div className="flex items-center mt-5">
                <p className="text-[#FE8084] text-[14px] me-12"> 30 Nov 2021</p>
                <p className="text-[14px] text-[#092C4C]">
                  Meeting with partners
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center mt-5">
                <p className="text-[#FE8084] text-[14px] me-12"> 30 Nov 2021</p>
                <p className="text-[14px] text-[#092C4C]">
                  Meeting with partners
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center mt-5">
                <p className="text-[#7E92A2] text-[14px] me-12"> 30 Nov 2021</p>
                <p className="text-[14px] text-[#092C4C]">
                  Meeting with partners
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center mt-5">
                <p className="text-[#7E92A2] text-[14px] me-12"> 30 Nov 2021</p>
                <p className="text-[14px] text-[#092C4C]">
                  Meeting with partners
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white py-5 px-8 mt-5 rounded-b-xl flex justify-between items-center">
            <p className="text-[#7E92A2] text-[14px]">Add new task</p>
            <Link className="text-[#514EF3]">
              <MoveRight />
            </Link>
          </div>
        </div>
      ) : (
        <NoActivity />
      )}
    </div>
  );
};

export default Customers;
