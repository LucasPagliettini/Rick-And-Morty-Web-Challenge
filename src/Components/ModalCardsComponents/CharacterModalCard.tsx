import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ICharacterItem } from "../../Apollo/Querys";

const CharacterModalCard = (props: {
  cardInfo: ICharacterItem;
  isOpen: boolean;
  closeModal: any;
}) => {
  const { cardInfo, isOpen, closeModal } = props;

  return (
    cardInfo && (
      <div>
        <Modal size="sm" isOpen={isOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>Character Info</ModalHeader>
          <ModalBody>
            <div className="card h-100">
              <img src={cardInfo.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">
                  {cardInfo.id} - {cardInfo.name}
                </h5>
                <h6>
                  Type: {cardInfo.type === "" ? "Not defined" : cardInfo.type}
                </h6>
                <h6>Gender: {cardInfo.gender}</h6>
                <h6>Species: {cardInfo.species}</h6>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  );
};

export default CharacterModalCard;
