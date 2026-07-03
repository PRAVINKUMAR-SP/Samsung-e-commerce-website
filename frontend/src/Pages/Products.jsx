import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";



function Product() {


    const [products, setProducts] = useState([]);

    const navigate = useNavigate();





    useEffect(() => {


        axios.get(
            "https://samsung-backend-xds3.onrender.com/api/products"
        )

            .then(res => {

                setProducts(res.data);

            })


    }, [])





    // GROUP BY CATEGORY

    const categories = products.reduce((acc, item) => {


        if (!acc[item.category]) {

            acc[item.category] = [];

        }


        acc[item.category].push(item);



        return acc;


    }, {});








    return (

        <>


            <Navbar />




            <div className="w-[90%] m-auto mt-8">






                {

                    Object.keys(categories).map(category => (



                        <div key={category} className="mb-12">






                            {/* CATEGORY TITLE */}



                            <h1 className="
text-2xl md:text-3xl
font-bold
text-blue-600
mb-5
border-b-2
pb-2
">


                                {category}


                            </h1>








                            <div className="
grid
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
gap-4 md:gap-6
">





                                {

                                    categories[category].map(p => (



                                        <div


                                            key={p.id}



                                            onClick={() => navigate(
                                                `/product/${p.id}`
                                            )}



                                            className="
cursor-pointer
bg-white
rounded-xl
shadow-lg
p-4
hover:scale-105
transition
"




                                        >






                                            <img


                                                src={

                                                    `https://samsung-backend-xds3.onrender.com/api/products/image/${p.image}`

                                                }


                                                className="
h-[150px] md:h-[200px]
w-full
object-contain
"

                                            />








                                            <h2 className="
text-xl
font-bold
mt-3
">

                                                {p.name}

                                            </h2>







                                            <p className="
text-gray-500
h-12
overflow-hidden
">


                                                {p.description}


                                            </p>








                                            <div className="flex gap-3 mt-3 flex-wrap">



                                                <span className="
text-green-600
font-bold
text-lg md:text-xl
">

                                                    ₹{p.discountPrice}

                                                </span>





                                                <del className="text-xs md:text-sm text-gray-400">

                                                    ₹{p.price}

                                                </del>



                                            </div>









                                            <button



                                                onClick={(e) => {


                                                    e.stopPropagation();


                                                    navigate(
                                                        `/product/${p.id}`
                                                    )


                                                }}



                                                className="
bg-blue-600
text-white
w-full
rounded
mt-4
py-2
hover:bg-blue-700
"


                                            >


                                                Add To Cart


                                            </button>









                                        </div>





                                    ))


                                }







                            </div>







                        </div>





                    ))


                }








            </div>



        </>

    )


}



export default Product;