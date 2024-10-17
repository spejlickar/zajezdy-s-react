import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const API_URL = "http://localhost:8080/api";
//komponenty:
import Fotografie from './Fotografie';


const ZajezdForm = () => {
  const [zajezd, setZajezd] = useState({});   // data zájezdu z backendu
  //const [popis, setPopis] = useState('');
  const [fotky, setFotky] = useState([]);   // data fotek z backendu
  //const [editFotografie, setEditFotografie] = useState({});  //upravovana fotografie
  //const [idEdit,setIdEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [file, setFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Načtení dat zájezdů pro úpravu
      fetch(`${API_URL}/zajezd/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Chyba při načítání zájezdu');
          }
          return response.json();
        })
        .then((data) => {
          setZajezd(data);
          //setPopis(data.popis);
        })
        .catch((error) => console.error(error.message))
        .finally(() => setLoading(false));
      //nacteni fotek
      fetch(`${API_URL}/fotografie/zajezd/${id}`)
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

  const handleSubmitCreate = async (e) => {  //tlačítko k vytvoření nového zájezdu
    e.preventDefault(); // Zabránění výchozímu chování formuláře
    if (nazev === "") {
      alert("Zadej název zájezd");
    } else {
      try {
        const response = await fetch(`${API_URL}/zajezd`, {
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
              value={zajezd.nazev}
              onChange={(e) => setZajezd({ nazev: e.target.value, popis: "", fotky: [] })}
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
            value={zajezd.nazev}
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
          <div><h3>Pridat fotku:</h3><Fotografie zajezdId={id}/> </div>
          <div className="fotogalerie">
            {fotky.map((fotka, index) => (
              <div key={index}>
                <Fotografie fotografie={fotka} zajezdId={id}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default ZajezdForm;