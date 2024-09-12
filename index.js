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

// Get all students
app.get("/students", async (req, res) => {
	const collectionRef = collection(db, "Students");
	const collectionSnap = await getDocs(collectionRef)
	const docs = []
	collectionSnap.forEach((doc) => {
		docs.push(doc.data())
	})
	res.send(docs)
})

// Add a new student
app.post("/students", async (req, res) => {
	const studentRef = collection(db, "Students");
	const studentData = {
		firstName: "First",
		lastName: "Last",
		concentrations: [
			"Concentration One",
			"Concentration Two",
		],
		classYear: "2028",
	}
	try {
		await addDoc(studentRef, studentData)
	} catch (e) {
		console.error(e)
		res.send(500) // Error
	}
	res.send(200, "Succesfully Created Student")
})

function start() {
	app.listen(port, () => {
		console.log(`Started listening on http://localhost:${port}`)
	})
}

start()
