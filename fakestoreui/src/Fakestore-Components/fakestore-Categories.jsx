import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function FakestoreCategories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const[cookies,setCookie,removeCookie]= useCookies(['username']);


    useEffect(() => {
        if(cookies['username']){
            axios.get("https://fakestoreapi.com/products/categories")
            .then(response => {
                setCategories(response.data);
            })
        }else{
            navigate('/login');
        }
    },[]);

    function handleSignoutClick(){
        removeCookie('username');
        navigate('/login');
    }

    return (
        <div className="container my-4">
            <div className="d-flex bg-warning justify-content-between ">
                <span className="h3  mx-5">Hello! {cookies["username"]}</span>
                <button className="btn btn-success" onClick={handleSignoutClick}>Signout</button>
            </div>
            <h2 className="text-center">Categories</h2>
            <div className="row justify-content-center">
                {
                    categories.map(category => (
                        <div key={category} className="col-6 col-md-4 col-lg-3 my-2 d-flex justify-content-center">
                            <Link to={`/products/${category}`} className="btn btn-dark w-100 text-center">
                                {category.toUpperCase()}
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className="text-center mt-4">
                <Link to="/" className="btn btn-outline-secondary">Back to Home</Link>
            </div>
        </div>
    );
}
