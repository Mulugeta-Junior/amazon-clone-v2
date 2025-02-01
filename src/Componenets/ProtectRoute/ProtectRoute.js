import React,{useContext,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { DataContext } from '../../Componenets/Dataprovider/DataProvider'

function ProtectRoute({children,msg,redirect}) {
  const navigate = useNavigate()
  
  const [{user},dispatch] = useContext(DataContext)

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user, msg, redirect]);   //for every user

  return children

}

export default ProtectRoute