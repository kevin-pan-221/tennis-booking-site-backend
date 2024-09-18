import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()

import { db } from "./util/FirebaseInit.js";
import { collection, getDocs, addDoc } from "firebase/firestore"

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

/*
// Get all students
app.get("/students", async (req, res) => {
	console.log("getting all students")
	const collectionRef = collection(db, "Students");
	const collectionSnap = await getDocs(collectionRef)
	const docs = []
	collectionSnap.forEach((doc) => {
		docs.push(doc.data())
	})
	res.send(docs)
})
*/

// Get guest count
app.get("/guest", async (req, res) => {
	console.log("getting guest count")
	const collectionRef = collection(db, "Guest Database");
	const collectionSnap = await getDocs(collectionRef)
	// const docs = []
	// collectionSnap.forEach((doc) => {
        // 		docs.push(doc.data())
	// })
	res.send(collectionSnap.size.toString())
})

// Add a new guest
app.post("/guest", async (req, res) => {
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

function start() {
	app.listen(port, () => {
		console.log(`Started listening on http://localhost:${port}`)
	})
}

start()
