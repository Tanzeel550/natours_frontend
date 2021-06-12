import React from 'react';
import { TOUR_IMAGES_BASE_URL } from '../../config';

const PicturesSection = ({ images }: { images: [any] }) => (
  <section className="section-pictures">
    {images.map((image, index) => (
      <div className="picture-box" key={index}>
        <img
          className={`picture-box__img picture-box__img--${index + 1}`}
          src={TOUR_IMAGES_BASE_URL + image}
          alt=""
        />
      </div>
    ))}
  </section>
);

export default PicturesSection;
