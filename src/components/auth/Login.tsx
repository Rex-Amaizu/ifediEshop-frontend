"use client";
import React, { useState } from "react";
import styles from "@/styles/Auth/Auth.module.css";
import UniversalInput from "../global/input/UniversalInput";
import UniversalButton from "../global/button/UniversalButton";
import { loginUser, logoutUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

interface Props {
  toggleAuth: () => void;
}

const Login = ({ toggleAuth }: Props) => {
  const [success, setSuccess] = useState<string>("");
  const [failure, setFailure] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  // Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = async () => {
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const res = await dispatch(loginUser(payload)).unwrap();
      setSuccess(res.message);
      setTimeout(() => {
        setSuccess("");
        router.push("/");
      }, 3000);
    } catch (err: any) {
      console.log("err", err);
      setFailure(err);
      setTimeout(() => {
        setFailure("");
      }, 3000);
    }
  };
  return (
    <div className={styles.formDiv}>
      <label>Log in to your account</label>
      <h6 className="text-[10px] text-[#8c8c8c] font-semibold">
        Don't have an account?{" "}
        <span
          onClick={toggleAuth}
          className="text-[#513cbf] cursor-pointer text-[10px]"
        >
          Sign up
        </span>
      </h6>
      {success !== "" && (
        <p className="flex items-center justify-center h-10 w-[320px] text-black font-semibold text-xs bg-green-400">
          {success}
        </p>
      )}
      {failure !== "" && (
        <p className="flex items-center justify-center h-10 w-[320px] text-black font-semibold text-sm bg-red-500">
          {failure}
        </p>
      )}
      <div className={styles.form}>
        <UniversalInput
          label="Email"
          name="email"
          placeholder=""
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={formData.email}
          onChange={handleChange}
        />
        <UniversalInput
          label="Password"
          type="password"
          name="password"
          placeholder=""
          showPasswordToggle={true}
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={formData.password}
          onChange={handleChange}
        />

        <UniversalButton
          label={loading ? "Loading..." : "Login"}
          color="white"
          height="40px"
          className="bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
