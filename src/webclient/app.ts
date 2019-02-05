class App
{
	constructor()
	{
		const glucoseInput = document.querySelector("#glucose-inputs input")! as HTMLInputElement;
		const fastinsulinInput = document.querySelector("#fastinsulin-inputs input")! as HTMLInputElement;
		const basilinsulinInput = document.querySelector("#basilinsulin-inputs input")! as HTMLInputElement;
		const mealDescriptionInput = document.querySelector("#meal-inputs input[type=text]")! as HTMLInputElement;
		const mealCarbsInput = document.querySelector("#meal-inputs input[type=number]")! as HTMLInputElement;

		const glucoseButton = document.querySelector("#glucose-inputs button")! as HTMLElement;
		const fastinsulinButton = document.querySelector("#fastinsulin-inputs button")! as HTMLElement;
		const basilinsulinButton = document.querySelector("#basilinsulin-inputs button")! as HTMLElement;
		const mealButton = document.querySelector("#meal-inputs button")! as HTMLElement;

		glucoseButton.onclick = () => {
			this.postNewEvent("glucose-reading", { value: parseFloat(glucoseInput.value) });
		};

		fastinsulinButton.onclick = () => {
			this.postNewEvent("bolus-insulin", { units: parseFloat(fastinsulinInput.value) });
		};

		basilinsulinButton.onclick = () => {
			this.postNewEvent("basil-insulin", { units: parseFloat(basilinsulinInput.value) });
		};

		mealButton.onclick = () => {
			this.postNewEvent("meal", { carbs: parseFloat(mealCarbsInput.value), description: mealDescriptionInput.value });
		};
	}

	private async postNewEvent(type: string, data: any)
	{
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const res = await fetch("/event", {
			method: "POST",
			headers,
			body: JSON.stringify({
				type,
				data,
			})
		});

		if (!res.ok)
		{
			alert(`Error: ${res.status} ${res.statusText} ${await res.text()}`);
		}
		else
		{
			alert("All set!");
		}
	}
}
const app = new App();
