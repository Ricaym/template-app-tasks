import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
const [tasks, setTasks] = useState([]);
const [taskId, setTaskId] = useState("");
const [singleTask, setSingleTask] = useState(null);
const [newTaskDescription, setNewTaskDescription] = useState("");
const [updateTaskId, setUpdateTaskId] = useState("");
const [updateTaskDescription, setUpdateTaskDescription] = useState("");

// Charger toutes les tâches au montage du composant
useEffect(() => {
	fetchTasks();
}, []);

const fetchTasks = async () => {
	const res = await axios.get("https://tasks-api-teyg.onrender.com/tasks");
	setTasks(res.data);
};

const fetchTaskById = async () => {
	try {
	const res = await axios.get(`https://tasks-api-teyg.onrender.com/task/${taskId}`);
	setSingleTask(res.data);
	} catch (err) {
	setSingleTask(null);
	alert("Tâche non trouvée");
	}
};

const addTask = async () => {
	await axios.post("https://tasks-api-teyg.onrender.com/tasks", {
	description: newTaskDescription,
	});
	setNewTaskDescription("");
	fetchTasks();
};

const updateTask = async () => {
	try {
	await axios.put(`https://tasks-api-teyg.onrender.com/task/${updateTaskId}`, {
		description: updateTaskDescription,
	});
	setUpdateTaskId("");
	setUpdateTaskDescription("");
	fetchTasks();
	} catch (err) {
	alert("Tâche non trouvée");
	}
};

const deleteTask = async (id) => {
	await axios.delete(`https://tasks-api-teyg.onrender.com/task/${id}`);
	fetchTasks();
};

return (
	<div className="App">
		<p className="title">API REST : Gestion des tâches</p>
		<div className="container">
			<div className="all-tasks">
				<p>Liste des tâches</p>
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>
							{task.description}{" "}
							<button onClick={() => deleteTask(task.id)}>Supprimer</button>
						</li>
					))}
				</ul>
			</div>

			<div className="separator">
				<div className="search-task">
					<p>Rechercher une tâche par ID : </p>
					<input placeholder="ID de la tâche" value={taskId} onChange={(e) => setTaskId(e.target.value)} />
					<button onClick={fetchTaskById}>Chercher</button>
					{singleTask && (<p>Tâche trouvée : {singleTask.description}</p>)}
				</div>

				<div className="add-task">
					<p>Ajouter une tâche : </p>
					<input placeholder="Description" value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} />
					<button onClick={addTask}>Ajouter</button>
				</div>

				<div className="update-task">
					<p>Mettre à jour une tâche : </p>
					<input placeholder="ID" value={updateTaskId} onChange={(e) => setUpdateTaskId(e.target.value)} />
					<input placeholder="Nouvelle description" value={updateTaskDescription} onChange={(e) => setUpdateTaskDescription(e.target.value)} />
					<button onClick={updateTask}>Mettre à jour</button>
				</div>
			</div>
		</div>
	</div>
);
}

export default App;
