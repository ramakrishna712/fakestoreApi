import { useScrollTrigger } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function FakestoreIndex(){

    const[products,setProducts]=useState([])


    useEffect(()=>{
        axios.get("https://fakestoreapi.com/products")
        .then(response=>{
            setProducts(response.data)
        })
    },[])
    return(
    <div  style={{marginTop:"50px"}}>
        <h2 className="text-center">FakeStore Home</h2>
        <p className="text-center">Online shopping <Link to="/categories"> Browse Categories</Link></p>
        <div className="container-fluid d-flex flex-wrap justify-content-center  ">
            {
                products.map(product=><div className="product-card border border-2 border-black m-3 p-3 d-flex flex-column align-items-center  " key={product.id}>
                    <img className=" position-relative m-1 p-5" src={product.image} width="200" height="200" alt="prod"  />
                    <p className="bg-danger round rounded-5 p-2 text-white position-absolute top-20 ">{product.price.toLocaleString("en-IN",{style:"currency",currency:"INR"})}</p>
                    <button className="btn btn-primary btn-sm mt-2 ">add to cart</button>

                </div>)
            }
        </div>
    </div>
)
}