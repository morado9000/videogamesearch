import React, {useContext} from "react";

import { GameContext } from "./contexts/GameContext";


const GameCard = ({game}, props) => {

    const { gameInfo } = useContext(GameContext)
    return (
        <>
            <>
                game.name;
                game.genres
                game.platforms
                game.summarys
            </>
        </>
    )
}