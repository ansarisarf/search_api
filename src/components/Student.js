import React from 'react';
import { useState } from 'react';

const Student = () => {
  const [count, setCount] = useState(5);
  function inCrement() {
    setCount(count + 1);
    console.log('xxxxxxxxxxx');
  }
  function deCrement() {
    count > 0 ? setCount(count - 1) : setCount(0);
    console.log('xxxxxxxxxxx');
  }
  function handleChagen(event) {
    let data = event.target.value;

    for (let i = data; i > 0; i--) {
      let createtag = document.createElement('input');

      document.querySelector('body').appendChild(createtag);
      console.log(i);
      document.write('<br>');
      document.write('<br>');
    }
  }
  return (
    <div>
      <h1>My First Increment Decrement App</h1>
      <h3>{count}</h3>
      <input type="button" onClick={inCrement} value="Increment" />
      <input type="button" onClick={deCrement} value="Decrement" />
      <br></br> <br></br>
      <br></br>
      <input type="text" onChange={(event) => handleChagen(event)} />
      <br></br>
    </div>
  );
};

export default Student;
