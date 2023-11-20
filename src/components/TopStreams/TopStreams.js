import React, {useEffect, useState} from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';


function TopStreams(){

    const[channels, setChannels] = useState([])

    useEffect(() => {

        const fetchDataStream = async () => {
            const result = await api.get('https://api.twitch.tv/helix/streams')
            let dataArray = result.data.data
            let topStreams = dataArray.map(stream => {
                return stream.user_id
            })
            let tempUrl = ''
            for (let i=0; i<topStreams.length;i++) {
                tempUrl += `id=${topStreams[i]}&`
            }
            var userUrl = tempUrl.slice(0,tempUrl.length-1)


            const resultUsers = await api.get('https://api.twitch.tv/helix/users?'+userUrl)
            var dataArrayUsers = resultUsers.data.data
            let i = 0
            let finalArray = dataArray.map(stream => {
                stream.truepic = dataArrayUsers[i].profile_image_url
                let newUrl = stream.thumbnail_url
                .replace('{width}', "320")
                .replace('{height}', "180")
                stream.thumbnail_url = newUrl
                i += 1
                return stream
            })

            setChannels(finalArray)
        }

        fetchDataStream()
    }, [])

//http://localhost:3000/#access_token=u61osxv9f2i52hn8osgkovow33p4cj&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&token_type=bearer

    return (
        <div>
            <h1 className='titreGames'>Stream les plus populaires</h1>
            <div className="flexAccueil">
                {channels.map((channel, index) => (
                    <div key={index} className="carteStream">
                        <img src={channel.thumbnail_url} className="imgCarte"  alt="jeu" />
                        <div className="cardBodyStream">
                            <h5 className="titreCartesStream">{channel.user_name}</h5>
                            <p className="textStream">Jeu : {channel.gameName}</p>
                            <p className="txtStreamViewver">Viewers : {channel.viewer_count}</p>

                            <Link className='lien' to={{pathname:`/live/${channel.user_login}`}}>
                                <div className="btnCarte">Regarder {channel.user_name}</div>
                            </Link>

                        </div>


                    </div>



                ))}
            </div>
        </div>
        )

}


export default TopStreams