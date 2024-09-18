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

// Create a route at http://localhost:8080/testRoute. You can try it with your browser!
app.get("/", async (req, res) => {
	res.send("Hello World!");
});


// Get guest count
app.get("/guest", async (req, res) => {
	console.log("getting guest count")
	const collectionRef = collection(db, "Guest Database");
	const collectionSnap = await getDocs(collectionRef)
	res.send(collectionSnap.size.toString())
})

// Add a new guest
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

// Deregister guest
app.post("/remove_guest", async (req, res) => {
	console.log("removing a guest")
	const guestInfoRef = collection(db, "Guest Database");
	const phoneNumber = req.body.phoneNumber
	try {   // Create a query to find the document(s)
		const q = query(guestInfoRef, where("phoneNumber", "==", phoneNumber));

		// Get the matching documents
		const querySnapshot = await getDocs(q);

		// Loop through the documents and delete them
		querySnapshot.forEach((doc) => {
			console.log(doc.data())
			// doc.ref.delete();
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
