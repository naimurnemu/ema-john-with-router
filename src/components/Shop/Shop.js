import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import "./Shop.css";
import { Link } from "react-router-dom";
// import useProducts from "../../hooks/useProducts";
// import useCart from "../../hooks/useCart";

const Shop = () => {
    // use products state
    // const [products] = useProducts();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("./products.JSON")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setDisplayProducts(data);
            });
    }, []);

    // use cart state
    // const [cart, setCart] = useCart(products);
    const [cart, setCart] = useState([]);
     useEffect(() => {
        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(
                    (product) => product.key === key
                );
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
        }
    }, [products]);

    // products to be rendered on the UI
    const [displayProducts, setDisplayProducts] = useState([]);

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        // save to local storage (for now)
        addToDb(product.key);
    };

    const handleSearch = (event) => {
        const searchText = event.target.value;

        const matchedProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setDisplayProducts(matchedProducts);
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search Product"
                />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {displayProducts.map((product) => (
                        <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>
                    ))}
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn-regular">Review Your Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;
