import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Services/END_POINTS/DASHBOARD.JS";
import { AUTH_URL } from "../../Services/END_POINTS/DASHBOARD.JS";
import { login } from "../../redux/features/authReducer";
import logo from "./../../assets/Images/Logo.png";
import { Eye, EyeOff, Loader } from "lucide-react";
const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(AUTH_URL.SIGN_IN, data);
      console.log("Login response", response.data);

      dispatch(login(response.data.token));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#092C4C] to-[#514EF3]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <div className="flex items-center">
          <img src={logo} className="me-4" />
          <h1 className="text-xl font-bold text-[#092C4C]">
            Welcome To Guessit CRM
          </h1>
        </div>

        <h2 className="font-semibold mb-4 mt-3">Sign In</h2>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full pr-10"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting ? true : false}
          className="w-full bg-[#514EF3] text-white p-2 rounded-full text-center flex items-center justify-center"
        >
          {isSubmitting ? (
            <Loader className="animate-spin " size={20} />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signin;
