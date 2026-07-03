import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";


function Product() {


    const [products, setProducts] = useState([]);

    const [editId, setEditId] = useState(null);



    const [form, setForm] = useState({

        name: "",
        description: "",
        price: "",
        discountPrice: "",
        category: "",
        brand: "",
        specifications: ""

    });




    const loadProducts = () => {


        axios.get(
            "https://samsung-backend-xds3.onrender.com/api/products"
        )
            .then(res => setProducts(res.data));


    }



    useEffect(() => {

        loadProducts();

    }, [])





    const change = (e) => {


        setForm({

            ...form,

            [e.target.name]: e.target.value

        })


    }






    const editProduct = (p) => {


        setEditId(p.id);


        setForm({

            name: p.name,

            description: p.description,

            price: p.price,

            discountPrice: p.discountPrice,

            category: p.category,

            brand: p.brand,

            specifications: p.specifications


        });


    }






    const updateProduct = async () => {


        await axios.put(

            `https://samsung-backend-xds3.onrender.com/api/products/${editId}`,

            form

        );


        alert("Product Updated");


        setEditId(null);


        loadProducts();


    }






    const deleteProduct = async (id) => {


        if (window.confirm("Delete Product?")) {


            await axios.delete(

                `https://samsung-backend-xds3.onrender.com/api/products/${id}`

            );


            loadProducts();


        }


    }







    return (


        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">


            <Sidebar />




            <div className="flex-1 p-4 md:p-8">



                <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-800">

                    Product Management

                </h1>





                {/* EDIT BOX */}


                {

                    editId &&

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8">


                        <h2 className="text-xl md:text-2xl font-bold mb-5">

                            Edit Product

                        </h2>



                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">



                            <input

                                className="input"

                                name="name"

                                value={form.name}

                                onChange={change}

                                placeholder="Product Name"

                            />



                            <textarea

                                className="input"

                                name="description"

                                value={form.description}

                                onChange={change}

                                placeholder="Description"

                            />





                            <input

                                className="input"

                                name="price"

                                value={form.price}

                                onChange={change}

                                placeholder="Price"

                            />





                            <input

                                className="input"

                                name="discountPrice"

                                value={form.discountPrice}

                                onChange={change}

                                placeholder="Discount Price"

                            />





                            <select

                                className="input"

                                name="category"

                                value={form.category}

                                onChange={change}

                            >


                                <option>AC</option>

                                <option>TV</option>

                                <option>Washing Machine</option>

                                <option>Air Cooler</option>


                            </select>





                            <input

                                className="input"

                                name="brand"

                                value={form.brand}

                                onChange={change}

                                placeholder="Brand"

                            />





                            <textarea

                                className="input"

                                name="specifications"

                                value={form.specifications}

                                onChange={change}

                                placeholder="Specifications"

                            />



                        </div>





                        <div className="mt-5">


                            <button

                                onClick={updateProduct}

                                className="bg-green-600 text-white px-6 py-2 rounded-lg mr-3 hover:bg-green-700"

                            >

                                Save Change

                            </button>




                            <button

                                onClick={() => setEditId(null)}

                                className="bg-gray-500 text-white px-6 py-2 rounded-lg"

                            >

                                Cancel

                            </button>



                        </div>



                    </div>


                }







                {/* TABLE */}



                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">


                    <table className="w-full text-sm md:text-base">


                        <thead className="bg-gray-900 text-white">


                            <tr>


                                <th className="p-4">
                                    Image
                                </th>


                                <th>
                                    Name
                                </th>


                                <th>
                                    Category
                                </th>


                                <th>
                                    Price
                                </th>


                                <th>
                                    Discount
                                </th>


                                <th>
                                    Action
                                </th>


                            </tr>


                        </thead>





                        <tbody>



                            {

                                products.map(p => (



                                    <tr

                                        key={p.id}

                                        className="border-b hover:bg-gray-100"


                                    >



                                        <td className="p-2 md:p-4">


                                            {

                                                p.image &&

                                                <img

                                                    src={
                                                        `https://samsung-backend-xds3.onrender.com/api/products/image/${p.image}`
                                                    }

                                                    className="w-16 md:w-20 h-16 md:h-20 object-cover rounded"

                                                />


                                            }



                                        </td>





                                        <td>


                                            <div className="font-bold text-xs md:text-sm">

                                                {p.name}

                                            </div>


                                            <div className="text-sm text-gray-500">

                                                {p.brand}

                                            </div>


                                        </td>





                                        <td>


                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">


                                                {p.category}


                                            </span>


                                        </td>





                                        <td>

                                            ₹{p.price}

                                        </td>





                                        <td className="text-green-600 font-bold">


                                            ₹{p.discountPrice}


                                        </td>





                                        <td>



                                            <button

                                                onClick={() => editProduct(p)}

                                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"

                                            >

                                                Edit

                                            </button>






                                            <button

                                                onClick={() => deleteProduct(p.id)}

                                                className="bg-red-600 text-white px-4 py-2 rounded-lg"

                                            >

                                                Delete

                                            </button>



                                        </td>





                                    </tr>



                                ))


                            }





                        </tbody>



                    </table>



                </div>






            </div>


        </div>


    )


}



export default Product;