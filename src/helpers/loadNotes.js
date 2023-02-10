import { collection, doc, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"


export const loadNotes = async ( uid = '') => {
    if( !uid) throw new Error ('El ui del usario no existe')

    const collectionRef =  collection( FirebaseDB, `${uid}/journal/notes` )

    const docs = await getDocs(collectionRef)
    
    const notas = []

    docs.forEach(doc => {
        notas.push({ id: doc.id, ...doc.data()})

    });
    return notas
}
