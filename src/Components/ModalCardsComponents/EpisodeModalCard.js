import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const EpisodeModalCard = (props) => {
  const { cardInfo, isOpen, closeModal } = props;

  if (cardInfo === null) return <></>;
  let itemCount = 0;

  return (
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
  );
};

export default EpisodeModalCard;
