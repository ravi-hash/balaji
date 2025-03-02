import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Banner.scss';
import * as React from 'react';
import Slider from 'react-slick';
import cardimg from '../../assets/images/calendar.webp';
import calendarimg from '../../assets/images/card.webp';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 8000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    arrows: false,
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Slider {...settings}>
        {/* Banner 1 */}
        <Box position="relative">
          <img
            src={cardimg}
            alt="Visiting Cards Banner"
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
          <Box position="absolute" top="50%" left="10%" sx={{ transform: 'translateY(-50%)', color: '#54f' }}>
            <Typography variant="h3" fontWeight="bold">My Name, My Pride</Typography>
            <Typography variant="h6" mt={1}>100 Visiting Cards at Rs 180</Typography>
            <Link to="/view-all-products" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>Buy Now</Button>
            </Link>
          </Box>
        </Box>

        {/* Banner 2 */}
        <Box position="relative">
          <img
            src={calendarimg}
            alt="Custom Calendars Banner"
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
          <Box position="absolute" top="50%" left="10%" sx={{ transform: 'translateY(-50%)', color: '#54f' }}>
            <Typography variant="h3" fontWeight="bold">Share New Year Wishes <br /> with Custom Calendars</Typography>
            <Typography variant="h6" mt={1}>Start at Rs 150</Typography>
            <Link to="/view-all-products" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>Buy Now</Button>
            </Link>
          </Box>
        </Box>
      </Slider>
    </Box>
  );
}

export default Banner;
