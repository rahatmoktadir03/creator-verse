import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../client";

function EditCreators() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleChange = (e) =>
    setCreator({ ...creator, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("creators")
      .update(creator)
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Error updating creator. Please try again.");
    } else {
      navigate(`/creators/${id}`);
    }
    setSaving(false);
  };

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

  return (
    <section className="fade-in">
      <form onSubmit={handleSubmit}>
        <h2>✏️ Edit Creator</h2>

        <label>
          👤 Creator Name
          <input
            name="name"
            required
            value={creator.name}
            onChange={handleChange}
            placeholder="Enter the creator's name"
          />
        </label>

        <label>
          🔗 Channel URL
          <input
            name="url"
            type="url"
            required
            value={creator.url}
            onChange={handleChange}
            placeholder="https://youtube.com/@creator"
          />
        </label>

        <label>
          📝 Description
          <textarea
            name="description"
            required
            value={creator.description}
            onChange={handleChange}
            placeholder="What makes this creator awesome?"
          />
        </label>

        <label>
          🖼️ Profile Image URL (Optional)
          <input
            name="imageURL"
            type="url"
            value={creator.imageURL || ""}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        {creator.imageURL && (
          <div style={{ textAlign: "center", margin: "1rem 0" }}>
            <img
              src={creator.imageURL}
              alt="Preview"
              style={{
                maxWidth: "200px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "12px",
                border: "2px solid var(--glass-border)",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Image Preview
            </p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          <button type="submit" disabled={saving}>
            {saving ? "💾 Saving..." : "💾 Save Changes"}
          </button>

          <button type="button" onClick={handleDelete} className="contrast">
            🗑️ Delete Creator
          </button>

          <Link to={`/creators/${id}`} role="button" className="secondary">
            👁️ View Creator
          </Link>

          <Link to="/" role="button" className="secondary">
            ❌ Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

export default EditCreators;
