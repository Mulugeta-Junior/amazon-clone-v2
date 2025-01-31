import React from 'react'
import classes from './category.module.css'
import {Link} from 'react-router-dom'



function Categorycard({ data }) {
  console.log(data);
  // Destructuring the props to get 'data'
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imglink} alt="" />

        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default Categorycard;




