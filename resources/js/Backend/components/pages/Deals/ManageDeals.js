import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { retrive, create, BASE_URL } from '../../config/Service';
import { Toast } from '../../custom/toast';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default function ManageDeals() {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editshow, seteditShow] = useState(false);
    const handleeditClose = () => seteditShow(false);
    const handleeditShow = (e) => {
        editDeals(e.target.id);
        seteditShow(true);
    };


    const onDelete = (e) => {
        deleteDeals(e.target.id);
    }


    const [name, setName] = useState('');
    const [discount, setDiscount] = useState('');
    const [deals, setDeals] = useState([]);
    const [dealid, setDealId] = useState('');

    const getDeals = async () => {
        let response = await retrive('/deals/index');
        console.log(response);
        setDeals(response.data.deals);

    }


    const handleEditStatusCheckbox = async (id) => {
        let response = await create(`/update/deals/status/${id}`);
        if (response.data.message === 'success') {
            getDeals();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            'name': name,
            'discount': discount,
        }
        console.log(data);
        let response = await create('/deals/store', { data });
        console.log(response);
        if (response.data.message === 'success') {
            getDeals();
            handleClose();
            Toast.fire({
                icon: 'success',
                title: 'Data Stored SuccessFully!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            })

        } else {
            alert('Data not created');
        }
    }


    //edit
    const editDeals = async (id) => {
        setDealId(id);
        let response = await retrive(`/deals/${id}/edit`);
        console.log(response);
        setName(response.data.deals.name);
        setDiscount(response.data.deals.discount);

    }

    const handleEditSubmit = async e => {
        e.preventDefault();
        const data = {
            'name': name,
            'discount': discount,
        }
        console.log(data);
        let response = await create(`/deals/${dealid}/update`, { data });
        console.log(response);
        if (response.data.message === 'success') {
            getDeals();
            handleeditClose();
            Toast.fire({
                icon: 'success',
                title: 'Data Update SuccessFully!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            })

        } else {
            alert('Data not Updated');
        }

    }

    //delete
    const deleteDeals = async (id) => {
        let response = await retrive(`/deals/${id}/delete`);
        console.log(response.data.category);
        if (response.data.message === 'success') {
            getDeals();
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
        } else {
            alert('Data not Deleted');
        }
    }



    useEffect(() => {
        getDeals();
    }, []
    )

    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Deals</h1>
                        </div>

                    </div>
                </div>
            </section>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title"> <Button className="btn btn-primary" onClick={handleShow}><i className="fa fa-plus"></i>Add</Button></h3>
                </div>

                <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Discount%</th>
                                <th>Status</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>




                            {
                                deals.length > 0 ? deals.map((d, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{d.name}</td>
                                            <td>{d.discount}</td>

                                            <td>
                                                <BootstrapSwitchButton
                                                    onChange={e => handleEditStatusCheckbox(d.id)}

                                                    checked={d.status == 1 ? true : false}
                                                    width={100} onstyle="outline-success" offstyle="outline-danger" />

                                            </td>
                                            <td>
                                                <i id={d.id} onClick={handleeditShow} className="fa fa-edit" style={{ color: 'green' }}></i>
                                                <i onClick={e => {
                                                    var r = confirm("Are you sure?");
                                                    if (r == true) {
                                                        return onDelete(e);
                                                    }

                                                }

                                                } id={d.id} className="fa fa-trash" style={{ color: 'red', marginLeft: 20 }}></i>

                                            </td>

                                        </tr>
                                    );
                                }) : <tr><td colSpan="4">No Data Available</td></tr>
                            }


                        </tbody>

                    </table>
                </div>

            </div>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Deals</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="form-group">
                            <label >Name:</label>
                            <input type="text" className="form-control" autoFocus={true} onChange={e => setName(e.target.value)} placeholder="Enter Deals Name" required></input>
                        </div>
                        <div className="form-group">
                            <label >Discount %:</label>
                            <input type="number" className="form-control" autoFocus={true} onChange={e => setDiscount(e.target.value)} placeholder="Enter Discount %" required></input>
                        </div>
                        <div className="form-group">
                            <Button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</Button>
                        </div>

                    </form >
                </Modal.Body>

            </Modal>


            <Modal show={editshow} onHide={handleeditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Deals</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label >Name:</label>
                            <input type="text" value={name} className="form-control" autoFocus={true} onChange={e => setName(e.target.value)} placeholder="Enter CategoryName" required></input>
                        </div>
                        <div className="form-group">
                            <label >Discount%:</label>
                            <input type="text" value={discount} className="form-control" autoFocus={true} onChange={e => setDiscount(e.target.value)} placeholder="Enter Discount" required></input>
                        </div>
                        <div className="form-group">
                            <Button type="submit" onClick={handleEditSubmit} className="btn btn-primary">Submit</Button>
                        </div>

                    </form>
                </Modal.Body>

            </Modal>


        </div >
    )
}
