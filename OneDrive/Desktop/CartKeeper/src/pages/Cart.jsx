import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import DiscountPopup from "../components/DiscountPopup/DiscountPopup";

// Componente Cart che visualizza gli articoli nel carrello
const Cart = () => {
  // Discount popup state
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  
  // Recupera la lista del carrello dallo store Redux
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calcola il prezzo totale degli articoli nel carrello
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  
  // Calculate discounted price
  const discountedPrice = totalPrice - (totalPrice * discount / 100);

  // Timer for discount popup
  useEffect(() => {
    // Check if user already got a discount in this session
    const hasDiscount = sessionStorage.getItem("cartKeeperDiscount");
    
    if (!hasDiscount && cartList.length > 0) {
      // Set timer for 30 seconds
      const timer = setTimeout(() => {
        setShowDiscountPopup(true);
        // Record that user has been shown the discount
        sessionStorage.setItem("cartKeeperDiscount", "shown");
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, [cartList]);

  // Handle applying discount
  const handleApplyDiscount = (discountPercent) => {
    setDiscount(discountPercent);
    setDiscountApplied(true);
    sessionStorage.setItem("cartKeeperDiscount", "applied");
  };

  // Effettua lo scroll in alto quando il componente è montato
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {/* Messaggio se il carrello è vuoto */}
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {/* Mappatura degli articoli presenti nel carrello */}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      {/* Immagine del prodotto */}
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price}.00 * {item.qty}
                            <span>${productQty}.00</span> {/* Prezzo per quantità */}
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          {/* Pulsante per incrementare la quantità */}
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          {/* Pulsante per diminuire la quantità */}
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    {/* Pulsante per rimuovere il prodotto dal carrello */}
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            {/* Sezione riepilogo del carrello */}
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className="d_flex">
                <h4>Total Price :</h4>
                <h3>${discountApplied ? discountedPrice.toFixed(2) : totalPrice.toFixed(2)}</h3>
              </div>
              {discountApplied && (
                <div className="discount-info">
                  <p>Original price: <span className="original-price">${totalPrice.toFixed(2)}</span></p>
                  <p>Discount applied: <span className="discount-percent">{discount}%</span></p>
                  <p>You saved: <span className="savings">${(totalPrice - discountedPrice).toFixed(2)}</span></p>
                </div>
              )}
              {cartList.length > 0 && (
                <button className="checkout-btn" onClick={() => {}}>
                  Proceed to Checkout
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Discount popup */}
      <DiscountPopup 
        show={showDiscountPopup} 
        onHide={() => setShowDiscountPopup(false)}
        onApplyDiscount={handleApplyDiscount}
      />
    </section>
  );
};

export default Cart;
