
import { Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const Banner = () => {
  const images = [
    "https://thietkehaithanh.com/wp-content/uploads/2019/01/THIETKEHAITHANH-HINH2.jpg",
    "https://i.ytimg.com/vi/vMVwdSp489E/maxresdefault.jpg",
    "https://www.xtsmart.vn/vnt_upload/news/02_2021/cover_baner_web.jpg",
    "https://womenleadersforum.vn/wp-content/uploads/2020/03/WS.jpg"
  ];

  return (
    <Box>
      <Carousel interval={3000}>
        {images.map((image, index) => (
          <Box key={index} component="img" src={image} alt={`banner-${index}`} width="100%" height="400px" />
        ))}
      </Carousel>
    </Box>
  );
};

export default Banner;
