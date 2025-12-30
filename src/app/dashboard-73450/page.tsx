"use client";
import React, { useEffect } from "react";
import styles from "@/styles/AdminDashboard/Admin.module.css";
import SideMenu from "@/components/admin-dashboard/SideMenu";
import Total from "@/components/admin-dashboard/total/Total";
import Recent from "@/components/admin-dashboard/recent/Recent";
import { useMedia } from "@/hooks/useResponsive";
import MobileSideMenu from "@/components/admin-dashboard/MobileSideMenu";
import AdminGuard from "@/utils/AdminGuard";
import { getAll } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMounted } from "@/hooks/useMounted";

const page = () => {
  const mobileDevice = useMedia("(max-width: 780px)");
  const dispatch = useAppDispatch();
  const mounted = useMounted();

  const { data: products, loading: productsLoading } = useAppSelector(
    (state) => state.products
  );
  const { data: categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getAll());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!mounted || productsLoading || categoriesLoading)
    return <div className="w-full flex flex-row items-center">Loading...</div>;
  return (
    <React.Fragment>
      <AdminGuard>
        <div className={styles.container}>
          {mobileDevice ? (
            <div className="absolute mt-2.5">
              <MobileSideMenu />
            </div>
          ) : (
            <div className={styles.box1}>
              <SideMenu />
            </div>
          )}
          <div className={styles.box2}>
            <Total
              prodLength={Number(products.length)}
              catLength={Number(categories.length)}
            />
            <Recent prodData={products} />
          </div>
        </div>
      </AdminGuard>
    </React.Fragment>
  );
};

export default page;
