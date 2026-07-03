import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";



function Search() {


    const { keyword } = useParams();

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {


        axios.get(
            "http://localhost:8080/api/products"
        )

            .then(res => {


                const result = res.data.filter(p =>

                    p.name
                        .toLowerCase()
                        .includes(
                            keyword.toLowerCase()
                        )

                    ||
                    p.category
                        .toLowerCase()
                        .includes(
                            keyword.toLowerCase()
                        )

                    ||
                    p.brand
                        .toLowerCase()
                        .includes(
                            keyword.toLowerCase()
                        )


                );



                setProducts(result);



            })



    }, [keyword]);






    return (

        <>


            <Navbar />


            <div className="
w-[95%] md:w-[90%]
mx-auto
mt-6 md:mt-10
">


                <h1 className="
text-2xl md:text-3xl
font-bold
">

                    Search : {keyword}

                </h1>





                <div className="
grid
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
gap-4 md:gap-5
mt-6 md:mt-8
">


                    {


                        products.length === 0 ?


                            <h2>
                                No Product Found
                            </h2>



                            :

                            products.map(product => (



                                <div

                                    key={product.id}

                                    onClick={() => navigate(
                                        `/product/${product.id}`
                                    )}

                                    className="
bg-white
shadow
rounded-xl
p-4
cursor-pointer
hover:scale-105
transition
"

                                >



                                    <img

                                        src={
                                            `http://localhost:8080/api/products/image/${product.image}`
                                        }

                                        className="
h-32 md:h-40
w-full
object-contain
"

                                    />



                                    <h2 className="
font-bold
mt-3
">

                                        {product.name}

                                    </h2>



                                    <p className="
text-green-600
font-bold
">

                                        ₹{product.discountPrice}

                                    </p>



                                </div>



                            ))


                    }




                </div>




            </div>



        </>

    )

}


export default Search;