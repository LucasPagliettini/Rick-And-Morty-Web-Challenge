import React from "react";
import { Switch, Route } from "react-router-dom";

import CharacterCard from "../Cards/CharacterCard";
import EpisodeCard from "../Cards/EpisodeCard";
import LocationCard from "../Cards/LocationCard";
import WellcomePageCharCard from "../Cards/WellcomePageCharCard";

const Card = (props) => {
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
        <WellcomePageCharCard item={item} openModalCard={openModalCard} />
      </Route>
    </Switch>
  );
};

export default Card;
