const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var express=require('express');
var app=express();
var nodemailer=require('nodemailer');
const cors = require("cors");


const {google} =require('googleapis');
app.use(cors());



app.use(express.urlencoded({extended:false}));
app.use(express.json());

const firebaseConfig = {
    apiKey: "AIzaSyDmbw6thX59gb1_epaRamNW9F7pzye08E0",
    authDomain: "basepelis-1170.firebaseapp.com",
    projectId: "basepelis-1170",
    storageBucket: "basepelis-1170.appspot.com",
    messagingSenderId: "1013459864022",
    appId: "1:1013459864022:web:2d81ad35190d50cfebbc77",
    measurementId: "G-7HCJCN0133"
};

const serviceAccount = require('./basepelis-1170-bcd17c60f792.json');

initializeApp({
    credential: cert(serviceAccount)
});

app.get('/',(req,res)=>{
    console.log('firus');

})

app.post('/send-email',(req,res)=>{
    console.log(req.body);

    const {email}=req.body;
    
    const Client_id="1075497400848-a6drq67p82i98sub0g9q189fmotniiva.apps.googleusercontent.com";
    const Client_secret="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";
    const rediret_uri="https://developers.google.com/oauthplayground";
    const resfresh_token="1//04TCUCJlP7enhCgYIARAAGAQSNwF-L9IrbXnwgQdLhc28JY8qws-NXs8lkqhSrpR8ibbuzDxmjIkp1Qj1ds9VZFt0FB_RPDac-Hg";


    const oAuth2=new google.auth.OAuth2(Client_id,Client_secret,rediret_uri);

    oAuth2.setCredentials({refresh_token:resfresh_token});

    async function sendMail(){
        try {
            const accessToken=await oAuth2.getAccessToken();
            const transporter=nodemailer.createTransport(
                {
                    service:"gmail",
                    auth:{
                        type:"OAuth2",
                        user:"frankunsc@gmail.com",
                        clientId:Client_id,
                        clientSecret:Client_secret,
                        refreshToken:resfresh_token,
                        accessToken:accessToken,

                    },
                     
                }
            );
            const mailOptions={
                from:"Peliculiando",
                to:email,
                subject:"Peliculiando: Reservación de película.",
                text: "Su reservación ha sido realizada con éxito."
            };
            const result =await transporter.sendMail(mailOptions);
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }

    }
sendMail()
.then((result)=>{
    ///console.log('firus feliz'+result)
    
})
.catch((err)=>{
    console.log('balto triste '+err)
}

)

});

app.post('/send-comment',(req,res)=>{
    console.log(req.body);

    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

    const {email,message,tipo}=req.body;
    
    const Client_id="1075497400848-a6drq67p82i98sub0g9q189fmotniiva.apps.googleusercontent.com";
    const Client_secret="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";
    const rediret_uri="https://developers.google.com/oauthplayground";
    const resfresh_token="1//04D1JFRTLEslaCgYIARAAGAQSNwF-L9IrkCDCHkXTidKFCqv8tVQck2FaDi1K7502cKPvSciUgjGkUMUjaSvsEJUzNGT2aSPZNTs";


    const oAuth2=new google.auth.OAuth2(Client_id,Client_secret,rediret_uri);

    oAuth2.setCredentials({refresh_token:resfresh_token});

    async function sendMessage(){
        try {
            const accessToken=await oAuth2.getAccessToken();
            const transporter=nodemailer.createTransport(
                {
                    service:"gmail",
                    auth:{
                        //type:"OAuth2",
                        user:"frankunsc@gmail.com",
                        /*clientId:Client_id,
                        clientSecret:Client_secret,
                        refreshToken:resfresh_token,
                        accessToken:accessToken,*/
                        pass:'bdwficvxwskgmzyp',

                    },
                     
                }
            );
            const mailOptions={
                from:"Peliculiando",
                to:'frankunsc@gmail.com',
                subject:"Comentario de usuario: "+email,
                text: 'Tipo: '+tipo+'. Mensaje: '+message
            };
            const result =await transporter.sendMail(mailOptions);
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }

    }
sendMessage()
.then((result)=>{
    ///console.log('firus feliz'+result)
    
})
.catch((err)=>{
    console.log('balto triste '+err)
}

)

});

app.listen(3000,()=>{
    console.log('firus');
});

//PARTE RUTAS
app.get("/ayuda", (req, res) => {

    // const db = firebase.firestore();
    const db = getFirestore();

    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

    db.collection('1170').get()
        .then((snapshot) => {

            // res.send({peli: snapshot[Math.floor(snapshot.size * Math.random())]})

            // console.log(snapshot.data[2]);

            let arr = [];


            snapshot.forEach((doc) => {
                arr.push(doc.data())
            });
            // res.send({peli: arr[Math.floor(5 * Math.random())].Numero}).status(200)

            res.json(arr[Math.floor(5 * Math.random())].Numero)

            console.log(arr); 
        })
        .catch((error) => {
            console.log('Error getting documents:', error);
            res.json(243606)
        });
});
