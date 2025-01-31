import React from 'react'
import Categorycard from './Categorycard'
import {Categoryinfos} from "./Categoryinfos"
import classes from './category.module.css'




function Category() {
  return (
    <section className={classes.Category_container}>
      {Categoryinfos.map((infos) => {
        return <Categorycard data={infos} />;
      })}
    </section>
  );
}
export default Category;