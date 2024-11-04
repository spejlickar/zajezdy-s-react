import React, { useEffect, useState } from 'react';

const Fotografie = ({ index, fotky, setFotky, zajezdId }) => {
    const [edit, setEdit] = useState(false);  // stav fotografie upravovana/NEuprovaná (výchozí stav NEuprovaná)

    const generateUniqueFileName = (extension) => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        return `file_${timestamp}_${randomString}.${extension}`;
    };

    const handleSave = async () => {
        const formData = new FormData(); // příprava dat k poslání
        if (fotky[index].file) { //je vybrana nová fotka
            formData.append('file', fotky[index].file); // přiložení nové fotky
            fotky[index].url = "/fotogalerie/" + generateUniqueFileName(fotky[index].file.name.split('.').pop());  // vygenerování nové url
        }
        fotky[index].popis = fotky[index].tempPopis; //vložení nového popisu
        const { file, tempUrl, tempPopis, ...cleanFotografie } = fotky[index]; //separace nežádoucích atributů co se nemají posílat
        formData.append('fotografie', JSON.stringify(cleanFotografie)); //přiložení objektu Fotografie bez nežádoucích atributů
        
        try {
            const response = await fetch(`/api/fotografie${fotky[index].id ? "/" + fotky[index].id : ""}`, {
                method: fotky[index].id ? "PUT" : "POST",
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                setEdit(false); // stav bez editace
                setFotky([...fotky.slice(0, index), result, ...fotky.slice(index + 1)]); //do pole dána uložená fotografie
            } else if (response.status === 404) {
                alert("Chyba: Server nenašel požadovanou cestu. Zkontrolujte URL.");
            } else {
                alert("Chyba při ukládání fotografie: " + response.status);
            }
        } catch (error) {
            console.error("Chyba:", error);
            alert("Nastala chyba při odesílání dat");
        }
    };

    const deleteItemFromFotky = (i) => {  
        setFotky([...fotky.slice(0, i), ...fotky.slice(i + 1)]); //vymaže fotografii z pole fotky
    };

    const handleDelete = async () => { //vymaže fotografii z databaze a pak i z pole (fotografie má id - jinak nikdy nedojde k této události)
        const confirmed = window.confirm("Opravdu chcete smazat tuto fotografii?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/api/fotografie/${fotky[index].id}`, { method: "DELETE" });
            if (response.ok) {
                deleteItemFromFotky(index); //vymaže fotografie z pole
            } else if (response.status === 404) {
                alert("Chyba: Server nenašel požadovanou cestu. Zkontrolujte URL.");
            } else {
                alert("Chyba při ukládání fotografie: " + response.status);
            }
        } catch (error) {
            console.error("Chyba:", error);
            alert("Nastala chyba při odesílání dat");
        }
    };

    const handleCancel = () => {  //stornování úpravy fotky
        if (fotky[index].id) { //pokud existuje id fotografie (je uložená v databazi)
            setEdit(false);  //jen změna stavu fotografie na NEeditovaná
        } else {  //pokud NEexistuje id fotografie (NENÍ uložená v databazi)
            deleteItemFromFotky(index); //vymaže fotografie z pole
        }
    };

    const handleFotkyChange = (e) => {
        const files = e.target.files;
        if (files) { 
            if (index !== undefined) {   //klasická úprava fotky
                const updatedFotky = [...fotky];
                updatedFotky[index] = {
                    ...updatedFotky[index],
                    file: files[0],
                    tempUrl: URL.createObjectURL(files[0]),
                    tempPopis: updatedFotky[index].popis
                };
                setFotky(updatedFotky);
            } else { //přidání nových fotek
                setFotky([...Array.from(files).map((file) => ({ file, tempUrl: URL.createObjectURL(file), tempPopis: "", zajezd: { id: zajezdId } })), ...fotky]);
            }
        }
    };

    const CreateEditFoto = ({ textButton }) => {
        const idInput = `fotkyInput${fotky[index]?.id ?? `${Date.now()}-${Math.random()}`}`;
        return (
          <div>
            <input id={idInput} type="file" onChange={handleFotkyChange} style={{ display: 'none' }} multiple />
            <button type="button" onClick={() => { document.getElementById(idInput).click(); }} > {textButton} </button>
          </div>
        );
    };

    if (index === undefined) {  // není index, tak bude jen tlačítko pro přidání fotek
        return (<CreateEditFoto textButton="Přidej fotky" />);
    }

    if (edit || !(fotky[index].id)) { // pokud je povolen edit nebo fotografie není vytvořená dojde k úpravě a případnému vytvoření 
        return (
            <div style={{ display: 'flex' }}>
                <div>
                    <h3>{fotky[index].id ? 'Upravit' : 'Vytvořit'}</h3>
                    
                    <div>
                        <img src={fotky[index].tempUrl ?? fotky[index].url} alt={fotky[index].tempPopis ?? fotky[index].popis ?? ""} width="70" />
                        <div>Popis fotky:</div>
                        <input
                            type="text"
                            value={fotky[index].tempPopis ?? fotky[index].popis ?? ""}
                            onChange={(e) => {
                                const updatedFotky = [...fotky];
                                updatedFotky[index].tempPopis = e.target.value;
                                setFotky(updatedFotky);
                            }}
                            required
                         />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                    <CreateEditFoto textButton="Vybrat fotku" />
                    <button type="button" onClick={handleSave}>Uložit</button>
                    <button type="button" onClick={handleCancel}>Storno</button>
                    {fotky[index].id && <button type="button" onClick={handleDelete}>Smazat</button>}
                </div>
            </div>
        );
    } else { // jen zobrazení fotografie
        return (
            <div>
                <div>
                    <a href="/" onClick={(e) => { e.preventDefault(); setEdit(true); }}>
                        <img src={fotky[index].url} alt={fotky[index].popis} width="100" />
                    </a>
                    <div>Popis fotky: {fotky[index].popis}</div>
                </div>
            </div>
        );
    }
};

export default Fotografie;
