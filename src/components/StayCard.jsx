import React from "react";

const StayCard = ({ stay, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 transition-all duration-500 cursor-pointer"
      onClick={onClick} // Se maneja el clic en la estancia
    >
      <img
        src={stay.photo}
        alt={stay.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-500">
          {stay.type}
          {stay.beds ? ` • ${stay.beds} beds` : ""}
        </span>
        <span className="flex items-center text-red-500">
          ⭐ {stay.rating}
        </span>
      </div>
      {stay.superHost && (
        <span className="text-xs font-bold text-red-500 border border-red-500 px-2 py-1 rounded-full inline-block mt-2">
          Super Host
        </span>
      )}
      <h3 className="font-semibold mt-1">{stay.title}</h3>
      <p className="text-gray-500">
        {stay.city}, {stay.country}
      </p>
      <p className="text-gray-600">Max Guests: {stay.maxGuests}</p>
    </div>
  );
};

export default StayCard;
