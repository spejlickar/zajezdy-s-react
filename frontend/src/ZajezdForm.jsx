import React, { useState } from 'react';

const ZajezdForm = () => {
  const [nazev, setNazev] = useState('');
  const [popis, setPopis] = useState('');
  const [fotky, setFotky] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const zajezdData = { nazev, popis };

    // Odeslání zájezdu na server
    fetch('/zajezd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(zajezdData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Chyba při ukládání zájezdu');
        }
        return response.json();
      })
      .then(data => {
        const zajezdId = data.id;
        // Nahrání fotek
        if (fotky.length > 0) {
          const formData = new FormData();
          fotky.forEach(foto => {
            formData.append('files', foto);
          });
          fetch(`/zajezd/${zajezdId}/fotky`, {
            method: 'POST',
            body: formData
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Chyba při nahrávání fotek');
              }
              return response.json();
            })
            .then(() => {
              alert('Zájezd a fotky byly úspěšně uloženy.');
            })
            .catch(error => {
              console.error(error);
              alert(error.message);
            });
        } else {
          alert('Zájezd byl úspěšně uložen.');
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  };

  const handleFileChange = (e) => {
    setFotky(Array.from(e.target.files));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Název:</label>
        <input type="text" value={nazev} onChange={(e) => setNazev(e.target.value)} required />
      </div>
      <div>
        <label>Popis:</label>
        <textarea value={popis} onChange={(e) => setPopis(e.target.value)} />
      </div>
      <div>
        <label>Fotografie:</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <button type="submit">Uložit zájezd</button>
    </form>
  );
};

export default ZajezdForm;