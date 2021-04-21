import { Switch, Route } from "react-router-dom";

import CharacterCard from "../Cards/CharacterCard";
import EpisodeCard from "../Cards/EpisodeCard";
import LocationCard from "../Cards/LocationCard";
import WelcomePageCharCard from "../Cards/WelcomePageCharCard";

const Card = (props: { item: any; openModalCard: Function }) => {
  const { item, openModalCard } = props;

  return (
    <Switch>
      <Route path="/Characters">
        <CharacterCard item={item} openModalCard={openModalCard} />
      </Route>
      <Route path="/Locations">
        <LocationCard item={item} openModalCard={openModalCard} />
      </Route>
      <Route path="/Episodes">
        <EpisodeCard item={item} openModalCard={openModalCard} />
      </Route>
      <Route path="/">
        <WelcomePageCharCard item={item} openModalCard={openModalCard} />
      </Route>
    </Switch>
  );
};

export default Card;
