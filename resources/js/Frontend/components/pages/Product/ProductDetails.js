
import Reac, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Image, Tab, Tabs } from 'react-bootstrap';
import { retrive, retriveData } from '../../../../Backend/components/config/Service';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from "react-redux";
import { AddToCart, BuyNow } from '../../actions';
import { Toast } from '../../../../Backend/components/custom/toast';

export default function ProductDetails() {

    const error = useSelector((state) => state.carts.error);
    const isAuthenticated = useSelector((state) => state.Auth.token);


    const history = useHistory();
    const dispatch = useDispatch();

    let { slug } = useParams();
    const topContainer = useRef();
    const [product_name, setProductName] = useState('');
    const [product_price, setProductPrice] = useState('');
    const [image, setProductImage] = useState('');
    const [product_description, setProductDescription] = useState('');
    const [product_id, setProductId] = useState('');

    const [quantity, setQuantity] = useState(1);
    const [product_category, setProductCategory] = useState('');
    const [product_subcategory, setProductSubCategory] = useState('');
    const [product_subsubcategory, setProductSubSubCategory] = useState('');
    const [product_sku, setProductSku] = useState('');
    const [product_size, setProductSize] = useState('');

    const [attr, setProductAttr] = useState([]);

    //Discount
    const [discount_name, setDiscountName] = useState('');
    const [discount_percent, setDiscountPercent] = useState('');
    const [discount_price, setDiscountPrice] = useState('');


    // console.log(product_price);

    const getProductData = async () => {
        let response = await retriveData(`/products-info/${slug}`);
        console.log(response.data.product);
        setProductName(response.data.product.product_name);
        setProductImage(response.data.product.image);
        setProductPrice(response.data.product.product_price);
        setProductId(response.data.product.id);
        setProductCategory(response.data.product.category.name);
        setProductSubCategory(response.data.product.subcategory.subcategory_name);
        setProductSubSubCategory(response.data.product.subsubcategory.sub_subcategory_name);
        setProductDescription(parse(response.data.product.product_description));
        setProductAttr(response.data.product.attr);
        setDiscountName(response.data.product.discount.deals.name);
        setDiscountPercent(response.data.product.discount.deals.discount);
        setDiscountPrice(
            Math.floor(response.data.product.product_price - ((response.data.product.product_price * response.data.product.discount.deals.discount) / 100))
        );



    }


    // console.log(discount_price);

    const increment = () => {

        quantity <= 4 ?
            setQuantity(quantity => quantity + 1)
            :
            setQuantity(quantity);

    }

    const decrement = () => {

        quantity >= 2 ?
            setQuantity(quantity => quantity - 1)
            :
            setQuantity(quantity);

    }

    const handleSize = (e) => {
        getDataFromSize(e.target.id);
    }

    const getDataFromSize = async (id) => {
        let response = await retriveData(`/get-price/${id}`);
        // console.log(response.data.price);
        setProductSku(response.data.sku);
        setProductPrice(response.data.price);
        setDiscountPrice(
            Math.floor(((response.data.price * discount_percent) / 100))
        );
        setProductSize(response.data.size);
    }

    const addtocart = async (e) => {
        e.preventDefault();
        const data = {
            'product_id': product_id,
            'product_name': product_name,
            'product_price': discount_price,
            'product_image': image,
            'product_slug': slug,
            'product_quantity': quantity,
            'product_category': product_category,
            'product_sku': product_sku,
            'product_size': product_size,


        }
        dispatch(AddToCart({ id: product_id, data }));

        if (error) {
            Toast.fire({
                icon: 'success',
                title: 'This Product is Already in Cart!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            })
        }

    }

    const buynow = async (e) => {
        e.preventDefault();
        const data = {
            'product_id': product_id,
            'product_name': product_name,
            'product_price': discount_price,
            'product_image': image,
            'product_slug': slug,
            'product_quantity': quantity,
            'product_category': product_category,
            'product_sku': product_sku,
            'product_size': product_size,


        }

        // if (isAuthenticated) {
        dispatch(BuyNow({ id: product_id, data }));
        history.push('/view/cart');
        // }
        // else {
        //     history.push('/signin');
        // }



    }




    useEffect(() => {
        window.scrollTo(0, 0);
        getProductData();



        // topContainer.current.scrollIntoView({ block: "end", behavior: 'smooth' });

    }, [])

    return (
        <div>
            <section>
                <div className="container">
                    <div className="row" >
                        <div className="col-md-9" style={{ padding: 20 }}>
                            <div className="row" style={{ backgroundColor: 'white', padding: 30 }}>

                                <div className="col-md-6" >
                                    <img className="w-100" src={`/Images/Products/${image}`} style={{ padding: 10 }} />
                                </div>
                                <div className="col-md-6" style={{ padding: 10, color: 'black' }}>
                                    <h2><b>{product_name}</b></h2>
                                    <h6 style={{ color: '#C12200', marginTop: 10, marginBottom: 10 }}>
                                        <strong>Rs.

                                            {
                                                discount_percent != 0 ?
                                                    <span>
                                                        <span style={{ color: 'red', textDecoration: 'line-through', marginRight: 10, marginLeft: 5 }}>
                                                            <span style={{ color: "black" }}>{product_price}</span>
                                                        </span>
                                                        <span>
                                                            <strong> {discount_price}</strong>

                                                        </span>
                                                    </span>
                                                    :
                                                    <span>
                                                        <strong> {product_price}</strong>

                                                    </span>
                                            }
                                        </strong>
                                    </h6>
                                    <div className="form-group">
                                        <label><strong>Quantity: </strong>  </label>
                                        <span style={{ padding: 5, color: '#C12200' }}> <i className="fa fa-plus btn" onClick={increment}></i></span>
                                        <input type="number" min={1} max={5} value={quantity} onChange={e => setQuantity(e.target.value)} style={{ width: 20, border: 0, padding: 0 }}></input>
                                        <span style={{ padding: 5, color: '#C12200' }}><i className="fa fa-minus btn" onClick={decrement}></i></span>

                                    </div>

                                    {attr.length > 0 &&
                                        <div className="product-details-size">
                                            <label><strong>Size:</strong>
                                                {
                                                    attr.length > 0 ? attr.map((a, i) => {
                                                        return (
                                                            <label key={i}>
                                                                <input type="radio" name="size" id={a.id} onChange={e => handleSize(e)} required /><span>{a.size}</span>
                                                            </label>
                                                        );

                                                    })
                                                        :
                                                        <p></p>

                                                }
                                            </label>
                                        </div>
                                    }



                                    <p><strong>Category:</strong><span style={{ padding: 2 }}>{product_category},{product_subcategory},{product_subsubcategory}</span></p>
                                    <p><button className="btn" onClick={buynow} style={{ backgroundColor: '#C12200', color: 'white' }}>Buy Now</button><button className="btn" type="submit" style={{ backgroundColor: '#C12200', color: 'white', margin: 10 }} onClick={addtocart}>Add To Cart</button></p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" style={{ padding: 20 }}>
                            <img className="w-100" src={`/Images/Products/${image}`} />


                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-9">
                            <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="overview" title="Overview">
                                    <div>
                                        <span>{product_description}</span>
                                    </div>
                                </Tab>
                                <Tab eventKey="review" title="Review">
                                    <div>
                                        <span>Review</span>
                                    </div>
                                </Tab>

                            </Tabs>
                        </div>
                    </div>


                </div>
            </section>
        </div >
    )
}
