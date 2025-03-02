import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../components/banner/Banner";
import TopProductCard from "../../components/product/topProductCard/TopProductCard";
import useFetchCollection from "../../customHooks/useFetchCollection";
import Panner from "../../components/product/bannner/bann"; // Ensure this path is correct
import Slide from "../../slide/slide.js" // Go up two levels to access the slide folder
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import Loader from "../../components/loader/Loader";

const Home = () => {
  const url = window.location.href;
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const topProduct = useMemo(() => {
    if (products && products.length > 0) {
      return products.reduce((prev, current) => {
        return prev.rating > current.rating ? prev : current;
      });
    }
    return null;
  }, [products]);

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 400,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, [url]);

  return (
    <div>
      <Banner />
      <Panner />
      
      {isLoading ? (
        <Loader />
      ) : (
        topProduct && (
          <div className="top-product-card">
            <h2>Top Product</h2>
            <TopProductCard product={topProduct} />
          </div>
        )
      )}

      <Slide />
    </div>
  );
};

export default Home;
