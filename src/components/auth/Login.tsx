"use client";
import React, { useState } from "react";
import styles from "@/styles/Auth/Auth.module.css";
import UniversalInput from "../global/input/UniversalInput";
import UniversalButton from "../global/button/UniversalButton";

interface Props {
  toggleAuth: () => void;
}

const Login = ({ toggleAuth }: Props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
  const handleSubmit = () => {
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    console.log("Payload:", payload);
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
          label="Login"
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
