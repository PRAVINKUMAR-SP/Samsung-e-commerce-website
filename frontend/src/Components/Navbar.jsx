import React from "react";
import axios from "axios";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaBoxOpen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {


    const navigate = useNavigate();


    const [user, setUser] = React.useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );


    const [search, setSearch] = React.useState("");

    const [suggestions, setSuggestions] = React.useState([]);

    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);





    React.useEffect(() => {

        setUser(
            JSON.parse(localStorage.getItem("currentUser"))
        );

    }, []);







    const logout = () => {

        localStorage.removeItem("currentUser");

        navigate("/login");

        window.location.reload();

    };








    // LIVE SEARCH

    const handleSearch = (value) => {


        setSearch(value);



        if (value.trim() === "") {

            setSuggestions([]);

            return;

        }






        axios.get(
            "https://samsung-backend-xds3.onrender.com/api/products"
        )

            .then(res => {


                const result = res.data.filter(product =>

                    product.name
                        .toLowerCase()
                        .includes(
                            value.toLowerCase()
                        )

                    ||

                    product.category
                        .toLowerCase()
                        .includes(
                            value.toLowerCase()
                        )

                    ||

                    product.brand
                        .toLowerCase()
                        .includes(
                            value.toLowerCase()
                        )

                );



                setSuggestions(
                    result.slice(0, 6)
                );


            })


    }







    const goSearch = () => {


        if (search.trim()) {


            navigate(
                `/search/${search}`
            );


            setSuggestions([]);

        }


    }








    return (

        <div className="bg-[#fff8f8] shadow sticky top-0 z-40">



            <div className="
flex
items-center
justify-between
w-[95%] md:w-[90%]
m-auto
py-2 md:py-4
gap-2 md:gap-4
">







                {/* LOGO */}


                <Link to="/">


                    <div className="cursor-pointer flex-shrink-0">


                        <h1 className="
font-bold
text-[18px] md:text-[30px]
text-[#1b74fa]
font-serif
">

                            SAMSUNG

                        </h1>



                        <h3 className="
font-semibold
text-[12px] md:text-[22px]
text-amber-500
-mt-2 md:-mt-3
ml-6 md:ml-16
font-mono
">

                            Ariyalur

                        </h3>


                    </div>


                </Link>









                {/* SEARCH */}




                <div className="relative hidden sm:block flex-1 md:flex-none">



                    <div className="flex">


                        <input


                            className="
w-full sm:w-[350px] md:w-[550px]
h-10
rounded-l-md
bg-amber-200
px-3
focus:outline-none
text-sm md:text-base
"


                            type="text"


                            placeholder="Search Products..."


                            value={search}



                            onChange={

                                e => handleSearch(
                                    e.target.value
                                )

                            }



                            onKeyDown={

                                e => {

                                    if (e.key === "Enter") {

                                        goSearch();

                                    }

                                }

                            }



                        />







                        <button


                            onClick={goSearch}


                            className="
bg-blue-600
text-white
px-4 md:px-6
rounded-r-md
text-sm md:text-base
hover:bg-blue-700
transition
"


                        >


                            Search


                        </button>



                    </div>







                    {/* SUGGESTION BOX */}





                    {

                        suggestions.length > 0 &&



                        <div className="

absolute
top-12
left-0
w-full sm:w-[350px] md:w-[550px]
bg-white
shadow-2xl
rounded-lg
z-50
overflow-hidden

">





                            {

                                suggestions.map(product => (



                                    <div


                                        key={product.id}



                                        onClick={() => {


                                            navigate(
                                                `/product/${product.id}`
                                            );


                                            setSearch("");

                                            setSuggestions([]);

                                        }}



                                        className="

flex
items-center
gap-4
p-3
cursor-pointer
hover:bg-gray-100

"


                                    >




                                        <img


                                            src={

                                                `https://samsung-backend-xds3.onrender.com/api/products/image/${product.image}`

                                            }


                                            className="
w-14
h-14
object-contain
"

                                        />







                                        <div>



                                            <h2 className="font-semibold">


                                                {product.name}


                                            </h2>




                                            <p className="
text-green-600
font-bold
">


                                                ₹{product.discountPrice}


                                            </p>




                                        </div>







                                    </div>



                                ))


                            }





                        </div>


                    }







                </div>









                {/* HAMBURGER BUTTON - MOBILE */}

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-amber-600 hover:text-amber-800 transition flex-shrink-0"
                >
                    {mobileMenuOpen ? <MdClose size={28} /> : <GiHamburgerMenu size={28} />}
                </button>




                {/* MENU - DESKTOP */}





                <ul className="
hidden md:flex
items-center
gap-2 md:gap-10
font-semibold
text-amber-600
text-xs md:text-base
">







                    <Link to="/product1">


                        <li className="
flex
items-center
gap-2
">


                            <HiOutlineShoppingCart size={24} />


                            Products


                        </li>


                    </Link>







                    <Link to="/orders">


                        <li className="
flex
items-center
gap-2
">


                            <FaBoxOpen size={22} />


                            Orders


                        </li>


                    </Link>









                    {

                        !user ?



                            <Link to="/login">


                                <li className="
flex
items-center
gap-2
cursor-pointer
hover:text-amber-800
transition
">


                                    <CgProfile size={24} />


                                    Login


                                </li>


                            </Link>






                            :

                            <li className="
relative
group
cursor-pointer
list-none
">





                                <div className="
flex
items-center
gap-2
hover:text-amber-800
transition
">


                                    <CgProfile size={24} />


                                    {user.name}


                                </div>









                                <div className="

absolute
right-0
mt-2
w-52
bg-white
rounded-lg
shadow-lg
hidden
group-hover:block
z-50

">





                                    <div className="p-4 border-b">


                                        <h3 className="font-bold">

                                            {user.name}

                                        </h3>


                                        <p className="text-sm text-gray-500">

                                            {user.email}

                                        </p>


                                    </div>








                                    <Link

                                        to="/profile"

                                        className="
block
px-4
py-2
hover:bg-blue-100
transition
"

                                    >


                                        My Profile


                                    </Link>








                                    <Link

                                        to="/orders"

                                        className="
block
px-4
py-2
hover:bg-blue-100
transition
"

                                    >


                                        My Orders


                                    </Link>









                                    <button


                                        onClick={logout}


                                        className="
w-full
text-left
px-4
py-2
hover:bg-red-100
text-red-600
transition
"

                                    >


                                        Logout


                                    </button>






                                </div>






                            </li>




                    }




                </ul>










            </div>


            {/* MOBILE MENU */}

            {mobileMenuOpen && (
                <div className="md:hidden bg-[#fff8f8] border-t border-gray-200 px-4 py-4 max-h-96 overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        {/* Mobile Search */}
                        <div className="flex gap-2">
                            <input
                                className="
flex-1
h-10
rounded-l-md
bg-amber-200
px-3
focus:outline-none
text-sm
"
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={e => handleSearch(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        goSearch();
                                        setMobileMenuOpen(false);
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    goSearch();
                                    setMobileMenuOpen(false);
                                }}
                                className="bg-blue-600 text-white px-3 rounded-r-md text-sm hover:bg-blue-700 transition"
                            >
                                Go
                            </button>
                        </div>

                        {/* Mobile Links */}
                        <Link to="/product1" onClick={() => setMobileMenuOpen(false)}>
                            <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-100 rounded transition font-semibold text-amber-600">
                                <HiOutlineShoppingCart size={20} />
                                <span>Products</span>
                            </div>
                        </Link>

                        <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
                            <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-100 rounded transition font-semibold text-amber-600">
                                <FaBoxOpen size={20} />
                                <span>Orders</span>
                            </div>
                        </Link>

                        {!user ? (
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-100 rounded transition font-semibold text-amber-600">
                                    <CgProfile size={20} />
                                    <span>Login</span>
                                </div>
                            </Link>
                        ) : (
                            <>
                                <div className="py-2 px-3 border-t border-gray-200">
                                    <p className="font-bold text-amber-600 text-sm">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="py-2 px-3 hover:bg-gray-100 rounded transition text-amber-600 text-sm">
                                        My Profile
                                    </div>
                                </Link>
                                <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="py-2 px-3 hover:bg-gray-100 rounded transition text-amber-600 text-sm">
                                        My Orders
                                    </div>
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left py-2 px-3 hover:bg-red-100 text-red-600 transition rounded text-sm"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}



        </div>


    )


}



export default Navbar;