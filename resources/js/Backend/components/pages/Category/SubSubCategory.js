import React, { useState, useEffect } from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import { retrive, create, BASE_URL } from '../../config/Service';
import { Toast } from '../../custom/toast';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


export default function SubSubCategory() {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editshow, seteditShow] = useState(false);
    const handleeditClose = () => seteditShow(false);
    const handleeditShow = (e) => {
        editSubSubCategory(e.target.id);
        seteditShow(true);
    };


    const onDelete = (e) => {
        deleteSubSubCategory(e.target.id);
    }


    // const [name, setName] = useState('');
    const [sub_subcategory_name, setSubSubCategoryName] = useState('');
    const [category, setCategory] = useState([]);
    const [subcategory, setSubCategory] = useState([]);
    const [subsubcategory, setSubSubCategory] = useState([]);
    const [categoryid, setCategoryId] = useState('');
    const [sub_categoryid, setSubCategoryId] = useState('');
    const [sub_subcategoryid, setSubSubCategoryId] = useState('');



    const getCategory = async () => {
        let response = await retrive('/subsubcategory/categorylist');
        // console.log(response);
        setCategory(response.data.category);

    }

    const getSubSubCategory = async () => {
        let response = await retrive('/sub_subcategory/index');
        console.log(response);
        setSubSubCategory(response.data.subsubcategory);

    }

    const handleChange = async (id) => {
        setCategoryId(id);
        let response = await retrive(`/subcategory/index/${id}`);
        setSubCategory(response.data.subcategory);

    }



    const handleEditStatusCheckbox = async (id) => {
        let response = await create(`/update/sub_subcategory/status/${id}`);
        console.log(response.data.message);
        if (response.data.message === 'success') {
            getSubSubCategory();
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
            'category_id': categoryid,
            'sub_category_id': sub_categoryid,
            'sub_subcategory_name': sub_subcategory_name,
        }
        let response = await create('/sub_subcategory/store', { data });
        if (response.data.message === 'success') {
            getSubSubCategory();
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


    const editSubSubCategory = async (id) => {
        setSubSubCategoryId(id);
        let response = await retrive(`/sub_subcategory/${id}/edit`);
        console.log(response);
        setCategoryId(response.data.subsubcategory.category_id);
        // setSubCategoryId(response.data.subsubcategory.sub_category_id)
        setSubSubCategoryName(response.data.subsubcategory.sub_subcategory_name);

    }
    // console.log(categoryid);
    // console.log(sub_categoryid);
    // console.log(sub_subcategory_name);


    const handleEditSubmit = async e => {
        e.preventDefault();

        const data = {
            'category_id': categoryid,
            'sub_category_id': sub_categoryid,
            'sub_subcategory_name': sub_subcategory_name,
        }
        let response = await create(`/sub_subcategory/${sub_subcategoryid}/update`, { data });
        if (response.data.message === 'success') {
            getSubSubCategory();
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
    const deleteSubSubCategory = async (id) => {
        let response = await retrive(`/sub_subcategory/${id}/delete`);
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
            getSubSubCategory();
        } else {
            alert('Data not Deleted');
        }
    }


    useEffect(() => {
        getCategory();
        getSubSubCategory();
    }, []);


    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Sub SubCategory</h1>
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
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Sub SubCategory</th>
                                <th>Status</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>




                            {
                                subsubcategory.length > 0 ? subsubcategory.map((c, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{c.category.name}</td>
                                            <td>{c.subcategory.subcategory_name}</td>
                                            <td>{c.sub_subcategory_name}</td>

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
                    <Modal.Title>Add Sub SubCategory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >

                        <div className="form-group">
                            <label>Select Main Category:</label>
                            <select defaultValue={'DEFAULT'} className="form-control" onChange={e => handleChange(e.target.options[e.target.selectedIndex].value)}>

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
                            <label>Select SubCategory:</label>
                            <select defaultValue={'DEFAULT'} className="form-control" onChange={e => setSubCategoryId(e.target.options[e.target.selectedIndex].value)}>

                                <option value="DEFAULT" disabled>Select Category Name</option>
                                {
                                    subcategory.length > 0 ? subcategory.map((c, index) => {

                                        return (

                                            <option value={c.id} key={index}>{c.subcategory_name}</option>
                                        );

                                    }) : <option value="0">No SubCategory Available</option>
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Sub SubCategory Name:</label>
                            <input type="text" className="form-control" autoFocus={true} onChange={e => setSubSubCategoryName(e.target.value)} placeholder="Enter Sub SubCategoryName" required></input>
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
                            <select value={categoryid} className="form-control" onChange={e => handleChange(e.target.options[e.target.selectedIndex].value)}>


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
                            <label>Select SubCategory:</label>
                            <select defaultValue={'DEFAULT'} className="form-control" onChange={e => setSubCategoryId(e.target.options[e.target.selectedIndex].value)}>

                                <option value="DEFAULT" disabled>Select Category Name</option>
                                {
                                    subcategory.length > 0 ? subcategory.map((c, index) => {

                                        return (

                                            <option value={c.id} key={index}>{c.subcategory_name}</option>
                                        );

                                    }) : <option value="0">No SubCategory Available</option>
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Sub SubCategory Name:</label>
                            <input type="text" className="form-control" value={sub_subcategory_name} autoFocus={true} onChange={e => setSubSubCategoryName(e.target.value)} placeholder="Enter Sub SubCategoryName" required></input>
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
