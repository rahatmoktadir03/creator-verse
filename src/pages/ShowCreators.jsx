import { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";
import { Link } from "react-router-dom";

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("creators").select("*");
      if (error) {
        console.error(error);
      } else {
        setCreators(data);
      }
      setLoading(false);
    };
    fetchCreators();
  }, []);

  if (loading) {
    return (
      <section className="fade-in">
        <div className="spinner"></div>
        <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          Loading amazing creators...
        </p>
      </section>
    );
  }

  return (
    <section className="fade-in">
      <header>
        <h2>🌟 All Creators</h2>
        <Link to="/add" role="button">
          ✨ Add Creator
        </Link>
      </header>

      {creators.length === 0 ? (
        <div className="empty-state">
          <h3>🎭 No creators yet!</h3>
          <p>
            Start building your creator community by adding your first creator.
          </p>
          <Link to="/add" role="button">
            🚀 Add Your First Creator
          </Link>
        </div>
      ) : (
        <div className="grid">
          {creators.map((creator, index) => (
            <div key={creator.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <CreatorCard creator={creator} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ShowCreators;
