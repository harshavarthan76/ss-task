import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../redux/actions'
import Product from '../Product/Product'
import './ProductList.css'

export default function ProductList() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const renderProducts = () => {
        return products.map((product) => {
            return <li key={product.id}>
                <Product data={product} />
            </li>
        })
    }
    return (
        <div className='products'>
            <ul className='product-list'>{renderProducts()}</ul>
        </div>
    )
}
