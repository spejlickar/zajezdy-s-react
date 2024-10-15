import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const API_URL = "http://localhost:8080/api";

const EditFotografie = ({ editFotografie, setEditFotografie, showFotografie, zajezdId }) => {
    //const [editFotografie, setFotografie] = useState(editFotografie);  // upravovana fotka
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Zabránění výchozímu chování formuláře
        const formData = new FormData();   //příprava dat k poslání
        formData.append('file', editFotografie.file);   // fotka
        formData.append('zajezdId', zajezdId);   // id zajezdu
        formData.append('editFotografie', JSON.stringify({
            id: editFotografie.id,   // id fotky
            url: editFotografie.url,  //url fotky
            popis: editFotografie.popis   // popis fotky
        }));

        try {
            const response = await fetch(`${API_URL}/editFotografie${editFotografie.id ? "/" + editFotografie.id : ""}`, {
                method: editFotografie.id ? "PUT" : "POST",
                body: formData 
            });

            if (response.ok) {
                const result = await response.json();
                navigate(`/uprav/${zajezdId}`);
            } else {
                alert("Chyba při ukládání editFotografie: " + response.status);
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
                popis: editFotografie.popis,
                file: file,
            };
            setEditFotografie(fotkaData);
        }
    };

    let edit = false;

    if (editFotografie) { 
        // edit fotografie proběhne když (editFotografie.id == showFotografie.id) - uprava fota nebo když (editFotografie existuje ale bez id) - založení noveho fota
        edit = ((editFotografie.id)&&(showFotografie?.id == editFotografie.id)) || (!(editFotografie.id)); 
    } 

    if (edit) { // zobrazi fotku na upravu dle editFotografie
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>{editFotografie.id ? 'Upravit fotografii' : 'Vytvořit novou fotografii'}</h2>
                <input id="fotkyInput" type="file" onChange={handleFotkyChange} style={{ display: 'none' }} />
                <button type="button" onClick={ (e) => {document.getElementById('fotkyInput').click();} }>Vybrat jinou fotku</button>
                <div>
                    {editFotografie.url && <img src={editFotografie.url} alt={editFotografie.popis} width="100" />}
                    <div>Popis fotky:</div>
                    <input
                        type="text"
                        value={editFotografie.popis}
                        onChange={(e) => setEditFotografie({ ...editFotografie, popis: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Uložit</button>
            </form>
        </div>
    );
} else {
    if (showFotografie) { //jen zobrazi foto s popiskem a odkazem na upravu
    return (
        <div>
                <div>
                    <img src={showFotografie.url} alt={showFotografie.popis} width="100" />
                    <div>Popis fotky:{showFotografie.popis}</div>
                </div>
                <a href="/" onClick={(e) => { e.preventDefault(); setEditFotografie(showFotografie) }}>Upravit</a>  
        </div>
    );
} else { //pokud neni edit ani zobrazeni tak nedělá nic
    return null;
}
}
};

export default EditFotografie;