import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import dateFormat from 'dateformat';

export default function Callingapi() {
  const [apidata, setApiData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.npoint.io/20c1afef1661881ddc9c')
      .then((res) => {
        // console.log(res);
        var sortTeam = res.data.playerList;
        sortTeam.sort((a, b) => (a.Value > b.Value ? 1 : -1));
        console.log(sortTeam.Value);
        setApiData(sortTeam);
        // setTeamList(res.data.teamsList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = apidata.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(apidata);
    }
  };

  let imgPath = '/images/';
  let imgExt = '.jpg';
  return (
    <div>
      <h2 style={{ textAlign: 'cdnter', marginTop: '20px' }}>
        Football Player
      </h2>
      <input
        style={{ width: '400px' }}
        type="text"
        placeholder="Search...."
        onChange={(e) => searchItems(e.target.value)}
        className="form-control mx-auto col-md-6 mb-3"
      />
      <div className="row" style={{ backgroundColor: 'white' }}>
        {searchInput.length > 1
          ? filteredResults.map((item, index) => {
              return (
                <div className="col-md-3" key={index}>
                  <div className="container">
                    <div
                      className="card"
                      style={{
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                        margin: 'auto',
                        height: '650px',
                        alignItems: 'center',
                        marginTop: '8px',
                      }}
                    >
                      <img
                        className="card-img-top rounded-circle"
                        src={imgPath + item.Id + imgExt}
                        alt="Noimage"
                        style={{ width: '100%', height: '280px' }}
                      />
                      <div className="card-body">
                        <h1 className="card-title">{item.PFName}</h1>
                        <h4 className="card-title">
                          Description : {item.SkillDesc}
                        </h4>
                        {item.UpComingMatchesList.map((upcoming) => (
                          <span>
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
                          <span>$</span>
                          {item.Value}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : apidata.map((playerName, index) => {
              return (
                <div className="col-md-3 col-sm-6" key={index}>
                  <div className="container">
                    <div
                      className="card"
                      style={{
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                        margin: 'auto',
                        height: '600px',
                        alignItems: 'center',
                        marginTop: '8px',
                      }}
                    >
                      <img
                        className="card-img-top rounded-circle"
                        src={imgPath + playerName.Id + imgExt}
                        alt="Noimage"
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
                              <b>Upcomig Matches:</b>&nbsp;{upcoming.CCode}{' '}
                              <b>VS</b> {upcoming.VsCCode}
                              <br></br>
                              <b>Match Time:</b>&nbsp;
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
              );
            })}
      </div>
    </div>
  );
}
