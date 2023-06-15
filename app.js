// Importa el módulo firebase-admin
const admin = require('firebase-admin');

// Configura las credenciales de Firebase desde el archivo de servicio descargado
const serviceAccount = require('./ruta/a/tu/archivo-de-credenciales.json');

// Inicializa la aplicación de Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Obtiene una instancia de Firestore
const db = admin.firestore();

// Ejemplo: Crea un documento en una colección
const exampleCollection = db.collection('nombre_de_la_coleccion');
const exampleDocument = exampleCollection.doc('nombre_del_documento');

exampleDocument.set({
  campo1: 'valor1',
  campo2: 'valor2'
})
.then(() => {
  console.log('Documento creado exitosamente');
})
.catch((error) => {
  console.error('Error al crear el documento: ', error);
});