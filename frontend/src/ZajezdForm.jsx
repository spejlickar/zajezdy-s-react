import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Fotografie from './Fotografie';


const ZajezdForm = () => {
  const [zajezd, setZajezd] = useState({ nazev: "", popis: "" });   // data zájezdu z backendu
  const [fotky, setFotky] = useState([]);   // data fotek z backendu
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) { // Načtení dat zájezdů pro úpravu
      setLoading(true);
      fetch(`/api/zajezd/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Chyba při načítání zájezdu');
          }
          return response.json();
        })
        .then((data) => {
          setZajezd(data);
          setFotky(data.fotky);
        })
        .catch((error) => console.error(error.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const debouncedHandleSubmit = useCallback(debounce(async (zajezdData) => {
    if (zajezdData.nazev === "") {
      alert("Zadej název zájezdu");
    } else {
      try {
        const response = await fetch(`/api/zajezd${id ? ("/" + id) : ""}`, {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(zajezdData), // Převod objektu na JSON
        });

        if (response.ok) {
          const result = await response.json();
          if (id) { //došlo jen k úpravě stávajícího zájezdu
            console.log(result);
            setZajezd(result);
          } else { //došlo k vytvoření nového zájezdu
            navigate(`/uprav/${result.id}`);
          }
        } else {
          alert("Chyba při ukládání zájezdu: " + response.status);
        }
      } catch (error) {
        console.error("Chyba:", error);
        alert("Nastala chyba při odesílání dat");
      }
    }
  }, 500), [id]);

  const Fotogalerie = () => {
    const rows = [];
    let row = [];
    fotky.forEach((fotka, index) => {
      row.push(<div className="col-lg-4 col-md-6 mb-4" key={`fotka-${fotka.id}-${index}`}>
                <div className="card">
                    <Fotografie key={`fotka-${fotky[index].id}`} index={index} fotky={fotky} setFotky={setFotky} />
                </div>
              </div>);
      if ((row.length >= 3) || (index >= (fotky.length - 1))) { //pokud je v řadě minimálně 3 col. nebo je konec pole
         rows.push(<div key={`fotogalerie-row-${index}`} className="row">{[...row]}</div>);
         row = [];
      }
    });
    return ( (rows.length !== 0) ? <div className="container mt-4">{rows}</div> : <div className="text-center">Nejsou žádné fotky</div> );
  }

  if (loading) {
    return <div className="text-center mt-5">Načítání...</div>;
  }

  if (!id) {
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Vytvořit nový zájezd</h1>
        <div className="card p-4">
          <div className="form-group mb-3">
            <label htmlFor="nazev">Název:</label>
            <input
              type="text"
              className="form-control"
              id="nazev"
              value={zajezd.nazev || ''}
              onChange={(e) => setZajezd({ ...zajezd, nazev: e.target.value })}
              required
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={() => debouncedHandleSubmit(zajezd)}>Vytvořit zájezd</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mt-5">
        <div className="card p-4 mb-4">
          <h1 className="text-center mb-4">Upravit Zájezd</h1>
          <div className="form-group mb-3">
            <label htmlFor="nazev">Název:</label>
            <input
              type="text"
              className="form-control"
              id="nazev"
              value={zajezd.nazev || ''}
              onChange={(e) => {
                setZajezd({ ...zajezd, nazev: e.target.value });
                debouncedHandleSubmit({ ...zajezd, nazev: e.target.value });
              }}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="popis">Popis zájezdu:</label>
            <textarea
              className="form-control"
              id="popis"
              value={zajezd.popis || ''}
              onChange={(e) => {
                setZajezd({ ...zajezd, popis: e.target.value });
                debouncedHandleSubmit({ ...zajezd, popis: e.target.value });
              }}
              required
            />
          </div>
        </div>
        <div>
          <div className="mb-4">
            <Fotografie key={`fotografie-${id}`} fotky={fotky} setFotky={setFotky} zajezdId={id} />
          </div>
          <Fotogalerie fotkyData={fotky} setFotkyData={setFotky} />
        </div>
      </div>
    );
  }
};

export default ZajezdForm;
