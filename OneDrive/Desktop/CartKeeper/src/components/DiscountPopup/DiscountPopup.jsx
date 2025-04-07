import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./discount-popup.css";

const DiscountPopup = ({ show, onHide, onApplyDiscount }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate random discount code
  useState(() => {
    const randomCode = "SAVE" + Math.floor(Math.random() * 1000);
    setDiscountCode(randomCode);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyDiscount = () => {
    onApplyDiscount(15); // Apply 15% discount
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="discount-popup"
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>Special Offer For You!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="discount-content">
          <div className="discount-icon">
            <ion-icon name="gift"></ion-icon>
          </div>
          <h3>Get 15% Off Your Purchase</h3>
          <p>
            We noticed you've been shopping with us for a while. 
            Here's a special discount just for you!
          </p>
          <div className="discount-code">
            <span>{discountCode}</span>
            <button onClick={handleCopyCode}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="discount-timer">
            <p>This offer expires in 10:00 minutes</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Maybe Later
        </Button>
        <Button variant="primary" onClick={handleApplyDiscount}>
          Apply Discount
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiscountPopup;