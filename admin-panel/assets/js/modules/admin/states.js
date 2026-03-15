async function loadStates() {
  const stateDropdown = document.getElementById("state");
  if (!stateDropdown) return;

  const response = await fetch("http://localhost:8087/api/states");
  const states = await response.json();

  stateDropdown.innerHTML = '<option value="">Select State</option>';

  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.id;
    option.text = state.stateName;

    stateDropdown.appendChild(option);
  });
}

setTimeout(loadStates, 500);