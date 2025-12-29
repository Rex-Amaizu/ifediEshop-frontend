"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/checkout/Checkout.module.css";
import Header from "@/components/global/header/Header";
import UniversalInput from "@/components/global/input/UniversalInput";
import GlobalSelect from "@/components/global/select/GlobalSelect";
import UniversalButton from "@/components/global/button/UniversalButton";
import Footer from "@/components/global/footer/Footer";
import { countrySelect, statesByCountry } from "@/utils/selectData";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMounted } from "@/hooks/useMounted";
import { fetchAddresses, addAddress } from "@/redux/slices/addressSlice";
import { useRouter } from "next/navigation";

const page = () => {
  // Shipping info state
  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  // Payment methods
  const [paystack, setPaystack] = useState(false);
  const [fincra, setFincra] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const mounted = useMounted();

  const { loading, user } = useAppSelector((state) => state.auth);
  const { data: addresses = [], loading: addressesLoading } = useAppSelector(
    (state) => state.address
  );

  const stateOptions = country ? statesByCountry[country] || [] : [];

  const handleConfirmOrder = async () => {
    if (addresses.length === 0) {
      const orderData = {
        fullName,
        street,
        city,
        phoneNumber,
        country,
        state,
      };

      try {
        const res = await dispatch(addAddress(orderData)).unwrap();

        if (paystack) {
          router.push("/checkout/pay?payMethod=paystack");
        } else if (fincra) {
          router.push("/checkout/pay?payMethod=fincra");
        }
      } catch (err: any) {
        console.log("err", err);
      }
    } else {
      if (paystack) {
        router.push("/checkout/pay?payMethod=paystack");
      } else if (fincra) {
        router.push("/checkout/pay?payMethod=fincra");
      }
    }
  };

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  console.log("add", addresses);

  if (!mounted || addressesLoading)
    return <div className="w-full flex flex-row items-center">Loading...</div>;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className={styles.container}>
          <div className={styles.bodyDiv}>
            <div className={styles.cartCheckoutDiv}>
              <label>Cart</label> / <span>Checkout</span>
            </div>

            <div className={styles.address}>
              {/* Shipping */}
              {addresses.length === 0 ? (
                <div className={styles.shipping}>
                  <div className={styles.shippingLabel}>
                    <h6>1.</h6>
                    <h6>Shipping information</h6>
                  </div>

                  <UniversalInput
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter your full name"
                    placeholderColor="#9CA3AF"
                    outerClassName="w-full"
                    background="#fff"
                    inputClassName="w-full h-[40px] pl-5"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />

                  <UniversalInput
                    label="Street"
                    name="street"
                    placeholder="Enter your street address"
                    placeholderColor="#9CA3AF"
                    outerClassName="w-full"
                    background="#fff"
                    inputClassName="w-full h-[40px] pl-5"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />

                  <div className="flex flex-col md:flex-row w-full gap-4">
                    {/* Country Select */}
                    <div className="flex-1">
                      <GlobalSelect
                        label="Country"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setState(""); // reset state when country changes
                        }}
                        options={countrySelect}
                        placeholder="Select Country"
                      />
                    </div>

                    {/* State Select */}
                    <div className="flex-1">
                      <GlobalSelect
                        label="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        disabled={!country}
                        options={stateOptions}
                        placeholder="Select State"
                      />
                    </div>
                  </div>

                  <UniversalInput
                    label="City"
                    name="city"
                    placeholder="Enter your city"
                    placeholderColor="#9CA3AF"
                    outerClassName="w-full"
                    background="#fff"
                    inputClassName="w-full h-[40px] pl-5"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <UniversalInput
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="Enter your number"
                    placeholderColor="#9CA3AF"
                    outerClassName="w-full"
                    background="#fff"
                    inputClassName="w-full h-[40px] pl-5"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              ) : (
                <div className={styles.shipping}>
                  <div className={styles.shippingLabel}>
                    <h6>Address.</h6>
                    <h6>
                      {addresses[0].street}, {addresses[0].city},{" "}
                      {addresses[0].state} {addresses[0].country}
                    </h6>
                  </div>
                </div>
              )}

              {/* Payment Methods  */}
              <div className={styles.shipping}>
                <div className={styles.shippingLabel}>
                  <h6>2.</h6>
                  <h6>Payment method</h6>
                </div>

                {/* Paystack */}
                <label className="flex items-center w-full border border-[#D1D5DB] bg-white rounded-md p-5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 accent-[#21184e]"
                    checked={paystack}
                    onChange={() => {
                      setPaystack(true);
                      setFincra(false); // uncheck the other
                    }}
                  />
                  <span className="text-sm">Paystack</span>
                </label>

                {/* Fincra */}
                <label className="flex items-center w-full border border-[#D1D5DB] bg-white rounded-md p-5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 accent-[#21184e]"
                    checked={fincra}
                    onChange={() => {
                      setFincra(true);
                      setPaystack(false); // uncheck the other
                    }}
                  />
                  <span className="text-sm">Fincra</span>
                </label>
              </div>

              {/* Confirm Order Button */}
              <div className="flex flex-row items-end mt-4">
                <UniversalButton
                  label={addressesLoading ? "Loading.." : "Confirm Order"}
                  color="white"
                  height="40px"
                  className="bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
                  onClick={handleConfirmOrder}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-auto items-start pl-5 pr-5 bg-[#f2f2f2] h-auto ms:h-[200px] border-t border-[#9CA3AF]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default page;
