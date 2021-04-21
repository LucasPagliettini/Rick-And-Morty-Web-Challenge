import { ICharacterItem } from "../../Apollo/Querys";

const CharacterCard = (props: {
  item: ICharacterItem;
  openModalCard: Function;
}) => {
  const { item, openModalCard } = props;

  return (
    <div key={item.id} className="col my-3">
      <div
        className="card h-100"
        style={{ cursor: "pointer" }}
        onClick={() => openModalCard(item)}
      >
        <img src={item.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {item.id} - {item.name}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
