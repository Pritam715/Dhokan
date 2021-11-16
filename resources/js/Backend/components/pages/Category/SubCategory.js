import React, { useState, useEffect } from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import { retrive, create, BASE_URL } from '../../config/Service';
import { Toast } from '../../custom/toast';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default function SubCategory() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editshow, seteditShow] = useState(false);
    const handleeditClose = () => seteditShow(false);
    const handleeditShow = (e) => {
        editSubCategory(e.target.id);
        seteditShow(true);
    };

    const onDelete = (e) => {
        deleteSubCategory(e.target.id);
    }


    const [category_id, setCategoryId] = useState('');
    const [subcategory_name, setSubCategoryName] = useState('');
    const [category, setCategory] = useState([]);


    const [subcategory, setSubCategory] = useState([]);
    const [subcategoryid, setSubCategoryId] = useState('');


    const getCategory = async () => {
        let response = await retrive('/subcategory/categorylist');
        console.log(response);
        setCategory(response.data.category);

    }

    const getSubCategory = async () => {
        let response = await retrive('/subcategory/index');
        console.log(response);
        setSubCategory(response.data.subcategory);

    }

    const handleEditStatusCheckbox = async (id) => {
        let response = await create(`/update/subcategory/status/${id}`);
        if (response.data.message === 'success') {
            getSubCategory();
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



    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            'category_id': category_id,
            'subcategory_name': subcategory_name
        }
        console.log(data);
        let response = await create('/subcategory/store', { data });
        console.log(response);
        if (response.data.message === 'success') {
            getSubCategory();
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
    const editSubCategory = async (id) => {
        setSubCategoryId(id);
        let response = await retrive(`/subcategory/${id}/edit`);
        console.log(response);
        setSubCategoryName(response.data.subcategory.subcategory_name);
        setCategoryId(response.data.subcategory.category_id);

    }

    const handleEditSubmit = async e => {
        e.preventDefault();

        const data = {
            'category_id': category_id,
            'subcategory_name': subcategory_name
        }
        console.log(data);
        let response = await create(`/subcategory/${subcategoryid}/update`, { data });
        console.log(response);
        if (response.data.message === 'success') {
            getSubCategory();
            handleeditClose();
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


    //delete
    const deleteSubCategory = async (id) => {
        let response = await retrive(`/subcategory/${id}/delete`);
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
            getSubCategory();
        } else {
            alert('Data not Deleted');
        }
    }



    useEffect(() => {
        getCategory();
        getSubCategory();

    }, []);





    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Sub Category</h1>
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
                                <th>Category Name</th>
                                <th>SubCategory Name </th>
                                <th>Status</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>




                            {
                                subcategory.length > 0 ? subcategory.map((c, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{c.category.name}</td>
                                            <td>{c.subcategory_name}</td>

                                            <td>
                                                <BootstrapSwitchButton
                                                    onChange={e => handleEditStatusCheckbox(c.id)}

                                                    checked={c.status == 1 ? true : false}
                                                    width={100} onstyle="outline-success" offstyle="outline-danger" />

                                            </td>
                                            <td>
                                                <i id={c.id} onClick={handleeditShow} className="fa fa-edit" style={{ color: 'green' }}></i>
                                                <i onClick={e => {
                                                    var r = confirm("Are you sure?");
                                                    if (r == true) {
                                                        return onDelete(e);
                                                    }

                                                }

                                                } id={c.id} className="fa fa-trash" style={{ color: 'red', marginLeft: 20 }}></i>

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
                    <Modal.Title>Add Sub Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="form-group">
                            <label>Select Main Category:</label>
                            <select defaultValue={'DEFAULT'} className="form-control" onChange={e => setCategoryId(e.target.options[e.target.selectedIndex].value)}>

                                <option value="DEFAULT" disabled>Select Category Name</option>
                                {
                                    category.length > 0 ? category.map((category, index) => {

                                        return (

                                            <option value={category.id} key={index}>{category.name}</option>
                                        );

                                    }) : <option value="0">Category</option>
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Sub Category Name:</label>
                            <input type="text" className="form-control" autoFocus={true} onChange={e => setSubCategoryName(e.target.value)} placeholder="Enter SubCategory Name" required></input>
                        </div>
                        <div className="form-group">
                            <Button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</Button>
                        </div>

                    </form >
                </Modal.Body>

            </Modal>


            <Modal show={editshow} onHide={handleeditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Select Main Category:</label>
                            <select defaultValue={'DEFAULT'} value={category_id} className="form-control" onChange={e => setCategoryId(e.target.options[e.target.selectedIndex].value)}>

                                <option value="DEFAULT" disabled>Select Category Name</option>
                                {
                                    category.length > 0 ? category.map((category, index) => {

                                        return (

                                            <option value={category.id} key={index}>{category.name}</option>
                                        );

                                    }) : <option value="0">Category</option>
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Sub Category Name:</label>
                            <input type="text" value={subcategory_name} className="form-control" autoFocus={true} onChange={e => setSubCategoryName(e.target.value)} placeholder="Enter SubCategory Name" required></input>
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
