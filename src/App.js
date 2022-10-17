import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { GameEntry, GameGenre, GameRelease, GamesContainer, GamesH1, GamesListContainer, GameSystem, GameTitle } from './styled/StyledHomePage';
import { GameContext } from "./contexts/GameContext";

function App() {

  const [gameList, setGameList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const {gameInfo, getGame} = useContext(GameContext);

  function onSearchChange(e){
    setSearchTerm(e.target.value);
  }

  function searchList(e){
    e.preventDefault();
    setIsLoading(true);
    setGameList([])
    const getList = async () => {
      
      //const res = await fetch("https://id.twitch.tv/oauth2/token?client_id=lih3ve08wly9ns7w1ksj04w2uq80uc&client_secret=g1btbinicvodif4cubzpjj5lzzvjnn&grant_type=client_credentials", {method: "POST"});
      const res = await fetch(
        "https://calm-ravine-68008.herokuapp.com/https://api.igdb.com/v4/games", {
          method: "POST", 
          headers:{ 'Client-ID':'lih3ve08wly9ns7w1ksj04w2uq80uc', 'Authorization':'Bearer xqc3hd7t1rsta107dn9f3n4myicuzb' }, 
          body: 'search "' + searchTerm + '"; fields *; limit 50;'
        }
      )
      const json = await res.json();
      for(let i=0; i<json.length; i++){
          await getGame(json[i].name);
      }
    }
    getList();
  }

  useEffect(() => {
    setIsLoading(true);
    const getList = async () => {
      await getGame("Persona")
    }
    getList()
  }, [])

  useEffect(() => {
    console.log(gameInfo)
    const getList = async () => {
      if(gameInfo.platforms.length > 0)
      {  
        let temp = [...gameList]
        temp.push(gameInfo);
        setGameList([...temp])
        setIsLoading(false);
      }
    }
    getList()

  }, [gameInfo])

  

  return (
    <>
      <GamesContainer>
      { isLoading ?
        <GamesH1>Loading</GamesH1>
         :
         <>
          <GamesH1>This is a test</GamesH1>
          <h2>Search</h2>
          <form onSubmit={searchList}>
              <input type="text" onChange={onSearchChange} />
              <button type="submit">Search</button>
          </form>
          <GamesListContainer>
              {gameList.map(game => 
                <>
                  <GameEntry>
                    <GameTitle>{game.name}</GameTitle>
                    {game.genres ?
                      <GameGenre>{game.genres[0]}</GameGenre>
                     : <GameGenre>N/A</GameGenre>}
                    {game.platforms ?
                      <GameSystem>{game.platforms[0]}</GameSystem>
                     : <GameSystem>N/A</GameSystem>}
                  </GameEntry>
                  <br />
                </>
              )}
              
          </GamesListContainer>
        </>
        
      }
      </GamesContainer>
    </>
  );
}

export default App;
