import React from 'react'
import './Product.css'

export default function Product({ data }) {
    return (
        <div className='product-item'>
            <h2>{data.productName}</h2>
            <h4>{data.productDescription}</h4>
        </div>
    )
}
