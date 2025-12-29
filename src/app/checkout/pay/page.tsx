"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/global/header/Header";
import Footer from "@/components/global/footer/Footer";
import styles from "@/styles/checkout/Checkout.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import UniversalButton from "@/components/global/button/UniversalButton";
import { initializePayment } from "@/redux/slices/paymentSlice";

const page = () => {
  const params = useSearchParams();
  const dispatch = useAppDispatch();

  const payMethod = params.get("payMethod");

  const { user } = useAppSelector((state) => state.auth);
  const { data: cart, totalAmount } = useAppSelector((state) => state.cart);
  const { initData, loading } = useAppSelector((s) => s.payment);
  const addresses = useAppSelector((s) => s.address.data);

  console.log("user", user);
  console.log("cart", cart);
  console.log("amt", totalAmount);
  console.log("add", addresses);

  const handlePay = () => {
    dispatch(
      initializePayment({
        email: user?.email,
        amount: totalAmount,
        metadata: { productId: user?._id },
      })
    );
  };

  // After initData loads, redirect to Paystack
  if (initData?.authorization_url) {
    window.location.href = initData.authorization_url;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className={styles.container}>
          {cart.map((c) => (
            <div
              key={c._id}
              className="flex flex-col w-4/5 h-auto bg-white rounded-sm"
            >
              <div className="flex flex-row gap-2.5 justify-between w-full p-5">
                <label className="w-32 text-lg">{c.product.name}</label>
                <h5 className="w-16 text-lg">
                  ${Number(c.product.price) * Number(c.quantity)}
                </h5>
              </div>
              <hr className="border w-full text-[#f2f2f2]" />
            </div>
          ))}
          <div className="flex flex-col w-4/5 h-auto bg-white rounded-sm">
            <div className="flex flex-row gap-2.5 justify-between w-full p-5">
              <label className="w-32 text-black text-lg font-bold">Total</label>
              <h5 className="w-16 text-black text-lg font-bold">
                ${totalAmount}
              </h5>
            </div>
            <hr className="border w-full text-[#f2f2f2]" />
          </div>

          <div className="flex flex-row items-end mt-4 w-4/5">
            <UniversalButton
              label={loading ? "Loading..." : "Pay"}
              color="white"
              height="40px"
              className="bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
              onClick={handlePay}
            />
          </div>
        </div>
        <div className="flex flex-col items-start pl-5 pr-5 mt-auto bg-[#f2f2f2] h-auto ms:h-[200px] border-t border-[#9CA3AF]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default page;
