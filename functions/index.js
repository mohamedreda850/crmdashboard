const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();
// Ignore undefined values in document data
db.settings({ ignoreUndefinedProperties: true });

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

/** ========== 1. Authentication / Login ========== **/
// This endpoint generates a custom token for an existing user.
// Note: Password verification is not done here. Typically, the client should use
// signInWithEmailAndPassword() and send the ID token to your backend if needed.
app.post("/login", async (req, res) => {
  const { email, password } = req.body; // Note: password not verified here.
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    // Include additional claims (e.g., email) in the custom token.
    const additionalClaims = { email: userRecord.email };
    const customToken = await admin
      .auth()
      .createCustomToken(userRecord.uid, additionalClaims);

    res.status(200).json({ token: customToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(400).json({ error: error.message });
  }
});

/** ========== 2. Deals Management ========== **/
// Fields: roomImage (optional), streetAddress, city, state, zipCode,
//         roomArea, numberOfPeople, appointmentDate, specialInstructions, price, progress

// Create a deal
app.post("/deals", async (req, res) => {
  const {
    roomImage,
    streetAddress,
    city,
    state,
    zipCode,
    roomArea,
    numberOfPeople,
    appointmentDate,
    specialInstructions,
    price,
    progress,
  } = req.body;

  // Validate required fields (roomImage is optional)
  if (
    !streetAddress ||
    !city ||
    !state ||
    !zipCode ||
    roomArea === undefined ||
    numberOfPeople === undefined ||
    !appointmentDate ||
    !specialInstructions ||
    price === undefined ||
    !progress
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const docRef = await db.collection("deals").add({
      roomImage: roomImage || null,
      streetAddress,
      city,
      state,
      zipCode,
      roomArea,
      numberOfPeople,
      appointmentDate,
      specialInstructions,
      price,
      progress,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(500).json({ error: "Failed to create deal" });
  }
});

// Edit a deal
app.put("/deals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("deals").doc(id).update(req.body);
    res.status(200).json({ message: "Deal updated" });
  } catch (error) {
    console.error("Error updating deal:", error);
    res.status(500).json({ error: "Failed to update deal" });
  }
});

// Retrieve a deal by ID
app.get("/deals/:id", async (req, res) => {
  try {
    const doc = await db.collection("deals").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Deal not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching deal:", error);
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all deals
app.get("/deals", async (req, res) => {
  try {
    const snapshot = await db.collection("deals").get();
    const deals = [];
    snapshot.forEach((doc) => {
      deals.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ error: error.message });
  }
});

/** ========== 3. Customers Management ========== **/
// Fields: avatar, firstName, lastName, email, phone, streetAddress, city, state, zipCode

// Create a customer
app.post("/customers", async (req, res) => {
  const {
    avatar,
    firstName,
    lastName,
    email,
    phone,
    streetAddress,
    city,
    state,
    zipCode,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !streetAddress ||
    !city ||
    !state ||
    !zipCode
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const docRef = await db.collection("customers").add({
      avatar: avatar || null,
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      city,
      state,
      zipCode,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: error.message });
  }
});

// Edit a customer
app.put("/customers/:id", async (req, res) => {
  try {
    await db.collection("customers").doc(req.params.id).update(req.body);
    res.status(200).json({ message: "Customer updated" });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a customer by ID
app.get("/customers/:id", async (req, res) => {
  try {
    const doc = await db.collection("customers").doc(req.params.id).get();
    if (!doc.exists)
      return res.status(404).json({ error: "Customer not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all customers
app.get("/customers", async (req, res) => {
  try {
    const snapshot = await db.collection("customers").get();
    const customers = [];
    snapshot.forEach((doc) => {
      customers.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: error.message });
  }
});

/** ========== 4. Tasks Management ========== **/
// Fields: task, dueDate

// Create a task
app.post("/tasks", async (req, res) => {
  const { task, dueDate } = req.body;

  if (!task || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const docRef = await db.collection("tasks").add({
      task,
      dueDate,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Edit a task
app.put("/tasks/:id", async (req, res) => {
  try {
    await db.collection("tasks").doc(req.params.id).update(req.body);
    res.status(200).json({ message: "Task updated" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Retrieve a task by ID
app.get("/tasks/:id", async (req, res) => {
  try {
    const doc = await db.collection("tasks").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all tasks
app.get("/tasks", async (req, res) => {
  try {
    const snapshot = await db.collection("tasks").get();
    const tasks = [];
    snapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }
});

/** ========== Start API on Firebase Functions ========== **/
exports.api = functions.https.onRequest(app);
