import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { retrive, retriveData } from '../../../../Backend/components/config/Service';

export default function shop() {



    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [search, setSearch] = useState('');
    // const [categoryId, setCategoryId] = useState('');
    // const [subcategoryId, setSubCategoryId] = useState('');

    const getCategories = async () => {
        let response = await retriveData('/get-categories');
        // console.log(response);
        setCategories(response.data.categories);

    }

    const getAllProducts = async () => {
        let response = await retriveData('/get-all-products');
        // console.log(response.data.allProducts);
        setAllProducts(response.data.allProducts);

        // console.log(response);
    }


    //Category
    const getCategoryId = (e) => {
        getCategoryProducts(e.target.id);
    }

    const getCategoryProducts = async (id) => {
        let response = await retriveData(`/get/${id}/category-products`);
        // console.log(response);
        setAllProducts(response.data.allProducts);

    }


    //SubCategory
    const getSubCategoryId = (e) => {
        getSubCategoryProducts(e.target.id);
    }

    const getSubCategoryProducts = async (id) => {
        let response = await retriveData(`/get/${id}/subcategory-products`);
        // console.log(response);
        setAllProducts(response.data.allProducts);

    }

    //SubSubCategory
    const getSubSubCategoryId = (e) => {
        getSubSubCategoryProducts(e.target.id);
    }

    const getSubSubCategoryProducts = async (id) => {
        let response = await retriveData(`/get/${id}/subsubcategory-products`);
        // console.log(response);
        setAllProducts(response.data.allProducts);

    }

    const handleSearchSubmit = async e => {
        e.preventDefault();
        let response = await retriveData(`/${search}/products`);
        console.log(response);
        setAllProducts(response.data.searchProducts);




    }




    useEffect(() => {
        getCategories();
        getAllProducts();
    }, [])

    return (
        <div>
            <section>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="/Frontend/assets/images/banner1.png" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/Frontend/assets/images/banner2.png" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/Frontend/assets/images/banner1.png" alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </section>
            <section>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="search-box p-2">
                                <form>
                                    <div className="row pt-1">
                                        <div className="form-group col-12 col-md-10 mb-0">
                                            <input type="text" className="form-control" onChange={e => setSearch(e.target.value)} placeholder="What are you looking for?" />
                                        </div>
                                        <div className="col-md-2 ml-auto">
                                            <button className="btn btn-green w-100" type="button" onClick={handleSearchSubmit}><i className="fa fa-search pr-2"></i> Search</button>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section>
                <div className="container my-3">
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-3 mb-3">

                            <div className="filter-section">

                                <div className="inner-cat bg-white">
                                    <h6 className="text-black poppins-semibold bg-blue text-white p-3">Filter <span className="fr"><i
                                        className="fa fa-sliders-h"></i></span></h6>

                                    <div>
                                        <div>
                                            <h6 className="poppins-semibold text-black bg-gray collapsed p-3" data-toggle="collapse"
                                                data-target="#activeCat" aria-expanded="false" aria-controls="activeCat"><i
                                                    className="fa fa-tools mr-2"></i>Categories
                                                <span className="fa fa-angle-down fr"></span></h6>
                                        </div>


                                        <div id="activeCat">
                                            <div id="MainMenu">
                                                {
                                                    categories.map((category, index) =>
                                                    (
                                                        <div className="list-group panel" key={index}>

                                                            <a className="list-group-item" data-target={`#demo-${index}`} id={category.id} onClick={e => getCategoryId(e)} data-toggle="collapse" data-parent="#MainMenu"><i class="fa fa-list-alt" aria-hidden="true"></i> {category.name}</a>

                                                            {
                                                                category.subcategory.map((sub, j) =>
                                                                (
                                                                    <div className="collapse ml-2" id={`demo-${index}`} key={j}>
                                                                        <a href="" data-target={`#demo-${sub.id}`} id={sub.id} onClick={e => getSubCategoryId(e)} className="list-group-item " data-toggle="collapse" >{sub.subcategory_name}<i className="fa fa-caret-down"></i></a>

                                                                        {
                                                                            sub.subsubcategory.map((subsub, k) => (
                                                                                <div className="collapse ml-2" id={`demo-${sub.id}`} key={k} >
                                                                                    <a className="list-group-item" id={subsub.id} onClick={e => getSubSubCategoryId(e)}  >{subsub.sub_subcategory_name}</a>

                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>

                                                    ))
                                                }
                                            </div>
                                        </div>

                                        {/* <!-- sort by -->  */}
                                        {/* <div className="sort-by bg-white mt-3">
                                            <div id="accordion">
                                                <div id="headingTwo">
                                                    <h6 className="poppins-semibold text-black collapsed mt-3 bg-gray p-3" data-toggle="collapse"
                                                        data-target="#sort-by" aria-expanded="false" aria-controls="sort-by"><i className="fa fa-sort mr-2"></i>
                                                        Sort By<span className="fa fa-angle-down fr"></span>
                                                    </h6>
                                                </div>
                                                <div id="sort-by" className="collapse show ml-4" aria-labelledby="headingTwo" data-parent="#accordion">
                                                    <form className="mt-3">
                                                        <div className="form-check pb-3">
                                                            <input type="checkbox" className="form-check-input ml-2" id={1} />
                                                            <label className="form-check-label ml-2" for="higher">Higher Price</label>
                                                        </div>
                                                        <div className="form-check pb-3">
                                                            <input type="checkbox" className="form-check-input ml-2" id={0} />
                                                            <label className="form-check-label ml-2" for="lower">Lower Price</label>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div> */}

                                    </div>
                                </div>


                            </div>
                        </div>


                        <div className="trending-list bg-white p-4 col-12 col-md-12 col-lg-9">
                            {/* <div className="title">
                                <h4 className="poppins-bold">Recommended Ads for You</h4>
                                <span className="fr text-green">Showing 9 of 20 results</span>
                            </div> */}
                            <hr />
                            <div className="row pt-2">

                                {
                                    allProducts.length > 0 ? allProducts.map((p, i) => {

                                        return (


                                            <div className="col-12 col-md-4 col-lg-4 mb-4" key={i}>
                                                <Link to={`/products-info/${p.slug}`} >
                                                    <div className="list">
                                                        <img className="w-100" src="/Frontend/assets/images/universal.png" alt="" />
                                                        <div className="list-content p-3">
                                                            <p><a className="text-black" href="">{p.product_name}</a></p>
                                                            <p style={{ color: '#C12200' }}>Rs.
                                                                <span style={{ color: 'red', textDecoration: 'line-through', marginRight: 10, marginLeft: 5 }}>
                                                                    <span style={{ color: "black" }}>{p.product_price}</span>
                                                                </span>
                                                                <span>
                                                                    180
                                                                </span>

                                                            </p>                                                    </div>
                                                    </div>
                                                </Link>
                                            </div>

                                        );

                                    }) :
                                        <p>No Data Found</p>
                                }

                                {/* <div className="col-12 col-md-4 col-lg-4 mb-4">
                                    <div className="list">
                                        <img className="w-100" src="/Frontend/assets/images/neera.png" alt="" />
                                        <div className="list-content p-3">
                                            <p><a className="text-black" href="">Manakamana Cosmetic</a></p>


                                            <p><i className="fa fa-map-marker pr-2"></i>Butwal, Amarpath</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 col-lg-4 mb-4">
                                    <div className="list">
                                        <img className="w-100" src="/Frontend/assets/images/inverter.png" alt="" />
                                        <div className="list-content p-3">
                                            <p><a className="text-black" href="">Manakamana Cosmetic</a></p>
                                            <p><i className="fa fa-map-marker pr-2"></i>Butwal, Amarpath</p>
                                        </div>
                                    </div>
                                </div> */}




                            </div>
                        </div>



                    </div>
                </div>
            </section>

        </div>
    )
}
