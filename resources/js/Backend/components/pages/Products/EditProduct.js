import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { retrive, create, BASE_URL } from '../../config/Service';
import { Button } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Toast } from '../../custom/toast';
import parse from 'html-react-parser';

export default function EditProduct() {

    const history = useHistory();

    const goback = () => {
        history.push("/admin/manage_products");
    }


    let { id } = useParams();

    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('');
    const [subsubcategory, setSubSubCategory] = useState('');
    const [product_name, setProductName] = useState('');
    const [product_price, setProductPrice] = useState('');
    const [product_description, setProductDescription] = useState('');
    const [product_clothing, setProductClothing] = useState(0);
    const [image, setProductImage] = useState('');

    const getProductDetails = async () => {

        let response = await retrive(`/product_details/${id}`)
        console.log(response);
        setCategory(response.data.product_details.category_id);
        setSubCategory(response.data.product_details.subcategory_id);
        setSubSubCategory(response.data.product_details.sub_subcategory_id);
        setProductName(response.data.product_details.product_name);
        setProductPrice(response.data.product_details.product_price);
        setProductImage(response.data.product_details.image);
        setProductClothing(response.data.product_details.clothing_product);
        setProductDescription(response.data.product_details.product_description);




    }

    const [editcategory, setEditCategory] = useState([]);


    const [editsubcategory, setEditSubCategory] = useState([]);


    const [editsubsubcategory, setEditSubSubCategory] = useState([]);


    const [checked, setEditChecked] = useState('');



    //Image
    const [editimage, setEditImage] = useState('');
    const [editpreview, setEditPreview] = useState('');

    const handleImage = e => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                setEditPreview(e.target.result);
                setEditImage(e.target.result);
            };

        }
    };

    const getCategory = async () => {
        let response = await retrive('/product/categorylist');
        console.log(response);
        setEditCategory(response.data.category);

    }

    const handleChangeCategory = async (id) => {
        setCategory(id);
        let response = await retrive(`/subcategory/index/${id}`);
        setEditSubCategory(response.data.subcategory);

    }

    const handleChangeSubCategory = async (id) => {
        setSubCategory(id);
        let response = await retrive(`/sub_subcategory/index/${id}`);
        console.log(response);
        setEditSubSubCategory(response.data.subsubcategory);

    }



    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            'categoryid': category,
            'subcategoryid': subcategory,
            'subsubcategoryid': subsubcategory,
            'product_name': product_name,
            'product_price': product_price,
            'product_description': product_description,
            'image': editimage,
            'clothing_product': product_clothing
        }
        console.log(data);
        let response = await create(`/product/update/${id}`, { data });
        if (response.data.message === 'success') {
            history.push("/admin/manage_products");
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






    useEffect(() => {
        getProductDetails();
        getCategory();
    }, []);


    return (

        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Edit Product</h1>
                        </div>
                    </div>
                </div>
            </section>


            <section className="content">
                <div className="container-fluid">

                    <div className="card card-default">
                        <div className="card-header">
                            <h3 className="card-title"><Button className="btn btn-primary" onClick={goback}>Go Back</Button></h3>

                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i></button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-remove"></i></button>
                            </div>
                        </div>

                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Select Main Category:</label>
                                            <select defaultValue={'DEFAULT'} value={category} className="form-control" onChange={e => handleChangeCategory(e.target.options[e.target.selectedIndex].value)}>

                                                <option value="DEFAULT" disabled>Select Category Name</option>
                                                {
                                                    editcategory.length > 0 ? editcategory.map((category, index) => {

                                                        return (

                                                            <option value={category.id} key={index}>{category.name}</option>
                                                        );

                                                    }) : <option value="0">No Category Available</option>
                                                }
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label>Select Sub SubCategory:</label>
                                            <select className="form-control" value={subsubcategory} onChange={e => setSubSubCategory(e.target.options[e.target.selectedIndex].value)}>

                                                <option disabled>Select Category Name</option>
                                                {
                                                    editsubsubcategory.length > 0 ? editsubsubcategory.map((c, index) => {

                                                        return (

                                                            <option value={c.id} key={index}>{c.sub_subcategory_name}</option>
                                                        );

                                                    }) : <option value="0">No Category Available</option>
                                                }
                                            </select>
                                        </div>




                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Select Sub Category:</label>
                                            <select className="form-control" value={subcategory} onChange={e => handleChangeSubCategory(e.target.options[e.target.selectedIndex].value)}>

                                                <option disabled>Select SubCategory Name</option>
                                                {
                                                    editsubcategory.length > 0 ? editsubcategory.map((category, index) => {

                                                        return (

                                                            <option value={category.id} key={index}>{category.subcategory_name}</option>
                                                        );

                                                    }) : <option value="0">No Any SubCategory</option>
                                                }
                                            </select>
                                        </div>

                                    </div>



                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Product Name:</label>
                                            <input type="text" className="form-control" value={product_name} onChange={e => setProductName(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Product Price:</label>
                                            <input type="number" className="form-control" value={product_price} onChange={e => setProductPrice(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Image:</label>
                                            <input type="file" className="form-control" autoFocus={true} onChange={handleImage} placeholder="Enter Product Image"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            {editpreview ?
                                                <img src={editpreview} alt="dummy" width="100" />
                                                :
                                                <img src={`/Images/Products/${image}`} width="100" />
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setProductDescription(data);
                                                }}
                                                data={product_description}

                                                onReady={(editor) => {
                                                    editor.editing.view.change((writer) => {
                                                        writer.setStyle(
                                                            "height",
                                                            "200px",
                                                            editor.editing.view.document.getRoot()
                                                        );
                                                    });
                                                }}


                                            />

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>
                                                <input type="checkbox" style={{ marginRight: '10px' }}

                                                    onChange={e => setProductClothing(!product_clothing)}
                                                    // onChange={() => setEditChecked(!checked)}
                                                    checked={product_clothing == 1 ? true : false}
                                                />
                                                If Product is Clothing Brand then Check Here
                                            </label>
                                        </div>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-12">
                                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                    </div>

                                </div>



                            </form>



                        </div>

                    </div>

                </div>

            </section>
        </div >

    )
}
