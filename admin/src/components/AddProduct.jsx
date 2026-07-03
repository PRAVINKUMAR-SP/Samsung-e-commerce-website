import axios from "axios";
import { useState } from "react";
import Sidebar from "./Sidebar";


function AddProduct() {


    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");



    const [product, setProduct] = useState({

        name: "",
        description: "",
        price: "",
        discountPrice: "",
        category: "",
        brand: "",
        specifications: ""

    });





    const change = (e) => {


        setProduct({

            ...product,

            [e.target.name]: e.target.value

        })


    }





    const handleImage = (file) => {


        if (file) {

            setImage(file);

            setPreview(
                URL.createObjectURL(file)
            );


        }


    }




    const fileChange = (e) => {

        handleImage(
            e.target.files[0]
        );


    }




    const dragOver = (e) => {

        e.preventDefault();

    }




    const drop = (e) => {

        e.preventDefault();

        handleImage(
            e.dataTransfer.files[0]
        );

    }






    const save = async () => {


        let formData = new FormData();




        // product JSON

        formData.append(

            "product",

            new Blob(

                [

                    JSON.stringify(product)

                ],

                {

                    type: "application/json"

                }

            )

        );





        // image file

        if (image) {

            formData.append(
                "image",
                image
            );

        }




        try {


            const res = await axios.post(

                "https://samsung-backend-xds3.onrender.com/api/products",

                formData

            );


            console.log(res.data);


            alert("Product Added");


        }

        catch (error) {

            console.log(error);

            alert("Upload Failed");

        }



    }






    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 min-h-screen bg-gray-50">

            <Sidebar />

            <div className="flex-1 gap-15 ml-0 md:ml-0 mt-4 md:mt-10 px-4 md:px-8 pb-8">

                <h1 className="text-2xl md:text-3xl font-bold text-[#96ee12fa]">

                    Add Product

                </h1>




                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">



                    <input

                        className="border p-2"

                        name="name"

                        placeholder="Product Name"

                        onChange={change}

                    />




                    <textarea

                        className="border p-2"

                        name="description"

                        placeholder="Description"

                        onChange={change}

                    />





                    <input

                        className="border p-2"

                        name="price"

                        placeholder="Price"

                        onChange={change}

                    />





                    <input

                        className="border p-2"

                        name="discountPrice"

                        placeholder="Discount Price"

                        onChange={change}

                    />





                    <select

                        className="border p-2"

                        name="category"

                        onChange={change}

                    >


                        <option value="">
                            Select Category
                        </option>


                        <option>
                            AC
                        </option>


                        <option>
                            TV
                        </option>


                        <option>
                            Washing Machine
                        </option>


                        <option>
                            Air Cooler
                        </option>



                    </select>





                    <input

                        className="border p-2"

                        name="brand"

                        placeholder="Brand"

                        onChange={change}

                    />






                    {/* Drag Drop */}



                    <div


                        onDragOver={dragOver}


                        onDrop={drop}


                        className="border-2 border-dashed p-6 md:p-10 text-center"



                    >


                        <p>
                            Drag & Drop Image
                        </p>


                        <p>
                            OR
                        </p>


                        <input

                            type="file"

                            accept="image/*"

                            onChange={fileChange}

                        />



                    </div>





                    {

                        preview &&


                        <img

                            src={preview}

                            width="200"

                            className="mx-auto"

                        />


                    }







                    <textarea


                        className="border p-2"


                        name="specifications"


                        placeholder='{"capacity":"1.5 Ton","star":"5 Star"}'


                        onChange={change}


                    />





                </div>






                <button


                    onClick={save}


                    className="bg-blue-500 text-white px-5 py-2 mt-5 rounded text-sm md:text-base hover:bg-blue-600 transition"


                >


                    Add Product


                </button>




            </div>
        </div>

    )


}



export default AddProduct;