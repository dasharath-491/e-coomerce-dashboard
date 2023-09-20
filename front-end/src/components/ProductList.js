import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5001/products");
        result = await result.json()
        setProducts(result)
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5001/product/${id}`, {
            method: "Delete"
        })
        result = await result.json()
        if (result) {
            getProducts()
        }
    }

    const searchBox = async (event) => {
        let key = event.target.value
        if (key) {
            let result = await fetch(`http://localhost:5001/search/${key}`)
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts()
        }

    }


    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <input type='text' onChange={searchBox} className='search_box' placeholder='Search Product' />
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((ele, index) =>

                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{ele.name}</li>
                        <li>{ele.price}</li>
                        <li>{ele.category}</li>
                        <li>{ele.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(ele._id)}>Delete</button>
                            <Link to={"/update/" + ele._id}>Update</Link>
                        </li>
                    </ul>

                ) :
                    <h1>No Record Found</h1>
            }
        </div>
    )
}

export default ProductList

