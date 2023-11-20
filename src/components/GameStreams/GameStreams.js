import React, {useState, useEffect} from 'react'
import api from '../../api'
import {useLocation, useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'

function GameStreams() {

    let {slug} = useParams()
    let location = useLocation()
    console.log("location : ", location)
    console.log("location : ", location.state.idGame)
    const [streamData, setStreamData] = useState([])
    const [viewers, setViewers] = useState(0)

    useEffect (() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.idGame}`)
            let dataArray = result.data.data
            let finalArray = dataArray.map(stream => {
                let newUrl = stream.thumbnail_url
                .replace('{width}', "320")
                .replace('{height}', "180")
                stream.thumbnail_url = newUrl
                return stream
            })

            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count
            }, 0)
            
            setViewers(totalViewers)
            setStreamData(finalArray)
        }
        
        fetchData()

    }, [])


    return (
        <div>
            <h1 className="titreGamesStreams">Streams : {slug}</h1>
            <h3 className="sousTitreGameStreams">
                <strong className="texteColored">{viewers}</strong> personnes regardent {slug}
            </h3>

            <div className="flexAccueil">
                {streamData.map((stream, index) => (
                    <div key={index} className="carteGameStreams">

                        <img src={stream.thumbnail_url} alt="jeu carte img" className="imgCarte" />
                        <div className="cardBodyGameStreams">
                            <h5 className="titreCartesStream">{stream.user_name}</h5>
                            <p className="txtStream">Nombre de viewers : {stream.viewer_count}</p>
                            
                            <Link className="lien" to={{pathname:`/live/${stream.login}`}} >

                            <div className="btnCarte">Regarder {stream.user_name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )


}

export default GameStreams