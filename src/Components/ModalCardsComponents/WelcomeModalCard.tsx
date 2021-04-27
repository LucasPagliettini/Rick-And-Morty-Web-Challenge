import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { IWelcomeInfoItem } from "../../Apollo/Querys";

const WelcomeModalCard = (props: {
  cardInfo: IWelcomeInfoItem;
  isOpen: boolean;
  closeModal: any;
}) => {
  const { cardInfo, isOpen, closeModal } = props;

  if (cardInfo === null) return <></>;
  else
    return (
      <div>
        <Modal size="md" isOpen={isOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>{cardInfo.name}</ModalHeader>
          <ModalBody>
            <h6>Episodes with participation:</h6>
            <div className="card-body">
              {cardInfo.episode.map((item) => (
                <li key={item.id} className="mx-4">
                  {item.name}
                </li>
              ))}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
};

export default WelcomeModalCard;
