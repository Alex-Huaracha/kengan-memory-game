import { useState, useEffect } from 'react';
import './App.css';
import { shuffleArray } from './utils/shuffleArray';
import Card from './components/Card/Card';

// Kengan Ashura ID : 40269
const ANIME_ID = 40269;

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKenganCharacters = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${ANIME_ID}/characters`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Kengan Ashura characters');
        }

        const data = await response.json();

        const formattedCards = data.data.map((item) => ({
          id: item.character.mal_id,
          name: item.character.name,
          image: item.character.images.webp.image_url,
        }));

        setCards(shuffleArray(formattedCards));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKenganCharacters();
  }, []);

  const handleCardClick = (cardId) => {
    // console.log(`Card with ID ${cardId} clicked`);
    if (clickedCards.includes(cardId)) {
      alert('Game Over! You clicked the same character twice.');
      resetGame();
      return;
    }

    const newScore = score + 1;

    setScore(newScore);
    setClickedCards([...clickedCards, cardId]);

    if (newScore > bestScore) {
      setBestScore(newScore);
    }

    setCards(shuffleArray(cards));
  };

  const resetGame = () => {
    setScore(0);
    setClickedCards([]);
    setCards(shuffleArray(cards));
  };

  if (loading) {
    return <div className="loading">Loading Characters...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      {/* Header */}
      <header>
        <h1 className="title">Memory Card</h1>
        <img className="logo" src="/src/assets/images/logo.png" alt="Logo" />
        {/* Scoreboard */}
        <div className="scoreboard">
          <p>Best Score: {bestScore}</p>
          <p>Score: {score}</p>
        </div>
      </header>
      {/* Main Content - Card Grid*/}
      <main className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onCardClick={handleCardClick} />
        ))}
      </main>

      {/* Footer */}
      <footer>
        &copy; 2025 Designed and developed by
        <a
          href="https://github.com/Alex-Huaracha"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <svg className="icon" aria-hidden="true">
            <use href="#icon-github"></use>
          </svg>
          Alex Huaracha
        </a>
      </footer>
    </>
  );
}

export default App;
