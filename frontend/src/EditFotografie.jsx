import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const API_URL = "http://localhost:8080/api";

const EditFotografie = ({ editFotografie, zajezdId }) => {
    const [fotografie, setFotografie] = useState(editFotografie);  // upravovana fotka
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Zabránění výchozímu chování formuláře
        const formData = new FormData();   //příprava dat k poslání
        formData.append('file', fotografie.file);   // fotka
        formData.append('zajezdId', zajezdId);   // id zajezdu
        formData.append('fotografie', JSON.stringify({
            id: fotografie.id,   // id fotky
            url: fotografie.url,  //url fotky
            popis: fotografie.popis   // popis fotky
        }));

        try {
            const response = await fetch(`${API_URL}/fotografie${fotografie.id ? "/" + fotografie.id : ""}`, {
                method: fotografie.id ? "PUT" : "POST",
                body: formData // Posíláme formData, ne JSON
            });

            if (response.ok) {
                const result = await response.json();
                navigate(`/uprav/${zajezdId}`);
            } else {
                alert("Chyba při ukládání fotografie: " + response.status);
            }
        } catch (error) {
            console.error("Chyba:", error);
            alert("Nastala chyba při odesílání dat");
        }
    };

    const handleFotkyChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fotkaData = {
                url: URL.createObjectURL(file),
                popis: fotografie.popis,
                file: file,
            };
            setFotografie(fotkaData);
        }
    };

    const handleAddFotka = () => {
        document.getElementById('fotkyInput').click();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>{fotografie.id ? 'Upravit fotografii' : 'Vytvořit novou fotografii'}</h2>
                <input id="fotkyInput" type="file" onChange={handleFotkyChange} style={{ display: 'none' }} />
                <button type="button" onClick={handleAddFotka}>Vybrat jinou fotku</button>
                <div>
                    {fotografie.url && <img src={fotografie.url} alt={fotografie.popis} width="100" />}
                    <div>Popis fotky:</div>
                    <input
                        type="text"
                        value={fotografie.popis}
                        onChange={(e) => setFotografie({ ...fotografie, popis: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Uložit</button>
            </form>
        </div>
    );
};

export default EditFotografie;