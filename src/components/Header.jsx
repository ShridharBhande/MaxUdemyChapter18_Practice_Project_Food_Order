import { useContext } from 'react';
import logoImg from '../assets/logo.jpg'
import Button from '../UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
    const cartCtx = useContext(CartContext);

    // console.log("-- isnide the Header item list ->",cartCtx, cartCtx?.items);

    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumbersOfItems, item) => {
        return totalNumbersOfItems + item.quantity
    }, 0);

    function handleCartClick() {
        userProgressCtx.showCart();
    }
    
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="FOOD IMAGE"/>
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button onClick={handleCartClick}>Cart ({totalCartItems}) </Button>
            </nav>
        </header>
    )
}
