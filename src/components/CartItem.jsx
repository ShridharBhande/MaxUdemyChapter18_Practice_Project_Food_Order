import { curreancyFormatter } from "../util/formatting";

export default function CartItem({
  name,
  quantity,
  price,
  onCrease,
  onDecrease,
}) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {curreancyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onCrease}>+</button>
      </p>
    </li>
  );
}
