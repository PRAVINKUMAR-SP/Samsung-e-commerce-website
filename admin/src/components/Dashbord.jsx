import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";



const Dashbord = () => {



  const [users, setUsers] = useState([]);

  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);



  useEffect(() => {


    loadData();


  }, []);





  const loadData = () => {



    // USERS

    axios.get(
      "https://samsung-backend-xds3.onrender.com/api/auth/users"
    )

      .then(res => {

        setUsers(res.data);

      })

      .catch(err => console.log(err));






    // PRODUCTS

    axios.get(
      "https://samsung-backend-xds3.onrender.com/api/products"
    )

      .then(res => {

        setProducts(res.data);

      })

      .catch(err => console.log(err));







    // ORDERS

    axios.get(
      "https://samsung-backend-xds3.onrender.com/api/orders"
    )

      .then(res => {

        setOrders(res.data);

      })

      .catch(err => console.log(err));



  }








  // USER ANALYSIS REAL DATA


  const userData = [

    {
      name: "Users",
      count: users.length
    },

    {
      name: "Products",
      count: products.length
    },

    {
      name: "Orders",
      count: orders.length
    }


  ];








  // SALES ANALYSIS REAL DATA


  const saleData = orders.map(order => ({


    name:
      order.productName
        .substring(0, 10),


    sales:
      order.quantity


  }));









  return (



    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar className='p-10' />

      <div className="
flex-1
p-4 md:p-8
bg-gray-100
min-h-screen
">







        <h1 className="
text-2xl md:text-4xl
font-bold
mb-6 md:mb-8
">

          Admin Dashboard

        </h1>








        {/* TOP CARDS */}





        <div className="
grid
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
gap-4 md:gap-8
">







          <div className="
bg-white
shadow
rounded-xl
p-4 md:p-6
">

            <h2 className="text-gray-500 text-sm md:text-base">

              Total Users

            </h2>


            <h1 className="
text-3xl md:text-5xl
font-bold
text-blue-600
">

              {users.length}

            </h1>


          </div>









          <div className="
bg-white
shadow
rounded-xl
p-4 md:p-6
">


            <h2 className="text-gray-500 text-sm md:text-base">

              Total Products

            </h2>


            <h1 className="
text-3xl md:text-5xl
font-bold
text-green-600
">

              {products.length}

            </h1>


          </div>









          <div className="
bg-white
shadow
rounded-xl
p-4 md:p-6
">


            <h2 className="text-gray-500 text-sm md:text-base">

              Total Orders

            </h2>


            <h1 className="
text-3xl md:text-5xl
font-bold
text-orange-600
">

              {orders.length}

            </h1>


          </div>






        </div>









        {/* CHART SECTION */}





        <div className="
grid
grid-cols-1 lg:grid-cols-2
gap-6 md:gap-8
mt-8 md:mt-10
">







          {/* USER ANALYSIS */}





          <div className="
bg-white
p-5
rounded-xl
shadow
">



            <h2 className="
text-2xl
font-bold
mb-5
">

              User Analysis

            </h2>





            <ResponsiveContainer

              width="100%"

              height={300}

            >



              <LineChart data={userData}>


                <CartesianGrid strokeDasharray="3 3" />


                <XAxis dataKey="name" />


                <YAxis />


                <Tooltip />


                <Line

                  type="monotone"

                  dataKey="count"

                  strokeWidth={3}

                />


              </LineChart>



            </ResponsiveContainer>





          </div>









          {/* SALES ANALYSIS */}





          <div className="
bg-white
p-5
rounded-xl
shadow
">



            <h2 className="
text-2xl
font-bold
mb-5
">

              Product Sales Analysis

            </h2>






            <ResponsiveContainer

              width="100%"

              height={300}

            >



              <BarChart data={saleData}>


                <CartesianGrid strokeDasharray="3 3" />


                <XAxis dataKey="name" />


                <YAxis />


                <Tooltip />




                <Bar

                  dataKey="sales"

                />



              </BarChart>



            </ResponsiveContainer>





          </div>








        </div>









        {/* RECENT ORDERS */}





        <div className="
bg-white
rounded-xl
shadow
mt-10
p-5
">



          <h2 className="
text-2xl
font-bold
mb-5
">

            Recent Orders

          </h2>







          {

            orders.slice(0, 8).map(order => (



              <div

                key={order.id}

                className="
flex
justify-between
border-b
p-4
"


              >



                <div>


                  <h3 className="font-bold">

                    {order.customerName}

                  </h3>


                  <p>

                    {order.productName}

                  </p>


                  <p>

                    Phone : {order.phone}

                  </p>


                </div>





                <div>


                  <p className="font-bold">

                    ₹{order.total}

                  </p>


                  <p className="
text-blue-600
">

                    {order.orderStatus}

                  </p>


                </div>




              </div>



            ))


          }





        </div>









      </div>



    </div>



  )

}


export default Dashbord;