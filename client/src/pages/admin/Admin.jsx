import React, {useEffect} from 'react'
import Layout from '../../components/layout/Layout'
// import products from '../../assets/products'
import { useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import Widgets from '../../components/widgets/Widgets'
import DataTable from '../../components/dataTable/DataTable'

const Admin = () => {

  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate("/login");
    }
  }, [navigate, userInfo]);
  return (
    <Layout>
      <Widgets />
      <DataTable/>
    </Layout>
  )
}

export default Admin
