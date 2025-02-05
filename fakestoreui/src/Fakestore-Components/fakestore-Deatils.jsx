import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { addToCart } from "./store";
import { useDispatch } from "react-redux";

export function FakeStoreDetails() {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        id: 0, title: '', price: 0, image: '', description: '', category: '', rating: { rate: 0, count: 0 }
    });
    let params = useParams();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${params.id}`)
            .then(response => {
                setProduct(response.data);
            });
    }, [params.id]);
    function handleAddToCart(){
        dispatch(addToCart(product));
    }

    return (
        <div className="container my-4">
            <h2 className="text-center">Product Details</h2>
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6 text-center">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="img-fluid mb-3" 
                        style={{ maxHeight: '400px', objectFit: 'contain' }} 
                    />
                </div>
                <div className="col-md-6">
                    <button onClick={handleAddToCart} className="btn btn-outline-dark mb-2" style={{marginLeft:"100px"}}>add to cart <span className="bi bi-cart4"></span></button>
                    <dl>
                        <dt>Title</dt>
                        <dd>{product.title}</dd>
                        <dt>Price</dt>
                        <dd>{product.price} $</dd>
                        <dt>Rating</dt>
                        <dd>
                            {product.rating.rate}
                            <span className="bi bi-star-fill text-success ms-1"></span>
                            
                        </dd>
                        <dt>Reviews</dt>
                        <dd>{product.rating.count}</dd>

                    </dl>
                    <div className="text-center mt-3">
                        <Link to={`/products/${product.category}`} className="btn btn-outline-primary">
                            Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
