import React, { useState, useEffect, Component } from 'react';
import { useHistory } from 'react-router-dom';
import { retrive, create, BASE_URL } from '../../config/Service';
import { Button } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Toast } from '../../custom/toast';


export default function AddProduct() {

    const history = useHistory();

    const goback = () => {
        history.push("/admin/manage_products");
    }

    // const [allproducts, setProduct] = useState('');


    const [category, setCategory] = useState([]);
    const [categoryid, setCategoryId] = useState('');

    const [subcategory, setSubCategory] = useState([]);
    const [subcategoryid, setSubCategoryId] = useState('');

    const [subsubcategory, setSubSubCategory] = useState([]);
    const [subsubcategoryid, setSubSubCategoryId] = useState('');

    const [product_name, setProductName] = useState('');
    const [product_price, setProductPrice] = useState('');
    const [product_description, setProductDecription] = useState('');

    const [checked, setChecked] = useState(false);




    //Image
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');

    const handleImage = e => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                setPreview(e.target.result);
                setImage(e.target.result);
            };

        }
    };



    const getCategory = async () => {
        let response = await retrive('/product/categorylist');
        console.log(response);
        setCategory(response.data.category);

    }

    const handleChangeCategory = async (id) => {
        setCategoryId(id);
        let response = await retrive(`/subcategory/index/${id}`);
        setSubCategory(response.data.subcategory);

    }

    const handleChangeSubCategory = async (id) => {
        setSubCategoryId(id);
        let response = await retrive(`/sub_subcategory/index/${id}`);
        console.log(response);
        setSubSubCategory(response.data.subsubcategory);

    }






    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            'categoryid': categoryid,
            'subcategoryid': subcategoryid,
            'subsubcategoryid': subsubcategoryid,
            'product_name': product_name,
            'product_price': product_price,
            'product_description': product_description,
            'image': image,
            'clothing_product': checked
        }
        console.log(data);
        let response = await create('/product/store', { data });
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
        getCategory();
    }, [])


    return (


        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Add Products</h1>
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
                                            <select defaultValue={'DEFAULT'} className="form-control" onChange={e => handleChangeCategory(e.target.options[e.target.selectedIndex].value)}>

                                                <option value="DEFAULT" disabled>Select Category Name</option>
                                                {
                                                    category.length > 0 ? category.map((category, index) => {

                                                        return (

                                                            <option value={category.id} key={index}>{category.name}</option>
                                                        );

                                                    }) : <option value="0">No Category Available</option>
                                                }
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label>Select Sub SubCategory:</label>
                                            <select defaultValue={'DEFAULT'} className="form-control" onChange={e => setSubSubCategoryId(e.target.options[e.target.selectedIndex].value)}>

                                                <option value="DEFAULT" disabled>Select Category Name</option>
                                                {
                                                    subsubcategory.length > 0 ? subsubcategory.map((c, index) => {

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
                                            <select defaultValue={'DEFAULT'} className="form-control" onChange={e => handleChangeSubCategory(e.target.options[e.target.selectedIndex].value)}>

                                                <option value="DEFAULT" disabled>Select SubCategory Name</option>
                                                {
                                                    subcategory.length > 0 ? subcategory.map((category, index) => {

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
                                            <input type="text" className="form-control" onChange={e => setProductName(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Product Price:</label>
                                            <input type="number" className="form-control" onChange={e => setProductPrice(e.target.value)}></input>
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
                                            {preview &&
                                                <img src={preview} alt="dummy" width="100" />}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setProductDecription(data);
                                                }}

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
                                                    onChange={() => setChecked(!checked)}

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
