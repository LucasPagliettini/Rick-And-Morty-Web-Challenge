import React from 'react'
import { Switch, Route } from "react-router-dom";

import CharacterModalCard from '../ModalCardsComponents/CharacterModalCard'
import EpisodeModalCard from '../ModalCardsComponents/EpisodeModalCard'
import LocationModalCard from '../ModalCardsComponents/LocationModalCard'
import WellcomeModalCard from '../ModalCardsComponents/WellcomeModalCard'

const ModalCard = (props) => {

    const {isOpen, closeModal, cardInfo} = props

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
          <WellcomeModalCard
            isOpen={isOpen}
            closeModal={closeModal}
            cardInfo={cardInfo}
          />
        </Route>
      </Switch>
    )
}

export default ModalCard
