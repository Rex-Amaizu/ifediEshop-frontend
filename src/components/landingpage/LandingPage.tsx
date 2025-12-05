import React, { useEffect, useState } from "react";
import Header from "../global/header/Header";
import VideoSection from "./VideoSection";
import styles from "@/styles/LandingPage/LandingPage.module.css";
import Items from "./Items";
import { dummyProducts } from "@/utils/mockdata/items";
import Footer from "../global/footer/Footer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [signUpModal, setSignUpModal] = useState<boolean>(true);
  const [trigger, setTrigger] = useState(false);

  const { data: categories, loading: categoriesLoading } = useAppSelector(
    (s) => s.categories
  );
  const { data: products, loading: productsLoading } = useAppSelector(
    (s) => s.products
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("products", products);
  console.log("categories", categories);

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.gender.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? product.gender.toLowerCase() === selectedCategory.toLowerCase() ||
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    const el = document.getElementById("products");
  };

  useEffect(() => {
    if (!selectedCategory && searchTerm.trim() === "") return;
    const el = document.getElementById("products");
    if (el) {
      const headerHeight = 80;
      const topPos =
        el.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: topPos,
        behavior: "smooth",
      });
    }
  }, [searchTerm, selectedCategory]);

  const openModal = () => {
    setSignUpModal(true);
  };

  const closeModal = () => {
    setSignUpModal(false);
  };
  const handleAction = () => {
    setTrigger((prev) => !prev); // Toggle trigger state
  };

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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Items
                key={product.id}
                descriptionImg={product.images[1]}
                displayImg={product.images}
                colors={product.colors}
                sizes={product.sizes}
                name={product.name}
                price={product.price}
                stock={product.stock}
                id={product.id}
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
