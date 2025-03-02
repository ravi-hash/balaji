import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";
import { BsTruck } from "react-icons/bs";
import { CiMemoPad } from "react-icons/ci";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data: reviews } = useFetchCollection("reviews");
  
  const filteredReviews = reviews.filter((review) => review.productID === id);
  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.some((cart) => cart.id === id);

  // State for general specifications
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (document) {
      setProduct(document);
    }
  }, [document]);

  // Example of adding an item to the cart with specifications
const addToCart = () => {
    const orderMessage = `Hello, I would like to purchase the following product:
    - **Product Name**: ${product?.name}
    - **Price**: ${formatPrice(product?.price)}
    - **Color**: ${color}
    - **Size**: ${size}
    - **Recipient Name**: ${recipientName}
    - **Message**: ${message}
    - **image**: ${image}    
    
    Please confirm the details.`;
  
    const whatsappURL = `https://wa.me/9304060062?text=${encodeURIComponent(orderMessage)}`;
  
    window.location.href = whatsappURL;
  
    // Reset the specifications after redirecting
    setColor("");
    setSize("");
    setRecipientName("");
    setMessage("");
    setImage(null);
};
  



  const decreaseCart = () => {
    dispatch(DECREASE_CART(cart));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  const capitalizeFirstLowercaseRest = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <section>
      <div className="product-detail">
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>

        {product === null ? (
          <Loader />
        ) : (
          <>
            <div className="product-details">
              <div className="product-details__img">
                <img src={product?.imageURL} alt={product?.name} />
              </div>
              <div className="product-details__content">
                <h3>{capitalizeFirstLowercaseRest(product?.name)}</h3>
                <p className="product-details__description">
                  {product?.desc}
                </p>
                <p className="product-details__price">
                  {formatPrice(product?.price)}
                </p>
                <p className="product-details__brand">
                  <b>Type</b> {capitalizeFirstLowercaseRest(product?.brand)}
                </p>

                <div className="count">
                  {isCartAdded ? (
                    <div className="product-details__incDec-btn">
                      <button onClick={decreaseCart}>-</button>
                      <p>
                        <b>{cart?.cartQuantity}</b>
                      </p>
                      <button onClick={addToCart}>+</button>
                    </div>
                  ) : (
                    <button
                      className="--btn-small --bg-green atc-btn"
                      onClick={addToCart}
                    >
                      Add to Cart
                    </button>
                  )}

                  {isCartAdded && (
                    <p>
                      Only <span>few items</span> Left! <br /> Don't miss it
                    </p>
                  )}
                </div>

                <div className="product-details__delivery">
                  <div className="head">
                    <div className="icon">
                      <BsTruck />
                    </div>
                    <p>Free delivery</p>
                  </div>
                  <p style={{ textDecoration: "underline", cursor: "pointer" }}>
                    Enter your Postal code for Delivery Availability
                  </p>
                </div>

                <div className="product-details__delivery">
                  <div className="head">
                    <div className="icon">
                      <CiMemoPad />
                    </div>
                    <p>Return Delivery</p>
                  </div>
                  <p>
                    Free 30 days Delivery Returns <span>Details</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="general-specifications">
              <h4 className="general-specifications__title">
                Guidelines for Ordering {product?.name}
              </h4>
              <div className="general-specifications__table">
                {/* Color Selection */}
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">Color</div>
                  <div className="general-specifications__row-value">
                    <select value={color} onChange={(e) => setColor(e.target.value)}>
                      <option value="">Select a color</option>
                      <option value="Red">Red</option>
                      <option value="Blue">Blue</option>
                      <option value="Green">Green</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Or enter custom color"
                      style={{ marginLeft: "10px" }}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                </div>

                {/* Size Selection */}
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">Size</div>
                  <div className="general-specifications__row-value">
                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                      <option value="">Select a size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Or enter custom size"
                      style={{ marginLeft: "10px" }}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </div>
                </div>

                {/* Recipient's Name */}
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">Recipient's Name</div>
                  <div className="general-specifications__row-value">
                    <input
                      type="text"
                      placeholder="Enter recipient's name"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Message/Details */}
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">Message/Details</div>
                  <div className="general-specifications__row-value">
                    <textarea
                      placeholder="Enter your message or details"
                      rows="3"
                      style={{ width: "100%" }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="general-specifications__row">
                  <div className="general-specifications__row-key">Image</div>
                  <div className="general-specifications__row-value">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <Card>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              filteredReviews.map((item, index) => {
                const { rate, review, reviewDate, userName } = item;
                return (
                  <div key={index} className="review">
                    <StarsRating value={rate} />
                    <p>{capitalizeFirstLowercaseRest(review)}</p>
                    <span>
                      <b>{reviewDate}</b>
                    </span>
                    <br />
                    <span>
                      <b>by: {capitalizeFirstLowercaseRest(userName)}</b>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
