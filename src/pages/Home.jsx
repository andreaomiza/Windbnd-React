import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import StayCard from "../components/StayCard.jsx";
import staysData from "../data/stays.json";
import Modal from "../components/Modal.jsx";

const Home = () => {
  const [stays, setStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [guests, setGuests] = useState(0);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);

  useEffect(() => {
    setStays(staysData);
    setFilteredStays(staysData);
  }, []);

  useEffect(() => {
    setGuests(adults + children); // Actualiza el número total de huéspedes
  }, [adults, children]);

  const handleSearch = (location, adults, children) => {
    setSelectedLocation(location); // Actualiza la ubicación seleccionada
    setGuests(adults + children); // Actualiza el total de huéspedes

    const filtered = stays.filter((stay) => {
      const matchesLocation =
        location === "" ||
        `${stay.city}, ${stay.country}`.toLowerCase().includes(location.toLowerCase());

      const matchesGuests = stay.maxGuests >= adults + children;

      return matchesLocation && matchesGuests;
    });

    setFilteredStays(filtered);
  };

  const openLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  const closeLocationModal = () => {
    setIsLocationModalOpen(false);
  };

  const openGuestsModal = () => {
    setIsGuestsModalOpen(true);
  };

  const closeGuestsModal = () => {
    setIsGuestsModalOpen(false);
  };

  // Función para manejar la selección de ubicación en el modal
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    handleSearch(location, adults, children); // Filtrar estancias según la ubicación seleccionada
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onOpenLocationModal={openLocationModal}
        onOpenGuestsModal={openGuestsModal}
        onSearch={() => handleSearch(selectedLocation, Math.max(0, adults), Math.max(0, children))}
        selectedLocation={selectedLocation}
        guests={guests}
      />

      {/* Modal for Location */}
      <Modal
        isOpen={isLocationModalOpen}
        closeModal={closeLocationModal}
        onSearch={handleSearch}
        onLocationSelect={handleLocationSelect} // Pasamos la función al modal
        initialLocation={selectedLocation}
        initialAdults={Math.max(0, adults)}
        initialChildren={Math.max(0, children)}
      />

      {/* Modal for Guests */}
      <Modal
        isOpen={isGuestsModalOpen}
        closeModal={closeGuestsModal}
        onSearch={handleSearch}
        onGuestsSelect={({ adults, children }) => {
          setAdults(adults);
          setChildren(children);
        }}
        initialLocation={selectedLocation}
        initialAdults={Math.max(0, adults)}
        initialChildren={Math.max(0, children)}
      />

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold">
          Stays in {selectedLocation || "Finland"}
        </h2>

        {/* Mostrar el conteo de estancias disponibles */}
        <p className="text-gray-500 mb-6">
          {filteredStays.length < 12 ? `${filteredStays.length} stays` : "12+ stays"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStays.map((stay, index) => (
            <StayCard key={index} stay={stay} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
