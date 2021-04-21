import { ILocationItem } from "../../Apollo/Querys";

const LocationCard = (props: {
  item: ILocationItem;
  openModalCard: Function;
}) => {
  const { item, openModalCard } = props;

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
          {item.dimension === "unknown" ? "Unknown Dimension" : item.dimension}
        </h6>
      </div>
    </div>
  );
};

export default LocationCard;
