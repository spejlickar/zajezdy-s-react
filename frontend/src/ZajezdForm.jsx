import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Fotografie from './Fotografie';

const ZajezdForm = () => {
  const defaultFotografie = { url: '', popis: '' };
  const [zajezd, setZajezd] = useState({});   // data zájezdu z backendu
  const [fotky, setFotky] = useState([]);   // data fotek z backendu
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Načtení dat zájezdů pro úpravu
      fetch(`/api/zajezd/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Chyba při načítání zájezdu');
          }
          return response.json();
        })
        .then((data) => {
          setZajezd(data);
        })
        .catch((error) => console.error(error.message))
        .finally(() => setLoading(false));
      //nacteni fotek
      fetch(`/api/fotografie/zajezd/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Chyba při načítání fotek');
          }
          return response.json();
        })
        .then((data) => {
          setFotky(data);
        })
        .catch((error) => console.error(error.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmitCreate = async (e) => {  // tlačítko k vytvoření nového zájezdu
    e.preventDefault(); // Zabránění výchozímu chování formuláře
    if (zajezd.nazev === "") {
      alert("Zadej název zájezdu");
    } else {
      try {
        const response = await fetch(`/api/zajezd`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(zajezd), // Převod objektu na JSON
        });

        if (response.ok) {
          const result = await response.json();
          navigate(`/uprav/${result.id}`);
        } else {
          alert("Chyba při ukládání zájezdu: " + response.status);
        }
      } catch (error) {
        console.error("Chyba:", error);
        alert("Nastala chyba při odesílání dat");
      }
    }
  };

  if (loading) {
    return <div>Načítání...</div>;
  }

  if (!id) {
    return (
      <div>
        <h1>Vytvořit nový zájezd</h1>
        <form onSubmit={handleSubmitCreate}>
          <div>
            <label>Název:</label>
            <input
              type="text"
              value={zajezd.nazev || ''}
              onChange={(e) => setZajezd({ ...zajezd, nazev: e.target.value })}
              required
            />
          </div>
          <button type="submit">Vytvořit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Upravit Zájezd</h1>
        <div>
          <label>Název:</label>
          <input
            type="text"
            value={zajezd.nazev || ''}
            onChange={(e) => setZajezd({ ...zajezd, nazev: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Popis:</label>
          <textarea value={zajezd.popis || ''} onChange={(e) => setZajezd({ ...zajezd, popis: e.target.value })} required />
        </div>
        <div>
          <h2>Fotografie:</h2>
          <div><h3>Přidat fotku:</h3><Fotografie zajezdId={id}/> </div>
          <div className="fotogalerie">
            {fotky.map((fotka, index) => (
              <div key={index}>
                <Fotografie fotografie={fotka || defaultFotografie} zajezdId={id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default ZajezdForm;
