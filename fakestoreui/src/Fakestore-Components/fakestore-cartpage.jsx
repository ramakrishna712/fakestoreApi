import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "./store";
import { Link } from "react-router-dom";
import "./Cartpage.css"; 

export function CartPage() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <h4 className="text-center text-danger">Your cart is empty</h4>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table table-bordered text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <img src={item.image} alt={item.title} className="cart-img" />
                                        </td>
                                        <td className="cart-title">{item.title}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            <button className="btn btn-sm btn-success mx-1" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button className="btn btn-sm btn-warning mx-1" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                                        </td>
                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" onClick={() => dispatch(removeFromCart(item.id))}><span className="bi bi-trash3"></span></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="cart-summary text-center">
                        <h4>Total Items: {totalItems}</h4>
                        <h4>Total Amount: <span className="text-success">${totalAmount}</span></h4>
                    </div>
                </>
            )}

            <div className="text-center mt-4">
                <Link className="btn btn-dark btn-lg" to="/">Back to Home</Link>
            </div>
        </div>
    );
}
