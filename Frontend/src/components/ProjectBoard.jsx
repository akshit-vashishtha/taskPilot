import React, { useState } from "react";
import Kanban from "./Kanban";

export default function ProjectBoard() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = () => {
    const name = prompt("Enter a name for the card:");
    if (name && name.trim() !== "") {
      setCards([...cards, { id: Date.now(), name }]);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={addCard}
        className="px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Add Card
      </button>

      {selectedCard ? (
        <Kanban name={selectedCard.name} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="p-6 bg-white rounded-2xl shadow-md border cursor-pointer hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{card.name}</h2>
              <p className="text-gray-600">Click to open Kanban board</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
