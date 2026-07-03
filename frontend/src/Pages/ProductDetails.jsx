import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";


function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);



    useEffect(() => {


        axios.get(
            "https://samsung-backend-xds3.onrender.com/api/products"
        )
            .then(res => {


                const products = res.data;


                const current = products.find(
                    p => p.id == id
                );


                setProduct(current);



                setRelated(
                    products.filter(
                        p =>
                            p.category === current.category &&
                            p.id !== current.id
                    )
                );


            });


    }, [id]);





    if (!product) {

        return (
            <div className="text-center text-3xl mt-20">
                Loading...
            </div>
        )

    }





    return (

        <>

            <Navbar />


            <div className="w-[95%] md:w-[90%] mx-auto mt-6 md:mt-8">



                {/* PRODUCT SECTION */}


                <div className="
grid
grid-cols-1 md:grid-cols-[35%_65%]
gap-6 md:gap-10
bg-white
p-4 md:p-6
rounded-xl
shadow
">





                    {/* IMAGE */}


                    <div className="
flex
items-center
justify-center
bg-gray-50
rounded-xl
h-[250px] md:h-[380px]
">


                        <img

                            src={
                                `https://samsung-backend-xds3.onrender.com/api/products/image/${product.image}`
                            }

                            className="
w-[300px] md:w-[450px]
h-[250px] md:h-[400px]
object-contain
"

                        />


                    </div>





                    {/* DETAILS */}


                    <div>



                        <h1 className="
text-2xl md:text-4xl
font-bold
">

                            {product.name}

                        </h1>




                        <p className="
text-gray-600
mt-3
line-clamp-3
">

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


                            <del className="
ml-3
text-gray-400
">

                                ₹{product.price}

                            </del>


                        </div>





                        <div className="
mt-4
space-y-1
">


                            <p>
                                <b>Brand :</b> {product.brand}
                            </p>


                            <p>
                                <b>Category :</b> {product.category}
                            </p>


                        </div>







                        {/* SPECIFICATIONS */}



                        <div className="mt-6">


                            <h2 className="
text-xl md:text-2xl
font-bold
mb-3
">

                                Specifications

                            </h2>



                            <div className="
border
rounded-lg
overflow-hidden
">


                                {

                                    Object.entries(
                                        JSON.parse(product.specifications || "{}")
                                    )

                                        .map(([key, value]) => (


                                            <div

                                                key={key}

                                                className="
grid
grid-cols-2
border-b
last:border-none
text-sm
"


                                            >


                                                <div className="
bg-gray-100
p-2
font-semibold
capitalize
">

                                                    {
                                                        key.replace(/([A-Z])/g, " $1")
                                                    }

                                                </div>



                                                <div className="
p-2
">

                                                    {value}

                                                </div>



                                            </div>



                                        ))


                                }



                            </div>



                        </div>






                        <button
                            onClick={() =>
                                navigate("/order-confirm", {
                                    state: {
                                        product: product
                                    }
                                })
                            }
                            className="
    mt-4
    bg-blue-600
    text-white
    px-8
    py-3
    rounded-lg
    hover:bg-blue-700
    w-full
    "
                        >
                            Add To Cart
                        </button>



                    </div>



                </div>








                {/* SAME PRODUCTS */}



                <h1 className="
text-2xl md:text-3xl
font-bold
mt-8 md:mt-12
">

                    Same Products

                </h1>





                <div className="
grid
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
gap-4 md:gap-5
mt-5
">



                    {

                        related.map(p => (



                            <div

                                key={p.id}

                                onClick={() => navigate(`/product/${p.id}`)}

                                className="
bg-white
rounded-xl
shadow
p-4
cursor-pointer
hover:scale-105
transition
"



                            >



                                <img


                                    src={
                                        `https://samsung-backend-xds3.onrender.com/api/products/image/${p.image}`
                                    }


                                    className="
h-32
w-full
object-contain
"


                                />




                                <h2 className="
font-bold
mt-3
">

                                    {p.name}

                                </h2>



                                <p className="
text-green-600
font-bold
">

                                    ₹{p.discountPrice}

                                </p>




                            </div>



                        ))

                    }



                </div>





            </div>


        </>

    )

}


export default ProductDetails;