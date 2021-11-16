import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { retrive, create } from '../../config/Service';
import { Toast } from '../../custom/toast';

export default function ProductDiscount() {


    let { id } = useParams();

    const [deals, setDeals] = useState([]);
    const [checked, setCheckBoxChecked] = useState('');
    const [discount_id, setProductDiscountId] = useState('');
    const [alreadychecked, setAlreadyChecked] = useState('');


    const getProductDiscount = async () => {
        let response = await retrive(`/product-discount/${id}`);
        console.log(response.data.discount.id);
        setProductDiscountId(response.data.discount.id);
        setAlreadyChecked(response.data.discount.deal_id);

    }

    const getDeals = async () => {
        let response = await retrive('/deals/get-discount');
        // console.log(response);
        setDeals(response.data.deals);

    }

    const onChangeAttribute = async (value) => {
        // console.log(value);
        setCheckBoxChecked(value);
        const data = {
            'discount_id': discount_id,
            'product_id': id,
            'deal_id': value
        }
        console.log(data);
        let response = await create('/product-discount/store', { data })
        if (response.data.message == 'success') {
            getProductDiscount();
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

        }

        // console.log(response);
    };



    useEffect(() => {
        getDeals();
        getProductDiscount();
    }, []
    )






    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Products Discount</h1>
                        </div>

                    </div>
                </div>
            </section>
            <div className="card">
                <div className="card-body">


                    <div className="main-container">
                        <h2>Select Discount</h2>
                        <div className="radio-buttons">


                            {
                                deals.length > 0 ? deals.map((d, index) => {

                                    return (
                                        <label className="custom-radio" key={index}>
                                            <input type="checkbox" name="radio" checked={checked === d.id || d.id === alreadychecked} onChange={e => onChangeAttribute(d.id)} />
                                            <span className="radio-btn"
                                            ><i className="fas fa-check"></i>
                                                <div className="hobbies-icon">
                                                    <i>{d.discount}%</i>
                                                    <h3>{d.name}</h3>
                                                </div>
                                            </span>
                                        </label>
                                    );


                                })
                                    : <p>No Discount Available</p>


                            }

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
