import React, { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:3000/load', { method: 'POST' });
      const message = await response.text();
      setMessage(message);
    } catch (error) {
      console.error(error);
      setMessage('Error loading data!');
    }
  };

  const clearData = async () => {
    try {
      const response = await fetch('http://localhost:3000/clear', { method: 'POST' });
      const message = await response.text();
      setMessage(message);
      setData([]);
    } catch (error) {
      console.error(error);
      setMessage('Error clearing data!');
    }
  };

  const queryData = async () => {
    console.log(`Querying data with first name: ${firstName} and last name: ${lastName}`);
    try {
      const response = await fetch('http://localhost:3000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });
      const data = await response.json();
      setData(data);
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage('Error querying data!');
    }
  };


  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const renderData = () => {
    if (data.length === 0) {
      return <p>No data to display</p>;
    }

    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <p>Name: {item.name}</p>
            <p>Properties: {Object.entries(item.properties).map(([key, value]) => `${key}=${value}`).join(' ')}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <button onClick={loadData}>Load Data</button>
      <button onClick={clearData}>Clear Data</button>
      <div>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
      </div>
      <button onClick={queryData}>Query</button>
      {message && <p>{message}</p>}
      {renderData()}
    </div>
  );
}

export default App;
