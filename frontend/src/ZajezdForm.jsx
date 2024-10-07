import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ZajezdForm = () => {
  const [nazev, setNazev] = useState('');
  const [popis, setPopis] = useState('');
  const [fotky, setFotky] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Načtení dat zájezdů pro úpravu
      fetch(`/zajezd/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setNazev(data.nazev);
          setPopis(data.popis);
          setFotky(data.fotky.map((fotka) => ({ ...fotka, file: null })) || []);
        })
        .catch((error) => console.error('Chyba při načítání zájezdu:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const zajezdData = { nazev, popis, fotky };

    if (id) {
      // Úprava zájezdu
      fetch(`/zajezd/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zajezdData),
      })
        .then((response) => {
          if (response.ok) {
            navigate('/home/spravce');
          } else {
            console.error('Chyba při úpravě zájezdu');
          }
        })
        .catch((error) => console.error('Chyba při úpravě zájezdu:', error));
    } else {
      // Vytvoření nového zájezdu
      fetch('/zajezd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zajezdData),
      })
        .then((response) => {
          if (response.ok) {
            navigate('/home/spravce');
          } else {
            console.error('Chyba při vytváření zájezdu');
          }
        })
        .catch((error) => console.error('Chyba při vytváření zájezdu:', error));
    }
  };

  const handleFotkyChange = (e) => {
    const files = Array.from(e.target.files);
    const fotkyData = files.map((file) => ({
      url: URL.createObjectURL(file),
      popis: '',
      file: file,
    }));
    setFotky((prevFotky) => prevFotky.concat(fotkyData));
  };

  const handleAddFotka = () => {
    document.getElementById('fotkyInput').click();
  };

  const handlePopisChange = (index, value) => {
    setFotky((prevFotky) =>
      prevFotky.map((fotka, i) =>
        i === index ? { ...fotka, popis: value } : fotka
      )
    );
  };

  return (
    <div>
      <h1>{id ? 'Upravit zájezd' : 'Vytvořit nový zájezd'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Název:</label>
          <input
            type="text"
            value={nazev}
            onChange={(e) => setNazev(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Popis:</label>
          <textarea
            value={popis}
            onChange={(e) => setPopis(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fotografie:</label>
          <input id="fotkyInput" type="file" multiple onChange={handleFotkyChange} style={{ display: 'none' }} />
          <button type="button" onClick={handleAddFotka}>Přidat fotky</button>
          <div className="fotogalerie">
            {fotky.map((fotka, index) => (
              <div key={index}>
                <img src={fotka.url} alt={fotka.popis} width="100" />
                <div>Popis fotky:{fotka.popis}</div>
                <input
                  type="text"
                  
                  value={fotka.popis}
                  onChange={(e) => handlePopisChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        </div>
        <button type="submit">{id ? 'Upravit' : 'Vytvořit'}</button>
      </form>
    </div>
  );
};

export default ZajezdForm;