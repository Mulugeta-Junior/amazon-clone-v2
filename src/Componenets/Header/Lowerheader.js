import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import classes from "../Header/Header.module.css";

// function Lowerheader() {
//   return (
//     <div className={classes.lower_container}>
//       <ul className={classes.lower_list}>
//         <li>
//           <AiOutlineMenu />
//           <p>All</p>
//         </li>
//         <li>Today's Deals</li>
//         <li>Customer Services</li>
//         <li>Registry</li>
//         <li>Gift Cards</li>
//         <li>Sell</li>
//       </ul>
//     </div>
//   );
// }

// export default Lowerheader;





function Lowerheader() {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default Lowerheader;
