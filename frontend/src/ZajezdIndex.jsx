import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ZajezdIndex = () => {
  const [zajezdy, setZajezdy] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Načtení všech zájezdů z API (nebo z lokálního úložiště)
    fetch('/api/zajezd')
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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Seznam zájezdů</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Název</th>
            <th scope="col">Popis</th>
            <th scope="col">Akce</th>
          </tr>
        </thead>
        <tbody>
          {zajezdy.map((zajezd) => (
            <tr key={zajezd.id}>
              <td>{zajezd.nazev}</td>
              <td>{zajezd.popis.length > 50 ? `${zajezd.popis.substring(0, 50)}...` : zajezd.popis}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => navigate(`/uprav/${zajezd.id}`)}>Upravit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(zajezd.id)}>Smazat</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ZajezdIndex;
