"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/styles/checkout/Checkout.module.css";

import Header from "@/components/global/header/Header";
import Footer from "@/components/global/footer/Footer";

// Redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyPayment } from "@/redux/slices/paymentSlice";
import { addOrder } from "@/redux/slices/orderSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import { OrderPayload, PaymentMethod } from "@/redux/services/orderApi";

const PaymentSuccessPage = () => {
  const params = useSearchParams();
  const reference = params.get("reference");
  const payMethodQuery = params.get("payMethod"); // "paystack" or "fincra"
  const paymentMethod: PaymentMethod =
    payMethodQuery === "fincra" ? "fincra" : "paystack";

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redux state
  const { verifyData, loading: paymentLoading } = useAppSelector(
    (s) => s.payment
  );
  const cartData = useAppSelector((s) => s.cart.data);
  const cartTotal = useAppSelector((s) => s.cart.totalAmount);
  const addresses = useAppSelector((s) => s.address.data);
  //   const { user } = useAppSelector((state) => state.auth);

  //   const shipping = addresses?.[0] || {
  //     fullName: "",
  //     phoneNumber: "",
  //     street: "",
  //     city: "",
  //     state: "",
  //     country: "",
  //     postalCode: "",
  //   };

  useEffect(() => {
    if (reference) dispatch(verifyPayment(reference));
  }, [reference, dispatch]);

  useEffect(() => {
    const createOrder = async () => {
      if (!paymentLoading && verifyData?.status === "success") {
        if (!cartData || cartData.length === 0) {
          console.log("Cart is empty. Cannot create order.");
          return;
        }

        if (!addresses || addresses.length === 0) {
          console.log("No shipping address found in Redux");
          return;
        }

        const shipping = {
          fullName: addresses?.[0].fullName,
          phoneNumber: addresses?.[0].phoneNumber,
          street: addresses?.[0].street,
          city: addresses?.[0].city,
          state: addresses?.[0].state,
          country: addresses?.[0].country,
          postalCode: "",
        };

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

        console.log("Creating order with payload:", orderPayload);

        try {
          // ✅ Wait for order to be saved before clearing cart
          const resultAction = await dispatch(addOrder(orderPayload));
          if (addOrder.fulfilled.match(resultAction)) {
            console.log("Order saved:", resultAction.payload);

            // Clear cart only after successful order save
            await dispatch(clearCart());

            // Redirect after 3 seconds
            setTimeout(() => {
              router.push("/");
            }, 3000);
          } else {
            console.error("Failed to save order:", resultAction.payload);
          }
        } catch (err) {
          console.error("Error creating order:", err);
        }
      }
    };

    createOrder();
  }, [
    verifyData,
    paymentLoading,
    cartData,
    cartTotal,
    dispatch,
    router,
    paymentMethod,
    addresses,
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className={styles.container}>
        <div className="flex items-center justify-center w-4/5 h-[50px] bg-white rounded-sm">
          {paymentLoading && (
            <p className="text-[#513cbf] text-sm">Verifying payment...</p>
          )}

          {!paymentLoading && verifyData?.status === "success" && (
            <p className="text-[green] text-sm">
              Payment successful 🎉 Redirecting...
            </p>
          )}

          {!paymentLoading && verifyData && verifyData.status !== "success" && (
            <p className="text-[red] text-sm">Verification failed!</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start pl-5 pr-5 mt-auto bg-[#f2f2f2] h-auto ms:h-[200px] border-t border-[#9CA3AF]">
        <Footer />
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
