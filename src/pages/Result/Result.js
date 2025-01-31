import React, { useEffect, useState } from "react";
import Layout from "../../Componenets/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endpoints";
import classes from "./result.module.css";
import ProductCard from "../../Componenets/Product/ProductCard";
import Loader from "../../Componenets/Loader/Loader";




const Result = () => {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams(); // Extract categoryName from URL parameters
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        console.log(res.data); // Output the API response for debugging
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err); // Log the error for debugging
        setIsLoading(false);
      });
  }, [categoryName]); // Include categoryName in the dependency array

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category / {categoryName}</p>
          <hr />
          <div className={classes.products_container}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Result;