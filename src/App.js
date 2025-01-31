
import React, { useContext, useEffect } from 'react'
import Routing from './Router.js';
import { auth } from './Utility/fireBase.js';
import { DataContext} from './Componenets/Dataprovider/DataProvider.js';
import { Type } from './Utility/actiontype.js';



function App() {

  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({ 
          type: Type.SET_USER,
            user: null });
      }
    });
  }, []);

  return (
    <>
      <Routing /> 
     
    </>
  );
  
   
    
}

export default App;
