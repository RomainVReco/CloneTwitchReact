import React, { useState, useEffect } from 'react'
import api from '../../api'
import {Link, useParams} from 'react-router-dom'

function Resultats() {

    let {slug} = useParams()
    const [result, setResult] = useState(true)
    const [streamerInfo, setStreamerInfo] = useState([])
    let cleanSearch = slug.replace(/ /g,'')

    useEffect (() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`)
            console.log(result)

            setStreamerInfo(result.data.data)
        }
        fetchData()
    },[])

    return (
        <div>
            <div className="containerDecaleResultats">
                <h4>Résultats de recherche : </h4>

                {streamerInfo.map((stream, index) => {
                    <div key={index} className="carteResultats">
                        <img src={stream.profile_image_url} alt="resultat profile" className="imgCarte" />
                        <div className="cardBodyResults">
                            <h5 className="titreCartesStream">{stream.display_name}</h5>
                            <div className="txtResult">
                                {stream.description}
                            </div>
                            <Link className='lien' to={{pathname:`/live/${stream.user_name}`}}>
                                <div className="btnCarte btnResult">Regarder {stream.display_name}</div>
                            </Link>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Resultats