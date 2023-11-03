import React, { useState } from 'react';

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div>
      <p>Rating: {rating}</p>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingClick(value)}
            style={{
              cursor: 'pointer',
              color: value <= rating ? 'gold' : 'gray',
            }}
          >
            &#9733; {/* Utilisez un caractère Unicode ou une icône pour représenter une étoile */}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
