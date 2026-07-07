import { useLocation, useNavigate } from "react-router-dom";
import { getStoredJSON } from "../utils/storage";
import { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";


function OrderConfirmPage() {


    const navigate = useNavigate();

    const { state } = useLocation();


    const product = state?.product;




    const currentUser =
        getStoredJSON("currentUser");





    const savedAddr = getStoredJSON("userAddress");

    const [useOldAddress, setUseOldAddress] =
        useState(savedAddr ? true : false);

    const [quantity, setQuantity] = useState(1);

    const [name, setName] = useState(
        currentUser?.name || ""
    );

    const [phone, setPhone] = useState(
        savedAddr?.phone || ""
    );

    const [address, setAddress] = useState(
        savedAddr?.address || ""
    );




    const [paymentMethod, setPaymentMethod] =
        useState("Cash On Delivery");





    if (!product) {

        return (
            <>
                <Navbar />

                <h1 className="text-center mt-20 text-2xl">
                    No Product Selected
                </h1>

            </>
        )

    }






    const total =
        product.discountPrice * quantity;






    const increase = () => {

        setQuantity(quantity + 1);

    }




    const decrease = () => {

        if (quantity > 1)
            setQuantity(quantity - 1);

    }








    const confirmOrder = () => {


        if (!name || !phone || !address) {

            alert("Fill delivery details");

            return;

        }




        const order = {


            productId: product.id,

            productName: product.name,

            image: product.image,


            quantity,


            price: product.discountPrice,


            total,


            customerName: name,


            phone,


            address,


            paymentMethod


        };





        localStorage.setItem("userAddress", JSON.stringify({ phone, address }));

        axios.post(

            "https://samsung-backend-xds3.onrender.com/api/orders",

            order

        )

            .then(() => {


                alert("Order Placed Successfully");


                navigate("/orders");


            })

            .catch(() => {


                alert("Order Failed");


            })

    }





    return (

        <>


            <Navbar />




            <div className="w-[95%] md:w-[90%] mx-auto mt-6 md:mt-8">



                <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">

                    Confirm Order

                </h1>





                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">






                    {/* PRODUCT */}



                    <div className="bg-white shadow rounded-xl p-4 md:p-6">


                        <img

                            src={
                                `https://samsung-backend-xds3.onrender.com/api/products/image/${product.image}`
                            }

                            className="h-48 md:h-72 w-full object-contain"

                        />





                        <h2 className="text-lg md:text-2xl font-bold mt-5">

                            {product.name}

                        </h2>





                        <p className="text-gray-500">

                            {product.description}

                        </p>







                        <div className="mt-5">

                            <span className="
text-green-600
text-2xl md:text-3xl
font-bold
">

                                ₹{product.discountPrice}

                            </span>


                        </div>







                        <div className="flex gap-3 md:gap-5 items-center mt-8">


                            <button

                                onClick={decrease}

                                className="
bg-gray-300
px-3 md:px-5
py-1 md:py-2
rounded
text-sm md:text-base
"

                            >

                                -

                            </button>



                            <h2 className="text-lg md:text-2xl">

                                {quantity}

                            </h2>



                            <button

                                onClick={increase}

                                className="
bg-blue-600
text-white
px-3 md:px-5
py-1 md:py-2
rounded
text-sm md:text-base
"

                            >

                                +

                            </button>



                        </div>







                        <h2 className="text-lg md:text-2xl font-bold mt-8">

                            Total : ₹{total}

                        </h2>




                    </div>













                    {/* DELIVERY */}





                    <div className="bg-white shadow rounded-xl p-6">





                        <h2 className="text-2xl font-bold mb-6">

                            Delivery Details

                        </h2>








                        {/* SAVED ADDRESS */}




                        <div className="
border
rounded-lg
p-3 md:p-4
mb-5
text-sm md:text-base
">



                            <label className="flex gap-3">


                                <input


                                    type="radio"


                                    checked={useOldAddress}


                                    onChange={() => {
                                        setUseOldAddress(true);
                                        if (savedAddr) {
                                            setPhone(savedAddr.phone);
                                            setAddress(savedAddr.address);
                                        }
                                    }}


                                />


                                Use Saved Address


                            </label>




                            {

                                useOldAddress && savedAddr &&


                                <div className="mt-4 bg-gray-100 p-3 md:p-4 rounded text-sm md:text-base">


                                    <p>

                                        <b>Name:</b> {currentUser?.name}

                                    </p>


                                    <p>

                                        <b>Phone:</b> {savedAddr.phone}

                                    </p>



                                    <p>

                                        <b>Address:</b> {savedAddr.address}

                                    </p>



                                </div>


                            }



                        </div>









                        <label className="flex gap-3 mb-5 text-sm md:text-base">


                            <input


                                type="radio"


                                checked={!useOldAddress}


                                    onChange={() => {
                                        setUseOldAddress(false);
                                        setPhone("");
                                        setAddress("");
                                    }}


                            />


                            Add Another Location


                        </label>









                        {

                            !useOldAddress &&


                            <>


                                <input

                                    placeholder="Full Name"

                                    value={name}

                                    onChange={e => setName(e.target.value)}

                                    className="w-full border p-2 md:p-3 rounded mb-4 text-sm md:text-base"

                                />






                                <input

                                    placeholder="Mobile Number"

                                    value={phone}

                                    onChange={e => setPhone(e.target.value)}

                                    className="w-full border p-2 md:p-3 rounded mb-4 text-sm md:text-base"

                                />







                                <textarea


                                    placeholder="Delivery Address"


                                    value={address}


                                    onChange={e => setAddress(e.target.value)}


                                    className="
w-full
border
p-2 md:p-3
rounded
mb-5
text-sm md:text-base
"


                                />



                            </>


                        }









                        <h3 className="font-bold text-sm md:text-base">

                            Payment Method

                        </h3>





                        <label className="block mt-3">


                            <input

                                type="radio"

                                checked={
                                    paymentMethod === "Cash On Delivery"
                                }

                                onChange={() => setPaymentMethod("Cash On Delivery")}

                            />


                            Cash On Delivery


                        </label>





                        <label className="block mt-3">


                            <input

                                type="radio"

                                checked={
                                    paymentMethod === "Online Payment"
                                }

                                onChange={() => setPaymentMethod("Online Payment")}

                            />


                            Online Payment


                        </label>









                        <div className="border-t mt-6 pt-5">





                            <div className="flex justify-between text-sm md:text-base">

                                <span>Total</span>


                                <b>

                                    ₹{total}

                                </b>


                            </div>





                            <button


                                onClick={confirmOrder}


                                className="
bg-green-600
text-white
w-full
py-3 md:py-4
rounded-lg
mt-6
text-sm md:text-base
hover:bg-green-700
"


                            >


                                Confirm Order


                            </button>







                        </div>








                    </div>






                </div>







            </div>



        </>

    )

}


export default OrderConfirmPage;