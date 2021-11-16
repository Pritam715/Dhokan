import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useHistory } from 'react-router-dom';
import Dashboard from '../components/pages/Dashboard';
import Category from '../components/pages/Category/Category';
import SubCategory from '../components/pages/Category/SubCategory';
// import Category from '../pages/category/Category';
// import Product from '../pages/products/Product';
// import NotFound from '../pages/notfound/NotFound';
import { Image } from 'react-bootstrap';
import PageNotFound from '../components/pages/PageNotFound';
import SubSubCategory from '../components/pages/Category/SubSubCategory';
import ManageProduct from '../components/pages/Products/ManageProduct';
import AddProduct from '../components/pages/Products/AddProduct';
import EditProduct from '../components/pages/Products/EditProduct';
import ProductAttributes from '../components/pages/Products/ProductAttributes';
import ManageDeals from '../components/pages/Deals/ManageDeals';
import ProductDiscount from '../components/pages/Products/ProductDiscount';


export default function Sidebar() {



    return (
        <>


            <aside className="main-sidebar sidebar-dark-primary elevation-4">

                <a href="index3.html" className="brand-link">
                    <Image src="/Backend/assets/dist/img/logo2.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                    <span className="brand-text font-weight-light">Dhokan</span>
                </a>


                <div className="sidebar">

                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <Image src="/Backend/assets/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Admin</a>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li className="nav-item">
                                <Link to="/admin/dashboard" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard

                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item has-treeview">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Categories
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/admin/category" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Category</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/sub_category" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Sub Category</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/sub_subcategory" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Sub SubCategory</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item ">
                                <Link to="/admin/manage_products" className="nav-link">
                                    <i className="nav-icon fas fa-inventory"></i> <p>Products</p>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/admin/manage_deals" className="nav-link">
                                    <i className="nav-icon fas fa-inventory"></i> <p>Deals</p>
                                </Link>
                            </li>

                        </ul>
                    </nav>

                </div>

            </aside>

            <Switch>
                <Route exact path="/admin/dashboard" component={Dashboard} />
                <Route path="/admin/category" component={Category} />
                <Route path="/admin/sub_category" component={SubCategory} />
                <Route path="/admin/sub_subcategory" component={SubSubCategory} />

                {/* Products */}
                <Route path="/admin/manage_products" component={ManageProduct} />
                <Route path="/admin/add_products" component={AddProduct} />
                <Route path="/admin/edit/products/:id" component={EditProduct} />
                <Route path="/admin/edit/products_attributes/:id" component={ProductAttributes} />
                <Route path="/admin/edit/products_discount/:id" component={ProductDiscount} />

                {/* Deals */}
                <Route path="/admin/manage_deals" component={ManageDeals} />



                <Route component={PageNotFound} />

            </Switch>

        </>
    );
}
