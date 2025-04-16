import React from "react";
import { Search } from "lucide-react";

const Header = ({
  onOpenLocationModal,
  onOpenGuestsModal,
  onSearch,
  selectedLocation,
  totalGuests,
}) => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md relative">
      <img
        src="/images/icons/logo-f7862584.svg"
        alt="Windbnb Logo"
        className="w-auto max-w-[150px] h-auto"
      />

      <div className="button-container flex items-center rounded-full overflow-hidden shadow-sm bg-white px-4 py-2 space-x-4">
        {/* Botón ubicación */}
        <button
          onClick={onOpenLocationModal}
          className="text-gray-500 focus:outline-none"
        >
          {selectedLocation || "Add Location"}
        </button>

        <span className="border-l border-gray-300 h-6"></span>

        {/* Botón huéspedes */}
        <button
          onClick={onOpenGuestsModal}
          className="text-gray-500 focus:outline-none"
        >
          <span>{totalGuests > 0 ? `${totalGuests} guests` : "Add Guests"}</span>
        </button>

        <span className="border-l border-gray-300 h-6"></span>

        {/* Botón buscar */}
        <button
          onClick={onSearch}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-red-600 transition"
        >
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </button>
      </div>
    </header>
  );
};

export default Header;
