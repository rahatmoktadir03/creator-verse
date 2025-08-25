import { Link } from "react-router-dom";

function CreatorCard({ creator }) {
  return (
    <article className="card fade-in">
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200/667eea/ffffff?text=Creator";
          }}
        />
      )}
      <h3>{creator.name}</h3>
      <p>{creator.description}</p>
      <footer>
        <a href={creator.url} target="_blank" rel="noreferrer" role="button">
          🔗 Visit Channel
        </a>
        <Link
          to={`/creators/${creator.id}`}
          role="button"
          className="secondary"
        >
          👁️ View
        </Link>
        <Link to={`/edit/${creator.id}`} role="button" className="contrast">
          ✏️ Edit
        </Link>
      </footer>
    </article>
  );
}

export default CreatorCard;
