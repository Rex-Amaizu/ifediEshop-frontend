import React, { useEffect, useState } from "react";
import Header from "../global/header/Header";
import VideoSection from "./VideoSection";
import styles from "@/styles/LandingPage/LandingPage.module.css";
import Items from "./Items";
import Footer from "../global/footer/Footer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAll } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products } = useAppSelector((s) => s.products);

  useEffect(() => {
    dispatch(getAll()); // for header category list
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔍 FILTER PRODUCTS
  const filteredProducts = products?.filter((product) => {
    const lowerSearch = searchTerm.toLowerCase();

    // TEXT SEARCH
    const matchesSearch =
      product.name?.toLowerCase().includes(lowerSearch) ||
      product.subCategory?.toLowerCase().includes(lowerSearch) ||
      product.gender?.toLowerCase().includes(lowerSearch) ||
      product.category?.some((cat) =>
        cat.name.toLowerCase().includes(lowerSearch)
      );

    // CATEGORY CLICK (ID MATCH)
    const matchesCategory = selectedCategory
      ? product.category?.some((cat) => cat.id === selectedCategory)
      : true;

    return matchesSearch && matchesCategory;
  });

  // 🟢 CATEGORY CLICK HANDLER
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  // 🔥 AUTO-SCROLL WHEN SEARCH OR CATEGORY CHANGES
  useEffect(() => {
    if (!searchTerm && !selectedCategory) return;

    const el = document.getElementById("products");
    if (!el) return;

    const headerOffset = 80; // adjust if your header height changes
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className={styles.container}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
      />

      <div className={styles.body}>
        <VideoSection />

        <div id="products" className={styles.itemList}>
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Items
                key={product._id}
                descriptionImg={product.images[1]}
                displayImg={product.images}
                colors={product.colors}
                sizes={product.sizes}
                name={product.name}
                price={product.price}
                stock={product.stock}
                id={product._id}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
