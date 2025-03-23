import userImg from "./../../../assets/Images/userImg.svg";
import bag from "./../../../assets/Images/bag.svg";
import customer0 from "./../../../assets/Images/customer0.svg"
import deal0 from "./../../../assets/Images/deals0.svg"
const CustomersAndDeals = ({ deals ,customers}) => {
  return (
    <div className=" ">
{customers?    <div className="mb-5">
        <div className="flex w-[268px] h-[168px] border border-[#EAEEF4] rounded-xl items-center justify-between px-5">
          <div>
            <h1 className="text-[18px] font-medium text-[#7E92A2] mb-8">
              Customer
            </h1>
            <p className="font-semibold text-5xl">78</p>
          </div>
          <div>
            <img src={userImg} />
          </div>
        </div>
      </div>: <div className="mb-5"><img src={customer0}/></div>}
   {deals ?   <div className="">
        <div className="flex w-[268px] h-[168px] border border-[#EAEEF4] rounded-xl items-center justify-between px-5">
          <div>
            <h1 className="text-[18px] font-medium text-[#7E92A2] mb-8">
              Deals
            </h1>
            <p className="font-semibold text-5xl">{deals}</p>
          </div>
          <div>
            <img src={bag} />
          </div>
        </div>
      </div>:<div><img src={deal0}/></div>}
    
    </div>
  );
};

export default CustomersAndDeals;
