import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// = { url: '', popis: '' }
const Fotografie = ({fotografie, addFotografies, deleteFotografie}) => {
    const [editFotografie, setEditFotografie] = useState(fotografie.url?{...fotografie, tempUrl:fotografie.url}:fotografie);  // upravovana fotka
    const [edit, setEdit] = useState(false);  // dochazi k uprave
    const fotografieDir = "fotografie";

    const generateUniqueFileName = (extension) => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        return `file_${timestamp}_${randomString}.${extension}`;
    }

    const handleSave = async () => {
        const formData = new FormData(); // příprava dat k poslání
        if (editFotografie.file) { //je vybrana nová fotka
            formData.append('file', editFotografie.file); // přiložení nové fotky
            editFotografie.url = "/fotogalerie/" + generateUniqueFileName(editFotografie.file.name.split('.').pop());  // vygenerování nové url
        }
        const {file, temUrl,...cleanFotografie} = editFotografie; //separace nežádoucích atributů co se nemají posílat
        formData.append('fotografie', JSON.stringify(cleanFotografie));
        /*formData.append('fotografie', JSON.stringify({
            id: editFotografie.id ? editFotografie.id : undefined, // id fotky
            url: editFotografie.url, // url fotky
            popis: editFotografie.popis, // popis fotky
            zajezd: {id:zajezdId}
        }));*/
        console.log(formData)
        try {
            const response = await fetch(`/api/fotografie${editFotografie.id ? "/" + encodeURIComponent(editFotografie.id) : ""}`, {
                method: editFotografie.id ? "PUT" : "POST",
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result)
                setEdit(false);
                setEditFotografie(result);
                /*if (editFotografie.id){ // došlo jen k úpravě
                    setEdit(false);
                    setEditFotografie(result);
                } else {  //došlo k vytvoření nové fotografii
                    setEditFotografie({ zajezd: { id: editFotografie.zajezd.id }});
                    addFotografie(result);
                }*/
                
                
                //navigate(`/uprav/${zajezdId}`);
            } else if (response.status === 404) {
                alert("Chyba: Server nenašel požadovanou cestu. Zkontrolujte URL.");
            } else {
                alert("Chyba při ukládání editFotografie: " + response.status);
            }
        } catch (error) {
            console.error("Chyba:", error);
            alert("Nastala chyba při odesílání dat");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/fotografie/${editFotografie.id}`, { method: "DELETE" });
            if (response.ok) {
                
                deleteFotografie(editFotografie);
            } else if (response.status === 404) {
                alert("Chyba: Server nenašel požadovanou cestu. Zkontrolujte URL.");
            } else {
                alert("Chyba při ukládání editFotografie: " + response.status);
            }
        } catch (error) {
            console.error("Chyba:", error);
            alert("Nastala chyba při odesílání dat");
        }
    };

    const handleFotkyChange = (e) => {
        const files = e.target.files;
        if (files) { 
            if (editFotografie.popis) {   //klasická uprava fotky
                setEditFotografie({...editFotografie, file: files[0], tempUrl: URL.createObjectURL(files[0])});
            } else { //přidání nových fotek
                addFotografies(files.map((item) => ({...item, tempUrl: URL.createObjectURL(item), popis:""})));
            }
             
        }
    };
    const CreateEditFoto = ({ textButton }) => {
        const idInput = "fotkyInput" + (editFotografie?.id ?? `${Date.now()}-${Math.random()}`);
        return (
          <div>
            <input id={idInput} type="file" onChange={handleFotkyChange} style={{ display: 'none' }} />
            <button type="button" onClick={() => { document.getElementById(idInput).click(); }} > {textButton} </button>
          </div>
        );
      };
    

    if (!(editFotografie.popis)) {  // není vytvořený kompletně celý objekt, tak bude jen tlačítko pro přidání fotek
        return (<CreateEditFoto textButton="Přidej fotky" />)
    }

    if (edit || !(editFotografie.id)) { // pokud je povolen edit nebo editFotografie není vytvořená dojde k upravě a případnému vytvoření 
        return (
            <div>
                <div>
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
                    <button type="button" onClick={handleSave}>Uložit</button>
                    <button type="button" onClick={() => setEdit(false)}>Storno</button>
                    {editFotografie.id && <button type="button" onClick={handleDelete}>Smazat</button>}
                </div>
            </div>
        );
    } else { // jen zobrazení fotografie
        return (
            <div>
                <div>
                    <img src={editFotografie.url} alt={editFotografie.popis} width="100" />
                    
                    <div>Popis fotky:{editFotografie.popis}</div>
                </div>
                <a href="/" onClick={(e) => { e.preventDefault(); setEdit(true) }}>Upravit</a>
            </div>
        );

    }
};

export default Fotografie;
