import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Halo from "./components/halo";
import Hai from "./components/Hai";
import Calculator from "./components/Calculator";

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");

	const greet = async () => {
		try {
			const res = await invoke("greet", { name });
			setGreetMsg(res);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="container">
			<h1 className="mt-10">Welcome to Tauri!</h1>

			<form
				className="row mt-5"
				onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}
			>
				<input id="greet-input" onChange={(e) => setName(e.currentTarget.value)} placeholder="Enter a name..." />
				<button type="submit">Greet</button>
			</form>

			<p>{greetMsg}</p>

			<div className="mt-10">
				<Halo />
				<Hai />
			</div>
			<div className="my-10">
				<Calculator />
			</div>
		</div>
	);
}

export default App;
