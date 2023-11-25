import React, {useState, useEffect} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import { useParams } from 'react-router-dom'
import api from '../../api'

function Live() {

    let {slug} = useParams()
    console.log("slug :", slug)
    const [infoStream, setInfoStream] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`)
            if (result.data.data.length === 0) {
                setInfoStream(false)
            } else {
                setInfoStream(result.data.data[0])
            }
        }

        fetchData()
    }, [slug])

    return (
        infoStream ?
        <div className="containerDecale">
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
            <div className="contInfo">
                <div className="titreStream">{infoStream.title}</div>
                <div className="viewer">Viewers : {infoStream.viewer_count}</div>
                <div className="infoGame">Streamer : {infoStream.user_name}, &nbsp; Langue : {infoStream.language}</div>
                <div className="nomJeu">Jeu : {infoStream.game_name}</div>
            </div>
        </div>
        :
        <div className="containerDecale">
        <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
            <div className="contInfo">
                <div className="titreStream">Le streamer est offline !</div>
            </div>
        </div>

    )
}

export default Live