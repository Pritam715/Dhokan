import React, { useState, useEffect } from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { retrive, create, BASE_URL } from '../../config/Service';
import { Toast } from '../../custom/toast';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import parse from 'html-react-parser';


export default function ManageProduct() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        getProductDetails(e.target.id);
        setShow(true);
    }



    const onDelete = (e) => {
        deleteProduct(e.target.id);
    }


    const [product, setProduct] = useState([]);

    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('');
    const [subsubcategory, setSubSubCategory] = useState('');
    const [product_name, setProductName] = useState('');
    const [product_price, setProductPrice] = useState('');
    const [product_description, setProductDescription] = useState('');
    const [product_status, setProductStatus] = useState('');
    const [image, setProductImage] = useState('');



    const getProduct = async () => {
        let response = await retrive('/product/index');
        // console.log(response.data.product);
        setProduct(response.data.product);
    }

    const getProductDetails = async (id) => {

        let response = await retrive(`/product_details/${id}`)
        // console.log(response);
        setCategory(response.data.product_details.category.name);
        setSubCategory(response.data.product_details.subcategory.subcategory_name);
        setSubSubCategory(response.data.product_details.subsubcategory.sub_subcategory_name);
        setProductName(response.data.product_details.product_name);
        setProductPrice(response.data.product_details.product_price);
        setProductImage(response.data.product_details.image);
        setProductStatus(response.data.product_details.status);
        setProductDescription(parse(response.data.product_details.product_description));




    }


    const handleEditStatusCheckbox = async (id) => {
        let response = await create(`/update/product/status/${id}`);
        if (response.data.message === 'success') {
            getProduct();
            Toast.fire({
                icon: 'success',
                title: 'Update SuccessFully!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            })

        } else {
            alert('Not Updated');
        }
    }


    //delete
    const deleteProduct = async (id) => {
        let response = await retrive(`/product/${id}/delete`);

        if (response.data.message === 'success') {

            Toast.fire({
                icon: 'warning',
                title: 'Data Deleted SuccessFully!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            })
            getProduct();
        } else {
            alert('Data not Deleted');
        }
    }




    useEffect(() => {
        getProduct();

    }, [])


    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Products</h1>
                        </div>

                    </div>
                </div>
            </section>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title"><Link to="/admin/add_products"><Button className="btn btn-primary"><i className="fa fa-plus"></i>Add</Button></Link></h3>
                </div>

                <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Category Name</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product Image</th>
                                <th>Status</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>

                            {
                                product.length > 0 ? product.map((p, i) => {

                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{p.category.name}</td>
                                            <td>{p.product_name}</td>
                                            <td>{p.product_price}</td>
                                            <td><img src={`/Images/Products/${p.image}`} width={100} height={100}></img></td>
                                            <td>
                                                <BootstrapSwitchButton
                                                    onChange={e => handleEditStatusCheckbox(p.id)}

                                                    checked={p.status == 1 ? true : false}
                                                    width={100} onstyle="outline-success" offstyle="outline-danger" />

                                            </td>
                                            <td>
                                                <i className="fa fa-eye" id={p.id} onClick={handleShow} style={{ color: 'blue', padding: 5 }}></i>
                                                <Link to={`/admin/edit/products/${p.id}`} ><i id={p.id} className="fa fa-edit" style={{ color: 'green', padding: 5 }}></i></Link>
                                                <Link to={`/admin/edit/products_attributes/${p.id}`} ><i id={p.id} className="fas fa-align-justify" style={{ color: 'orange', padding: 5 }}></i></Link>
                                                <Link to={`/admin/edit/products_discount/${p.id}`} ><i id={p.id} className="fas fa-percent" style={{ color: 'red', padding: 5 }}></i></Link>

                                                <i onClick={e => {
                                                    var r = confirm("Are you sure?");
                                                    if (r == true) {
                                                        return onDelete(e);
                                                    }

                                                }

                                                } id={p.id} className="fa fa-trash" style={{ color: 'red', padding: 5 }}></i>

                                            </td>


                                        </tr>
                                    );

                                })
                                    :
                                    <tr>Not Available</tr>

                            }


                            <Modal show={show} size="lg" onHide={handleClose}>

                                <Modal.Body >
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img src={`/Images/Products/${image}`} width={200} height={200}></img>

                                        </div>
                                        <div className="col-md-4">
                                            <div style={{ padding: 20 }}>
                                                <table className="table">
                                                    <tr>
                                                        <th>Category:</th>
                                                        <td>{category}</td>

                                                    </tr>
                                                    <tr>
                                                        <th>SubCategory:</th>
                                                        <td>{subcategory}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Sub SubCategory:</th>
                                                        <td>{subsubcategory}</td>
                                                    </tr>

                                                </table>

                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div style={{ padding: 20 }}>
                                                <table className="table">
                                                    <tr>
                                                        <th>Product Name:</th>
                                                        <td>{product_name}</td>

                                                    </tr>
                                                    <tr>
                                                        <th>Product Price:</th>
                                                        <td>{product_price}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status:</th>
                                                        <td>{
                                                            product_status == 1 ?
                                                                <span style={{ backgroundColor: 'green', color: 'white', padding: 5, borderRadius: 20 }}>Active</span>
                                                                :
                                                                <span style={{ backgroundColor: 'red', color: 'white', padding: 5, borderRadius: 20 }}>Inactive</span>

                                                        }</td>
                                                    </tr>

                                                </table>

                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="col-md-12" style={{ padding: 20 }} >
                                            <label>Product Description</label>
                                            {product_description}

                                        </div>


                                    </div>

                                </Modal.Body>

                            </Modal>








                        </tbody>

                    </table>
                </div>

            </div >



        </div >
    )
}
