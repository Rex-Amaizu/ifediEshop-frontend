"use client";
import React, { useState } from "react";
import styles from "@/styles/Auth/Auth.module.css";
import UniversalInput from "../global/input/UniversalInput";
import UniversalButton from "../global/button/UniversalButton";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  // Password match logic
  const passwordsMatch =
    formData.confirmPassword.length === 0 ||
    formData.password === formData.confirmPassword;

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
    if (!passwordsMatch) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    console.log("Payload:", payload);
  };

  return (
    <div className={styles.formDiv}>
      <label>Create account with admin access</label>

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

        <UniversalInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder=""
          showPasswordToggle={true}
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={
            formData.confirmPassword.length > 0 && !passwordsMatch
              ? "Passwords do not match"
              : ""
          }
        />

        <UniversalInput
          label="Role"
          name="role"
          placeholder="set role as admin"
          placeholderColor="#9CA3AF"
          outerClassName="w-full"
          background="#f2f2f2"
          inputClassName="w-full h-[40px] pl-5"
          value={formData.role}
          onChange={handleChange}
        />

        <UniversalButton
          label="Create Account"
          color="white"
          height="40px"
          className="bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateAdmin;
