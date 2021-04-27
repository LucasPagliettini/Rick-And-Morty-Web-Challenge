import { IWelcomeInfoItem } from "../../Apollo/Querys";

const WelcomePageCharCard = (props: {
  item: IWelcomeInfoItem;
  openModalCard: Function;
}) => {
  const { item, openModalCard } = props;

  return (
    <div key={item.id} className="col my-3">
      <div className="card h-100">
        <img src={item.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {item.id} - {item.name}
          </h5>
          <h6>Location: {item.location.name}</h6>
          <h6>
            {item.location.dimension === "unknown"
              ? "Dimenction: Unknown"
              : item.location.dimension}
          </h6>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary m-2"
            onClick={() => openModalCard(item)}
          >
            Episodes with Participation
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePageCharCard;
