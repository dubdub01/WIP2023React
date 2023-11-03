import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const RatingStars = ({ averageRating, isLoading }) => {
  const numericRating = parseFloat(averageRating);

  if (isLoading) {
    return <div>Chargement de la note...</div>;
  }

  if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
    return <div>Erreur de notation</div>;
  }

  const roundedRating = Math.round(numericRating);
  const maxStars = 5;
  const filledStars = Math.min(maxStars, Math.max(0, roundedRating));
  const emptyStars = maxStars - filledStars;

  const filledStarArray = [...Array(filledStars)].map((_, index) => (
    <FontAwesomeIcon key={index} icon={solidStar} className="text-yellow-500" />
  ));

  const emptyStarArray = [...Array(emptyStars)].map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} className="text-gray-300" />
  ));

  return (
    <div className="flex items-center">
      {filledStarArray}
      {emptyStarArray}
      {numericRating === 0 && <div>Pas de note</div>}
    </div>
  );
};

export default RatingStars;
