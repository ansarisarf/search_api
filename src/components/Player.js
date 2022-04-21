import React from 'react';
// import '../Myapp.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import dateFormat from 'dateformat';
export default function Player() {
  const [apidata, setApiData] = useState([]);
  const [apiteamList, setTeamList] = useState([]);

  const [filter, setFilter] = useState('');

  const serachText = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios
      .get('https://api.npoint.io/20c1afef1661881ddc9c')
      .then((res) => {
        // console.log(res);
        var sortTeam = res.data.playerList;
        sortTeam.sort((a, b) => (a.Value > b.Value ? 1 : -1));
        console.log(sortTeam.Value);

        setApiData(sortTeam);
        setTeamList(res.data.teamsList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  var imgPath = '/images/';
  var imgExt = '.jpg';

  return (
    <div>
      <h3>Player List</h3>
      {apidata.map((item, index) => {
        return(
          <ul className="ul-cards row" key={index}>
            <li className='accentLi1 col-md-4'>
              <div className="icon">
                <img className="card-img-top rounded-circle"
                        src={imgPath + item.Id + imgExt}
                        alt="Denim Jeans"
                      /></div>
              <div className="title">{item.PFName}</div>
              <div className="content"><b>Value: </b><span className='text-danger'>$</span>{item.Value}<br/><b>Description: </b>{item.SkillDesc}<br/>
              {item.UpComingMatchesList.map((upcoming) => (
                (upcoming.CCode === '') ?
                          <span></span>
                          :<div>
                             <b>Upcomig Matches:</b> <span className='badge badge-primary'>{upcoming.CCode}</span> <b>Vs </b>
                              <span className='badge badge-secondary'>{upcoming.VsCCode}</span> 
                              <br></br>
                              <b>Match Time: </b>
                              <span className = 'badge badge-info' > {
                                  dateFormat(
                                upcoming.MDate,
                                'GMT:dd-mm-yyyy h:mm:ss TT'
                              )}</span>
                          </div>
                        ))}
                {/* <p>Value: {item.PFName}</p> */}
              </div>
            </li>
          </ul>
        )     
      })}
      
    </div>
  );
}
