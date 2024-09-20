import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()

import { db } from "./util/FirebaseInit.js";
import { collection, getDocs, addDoc, query, where, deleteDoc } from "firebase/firestore"

const app = express()
const port = 8080;

app.use(express.json())
app.use(
	cors({
		origin: "http://localhost:3000"
	})
)
app.use(bodyParser.urlencoded({ extended: false }))

// gets the guest count from the database
app.get("/guest", async (req, res) => {
	console.log("getting guest count")
	const collectionRef = collection(db, "Guest Database");
	const collectionSnap = await getDocs(collectionRef)
	res.send(collectionSnap.size.toString())
})

// posts a new guest to the database
app.post("/guest", async (req, res) => {
	console.log("adding a guest")
	const guestRef = collection(db, "Guest Database");
	const guestBody = req.body
	try {
		await addDoc(guestRef, guestBody)
	} catch (e) {
		console.error(e)
		res.status(500);
	}
	res.status(200).send("Succesfully added a guest.")
})

// removes a guest from the database
app.post("/remove_guest", async (req, res) => {
	console.log("removing a guest")
	const guestInfoRef = collection(db, "Guest Database");
	const phoneNumber = req.body.phoneNumber
	try { 
		const q = query(guestInfoRef, where("phoneNumber", "==", phoneNumber));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.data())
			deleteDoc(doc.ref);
		});
	} catch (e) {
		console.error(e)
		res.status(500);
	}
	res.status(200).send("Succesfully deregistered a guest.")
})

function start() {
	app.listen(port, () => {
		console.log(`Started listening on http://localhost:${port}`)
	})
}

start()
