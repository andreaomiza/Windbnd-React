import React, { useState, useEffect } from "react";
import { X, Search, MapPin } from "lucide-react";
import staysData from "../data/stays.json";

const uniqueLocations = [
  ...new Set(staysData.map((stay) => `${stay.city}, ${stay.country}`)),
];

const Modal = ({
  isOpen,
  closeModal,
  onSearch,
  onLocationSelect,  // Nueva función para actualizar la ubicación en Home
  initialLocation = "",
  initialAdults = 0,
  initialChildren = 0,
}) => {
  const [location, setLocation] = useState(initialLocation);
  const [searchTerm, setSearchTerm] = useState(initialLocation);
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLocation(initialLocation);
      setSearchTerm(initialLocation);
      setAdults(initialAdults);
      setChildren(initialChildren);
      setShowSuggestions(true);
    }
  }, [isOpen, initialLocation, initialAdults, initialChildren]);

  const handleSearch = () => {
    onSearch(location, adults, children);
    closeModal();
  };

  const handleLocationInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setLocation(value);
    setShowSuggestions(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-start md:items-center p-4 overflow-y-auto">
      <div className="bg-white w-full md:w-1/2 max-w-2xl rounded-2xl shadow-lg p-6 relative animate-slide-in max-h-[95vh] overflow-y-auto">
        {/* Botón cerrar (X) */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 md:hidden"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Ubicación */}
        <div className="mb-6 relative">
          <label className="block text-sm font-semibold mb-1">Location</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <MapPin className="w-4 h-4 text-red-400 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleLocationInput}
              placeholder="Search location"
              className="w-full outline-none"
            />
          </div>

          {showSuggestions && searchTerm.length > 0 && (
            <ul className="absolute w-full bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto mt-1 z-50">
              <li
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  setLocation("");
                  setSearchTerm("");
                  setShowSuggestions(false);
                }}
              >
                <MapPin className="w-4 h-4 text-red-400" />
                All
              </li>

              {uniqueLocations
                .filter((loc) =>
                  loc.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((loc) => (
                  <li
                    key={loc}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setLocation(loc);
                      setSearchTerm(loc);
                      setShowSuggestions(false);
                      onLocationSelect(loc);  // Actualiza la ubicación en Home al hacer clic
                      closeModal();  // Cierra el modal al seleccionar la ubicación
                    }}
                  >
                    <MapPin className="w-4 h-4 text-red-400" />
                    {loc}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Invitados */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Guests</label>

          {/* Adultos */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">Adults</p>
              <p className="text-sm text-gray-500">Ages 13 or above</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAdults(Math.max(0, adults - 1))}
                className="w-8 h-8 border rounded-full text-lg font-bold"
              >
                -
              </button>
              <span>{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="w-8 h-8 border rounded-full text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Niños */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Children</p>
              <p className="text-sm text-gray-500">Ages 2–12</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-8 h-8 border rounded-full text-lg font-bold"
              >
                -
              </button>
              <span>{children}</span>
              <button
                onClick={() => setChildren(children + 1)}
                className="w-8 h-8 border rounded-full text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Botón de búsqueda */}
        <button
          onClick={handleSearch}
          className="w-full bg-red-500 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold hover:bg-red-600 transition"
        >
          <Search className="w-5 h-5" />
          Search
        </button>
      </div>
    </div>
  );
};

export default Modal;

