import React, { useState, useEffect } from 'react';

const GameContext = React.createContext("games");

const GameProvider = (props) => {
    const [gameInfo, setGameInfo] = useState({});
    const [gameName, setGameName] = useState("");
    const [gameGenres, setGameGenres] = useState([]);
    const [gamePlatforms, setGamePlatforms] = useState([]);
    const [gameSummary, setGameSummary] = useState("");

    const getGame = async (search) => {
        const res = await fetch(
            "https://calm-ravine-68008.herokuapp.com/https://api.igdb.com/v4/games", {
              method: "POST", 
              headers:{ 'Client-ID':'lih3ve08wly9ns7w1ksj04w2uq80uc', 'Authorization':'Bearer xqc3hd7t1rsta107dn9f3n4myicuzb' }, 
              body: 'search "' + search + '"; fields *; limit 50;'
            }
          )
        const json  = await res.json();
        setGameName(json[0].name);
        setGameSummary(json[0].summary);
        await getGenres(json[0])
        .then(ret => setGameGenres(ret))
        await getPlatforms(json[0])
        .then(ret => setGamePlatforms(ret))

    }

    const getGenres = async (game) => {
        console.log(game.genres);
        let gen = [];
        if(game.genres){
            for (let i=0; i<game.genres.length; i++) {          
                await fetch(
                  "https://calm-ravine-68008.herokuapp.com/https://api.igdb.com/v4/genres", {
                    method: "POST", 
                    headers:{ 'Client-ID':'lih3ve08wly9ns7w1ksj04w2uq80uc', 'Authorization':'Bearer xqc3hd7t1rsta107dn9f3n4myicuzb' }, 
                    body: 'fields name; where id = ' + game.genres[i] + ';'
                  }
                )
                .then(res => res.json())
                .then(json => gen.push(json[0].name))
            }
        }
        return gen;
    }

    const getPlatforms = async (game) => {
      console.log(game.platforms)
      let plat = [];
      if(game.platforms){
          for (let i=0; i<game.platforms.length; i++) {          
              await fetch(
                "https://calm-ravine-68008.herokuapp.com/https://api.igdb.com/v4/platforms", {
                  method: "POST", 
                  headers:{ 'Client-ID':'lih3ve08wly9ns7w1ksj04w2uq80uc', 'Authorization':'Bearer xqc3hd7t1rsta107dn9f3n4myicuzb' }, 
                  body: 'fields name; where id = ' + game.platforms[i] + ';'
                }
              )
              .then(res => res.json())
              .then(json => plat.push(json[0].name))
          }
      }
      return plat;
  }

   useEffect(() => {
      console.log(gameName, gameGenres, gamePlatforms)
        if(gamePlatforms == [] || gameName == gameInfo.name)
          console.log("empty")
        else
        setGameInfo({
          name: gameName,
          genres: gameGenres,
          platforms: gamePlatforms
        })
      
   }, [gamePlatforms])
  
    
    return (
        <GameContext.Provider value={{gameInfo, getGame}} >
            {props.children}
        </GameContext.Provider>
    )
}

export {GameContext, GameProvider}