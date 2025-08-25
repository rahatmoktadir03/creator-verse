import { useEffect, useState } from "react";

function ShootingStars() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createStar = () => {
      const id = Date.now() + Math.random();
      const newStar = {
        id,
        top: Math.random() * 60 + 15, // 15% to 75% from top
        duration: Math.random() * 4 + 6, // 6-10 seconds (slower)
        delay: Math.random() * 2, // 0-2 second delay
      };

      setStars((prev) => [...prev, newStar]);

      // Remove star after animation completes
      setTimeout(() => {
        setStars((prev) => prev.filter((star) => star.id !== id));
      }, (newStar.duration + newStar.delay) * 1000 + 500);
    };

    // Create initial batch of stars
    const createInitialStars = () => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          createStar();
        }, i * 1500); // Stagger initial stars
      }
    };

    // Start with initial stars
    createInitialStars();

    // Create new stars more frequently to maintain multiple visible
    const interval = setInterval(() => {
      createStar();
    }, 3000 + Math.random() * 2000); // Every 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shooting-stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star-trail"
          style={{
            top: `${star.top}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default ShootingStars;
