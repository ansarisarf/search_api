import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import dateFormat from 'dateformat';

export default function Callingapi() {
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
    <div className="container">
      <h3 className="pb-3 mb-4 font-italic border-bottom">Card Styles</h3>
      <div className="row">
        <h2>Search</h2>
        <input
          type="text"
          value={filter}
          onChange={serachText.bind(this)}
          className="form-control mx-auto col-md-6 mb-3"
        />
        {dataSearch.map((playerName, index) => (
          <div className="col-md-6 " key={index}>
            <div className="card flex-md-row mb-4 shadow-sm h-md-250">
              <div className="card-body d-flex flex-column align-items-start">
                <strong className="d-inline-block mb-2 text-primary">
                  Player Name: {playerName.PFName}
                </strong>
                <div className="mb-0 text-dark small">
                  <strong className="d-inline-block mb-2 text-primary">
                    Upcomig Matches:
                  </strong>
                  {playerName.UpComingMatchesList.map((upcoming) => (
                    <span className="mb-0 mr-2 text-dark small">
                      <b>
                        {upcoming.CCode} <b>VS</b> {upcoming.VsCCode}
                      </b>
                      <strong className="d-inline-block mb-2 text-primary">
                        Match Time :
                        {dateFormat(
                          upcoming.MDate,
                          'GMT:dd-mm-yyyy h:mm:ss TT'
                        )}
                      </strong>
                    </span>
                  ))}
                </div>
                <strong className="card-text mb-auto">
                  Description : {playerName.SkillDesc}
                </strong>
                <button className="btn btn-outline-primary btn-sm">
                  Value: <span>$</span>
                  {playerName.Value}
                </button>
              </div>

              <img
                className="card-img-right flex-auto d-none d-lg-block"
                alt="Thumbnail [200x250]"
                src={imgPath + playerName.Id + imgExt}
                style={{ width: '200px', height: '200px' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
