import { db } from '@/utils/firebase';
import { doc, getDoc } from '@firebase/firestore';

// Funktion zum Abrufen von Daten aus Firestore
const fetchDataFromFirestore = async (collectionName, documentId) => {
    try {
        // Erstellen Sie eine Referenz zum gewünschten Dokument
        const docRef = doc(db, collectionName, documentId);
        
        // Daten aus Firestore abrufen
        const docSnapshot = await getDoc(docRef);
        
        // Überprüfen Sie, ob das Dokument existiert
        if (docSnapshot.exists()) {
            // Daten zurückgeben
            return docSnapshot.data();
        } else {
            console.log("Dokument existiert nicht!");
            return null;
        }
    } catch (error) {
        console.error("Fehler beim Abrufen von Daten aus Firestore:", error);
        return null;
    }
};

export default fetchDataFromFirestore;
