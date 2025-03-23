import { ChevronDown, Funnel, Image, PenLine } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "../../redux/features/dealsReducer";
import { openDealModal } from "../../redux/features/dealModalReducer";

const Deals = () => {
  const dispatch = useDispatch();
  const { deals, loading, error } = useSelector((state) => state.deals);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(8);
  const loadMore = () => {
    setVisible((prevVisible) => prevVisible + 5);
  };
  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);
  return (
    <section className="p-10 relateve">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">
          Total: <span>136</span> deals
        </h1>
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#092C4C] bg-white border border-[#EAEEF4] rounded-full font-medium text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Sort by:
            <ChevronDown />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm  mt-2">
              <ul className="p-3 space-y-3 text-sm text-gray-700 ">
                <li>
                  <div className="flex items-center">
                    <input
                      id="checkbox-item-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm f"
                    />
                    <label
                      htmlFor="checkbox-item-1"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Default checkbox
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <input
                      defaultChecked
                      id="checkbox-item-2"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm "
                    />
                    <label
                      htmlFor="checkbox-item-2"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Checked state
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          )}
          <button className="text-[#092C4C] bg-white border border-[#EAEEF4] rounded-full font-medium text-sm px-5 py-2.5 text-center inline-flex items-center ms-3">
            filtter <Funnel size={15} className="ms-2" />
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="p-4">
                <Image className="text-gray-400" />
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Area
              </th>
              <th scope="col" className="px-6 py-3">
                Appointment Date
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
            </tr>
          </thead>

          <tbody>
            {deals.slice(0, visible).map((deal, idx) => (
              <tr key={idx} className="bg-white border-b  border-gray-200  ">
                <td className="w-4 p-4">
                  <div className="w-10 h-10 rounded-full bg-[#D6E1E6]" />
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  <div className="font-normal text-gray-500">
                    {deal.streetAddress}
                  </div>
                </th>
                <td className="px-6 py-4">{deal.roomArea}</td>
                <td className="px-6 py-4">{deal.appointmentDate}</td>
                <td className="px-6 py-4">{deal.price}</td>
                <td className="px-6 py-4">
                  <div
                    type="button"
                    className="text-[#514EF3] bg-[#ECECFE] font-medium rounded-full text-[10px] px-5 py-2.5 text-center me-2  "
                  >
                    {deal.progress}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      dispatch(
                        openDealModal({
                          modalType: "editDeal",
                          dealData: deal,
                        }),
                      )
                    }
                  >
                    <PenLine className="text-gray-400 cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible < deals.length && (
          <div className="flex justify-center my-4 ">
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-[#514EF3] text-white rounded-full disabled:opacity-50"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Deals;
