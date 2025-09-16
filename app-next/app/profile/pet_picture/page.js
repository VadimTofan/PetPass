"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleSave = () => {
    if (newImageUrl.trim() !== "") {
      console.log("Saved image URL:", newImageUrl);
      setIsEditing(false);
      setNewImageUrl("");
    }
  };

  return (
    <div className="profile-card">
      {isEditing ? (
        <div className="edit-box">
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Paste image link here..."
            className="edit-input"
          />
          <div className="button-row">
            <button onClick={handleSave} className="btn btn-save">
              💾 Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-cancel"
            >
              ✖ Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)} className="btn btn-edit">
          ✏️ Edit Pet Picture
        </button>
      )}
    </div>
  );
}
