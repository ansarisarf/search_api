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

  let dataSearch = apidata.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });

  var imgPath = '/images/';
  var imgExt = '.jpg';

  return (
    <div>
      <h2 style={{ textAlign: 'cdnter' }}>Product Card</h2>
      <h2>Search</h2>
      <input
        type="text"
        value={filter}
        onChange={serachText.bind(this)}
        className="form-control mx-auto col-md-6 mb-3"
      />
      <div className="row">
        {dataSearch.map((playerName, index) => (
          <div className="col-md-3" key={index}>
            <div className="container">
              <div
                className="card"
                style={{
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                  maxWidth: '300px',
                  margin: 'auto',
                  height: '600px',
                  alignItems: 'center',
                  marginTop: '8px',
                }}
              >
                <img
                  className="card-img-top rounded-circle"
                  src={imgPath + playerName.Id + imgExt}
                  alt="Denim Jeans"
                  style={{ width: '100%', height: '300px' }}
                />
                <div className="card-body">
                  <h1 className="card-title">{playerName.PFName}</h1>
                  <h4 className="card-title">
                    Description : {playerName.SkillDesc}
                  </h4>
                  {playerName.UpComingMatchesList.map((upcoming) => (
                    <span>
                      {' '}
                      <p className="card-text">
                        Upcomig Matches:&nbsp;{upcoming.CCode} <b>VS</b>{' '}
                        {upcoming.VsCCode}
                        <br></br>
                        Match Time:&nbsp;
                        {dateFormat(
                          upcoming.MDate,
                          'GMT:dd-mm-yyyy h:mm:ss TT'
                        )}
                      </p>
                    </span>
                  ))}
                  <br></br>
                  <button className="btn btn-outline-dark btn-md">
                    {' '}
                    <span>$</span>
                    {playerName.Value}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
