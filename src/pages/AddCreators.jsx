import { useState } from "react";
import { supabase } from "../client";
import { useNavigate, Link } from "react-router-dom";

function AddCreators() {
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setCreator({ ...creator, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("creators").insert([creator]);

    if (error) {
      console.error(error);
      alert("Error adding creator. Please try again.");
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <section className="fade-in">
      <form onSubmit={handleSubmit}>
        <h2>✨ Add New Creator</h2>

        <label>
          👤 Creator Name
          <input
            name="name"
            required
            onChange={handleChange}
            placeholder="Enter the creator's name"
            value={creator.name}
          />
        </label>

        <label>
          🔗 Channel URL
          <input
            name="url"
            type="url"
            required
            onChange={handleChange}
            placeholder="https://youtube.com/@creator"
            value={creator.url}
          />
        </label>

        <label>
          📝 Description
          <textarea
            name="description"
            required
            onChange={handleChange}
            placeholder="What makes this creator awesome? Tell us about their content, style, and why people should follow them!"
            value={creator.description}
          />
        </label>

        <label>
          🖼️ Profile Image URL (Optional)
          <input
            name="imageURL"
            type="url"
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            value={creator.imageURL}
          />
        </label>

        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          <button type="submit" disabled={loading}>
            {loading ? "🔄 Adding..." : "🚀 Add Creator"}
          </button>
          <Link to="/" role="button" className="secondary">
            ❌ Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

export default AddCreators;
