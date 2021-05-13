import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { IEpisodeItem } from "../../Apollo/Querys";

const EpisodeModalCard = (props: {
  cardInfo: IEpisodeItem;
  isOpen: boolean;
  closeModal: any;
}) => {
  const { cardInfo, isOpen, closeModal } = props;
  let itemCount = 0;

  return (
    cardInfo && (
      <div>
        <Modal size="sm" isOpen={isOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>Episode Info</ModalHeader>
          <ModalBody>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {cardInfo.id} - {cardInfo.name}
                </h5>
                <h6>Released date: {cardInfo.created}</h6>
                <h6>Episode code: {cardInfo.episode}</h6>
                <h6>First 5 characters:</h6>
                {cardInfo.characters.map((char) => {
                  itemCount++;
                  return itemCount <= 5 ? (
                    <li key={char.id}>
                      {char.id} {char.name}
                    </li>
                  ) : null;
                })}
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  );
};

export default EpisodeModalCard;
