import React from 'react'
import Layout from '../../Componenets/Layout/Layout';
import CarouselEffect from '../../Componenets/Carousel/CarouselEffect';
import Category from '../../Componenets/Category/Category';
import Product from '../../Componenets/Product/Product';


function Landing() {
  return (
    <Layout>
        <CarouselEffect />
        <Category />
        <Product />
        
    </Layout>
  );
}

export default Landing