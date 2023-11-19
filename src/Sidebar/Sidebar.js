import React, { useEffect, useState } from 'react';
import api from '../api';

function Sidebar() {

    const[topStreams, setTopStreams] = useState([])

    useEffect(() => {

        const fetchDataStream = async () => {
            const result = await api.get('https://api.twitch.tv/helix/streams?first=10')
            console.log("API Top Streams : "+ result)
            let dataArray = result.data.data
            console.log("Typeof dataArray : " +typeof(dataArray))
            let topTenStreams = dataArray.map(stream => {
                return stream.user_id
            })
            let tempUrl = ''
            for (let i=0; i<topTenStreams.length;i++) {
                tempUrl += `id=${topTenStreams[i]}&`
            }
            var userUrl = tempUrl.slice(0,tempUrl.length-1)
            setTopStreams(dataArray)

            var dataArrayUsers
            const fetchDataUser = async () => {
                const resultUsers = await api.get('https://api.twitch.tv/helix/users?'+userUrl)
                console.log("API User : "+ resultUsers)
                dataArrayUsers = resultUsers.data.data
            }

            dataArray.forEach(element => {
                if (element.user_id == dataArrayUsers.id){
                    element.truepic = dataArrayUsers.profile_image_url
                }
                
            });
        }

        fetchDataStream()
    }, [])

//http://localhost:3000/#access_token=u61osxv9f2i52hn8osgkovow33p4cj&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&token_type=bearer

    return (
        <div className="sidebar">
            <h2 className="titreSidebar">Chaînes recommandées</h2>
            <ul className="listeStream">
                {topStreams.map((stream, index)=>(
                     <li className="containerFlexSidebar">
                        <img src={stream.truepic} alt="" className="profilePicRonde" />
                        <div className="streamUser">{stream.user_name}</div>
                        <div className="viewerRight">
                            <div className="pointRouge"></div>
                            <div>{stream.viewer_count}</div>
                        </div>
                        <div className="gameNameSidebar">{stream.game_name}</div>
                     </li>
                )
                )}
            </ul>
        </div>
    )
}

export default Sidebar;