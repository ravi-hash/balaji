import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import Card from "../../components/card/Card";
import "./ReviewProducts.scss";
import StarsRating from "react-star-rate";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import Loader from "../../components/loader/Loader";

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  useEffect(() => {
    if (document) {
      setProduct(document);
    }
  }, [document]);

  const submitReview = async (e) => {
    e.preventDefault();

    if (!rate || rate === 0) {
      toast.error("Please select a rating");
      return;
    }

    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      await addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className="container review">
        <h2>Review Products</h2>
        {product === null ? (
          <Loader />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product?.name}
            </p>
            <img
              src={product?.imageURL}
              alt={product?.name}
              style={{ width: "100px" }}
            />
          </>
        )}

        <Card>
          <form onSubmit={submitReview}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn-small --bg-green">
              Submit Review
            </button>
          </form>
        </Card>

        {/* Display reviews */}
        <div className="reviews-list">
          {product?.reviews?.map((review, index) => (
            <div key={index} className="review-item">
              <img
                src={`https://ui-avatars.com/api/?name=${review.userName}&background=random&size=50`}
                alt={review.userName}
                className="review-avatar"
              />
              <div className="review-content">
                <p><b>{review.userName}</b></p>
                <StarsRating value={review.rate} readonly />
                <p>{review.review}</p>
                <p><small>{review.reviewDate}</small></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewProducts;
