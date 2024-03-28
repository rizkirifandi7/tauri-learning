import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";

const Hai = () => {
	const [eventData, setEventData] = useState(null);

	useEffect(() => {
		listen("my_event", (event) => {
			console.log("Received event:", event);
			setEventData(event.payload);
		});

		const triggerEvent = async () => {
			await invoke("trigger_event");
		};

		triggerEvent();
	}, []);

	return (
		<div className="mt-10">
			<h1>Tauri Event Listener</h1>
			{eventData ? <p>Received event data: {eventData}</p> : <p>Waiting for event...</p>}
		</div>
	);
};

export default Hai;
