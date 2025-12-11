"use client";
import React, { useState } from "react";
import styles from "@/styles/Auth/Auth.module.css";
import UniversalInput from "../global/input/UniversalInput";
import UniversalButton from "../global/button/UniversalButton";
import { registerUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface Props {
  toggleAuth: () => void;
}

const SignUp = ({ toggleAuth }: Props) => {
  const [success, setSuccess] = useState<string>("");
  const [failure, setFailure] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useAppDispatch();

  const { user, loading } = useAppSelector((state) => state.auth);

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

  const handleRegister = async () => {
    if (!passwordsMatch) {
      alert("Passwords do not match");
      return;
    }
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await dispatch(registerUser(payload)).unwrap();
      console.log("res", res);
      setSuccess(res.message);
      setTimeout(() => {
        setSuccess("");
        toggleAuth();
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
    <React.Fragment>
      <div className={styles.formDiv}>
        <label>Create an account</label>
        <h6 className="text-[10px] text-[#8c8c8c] font-semibold">
          Already have an account?{" "}
          <span
            className="text-[#513cbf] cursor-pointer text-[10px]"
            onClick={toggleAuth}
          >
            Log in
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
            label="Full Name"
            name="name"
            placeholder=""
            placeholderColor="#9CA3AF"
            outerClassName="w-full"
            background="#f2f2f2"
            inputClassName="w-full h-[40px] pl-5"
            value={formData.name}
            onChange={handleChange}
          />
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

          <UniversalButton
            label={loading ? "Loading..." : "Create account"}
            color="white"
            height="40px"
            className="bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
            onClick={handleRegister}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
