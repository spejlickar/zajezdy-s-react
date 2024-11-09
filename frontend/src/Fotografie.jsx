import React, { useEffect, useState } from 'react';


const Fotografie = ({ index, fotky, setFotky, zajezdId }) => {
    
    if (index !== undefined) { // useEffect se vytvoří jen pro fotografie (NE pro tlačítko "přidat fotografie")
        useEffect(() => { //vytvoření useEffect
            if ((fotky[index].id === undefined) ) { // v případě neuložené fotografie (id == undefined), tak jí rovnou uloží
                handleSave(); //uloží foto
            }
        }, [fotky[index].id]); //useEffect spouští změna id (případné přidání, změna pořadí fotek...)
    }
    
    const generateUniqueFileName = (extension) => { //generuje náhodné jméno souboru
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        return `file_${timestamp}_${randomString}.${extension}`;
    };

    const handleSave = async () => { //uloží fotografii do databáze na základě atributů file a tempPopis 
        //(url si vygeneru novy, pokud file NEexistuje, provede aktualizaci jen atributu popis)
        const formData = new FormData(); // příprava dat k poslání
        if (fotky[index]?.file) { //je vybrana nová fotka
            formData.append('file', fotky[index].file); // přiložení nové fotky
            fotky[index].url = "/fotogalerie/" + generateUniqueFileName(fotky[index].file.name.split('.').pop());  // vygenerování nové url
        }
        fotky[index].popis = fotky[index].tempPopis; //vložení nového popisu
        const { file, tempUrl, tempPopis, edit, ...cleanFotografie } = fotky[index]; //separace nežádoucích atributů co se nemají posílat
        formData.append('fotografie', JSON.stringify(cleanFotografie)); //přiložení objektu Fotografie bez nežádoucích atributů
        
        try {
            const response = await fetch(`/api/fotografie${fotky[index].id ? "/" + fotky[index].id : ""}`, {
                method: fotky[index].id ? "PUT" : "POST",
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                setFotky((prevFotky) => [...prevFotky.slice(0, index), result, ...prevFotky.slice(index + 1)]); //do pole dána uložená fotografie
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
        setFotky((prevFotky) => [...prevFotky.slice(0, i), ...prevFotky.slice(i + 1)]); //vymaže fotografii z pole fotky
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
        if (fotky[index]?.id) { //pokud existuje id fotografie (je uložená v databazi)
            setFotky(prevFotky => { //vymaz atributu "edit" z objektu fotky[index]
                const newFotky = [...prevFotky];
                const { edit, ...updatedFotka } = newFotky[index];
                newFotky[index] = updatedFotka;
                return newFotky;
              });
        } else {  //pokud NEexistuje id fotografie (NENÍ uložená v databazi)
            deleteItemFromFotky(index); //vymaže fotografie z pole
        }
    };

    const handleFotkyChange = (e) => {
        const files = e.target.files;
        if (files) { 
            if (index !== undefined) {   //klasická úprava fotky
                setFotky((prevFotky) => {
                    const updatedFotky = [...prevFotky];
                    updatedFotky[index] = {
                        ...updatedFotky[index],
                        file: files[0],
                        tempUrl: URL.createObjectURL(files[0]),
                        tempPopis: updatedFotky[index].popis
                    };
                    return updatedFotky;
                });
            } else { //přidání nových fotek
                setFotky((prevFotky) => [
                    ...Array.from(files).map((file) => ({id:undefined ,file, tempUrl: URL.createObjectURL(file), tempPopis: "", zajezd: { id: zajezdId } })),
                    ...prevFotky
                ]);
            }
        }
    };

    const CreateEditFoto = ({ url, text }) => { //komponenta pro změnu/přidání nových fotek (pokud je uvedený "url" fotky, tak vytvoří fotku s odkazem, jinak tlačítko s "text")
        const idInput = `fotkyInput${fotky[index]?.id ?? `${Date.now()}-${Math.random()}`}`;
        return (
          <div className="d-flex flex-column align-items-center">
            <input id={idInput} type="file" onChange={handleFotkyChange} className="form-control-file d-none" multiple />
            { (url === undefined) ? 
                <button type="button" className="btn btn-primary mt-2" onClick={() => { document.getElementById(idInput).click(); }} > {text} </button>
                :
                <a href="/" onClick={(e) => { e.preventDefault(); document.getElementById(idInput).click(); }}>
                    <img src={url} alt={text ?? ""} className="img-thumbnail mt-2" width="70" />
                </a>
            }
          </div>
        );
    };

    if (index === undefined) {  // není index, tak bude jen tlačítko pro přidání fotek
        return (<CreateEditFoto text="Přidej fotky" />);
    } 

    if ((fotky[index].id === undefined)) {  //čekání na uložení fotky do databáze
        return (<div className="text-center">Načítám...</div>);
    }

    if (fotky[index].edit !== undefined) { // pokud je povolen edit dojde k úpravě
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <h3 className="card-title">{fotky[index]?.id ? 'Upravit' : 'Vytvořit'}</h3>
                    <div className="form-group">
                        <CreateEditFoto url={fotky[index]?.tempUrl ?? fotky[index]?.url} text={fotky[index]?.tempPopis ?? fotky[index]?.popis} />
                        <label htmlFor={`popisFotky_${index}`} className="mt-3">Popis fotky:</label>
                        <input type="text" id={`popisFotky_${index}`}
                            className="form-control"
                            value={fotky[index]?.tempPopis ?? fotky[index]?.popis ?? ""}
                            onChange={(e) => {
                                const newPopis = e.target.value;
                                setFotky((prevFotky) => {
                                    const updatedFotky = [...prevFotky];
                                    updatedFotky[index] = {
                                        ...updatedFotky[index],
                                        tempPopis: newPopis
                                    };
                                    return updatedFotky;
                                });
                            }}
                            required
                         />
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button type="button" className="btn btn-success" onClick={handleSave}>Uložit</button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Storno</button>
                        {fotky[index]?.id && <button type="button" className="btn btn-danger" onClick={handleDelete}>Smazat</button>}
                    </div>
                </div>
            </div>
        );
    } else { // jen zobrazení fotografie
        return (
            <a href="/" onClick={(e) => { e.preventDefault(); setFotky((prevFotky) => {
                const updatedFotky = [...prevFotky];
                updatedFotky[index] = {
                    ...updatedFotky[index],
                    edit: true
                };
                return updatedFotky;
                }); }}>
                <div className="card mb-3">
                    <div className="card-body text-center">
                        <img src={fotky[index]?.url} alt={fotky[index]?.popis} className="img-fluid img-thumbnail mb-2" width="100" />
                        <div className="font-weight-bold">{fotky[index]?.popis}</div>
                    </div>
                </div>
            </a>
        );
    }
};

export default Fotografie;
