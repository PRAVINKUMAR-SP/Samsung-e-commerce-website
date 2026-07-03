import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


function Product() {


    const [products, setProducts] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {


        axios.get(
            "https://samsung-backend-xds3.onrender.com/api/products"
        )
            .then(res => {

                setProducts(res.data)

            })


    }, [])






    return (
        <>
            <div className="w-[90%] m-auto mt-8">



                <h1 className="text-4xl font-bold text-blue-600">

                    Products

                </h1>



                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">



                    {

                        products.map(p => (


                            <div

                                key={p.id}

                                onClick={() => navigate(`/product/${p.id}`)}

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



                                <h2 className="text-base md:text-xl font-bold mt-3 line-clamp-2">

                                    {p.name}

                                </h2>



                                <p className="text-gray-500 h-10 md:h-12 overflow-hidden text-sm">

                                    {p.description}

                                </p>



                                <div className="flex gap-2 mt-3 flex-wrap">


                                    <span className="text-green-600 font-bold text-lg md:text-xl">

                                        ₹{p.discountPrice}

                                    </span>


                                    <del className="text-xs md:text-sm text-gray-400">

                                        ₹{p.price}

                                    </del>


                                </div>




                                <button

                                    onClick={(e) => {

                                        e.stopPropagation();

                                        navigate(`/product/${p.id}`)

                                    }}

                                    className="
bg-blue-600
text-white
w-full
rounded
mt-4
py-2
"


                                >

                                    Add To Cart

                                </button>




                            </div>


                        ))


                    }



                </div>


            </div>

        </>
    )


}


export default Product;