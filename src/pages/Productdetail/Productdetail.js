import React, {useEffect, useState}from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../Componenets/Layout/Layout'
import axios from 'axios'
import ProductCard from '../../Componenets/Product/ProductCard'
import {productUrl }from "../../Api/endpoints";
import Loader from '../../Componenets/Loader/Loader'

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // As soon as the component mounts (and before the data fetching starts)

    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false); // Indicate that the data has been successfully loaded
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]); // Include productId in the dependency array

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </Layout>
  );
};

export default ProductDetail;
