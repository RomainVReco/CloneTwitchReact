import React, {useState, useEffect} from "react";
import api from '../../api';


function Games() {

    const[games, setGames] = useState([])

    useEffect(() => {
            const fetchData = async () => {
              const result = await api.get('https://api.twitch.tv/helix/games/top')
              console.log(result)
           
              }
            fetchData();
    }, [])

  return (
      <div>
          <h1 className="titreGames">Jeux les plus populaires</h1>
          <div className="flexaccueil">


          </div>

      </div>
  )

  }

export default Games;