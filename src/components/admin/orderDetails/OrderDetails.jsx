import React, { useEffect, useState } from "react";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import "./OrderDetails.scss";
import { Link, useParams } from "react-router-dom";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";
import { SmallLoader } from "../../loader/Loader";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams(); // This should match the order ID format

  // Fetch order document using the order ID
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className="table">
        <h2>Order Details</h2>
        <div>
          <Link to="/admin/orders">&larr; Back To Orders</Link>
        </div>
        <br />
        {order === null ? (
          <SmallLoader />
        ) : (
          <>
            <p>
              <b>Order ID</b> {order.id}
            </p>
            <p>
              <b>Order Amount</b> ₹
              {order.orderAmount
                .toFixed(2)
                ?.toString()
                .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
            </p>
            <p>
              <b>Order Status</b> {order.orderStatus}
            </p>
            <p>
              <b>Shipping Address</b>
              <br />
              Address: {order.shippingAddress.line1},
              {order.shippingAddress.line2}, {order.shippingAddress.city}
              <br />
              State: {order.shippingAddress.state}
              <br />
              Country: {order.shippingAddress.country}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          className="disable"
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* General Specifications Section */}
            <div className="general-specifications">
              <h4>General Specifications</h4>
              <div className="specifications-row">
                <p>
                  <b>Color:</b> {order.customization?.color || "N/A"}
                </p>
                <p>
                  <b>Size:</b> {order.customization?.size || "N/A"}
                </p>
                <p>
                  <b>Recipient's Name:</b> {order.customization?.recipientName || "N/A"}
                </p>
                <p>
                  <b>Message/Details:</b> {order.customization?.message || "N/A"}
                </p>
                <p>
                  <b>Image:</b> {order.customization?.image ? "Uploaded" : "N/A"}
                </p>
              </div>
            </div>
          </>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;
