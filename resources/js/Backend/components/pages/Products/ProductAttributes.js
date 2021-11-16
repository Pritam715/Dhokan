import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { retrive, create, BASE_URL } from '../../config/Service';
import { Toast } from '../../custom/toast';

export default function ProductAttributes() {

  let { id } = useParams();

  const history = useHistory();
  const goback = () => {
    history.push("/admin/manage_products");
  }

  const [inputFields, setInputFields] = useState([
    { index: Math.random(), sku: "", size: "", price: "", stock: "" }
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ index: Math.random(), product_id: "", sku: "", size: "", price: "", stock: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].product_id = id;
    if (event.target.name === "sku") {
      values[index].sku = event.target.value;
    }
    else if (event.target.name === "size") {
      values[index].size = event.target.value;
    }
    else if (event.target.name === "price") {
      values[index].price = event.target.value;
    }
    else {
      values[index].stock = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      'inputlist': inputFields
    }
    console.log(data);
    let response = await create('/product-attributes/store', { data });
    // console.log(response.data.attributes);
    if (response.data.message === 'success') {
      getAttributes();
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
  };

  //Edit

  const [editinputFields, setEditInputFields] = useState([]);

  const onDelete = (e) => {
    deleteAttr(e.target.id);
  }

  // const EditSubmit = (e) => {
  //   handleEditSubmit(e.target.id);
  // }

  const handleEditInputChange = (index, event) => {
    const values = [...editinputFields];

    if (event.target.name === "sku") {
      values[index].sku = event.target.value;
    }
    else if (event.target.name === "size") {
      values[index].size = event.target.value;
    }
    else if (event.target.name === "price") {
      values[index].price = event.target.value;
    }
    else {
      values[index].stock = event.target.value;
    }

    setEditInputFields(values);
  };

  // const handleEditInputChange = (index, event) => {
  //   const values = [...editinputFields];

  //   if (event.target.name === "sku") {
  //     values[index].sku = event.target.value;
  //   }
  //   else if (event.target.name === "size") {
  //     values[index].size = event.target.value;
  //   }
  //   else if (event.target.name === "price") {
  //     values[index].price = event.target.value;
  //   }
  //   else {
  //     values[index].stock = event.target.value;
  //   }


  //   setEditInputFields(values);
  // };


  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    const data = {
      'inputlist': editinputFields
    }
    console.log(data);
    let response = await create(`/product-attributes/${id}/update`, { data });
    console.log(response.data.message);
    if (response.data.message === 'success') {
      getAttributes();
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
  const deleteAttr = async (id) => {
    let response = await retrive(`/product-attributes/${id}/delete`);
    console.log(response);
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
      getAttributes();
    }
  }





  const getAttributes = async () => {
    let response = await retrive(`/get-product-attributes/${id}`);
    console.log(response);
    setEditInputFields(response.data.attr);
  }


  useEffect(() => {
    getAttributes();

  }, [])


  return (
    <div className="content-wrapper">

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Products Attributes</h1>
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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {inputFields.map((inputField, index) => (
                    <div key={`${inputField}~${index}`} style={{ display: 'flex', padding: 5 }}>

                      <input type="hidden" name="product_id" className="form-control" value={id} onChange={(event) => handleInputChange(index, event)} name="product_id" />

                      <input type="text" name="sku" id="sku" placeholder="SKU" className="form-control" onChange={(event) => handleInputChange(index, event)} style={{ width: '150px', marginRight: '5px' }} />
                      <input type="text" name="size" id="size" placeholder="SIZE" className="form-control" onChange={(event) => handleInputChange(index, event)} style={{ width: '150px', marginRight: '5px' }} />
                      <input type="number" name="price" id="price" placeholder="PRICE" className="form-control" onChange={(event) => handleInputChange(index, event)} style={{ width: '150px', marginRight: '5px' }} />
                      <input type="number" name="stock" id="stock" placeholder="STOCK" className="form-control" onChange={(event) => handleInputChange(index, event)} style={{ width: '150px', marginRight: '5px' }} />
                      {
                        index === 0 ?
                          <button type="button" onClick={() => handleAddFields()} className="btn btn-primary text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                          :
                          <button className="btn btn-danger" onClick={() => handleRemoveFields(index)} ><i className="fa fa-minus" aria-hidden="true"></i></button>
                      }
                    </div>
                  ))}


                </div>
                <div className="submit-button">
                  <button className="btn btn-primary mr-2" type="submit" onSubmit={handleSubmit}>  Save</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      {editinputFields.length > 0 &&
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i></button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-remove"></i></button>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    {editinputFields.map((i, index) => (
                      <div key={i.id} style={{ display: 'flex', padding: 5 }}>


                        <input type="text" value={i.sku} name="sku" id="sku" placeholder="SKU" className="form-control" onChange={(event) => handleEditInputChange(index, event)} style={{ width: '150px', marginRight: '5px' }} />
                        <input type="text" value={i.size} name="size" id="size" placeholder="SIZE" className="form-control" onChange={(event) => handleEditInputChange(index, event)} style={{ width: '150px', marginRight: '5px' }} />
                        <input type="number" value={i.price} name="price" id="price" placeholder="PRICE" className="form-control" onChange={(event) => handleEditInputChange(index, event)} style={{ width: '150px', marginRight: '5px' }} />
                        <input type="number" value={i.stock} name="stock" id="stock" placeholder="STOCK" className="form-control" onChange={(event) => handleEditInputChange(index, event)} style={{ width: '150px', marginRight: '5px' }} />

                        <div>
                          <button type="button" className="btn btn-primary text-center"><i
                            // onClick={e => {
                            //   var r = confirm("Are you sure?");
                            //   if (r == true) {
                            //     return EditSubmit(e);
                            //   }

                            // }} id={i.id}
                            onClick={e => handleEditSubmit(e, i.id)}
                            className="fa fa-upload" aria-hidden="true"></i></button>


                          <button type="button" className="btn btn-danger"><i className="fa fa-trash" onClick={e => {
                            var r = confirm("Are you sure?");
                            if (r == true) {
                              return onDelete(e);
                            }

                          }} id={i.id} aria-hidden="true"></i></button>
                        </div>
                      </div>
                    ))}


                  </div>

                </form>
              </div>
            </div>

          </div>
        </section>
      }

    </div >
  )
}
