"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/cart/Cart.module.css";
import Header from "@/components/global/header/Header";
import Footer from "@/components/global/footer/Footer";
import CartItem from "@/components/cart/CartItem";
import UniversalButton from "@/components/global/button/UniversalButton";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearCart, fetchCart } from "@/redux/slices/cartSlice";
import MobileCartItem from "@/components/cart/MobileCartItem";
import { useMedia } from "@/hooks/useResponsive";
import { formatPrice } from "@/utils/formatPrice";

const page = () => {
  const [success, setSuccess] = useState<string>("");
  const [failure, setFailure] = useState<string>("");
  const [clearLoading, setClearLoading] = useState(false);

  const mobile = useMedia("(max-width: 600px)");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { data: cart, totalAmount } = useAppSelector((state) => state.cart);

  const continueShopping = () => {
    router.push("/");
  };

  useEffect(() => {
    if (user?._id) dispatch(fetchCart());
  }, [dispatch, user?._id]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRemoveSuccess = (msg: string) => {
    scrollToTop();
    setSuccess(msg);

    setTimeout(() => {
      setSuccess(""); // clear message after 2 seconds
    }, 3000);
  };

  const handleRemoveFailure = (msg: string) => {
    scrollToTop();
    setFailure(msg);

    setTimeout(() => {
      setFailure(""); // clear message after 2 seconds
    }, 3000);
  };

  const wipeCart = async () => {
    try {
      setClearLoading(true);
      const res = await dispatch(clearCart()).unwrap();
      setClearLoading(false);
      router.push("/");
    } catch (err: any) {
      setClearLoading(false);
      console.log("error", err);
    }
  };
  const checkOut = () => {
    router.push("/checkout");
  };
  return (
    <React.Fragment>
      <Header />
      <div ref={scrollRef} />
      <div className={styles.container}>
        <div className={styles.cartDiv}>
          <label>Shopping Cart</label>
          {success !== "" && (
            <p className="flex items-center justify-center h-10 w-full text-black font-semibold text-xs bg-green-400 rounded-md p-2">
              {success}
            </p>
          )}
          {failure !== "" && (
            <p className="flex items-center justify-center h-10 w-full text-black font-semibold text-sm bg-red-500 rounded-md p-2">
              {failure}
            </p>
          )}
          <div className={styles.cartBody}>
            <div className={styles.cartHeader}>
              <label className="w-1/2 text-sm text-[#808080] font-semibold">
                Product
              </label>
              <div className={styles.headerRight}>
                <label className="text-sm text-[#808080] font-semibold ms:visible invisible">
                  Price
                </label>
                <label className="text-sm text-[#808080] font-semibold ms:visible invisible">
                  Quantity
                </label>
                <label className="text-sm text-[#808080] font-semibold">
                  Total
                </label>
              </div>
            </div>
            {mobile ? (
              <div>
                {cart.map((item) => (
                  <MobileCartItem
                    key={item._id}
                    product={item?.product}
                    quantity={item?.quantity}
                    color={item?.selectedColor}
                    size={item?.selectedSize}
                    onRemoveFailure={handleRemoveFailure}
                    onRemoveSuccess={handleRemoveSuccess}
                  />
                ))}
              </div>
            ) : (
              <div>
                {cart.map((item) => (
                  <CartItem
                    key={item._id}
                    product={item?.product}
                    quantity={item?.quantity}
                    color={item?.selectedColor}
                    size={item?.selectedSize}
                    onRemoveFailure={handleRemoveFailure}
                    onRemoveSuccess={handleRemoveSuccess}
                  />
                ))}
              </div>
            )}

            <div className={styles.cartFooter}>
              <div className={styles.cartFooterLeft}>
                <div className="flex flex-row gap-1">
                  <h3 className="text-xs text-[#808080] font-normal">
                    Subtotal:
                  </h3>
                  <p className="text-xs text-black font-normal">
                    {formatPrice(totalAmount)}
                  </p>
                </div>
                <h4 className="text-xs text-[#808080] font-normal">
                  Shipping and taxes calculated at checkout
                </h4>
                <h2
                  onClick={wipeCart}
                  className="text-xs text-[#513cbf] font-medium cursor-pointer"
                >
                  {clearLoading ? "Loading" : "Clear cart"}
                </h2>
              </div>
              <div className={styles.cartFooterRight}>
                <UniversalButton
                  label="Continue shopping"
                  color="white"
                  className="bg-[#513cbf] hover:bg-[#21184e] cursor-pointer"
                  responsiveClass="h-[30px] w-full text-xs sms:h-[40px]"
                  onClick={continueShopping}
                />
                <UniversalButton
                  label="Proceed to checkout"
                  color="white"
                  className="bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
                  responsiveClass="h-[30px] w-full text-xs l sms:h-[40px]"
                  onClick={checkOut}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start px-5 w-full bg-[#f2f2f2] h-auto ms:h-[200px]">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default page;
