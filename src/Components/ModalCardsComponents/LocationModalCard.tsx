import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ILocationItem } from "../../Apollo/Querys";

const LocationModalCard = (props: {
  cardInfo: ILocationItem;
  isOpen: boolean;
  closeModal: any;
}) => {
  const { cardInfo, isOpen, closeModal } = props;

  if (cardInfo === null) return <></>;
  let itemCount = 0;

  return (
    <div>
      <Modal size="sm" isOpen={isOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Location Info</ModalHeader>
        <ModalBody>
          <div className="card h-100">
            <div className="card-body">
              <h5>
                {cardInfo.id} - {cardInfo.name}
              </h5>
              <h6>Type: {cardInfo.type}</h6>
              <h6>Dimension: {cardInfo.dimension}</h6>
              <h6>First 5 residents:</h6>
              {cardInfo.residents.map((item) => {
                itemCount++;
                return itemCount <= 5 ? (
                  <li key={item.id}>{item.name}</li>
                ) : null;
              })}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LocationModalCard;
