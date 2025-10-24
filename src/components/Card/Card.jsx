import './Card.css';

export default function Card({ card, onCardClick }) {
  return (
    <div className="card" onClick={() => onCardClick(card.id)}>
      <img src={card.image} alt={card.name} />
      <p>{card.name}</p>
    </div>
  );
}
