import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "../assets/Logo.png";


function Forms() {
  const [submit, setSubmit] = useState(false); 
  const {register,handleSubmit,formState: { errors },watch,} = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    setSubmit(true);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex items-center   px-7 py-5 bg-white shadow-xl ">
        <NavLink to="/" className="flex items-center gap-5">
          <ArrowBackIcon />
          <img className="w-56" src={Logo} alt="Logo" />
        </NavLink>
      </div>
      <div className="mt-10 flex flex-col items-center">
        <strong className="mb-8 text-4xl font-bold">Create Your Account</strong>
        {submit ? (
          <div className="p-10 text-center bg-white rounded-md shadow-lg">
            <h2 className="mb-6 text-4xl font-semibold">Registration Successful!</h2>
            <p className="mb-6 text-blue-900">Enjoy browsing our library of books and discovering new titles.</p>
            <p className="font-semibold">Happy learning!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}className="w-full px-5 py-5 bg-white text-center rounded-md shadow-md md:w-2/3 lg:w-1/3">
            {renderInput("First name", "firstName", {required: true,minLength: 3,maxLength: 30,})}
            {renderInput("Last name", "lastName", {required: true,minLength: 3,maxLength: 30,})}
            {renderInput("Email", "email", { required: true, pattern: /^\S+@\S+$/i })}
            {renderInput("Password", "password", {required: true,minLength: 10,pattern: /.*[\W]+.*/i,})}
            {renderInput("Confirm password", "confirmPassword", {validate: (value) => value === watch("password"),})}
            <button type="submit" className="w-full h-10 mt-4 px-4 py-2 bg-blue-500 rounded text-white font-bold text-lg disabled:bg-gray-400" disabled={Object.keys(errors).length > 0}>SignUp</button>
          </form>
        )}
      </div>
    </div>
  );

  function renderInput(placeholder, name, rules) {
    return (
      <div>
        <input type={name.includes("password") ? "password" : "text"}placeholder={placeholder}className="border rounded-lg mb-6 border-gray-400 h-12 pl-4 outline-none w-full"{...register(name, rules)}/>
        {errors[name] && errors[name].type === "required" && (<span className="text-red-700">{`${placeholder} is required`}</span>)}
        {errors[name] && errors[name].type === "minLength" && (<span className="text-red-700">{`${placeholder} should have a minimum of 3 characters`}</span>)}
        {errors[name] && errors[name].type === "maxLength" && (<span className="text-red-700">{`${placeholder} can only have a maximum of 30 characters`}</span>)}
        {errors[name] && errors[name].type === "pattern" && (<span className="text-red-700">{`Enter a valid ${placeholder.toLowerCase()}`}</span>)}
        {errors[name] && errors[name].type === "validate" && (<span className="text-red-700">Passwords must match</span>)}
      </div>
    );
  }
}

export default Forms;