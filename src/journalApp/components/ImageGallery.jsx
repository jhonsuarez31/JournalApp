import { ImageList, ImageListItem } from '@mui/material';
import React from 'react'

export const ImageGallery = ({images}) => {
  return (
    <ImageList sx={{ width: '100%', height: '80%' }} variant="woven" cols={4} gap={8} rowHeight={300}>
      {images.map((item) => (
        <ImageListItem key={item.asset_id }>
        {console.log(item.asset_id)}
          <img
            src={`${item.secure_url}?w=161&fit=crop&auto=format`}
            srcSet={`${item.secure_url}?w=161&fit=crop&auto=format&dpr=2 2x`}
            alt={''}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}


