import Image from "next/image";
import { TbTargetArrow } from "react-icons/tb";

// import { products } from "../assets/database";
import ProductsSection from "../components/ProductsSection";
import LoginForm from "../components/Forms/LoginForm";
import Navbar from "../components/Navbar";
import { Section } from "../components/Section/styles";
import Slider from "../components/Slider";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { TProduct } from "../interfaces";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../contexts/product.context";

export const getStaticProps = async () => {
  const res = await axios.get("https://lvr-server.onrender.com/products", {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "*",
    },
  });
  const products = res.data;
  return { props: { products } };
};

const HomePage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setProducts } = useContext(ProductsContext);
  setProducts(products);
  const sliderImgs = [
    "pexels-kaique-rocha-561654.jpg",
    // "brand-betterOne.png",
    // "pexels-luis-dalvan-1770813.jpg",
  ];

  return (
    <>
      <Slider imageURLsList={sliderImgs} styles={{ height: "auto" }} />
      <ProductsSection title="Todos" products={products} />
      <ProductsSection
        title="Camisetas"
        products={products.filter(
          (p: TProduct) => p.category.title === "tshirt"
        )}
      />
      <ProductsSection
        title="Shapes"
        products={products.filter(
          (p: TProduct) => p.category.title === "shape"
        )}
      />
      <Slider
        imageURLsList={[
          "promo.jpg",
          // "pexels-kaique-rocha-561654.jpg"
        ]}
        styles={{ height: "auto" }}
      />
      <ProductsSection
        title="Rodas"
        products={products.filter(
          (p: TProduct) => p.category.title === "wheels"
        )}
      />
      <ProductsSection
        title="Tênis"
        products={products.filter(
          (p: TProduct) => p.category.title === "shoes"
        )}
      />
    </>
  );
};
export default HomePage;
