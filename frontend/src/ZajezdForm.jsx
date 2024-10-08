import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ZajezdForm = () => {
  const [nazev, setNazev] = useState('');
  const [popis, setPopis] = useState('');
  const [fotky, setFotky] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Načtení dat zájezdů pro úpravu
      fetch(`/zajezd/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Chyba při načítání zájezdu');
          }
          return response.json();
        })
        .then((data) => {
          setNazev(data.nazev);
          setPopis(data.popis);
          setFotky(data.fotky.map((fotka) => ({ ...fotka, file: null })) || []);
        })
        .catch((error) => console.error(error.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nazev', nazev);
    formData.append('popis', popis);
  
    fotky.forEach((fotka, index) => {
      if (fotka.file) {
        formData.append(`fotka_${index}`, fotka.file);
      }
      formData.append(`fotka_${index}_popis`, fotka.popis);
      formData.append(`fotka_${index}_url`, fotka.url);
    });
  
    const url = id ? `/zajezd/${id}` : '/zajezd';
    const method = id ? 'PUT' : 'POST';
  
    console.log('Odesílání zájezdu:', { method, url, formData });
  
    fetch(url, {
      method: method,
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          navigate('/home/spravce');
        } else {
          return response.json().then((data) => {
            console.error('Chyba při odesílání zájezdu', data);
          });
        }
      })
      .catch((error) => console.error('Chyba při odesílání zájezdu:', error));
  };

  const handleFotkyChange = (e) => {
    const files = Array.from(e.target.files);
    const fotkyData = files.map((file) => ({
      url: URL.createObjectURL(file),
      popis: '',
      file: file,
    }));
    setFotky((prevFotky) => prevFotky.concat(fotkyData));

    // Uvolnění URL při odstranění fotky
    return () => {
      fotkyData.forEach((fotka) => URL.revokeObjectURL(fotka.url));
    };
  };

  const handleAddFotka = () => {
    document.getElementById('fotkyInput').click();
  };

  const handlePopisChange = (index, value) => {
    setFotky((prevFotky) =>
      prevFotky.map((fotka, i) => (i === index ? { ...fotka, popis: value } : fotka))
    );
  };

  if (loading) {
    return <div>Načítání...</div>;
  }

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
          <textarea value={popis} onChange={(e) => setPopis(e.target.value)} required />
        </div>
        <div>
          <label>Fotografie:</label>
          <input
            id="fotkyInput"
            type="file"
            multiple
            onChange={handleFotkyChange}
            style={{ display: 'none' }}
          />
          <button type="button" onClick={handleAddFotka}>
            Přidat fotky
          </button>
          <div className="fotogalerie">
            {fotky.map((fotka, index) => (
              <div key={index}>
                <img src={fotka.url} alt={fotka.popis} width="100" />
                <div>Popis fotky:</div>
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