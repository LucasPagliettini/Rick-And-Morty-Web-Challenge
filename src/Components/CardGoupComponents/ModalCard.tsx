import { Switch, Route } from "react-router-dom";

import CharacterModalCard from "../ModalCardsComponents/CharacterModalCard";
import EpisodeModalCard from "../ModalCardsComponents/EpisodeModalCard";
import LocationModalCard from "../ModalCardsComponents/LocationModalCard";
import WelcomeModalCard from "../ModalCardsComponents/WelcomeModalCard";

const ModalCard = (props: {
  isOpen: boolean;
  closeModal: Function;
  cardInfo: any;
}) => {
  const { isOpen, closeModal, cardInfo } = props;

  return (
    <Switch>
      <Route path="/Characters">
        <CharacterModalCard
          isOpen={isOpen}
          closeModal={closeModal}
          cardInfo={cardInfo}
        />
      </Route>
      <Route path="/Locations">
        <LocationModalCard
          isOpen={isOpen}
          closeModal={closeModal}
          cardInfo={cardInfo}
        />
      </Route>
      <Route path="/Episodes">
        <EpisodeModalCard
          isOpen={isOpen}
          closeModal={closeModal}
          cardInfo={cardInfo}
        />
      </Route>
      <Route path="/">
        <WelcomeModalCard
          isOpen={isOpen}
          closeModal={closeModal}
          cardInfo={cardInfo}
        />
      </Route>
    </Switch>
  );
};

export default ModalCard;
