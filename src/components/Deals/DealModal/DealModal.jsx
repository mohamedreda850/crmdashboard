import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDealModal } from "../../../redux/features/dealModalReducer";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  addDeal,
  fetchDeals,
  updateDeal,
} from "../../../redux/features/dealsReducer";
import { toast } from "react-toastify";

const DealModal = () => {
  const dispatch = useDispatch();
  const dealModalState = useSelector((state) => state.dealModal);
  const { isOpen, modalType, dealData } = dealModalState;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      roomArea: "",
      numberOfPeople: "",
      appointmentDate: "",
      specialInstructions: "",
      price: "",
      progress: "IN PROGRESS",
    },
  });
  useEffect(() => {
    if (modalType === "editDeal" && dealData) {
      setValue("streetAddress", dealData.streetAddress);
      setValue("city", dealData.city);
      setValue("state", dealData.state);
      setValue("zipCode", dealData.zipCode);
      setValue("roomArea", dealData.roomArea);
      setValue("numberOfPeople", dealData.numberOfPeople);
      setValue("appointmentDate", dealData.appointmentDate.split("T")[0]);
      setValue("specialInstructions", dealData.specialInstructions);
      setValue("price", dealData.price);
      setValue("progress", dealData.progress);
    }
  }, [modalType, dealData, setValue]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      if (modalType === "editDeal" && dealData) {
        await dispatch(
          updateDeal({ id: dealData.id, dealData: data }),
        ).unwrap();
        toast.info("Deal Updated");
      } else {
        await dispatch(addDeal(data)).unwrap();
        toast.info("Deal Saved");
      }
      dispatch(fetchDeals());
      dispatch(closeDealModal());
      reset();
    } catch (error) {
      console.error("Failed to process deal:", error);
      // Optionally, show an error toast here.
    }
  };
  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full "
    >
      <div className="relative p-4 w-full max-w-lg max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
            <h3 className="text-[18px] font-bold text-[#092C4C]">
              {modalType === "editDeal" ? "Edit Deal" : "Add New Deal"}
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400  bg-gray-200  rounded-full w-5 h-5 ms-auto inline-flex justify-center items-center "
              onClick={() => dispatch(closeDealModal())}
            >
              <X size={10} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="font-bold">Address</label>
                <div>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                    placeholder="Street Address"
                    required
                    {...register("streetAddress", { required: true })}
                  />
                </div>
                <div className="flex mt-4 space-x-1">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 flex-2"
                    placeholder="City"
                    required
                    {...register("city", { required: true })}
                  />
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 flex-1"
                    placeholder="State "
                    {...register("state", { required: true })}
                    required
                  />
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 flex-1"
                    placeholder="Zip Code"
                    {...register("zipCode", { required: true })}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-full">
                  <label className="font-bold">Room Area (m2)</label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                    required
                    {...register("roomArea", { required: true })}
                  />
                </div>
                <div className="w-full">
                  <label className="font-bold"># of People</label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    required
                    {...register("numberOfPeople", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="font-bold">Appointment Date</label>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                  required
                  {...register("appointmentDate", { required: true })}
                />
              </div>
              <div>
                <label className="font-bold">Special Instructions</label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                  required
                  {...register("specialInstructions", { required: true })}
                />
              </div>
              <div className="flex space-x-2">
                <div className="w-full">
                  <label className="font-bold">Room Access</label>
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg f block w-full p-2.5 "
                  >
                    <option selected>Keys with doorman</option>
                    <option value="US">Key with reseptionest</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="font-bold">Price ($)</label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                    required
                    {...register("price", { required: true })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center  flex-2 ">
                  <label className="font-bold me-2">Progress</label>
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg w-full block  p-2.5 "
                    {...register("progress", { required: true })}
                  >
                    <option selected>IN PROGRESS</option>
                    <option value="US">CLOSED</option>
                    <option value="US">OPEN</option>
                  </select>
                </div>
                <div className="flex justify-between ">
                  <button
                    onClick={() => dispatch(closeDealModal())}
                    className="text-[14px] font-medium mx-3 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#514EF3] focus:ring-4 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center cursor-pointer"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : modalType === "editDeal"
                        ? "Update Deal"
                        : "Save Deal"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealModal;
