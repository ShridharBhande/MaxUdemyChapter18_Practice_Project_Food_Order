import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { curreancyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Error from "./Error";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hook/useHttp";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': "application/json"
  }
}

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, error, isLoading: isSending, sendRequest } = useHttp("http://localhost:3000/orders", requestConfig)

  const totalCartPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCheckout() {
    console.log("--close ala ka ? ---")
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
     
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: customerData // or diff way: (customerData: CustomerData) goesTO==> customerData
      }
    }));
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
      <Button>Submit Order</Button>
    </>
  );

  if(isSending) {
    actions = <span>Sending the Order...</span>
  }

  if(data && !error) {
    return  <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
      <h2>Success!</h2>
      <p>Your order was submitted successfully</p>
      <p>We will get back to you with more detials via mail within next few minutes.</p>
      <p className="modal-actions">
        <Button onClose={handleCloseCheckout}>Okay</Button></p>
    </Modal>
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {curreancyFormatter.format(totalCartPrice)}</p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit Order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
