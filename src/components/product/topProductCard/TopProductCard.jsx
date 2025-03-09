import React, { useState, useEffect } from "react";
import "./TopProductCard.scss"; // Add your styles here

// Importing images locally
import businessEssentialsImg from "../../../assets/topproduct/vs.webp";
import homeGiftsImg from "../../../assets/topproduct/mug.webp";
import designLogoImg from "../../../assets/topproduct/IN_Birthday-Invitation-Cards_Hero-image_01.webp";
import officeSuppliesImg from "../../../assets/topproduct/IN_Diary-with-Pen-Holder_001.webp";
import customPoloImg from "../../../assets/topproduct/shirt.webp";
import calendarsImg from "../../../assets/topproduct/cal.webp";
import customOfficeShirtsImg from "../../../assets/topproduct/IN_posters_002.webp";
import safetyVestImg from "../../../assets/topproduct/Multicolor Foam Pvc Banner, For Advertising.png";

const TopProductCard = () => {
  const products = [
    {
      name: "Business Essentials",
      description:
        "Visiting cards, signs, posters, and essential marketing materials to help grow your business.",
      rating: 4.5,
    },
    {
      name: "Home & Gifts",
      description:
        "Mugs, drinkware, and gift hampers for a personalized touch, perfect for any occasion.",
      rating: 4.9,
    },
    {
      name: "Event Poster",
      description:
        "Get creative with customized event posters using our design services, logo makers, and QR code generators.",
      rating: 4.1,
    },
    {
      name: "Office Supplies",
      description:
        "From stamps to ink, find all the office essentials to keep your workplace running smoothly.",
      rating: 4.6,
    },
    {
      name: "Custom Polo T-Shirts",
      description:
        "Tailored custom polo shirts, ideal for your office or team branding needs.",
      rating: 4.3,
    },
    {
      name: "Calendars",
      description:
        "Personalized calendars to help you organize your year with a touch of style.",
      rating: 4.7,
    },
    {
      name: "Custom Poster",
      description:
        "Professional custom office posters designed to leave a lasting impression.",
      rating: 4.4,
    },
    {
      name: "Banner",
      description:
        "Custom banners to enhance visibility and make your message stand out.",
      rating: 4.5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(products.length / 5) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(products.length / 5) - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const getImageForProduct = (name) => {
    switch (name) {
      case "Business Essentials":
        return businessEssentialsImg;
      case "Home & Gifts":
        return homeGiftsImg;
      case "Event Poster":
        return designLogoImg;
      case "Office Supplies":
        return officeSuppliesImg;
      case "Custom Polo T-Shirts":
        return customPoloImg;
      case "Calendars":
        return calendarsImg;
      case "Custom Poster":
        return customOfficeShirtsImg;
      case "Banner":
        return safetyVestImg;
      default:
        return "";
    }
  };

  return (
    <div className="product-slider">
      <button className="slider-button prev" onClick={prevSlide}>
        Prev
      </button>

      <div
        className="card-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product, index) => (
          <div key={index} className="parallax-card">
            <div className="parallax-card-shadow"></div>
            <div className="parallax-card-container">
              <div className="parallax-card-layers">
                <div className="parallax-card-rendered-layer">
                  <img
                    src={getImageForProduct(product.name)}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-rating">
                      <span>⭐ {product.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="parallax-card-shine"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-button next" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default TopProductCard;
