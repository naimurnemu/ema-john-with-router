import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import Cart from "../Cart/Cart";

const OrderReview = () => {
    const [products] = useProducts();
    const [cart] = useCart(products);
 
    return (
        <div>
            <h1>{products.length}</h1>
            <h2>This is Order Review</h2>
            <h3>{cart.length}</h3>
            <Cart cart={cart}></Cart>
        </div>
    );
};

export default OrderReview;
