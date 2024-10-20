import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Fotografie = ({ fotografie, zajezdId }) => {
    const [editFotografie, setEditFotografie] = useState({  url:fotografie.url,
                                                            tempUrl:fotografie.url,
                                                            popis:fotografie.popis});  // upravovana fotka
    const [edit, setEdit] = useState(false);  // dochazi k uprave
    const navigate = useNavigate();
    const fotografieDir = "uploads";

    const generateUniqueFileName = (extension) => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        return `file_${timestamp}_${randomString}.${extension}`;
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Zabránění výchozímu chování formuláře
        const formData = new FormData();   //příprava dat k poslání
        formData.append('file', editFotografie.file);   // fotka
        formData.append('zajezdId', zajezdId);   // id zajezdu
        formData.append('fotografie', JSON.stringify({
            id: editFotografie.id ? editFotografie.id : undefined,   // id fotky
            url: editFotografie.url,  //url fotky
            popis: editFotografie.popis   // popis fotky
        }));

        try {
            const response = await fetch(`/api/fotografie${editFotografie.id ? "/" + encodeURIComponent(editFotografie.id) : ""}`, {
                method: editFotografie.id ? "PUT" : "POST",
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                setEdit(false);
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
                url: "/" + fotografieDir + "/" + generateUniqueFileName(file.name.split('.').pop()),
                tempUrl: URL.createObjectURL(file),
                popis: editFotografie ? editFotografie.popis : "",
                file: file,
            };
            setEditFotografie(fotkaData);
        }
    };

    const CreateEditFoto = ({ textButton }) => {
        return (<div>
            <input id="fotkyInput" type="file" onChange={handleFotkyChange} style={{ display: 'none' }} />
            <button type="button" onClick={(e) => { document.getElementById('fotkyInput').click(); }}>{textButton}</button>
        </div>)
    };

    if (!editFotografie) {  // není fotka na upravu
        return (<CreateEditFoto textButton="Přidej fotku" />)
    }

    if (edit || !(editFotografie.id)) { // pokud je povolen edit nebo editFotografie není vytvořená dojde k upravě a případnému vytvoření 
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>{editFotografie.id ? 'Upravit fotografii' : 'Vytvořit novou fotografii'}</h2>
                    <CreateEditFoto textButton="Vybrat jinou fotku" />
                    <div>
                        <img src={editFotografie.tempUrl} alt={editFotografie.popis} width="70" />
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
    } else { // jen zobrazení fotografie
        return (
            <div>
                <div>
                    <img src={fotografie.url} alt={fotografie.popis} width="100" />
                    <div>Popis fotky:{fotografie.popis}</div>
                </div>
                <a href="/" onClick={(e) => { e.preventDefault(); setEdit(true) }}>Upravit</a>
            </div>
        );

    }
};

export default Fotografie;
