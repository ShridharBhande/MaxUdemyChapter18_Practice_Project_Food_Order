import { useContext } from "react";
import Button from "../UI/Button";
import { curreancyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";

export default function MealItems({ meal }) {
    // console.log("-- inside meal item comp->", {meal})
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }
    // console.log('-- meal Item --->', cartCtx);

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{curreancyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    )
}