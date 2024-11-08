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

  if (loading) {
    return <div>Načítání...</div>;
  }

  if (!id) {
    return (
      <div>
        <h1>Vytvořit nový zájezd</h1>
        <div>
          <div>
            <label>Název:</label>
            <input
              type="text"
              value={zajezd.nazev || ''}
              onChange={(e) => setZajezd({ ...zajezd, nazev: e.target.value })}
              required
            />
          </div>
          <button type="button" onClick={() => debouncedHandleSubmit(zajezd)}>Vytvořit zájezd</button>
        </div>
      </div>
    );
  } else {
    //let fotogalerie = [];
   //let fotogalerieRow = [];
    //<div className="container mt-4">{fotogalerie}</div>
    //fotky.forEach((fotka, index) => {
      //fotogalerieRow.push(<div className="col-lg-4 col-md-6 mb-4" key={`fotka-${fotka.id}-${index}`}>
                     //       <div className="card">
                     //         <Fotografie index={index} fotky={fotky} setFotky={setFotky} zajezdId={id} />
                      //      </div>
                      //    </div>);
      //if ((fotogalerieRow.length >= 3) || (index >= (fotky.length - 1))) {
     //   fotogalerie.push(<div key={`fotogalerie-row-${index}`} className="row">{[...fotogalerieRow]}</div>);
     //   fotogalerieRow = [];
     // }
   // });

    return (
      <div>
        <div>
          <h1>Upravit Zájezd</h1>
          <div>
            <label>Název:</label>
            <input
              type="text"
              value={zajezd.nazev || ''}
              onChange={(e) => {
                setZajezd({ ...zajezd, nazev: e.target.value });
                debouncedHandleSubmit({ ...zajezd, nazev: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <label>Popis zájezdu:</label>
            <textarea
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
          <div><h3>Fotografie</h3><Fotografie fotky={fotky} setFotky={setFotky} zajezdId={id}/> </div>
         <div>
         {fotky.map((fotka, i) => (
              <Fotografie key={`fotka-${fotka.id}-${i}`} index={i} fotky={fotky} setFotky={setFotky} zajezdId={id} />
            ))}
        
          </div>
        </div>
      </div>
    );
  }
};

export default ZajezdForm;
