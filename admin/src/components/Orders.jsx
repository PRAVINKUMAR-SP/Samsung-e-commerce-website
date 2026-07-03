import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";


const Orders = () => {


  const [orders, setOrders] = useState([]);



  useEffect(() => {

    loadOrders();

  }, []);




  const loadOrders = () => {


    axios.get(
      "https://samsung-backend-xds3.onrender.com/api/orders"
    )

      .then(res => {

        setOrders(res.data);

      })


  }





  const updateStatus = (id, status) => {


    axios.put(

      `https://samsung-backend-xds3.onrender.com/api/orders/${id}?status=${status}`

    )

      .then(() => {


        alert("Status Updated");


        loadOrders();


      })


  }







  return (


    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar className='p-10' />

      <div className="
flex-1
p-4 md:p-8
w-full
bg-gray-100
min-h-screen
">



        <h1 className="
text-2xl md:text-4xl
font-bold
mb-6 md:mb-8
">

          Admin Orders

        </h1>







        <div className="
space-y-5
">



          {

            orders.map(order => (


              <div

                key={order.id}

                className="
bg-white
rounded-xl
shadow
p-4 md:p-6
"


              >



                <div className="
flex
flex-col sm:flex-row
gap-4 md:gap-6
">





                  <img

                    src={
                      `https://samsung-backend-xds3.onrender.com/api/products/image/${order.image}`
                    }

                    className="
w-24 md:w-32
h-24 md:h-32
object-contain
flex-shrink-0
"

                  />







                  <div className="flex-1">



                    <h2 className="
text-lg md:text-2xl
font-bold
">

                      {order.productName}

                    </h2>




                    <div className="
grid
grid-cols-1 md:grid-cols-2
gap-2 md:gap-2
mt-3
text-sm md:text-base
">



                      <p>

                        User :
                        <b>
                          {order.customerName}
                        </b>

                      </p>



                      <p>

                        Phone :
                        <b>
                          {order.phone}
                        </b>

                      </p>




                      <p>

                        Quantity :
                        <b>
                          {order.quantity}
                        </b>

                      </p>



                      <p>

                        Total :
                        <b className="text-green-600">

                          ₹{order.total}

                        </b>

                      </p>




                      <p>

                        Payment :
                        <b>

                          {order.paymentMethod}

                        </b>

                      </p>




                      <p>

                        Status :

                        <span className="text-blue-600 font-bold">

                          {order.orderStatus}

                        </span>


                      </p>



                    </div>






                    <p className="mt-3">

                      Address :
                      {order.address}

                    </p>





                    <div className="mt-5 flex flex-wrap gap-2 md:gap-3">





                      <button

                        onClick={() => updateStatus(
                          order.id,
                          "Order Confirmed"
                        )}

                        className="
bg-blue-600
text-white
px-4
py-2
rounded
"

                      >

                        Confirm

                      </button>







                      <button

                        onClick={() => updateStatus(
                          order.id,
                          "Delivery Today"
                        )}

                        className="
bg-green-600
text-white
px-4
py-2
rounded
"

                      >

                        Today

                      </button>







                      <button

                        onClick={() => updateStatus(
                          order.id,
                          "Delivery Tomorrow"
                        )}

                        className="
bg-yellow-500
text-white
px-4
py-2
rounded
"

                      >

                        Tomorrow

                      </button>







                      <button

                        onClick={() => updateStatus(
                          order.id,
                          "Cancelled"
                        )}

                        className="
bg-red-600
text-white
px-4
py-2
rounded
"

                      >

                        Cancel

                      </button>






                    </div>






                  </div>






                </div>





              </div>



            ))


          }





        </div>






      </div>


    </div>



  )

}


export default Orders;