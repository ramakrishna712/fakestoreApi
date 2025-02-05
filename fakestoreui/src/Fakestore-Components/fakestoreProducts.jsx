import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function FakestoreProducts() {
    const [products, setProducts] = useState([
        { id: 0, title: "", image: "", price: 0, category: "", description: "", rating: { rate: 0, count: 0 } }]);

        const[cookies,setCookie,removeCookie] = useCookies(['username']);

        let navigate = useNavigate();
        let params = useParams();

    useEffect(() => {
        if(cookies["username"]){
            axios.get(`https://fakestoreapi.com/products/category/${params.category}`)
            .then(response => {
                setProducts(response.data);
            });
        }else{
            navigate('/login')
        }
    }, [params.category]);

    function handleSignoutClick(){
        removeCookie('username')
        navigate('/login');
    }

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between">
                <span className="h3">Hello! {cookies["username"]}</span>
                <button className="btn btn-primary" onClick={handleSignoutClick}>Signout</button>
            </div>
            <h2 className="text-center">{params.category.toUpperCase()} PRODUCTS</h2>
            <main className="row justify-content-center">
                {
                    products.map(product => (
                        <div key={product.id} className="col-6 col-md-4 col-lg-3 mb-4 d-flex flex-column align-items-center">
                            <img 
                                src={product.image} 
                                alt={product.title} 
                                className="img-fluid mb-2" 
                                style={{ height: '150px', objectFit: 'contain' }}
                            />
                            <div className="w-100">
                                <Link to={`/details/${product.id}`} className="btn btn-primary w-100">Details</Link>
                            </div>
                        </div>
                    ))
                }
            </main>
            <div className="text-center mt-3">
                <Link to="/categories" className="btn btn-outline-secondary">Back to Categories</Link>
            </div>
        </div>
    );
}
