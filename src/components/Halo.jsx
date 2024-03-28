import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

const Halo = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const saveUser = async () => {
		try {
			await invoke("save_user", { user: { name, email } });
		} catch (err) {
			alert(err); // or handle the error in another way
		}
	};

	return (
		<div className="flex flex-col justify-center items-center gap-2">
			<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
			<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
			<button onClick={saveUser}>Save User</button>
		</div>
	);
};

export default Halo;
