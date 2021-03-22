import React from "react";

const EpisodeCard = (prop) => {
  const { item, openModalCard } = prop;

  return (
    <div key={item.id} className="col my-3">
      <div
        className="card h-100 "
        style={{ cursor: "pointer" }}
        onClick={() => openModalCard(item)}
      >
        <div className="card-body">
          <h5 className="card-title text-center">{item.name}</h5>
        </div>
        <h6 className="mx-3">
          {item.episode === "unknown"
            ? "Unknown Dimension"
            : "Episode code: " + item.episode}
        </h6>
      </div>
    </div>
  );
};

export default EpisodeCard;
