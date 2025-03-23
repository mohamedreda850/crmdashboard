import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { closeCustomerModal } from "../../redux/features/customerModalReducer";
import { addCustomer, fetchCustomers, updateCustomer } from "../../redux/features/customerReducer";

const CustomerModal = () => {
  const dispatch = useDispatch();
  const customerModalState = useSelector((state) => state.customerModal);
  const { isOpen, modalType, customerData } = customerModalState;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    if (isOpen && modalType === "editCustomer" && customerData) {
      setValue("firstName", customerData.firstName);
      setValue("lastName", customerData.lastName);
      setValue("email", customerData.email);
      setValue("phone", customerData.phone);
      setValue("streetAddress", customerData.streetAddress);
      setValue("city", customerData.city);
      setValue("state", customerData.state);
      setValue("zipCode", customerData.zipCode);
    } else {
      reset();
    }
  }, [isOpen, modalType, customerData, setValue, reset]);
  

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      if (modalType === "editCustomer" && customerData) {
        await dispatch(
          updateCustomer({ id: customerData.id, customerData: data })
        ).unwrap();
        toast.info("Customer Updated");
      } else {
        await dispatch(addCustomer(data)).unwrap();
        toast.info("Customer Saved");
      }
      dispatch(fetchCustomers());
      dispatch(closeCustomerModal());
      reset();
    } catch (error) {
      console.error("Failed to process customer:", error);
    }
  };

  if (!isOpen) return null;

 
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
              onClick={() => dispatch(closeCustomerModal())}
            >
              <X size={10} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold">First name</label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                    required
                    {...register("firstName", { required: true })}
                  />
                </div>
                <div>
                  <label className="font-bold">Last name</label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                    required
                    {...register("lastName", { required: true })}
                  />
                </div>
                <div>
                  <label className="font-bold">Email</label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                    required
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <label className="font-bold">Phone</label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                    required
                    {...register("phone", { required: true })}
                  />
                </div>
              </div>
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
              <div className="flex justify-end ms-auto">
                <button
                  onClick={() => dispatch(closeCustomerModal())}
                  className="text-[14px] font-medium mx-3 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" text-white bg-[#514EF3] w-fit focus:ring-4 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center cursor-pointer"
                >
                  {isSubmitting
                    ? "Saving..."
                    : modalType === "editCustomer"
                      ? "Update Customer"
                      : "Save Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
