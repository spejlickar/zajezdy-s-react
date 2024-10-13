import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const API_URL = "http://localhost:8080/api";

const ZajezdIndex = () => {
  const [zajezdy, setZajezdy] = useState([]);

  useEffect(() => {
    // Načtení všech zájezdů z API (nebo z lokálního úložiště)
    fetch('api/zajezd')
      .then((response) => response.json())
      .then((data) => setZajezdy(data))
      .catch((error) => console.error('Chyba při načítání zájezdů:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Opravdu chcete tento zájezd smazat?')) {
      fetch(`api/zajezd/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setZajezdy(zajezdy.filter((zajezd) => zajezd.id !== id));
          } else {
            console.error('Chyba při mazání zájezdu');
          }
        })
        .catch((error) => console.error('Chyba při mazání zájezdu:', error));
    }
  };

  return (
    <div>
      <h1>Seznam zájezdů</h1>
      <table>
        <thead>
          <tr>
            <th>Název</th>
            <th>Popis</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {zajezdy.map((zajezd) => (
            <tr key={zajezd.id}>
              <td>{zajezd.nazev}</td>
              <td>{zajezd.popis}</td>
              <td>
                <Link to={`/uprav/${zajezd.id}`}>Upravit</Link>
                <button onClick={() => handleDelete(zajezd.id)}>Smazat</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ZajezdIndex;