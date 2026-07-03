import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";


function Orders() {


    const [orders, setOrders] = useState([]);



    useEffect(() => {

        loadOrders();

    }, []);




    const loadOrders = () => {


        axios.get(
            "http://localhost:8080/api/orders"
        )

            .then(res => {

                setOrders(res.data);

            })


    }





    const deleteOrder = (id) => {


        if (window.confirm("Delete this order?")) {


            axios.delete(
                `http://localhost:8080/api/orders/${id}`
            )

                .then(() => {


                    alert("Order Deleted");


                    loadOrders();


                })


        }


    }






    return (

        <>


            <Navbar />


            <div className="w-[95%] md:w-[90%] mx-auto mt-6 md:mt-10">



                <h1 className="
text-2xl md:text-4xl
font-bold
mb-6 md:mb-8
">

                    My Orders

                </h1>





                {

                    orders.length === 0 ?


                        <h2 className="text-xl">

                            No Orders Found

                        </h2>



                        :


                        <div className="
grid
grid-cols-1
gap-4 md:gap-5
">



                            {

                                orders.map(order => (


                                    <div

                                        key={order.id}

                                        className="
bg-white
shadow
rounded-xl
p-4 md:p-5
flex
flex-col sm:flex-row
gap-4 md:gap-8
items-start sm:items-center
"



                                    >






                                        <img


                                            src={
                                                `http://localhost:8080/api/products/image/${order.image}`
                                            }


                                            className="
w-32 md:w-40
h-32 md:h-40
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




                                            <p className="mt-2">

                                                Quantity :
                                                <b> {order.quantity}</b>

                                            </p>





                                            <p>

                                                Price :
                                                <span className="text-green-600 font-bold">

                                                    ₹{order.price}

                                                </span>

                                            </p>





                                            <p>

                                                Total :

                                                <b>
                                                    ₹{order.total}
                                                </b>

                                            </p>






                                            <p className="mt-3">

                                                Address :

                                                {order.address}

                                            </p>






                                            <p>

                                                Payment :

                                                <b>
                                                    {order.paymentMethod}
                                                </b>

                                            </p>







                                            <p>

                                                Status :

                                                <span className="
text-blue-600
font-bold
">

                                                    {order.orderStatus}

                                                </span>

                                            </p>





                                            <button


                                                onClick={() => deleteOrder(order.id)}


                                                className="
mt-5
bg-red-600
text-white
px-4 md:px-6
py-2
rounded-lg
hover:bg-red-700
text-sm md:text-base
"


                                            >

                                                Delete Order

                                            </button>







                                        </div>







                                    </div>



                                ))


                            }



                        </div>


                }



            </div>



        </>


    )


}



export default Orders;