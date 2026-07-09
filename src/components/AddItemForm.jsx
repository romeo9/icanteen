import React, { useState } from 'react';
import { db } from '../db'
import { supabase } from '../utils/supabase';

export function AddItemForm() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    async function saveItem() {
        // Mandatory fields name and image
        if (!name) {//|| !image) {
            alert("Nome e Foto sono obbligatori per tracciare l'oggetto!");
            return;
        }

        setLoading(true); // button loading is active on DaisyUI

        try {
            // Compress photo (from 5MB to ~200KB)
            //const compressedBlob = await compressImage(image);
            
            const newItem = {
                name: name,
                location: location,
                description: description,
                imageBlob: image, //compressedBlob,
                isSynced: false,
                createdAt: new Date().toISOString()
            };

            // Check internet connection
            const isOnline = navigator.onLine;

            if (!isOnline) {
                // OFFLINE, save locally on indexedDB
                await db.items.add(newItem);
                alert("Nessun segnale in cantina! Oggetto salvato localmente sul telefono. Si sincronizzerà quando torni a casa. 🟡");
            } else {
                // ONLINE, load photo on supabase bucket
                // TODO: salve on supabase
                uploadImage(newItem)
                alert("Oggetto salvato sul Cloud e sul dispositivo con successo! 🟢");
            }

            // Empty form
            setName('');
            setLocation('');
            setDescription('');
            setImage(null);

        } catch (error) {
            console.error("Errore durante il salvataggio:", error);
            alert("Si è verificato un errore durante il salvataggio dell'oggetto.");
        } finally {
            setLoading(false); // stop loading
        }
    }

    async function uploadImage(item) {
        const file = item.imageBlob;
        const fileName = `${item.id}-FilenameTest`;

        const { data, error } = await supabase.storage
            .from("images")
            .upload(fileName, file);

        if (error) {
            console.error("Upload error:", error);
            return;
        }
        console.log("Upload completato:", data);
    }


    return (
        <div className="card bg-base-300 card-bordered grid place-items-center">
            <form className='fieldset'>
                <fieldset className="fieldset form-control">
                    <label className="label font-semibold text-sm">Nome Oggetto *</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} 
                    className="input validator input-bordered w-full" placeholder="es. Gomme Invernali"  required />
                    <p className="validator-hint hidden">Required</p>
                </fieldset>

                <fieldset className="form-control">
                <label className="label font-semibold text-sm">Posizione / Scaffale</label>
                <input 
                    type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="es. Scaffale B, Alto" 
                    className="input input-bordered w-full"
                />
                </fieldset>

                <div className="form-control">
                <label className="label font-semibold text-sm">Note</label>
                <textarea 
                    value={description} onChange={e => setDescription(e.target.value)} placeholder="Dettagli..." rows="2"
                    className="textarea textarea-bordered w-full"
                />
                </div>

                <div className="form-control">
                <label className="label font-semibold text-sm">Scatta Foto *</label>
                <input 
                    type="file" accept="image/*" capture="environment" onChange={e => setImage(e.target.files)} required 
                    className="file-input file-input-bordered file-input-primary w-full"
                />
                </div>

                <button type="submit" className="btn btn-primary w-full mt-2" onClick={saveItem}>
                    Salva nel Telefono
                </button>
            </form>
        </div>
    )
}