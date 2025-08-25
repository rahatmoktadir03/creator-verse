import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../client";

function ViewCreators() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        navigate("/");
      } else {
        setCreator(data);
      }
      setLoading(false);
    };
    fetchCreator();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this creator? This action cannot be undone."
      )
    ) {
      const { error } = await supabase.from("creators").delete().eq("id", id);

      if (error) {
        console.error(error);
        alert("Error deleting creator. Please try again.");
      } else {
        navigate("/");
      }
    }
  };

  if (loading) {
    return (
      <section className="fade-in">
        <div className="spinner"></div>
        <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          Loading creator details...
        </p>
      </section>
    );
  }

  if (!creator) {
    return (
      <section className="fade-in">
        <div className="empty-state">
          <h3>😕 Creator not found</h3>
          <p>
            The creator you're looking for doesn't exist or may have been
            deleted.
          </p>
          <Link to="/" role="button">
            🏠 Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="fade-in">
      <article className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {creator.imageURL && (
          <img
            src={creator.imageURL}
            alt={creator.name}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "16px",
              marginBottom: "2rem",
            }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/800x300/667eea/ffffff?text=Creator+Image";
            }}
          />
        )}

        <h2
          style={{
            fontSize: "3rem",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          {creator.name}
        </h2>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: "var(--text-secondary)",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          {creator.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <a
            href={creator.url}
            target="_blank"
            rel="noreferrer"
            role="button"
            style={{ fontSize: "1.1rem" }}
          >
            🚀 Visit Channel
          </a>
          <Link
            to={`/edit/${creator.id}`}
            role="button"
            className="secondary"
            style={{ fontSize: "1.1rem" }}
          >
            ✏️ Edit Creator
          </Link>
          <button
            onClick={handleDelete}
            className="contrast"
            style={{ fontSize: "1.1rem" }}
          >
            🗑️ Delete Creator
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/" role="button" className="secondary">
            ← Back to All Creators
          </Link>
        </div>
      </article>
    </section>
  );
}

export default ViewCreators;
