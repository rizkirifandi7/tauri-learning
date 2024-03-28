import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

const Calculator = () => {
	const [num1, setNum1] = useState("");
	const [num2, setNum2] = useState("");
	const [operator, setOperator] = useState("+");
	const [result, setResult] = useState("");

	const calculate = async () => {
		if (num1 === "" || num2 === "") {
			alert("Please enter both numbers");
			return;
		}

		const calculationData = {
			data: {
				num1: parseFloat(num1),
				num2: parseFloat(num2),
				operator: operator,
			},
		};

		const res = await invoke("calculate", calculationData);
		setResult(res);
	};

	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<h1>Calculator</h1>
			<input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
			<select onChange={(e) => setOperator(e.target.value)} className="text-black text-2xl p-2 w-10 rounded-md">
				<option value="+">+</option>
				<option value="-">-</option>
				<option value="*">*</option>
				<option value="/">/</option>
			</select>
			<input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
			<button onClick={calculate}>Calculate</button>
			<h2 className="font-bold">Result: {result}</h2>
		</div>
	);
};

export default Calculator;
