import React, { useEffect } from 'react'
import { json, useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {

    const [name, setName] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [company, setCompany] = React.useState("")
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // console.warn(params);
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5001/product/${params.id}`);
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }


    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5001/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json"
            },
        });
        result = await result.json()
        navigate("/")

    }

    return (
        <div className='update'>
            <h1>Update Product</h1>
            <input className='inputBox' type='text' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Product Name' />

            <input className='inputBox' type='text' value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price' />

            <input className='inputBox' type='text' value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Enter Product Category' />

            <input className='inputBox' type='text' value={company} onChange={(e) => { setCompany(e.target.value) }} placeholder='Enter Product Company' />

            <button onClick={updateProduct} className='appButton'> Add Product </button>
        </div>
    )
}

export default UpdateProduct
