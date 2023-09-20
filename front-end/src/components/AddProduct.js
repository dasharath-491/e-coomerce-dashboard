import React from 'react'
import GridLoader from "react-spinners/ClipLoader";
const AddProduct = () => {
    const [name, setName] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [company, setCompany] = React.useState("")
    const [error, setError] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false);

    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }


        const userId = JSON.parse(sessionStorage.getItem('user'))._id;
        setIsLoading(true)
        let result = await fetch("http://localhost:5001/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': "application/json"
            },
        })
        setIsLoading(false)
        result = await result.json()
        console.warn(result)
    }

    return (
        <div className='product'>
            {isLoading && (
                <div className="divLoader">
                    <GridLoader color="#36d7b7" />
                </div>
            )}
            <h1>Add Product</h1>
            <input className='inputBox' type='text' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Product Name' />
            {error && !name && <span className='error-input'>Enter Valid Name</span>}
            <input className='inputBox' type='text' value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price' />
            {error && !price && <span className='error-input'>Enter Valid Price</span>}
            <input className='inputBox' type='text' value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Enter Product Category' />
            {error && !category && <span className='error-input'>Enter Valid Category</span>}
            <input className='inputBox' type='text' value={company} onChange={(e) => { setCompany(e.target.value) }} placeholder='Enter Product Company' />
            {error && !company && <span className='error-input'>Enter Valid Company</span>}
            <button onClick={addProduct} className='appButton'> Add Product </button>
        </div>
    )
}

export default AddProduct
