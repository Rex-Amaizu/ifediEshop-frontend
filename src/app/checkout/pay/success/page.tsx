"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/styles/checkout/Checkout.module.css";

import Header from "@/components/global/header/Header";
import Footer from "@/components/global/footer/Footer";

// Redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyPayment } from "@/redux/slices/paymentSlice";
import { addOrder } from "@/redux/slices/orderSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import { deductStock } from "@/redux/slices/productSlice";

import { OrderPayload, PaymentMethod } from "@/redux/services/orderApi";

const PaymentSuccessPage = () => {
  const params = useSearchParams();
  const reference = params.get("reference");
  const payMethodQuery = params.get("payMethod");

  const paymentMethod: PaymentMethod =
    payMethodQuery === "fincra" ? "fincra" : "paystack";

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { verifyData, loading: paymentLoading } = useAppSelector(
    (s) => s.payment
  );
  const cartData = useAppSelector((s) => s.cart.data);
  const cartTotal = useAppSelector((s) => s.cart.totalAmount);
  const addresses = useAppSelector((s) => s.address.data);

  const [orderProcessed, setOrderProcessed] = useState(false);

  // ------------------------------
  // 1️⃣ VERIFY PAYMENT ONCE
  // ------------------------------
  useEffect(() => {
    if (reference) dispatch(verifyPayment(reference));
  }, [reference, dispatch]);

  // ------------------------------
  // 2️⃣ PROCESS ORDER & MANAGE STOCK (RUNS ONCE)
  // ------------------------------
  useEffect(() => {
    const paymentSuccess = verifyData?.status === "success";

    // ---- SAFETY CONDITIONS ----
    if (orderProcessed) return; // Already processed
    if (paymentLoading || !paymentSuccess) return; // Not ready yet
    if (!cartData?.length) return;
    if (!addresses?.length) return;

    // Lock BEFORE async calls
    setOrderProcessed(true);

    const processOrder = async () => {
      // Group quantities by productId
      const stockMap: Record<string, number> = {};
      cartData.forEach((item) => {
        const id = item.product._id;
        stockMap[id] = (stockMap[id] || 0) + item.quantity;
      });

      // Build address payload
      const shipping = {
        fullName: addresses[0].fullName,
        phoneNumber: addresses[0].phoneNumber,
        street: addresses[0].street,
        city: addresses[0].city,
        state: addresses[0].state,
        country: addresses[0].country,
        postalCode: "",
      };

      // Build order payload
      const orderPayload: OrderPayload = {
        items: cartData.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images?.[0] || "",
        })),
        shippingAddress: shipping,
        paymentMethod,
        paymentStatus: "paid",
        orderStatus: "pending",
        subtotal: cartTotal,
        shippingFee: 0,
        totalAmount: cartTotal,
      };

      try {
        // 🚀 Add order
        const result = await dispatch(addOrder(orderPayload));
        if (!addOrder.fulfilled.match(result)) return;

        // 🚀 Deduct stock per productId
        for (const [id, quantity] of Object.entries(stockMap)) {
          await dispatch(deductStock({ id, quantity }));
        }

        // 🚀 Clear cart
        await dispatch(clearCart());

        // Redirect home after 3 seconds
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (err) {
        console.error("Order / Stock update error:", err);
      }
    };

    processOrder();
  }, [
    verifyData,
    paymentLoading,
    cartData,
    cartTotal,
    addresses,
    paymentMethod,
    orderProcessed,
    dispatch,
    router,
  ]);

  // ------------------------------
  // UI SECTION
  // ------------------------------
  const renderStatusMessage = () => {
    if (paymentLoading)
      return <p className="text-[#513cbf] text-sm">Verifying payment...</p>;

    if (verifyData?.status === "success")
      return (
        <p className="text-[green] text-sm">
          Payment successful 🎉 Updating order...
        </p>
      );

    if (verifyData && verifyData.status !== "success")
      return <p className="text-[red] text-sm">Payment verification failed!</p>;

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className={styles.container}>
        <div className="flex items-center justify-center w-4/5 h-[50px] bg-white rounded-sm">
          {renderStatusMessage()}
        </div>
      </div>

      <div className="flex flex-col items-start pl-5 pr-5 mt-auto bg-[#f2f2f2] h-auto ms:h-[200px] border-t border-[#9CA3AF]">
        <Footer />
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
