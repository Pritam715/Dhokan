import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Decrement, Delete, Increment } from '../../actions';


export default function Cart() {

    const dispatch = useDispatch();
    const history = useHistory();
    const shoppingCart = useSelector((state) => state.carts.shoppingCart);
    const total_qty = useSelector((state) => state.carts.qty);
    const total_price = useSelector((state) => state.carts.totalPrice);
    const isAuthenticated = useSelector((state) => state.Auth.token);


    const ProccedToBuy = async (e) => {

        if (isAuthenticated) {
            history.push('/shipping/payselect')
        }
        else {
            history.push('/signin')

        }
    }

    useEffect(() => {

    }, [])

    return (
        <div>
            <div className="h-100" >
                <div className="container mt-4" style={{ backgroundColor: 'white' }}>
                    <div className="row" >
                        <div className="col-md-8">
                            <table className="table">
                                <thead>
                                    <tr style={{ fontWeight: 'bold' }}>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shoppingCart.length > 0 ? shoppingCart.map((c, index) => {

                                        return (

                                            <tr key={index}>
                                                {/* <td>{index + 1}</td> */}
                                                <td><img src={`/Images/Products/${c.product_image}`} width={100} /></td>
                                                <td>  <Link to={`/products-info/${c.product_slug}`}><strong>{c.product_name}</strong></Link></td>
                                                <td>
                                                    {
                                                        c.product_size &&
                                                        c.product_size

                                                    }
                                                </td>
                                                <td><span style={{ padding: 12 }} onClick={() => dispatch(Increment({ id: c.id, c }))}><i className="fa fa-plus" style={{ color: "#C12200" }}></i></span>
                                                    {c.product_quantity}

                                                    <span style={{ padding: 12 }} onClick={() => dispatch(Decrement({ id: c.id, c }))} ><i className="fa fa-minus" style={{ color: "#C12200" }}></i></span></td>
                                                <td>{c.product_price}</td>
                                                <td>{c.product_quantity * c.product_price}</td>
                                                <td><i className="fa fa-times" style={{ color: "#d65106" }} onClick={() => dispatch(Delete({ id: c.product_id, c }))} /></td>
                                            </tr>



                                        );


                                    })
                                        : <tr>
                                            <td colSpan={7} style={{ padding: 40, textAlign: 'center' }}>
                                                <strong>Sorry Your Carts is Empty</strong>
                                            </td></tr>

                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-4" style={{ padding: 50 }}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Total Quantity</th>
                                        <td>{total_qty}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Price</th>
                                        <td>{total_price}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                {
                                    shoppingCart.length > 0 ?
                                        // <Link to="/shipping/payselect">
                                        <button className="btn" onClick={ProccedToBuy} style={{ backgroundColor: '#C12200', color: 'white' }}>Proceed To Buy</button>
                                        // </Link>
                                        :
                                        // <Link to="/view/cart">

                                        <button className="btn" style={{ backgroundColor: '#C12200', color: 'white' }}>Go To Shop</button>
                                    // </Link>

                                }

                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </div >
    )
}
