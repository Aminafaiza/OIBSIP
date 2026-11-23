
// Get HTML elements
const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");

const errorMessage = document.getElementById("errorMessage");
const results = document.getElementById("results");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

// Absolute zero limits
const absoluteZero = {
    celsius: -273.15,
    fahrenheit: -459.67,
    kelvin: 0
};

// Validate temperature
function validateTemperature() {
    const input = temperatureInput.value.trim();
    const unit = unitSelect.value;

    if (input === "") {
        showError("Please enter a temperature value.");
        return false;
    }

    const value = Number(input);

    if (!Number.isFinite(value)) {
        showError("Please enter a valid numeric temperature.");
        return false;
    }

    if (value < absoluteZero[unit]) {
        showError(
            `Temperature cannot be below absolute zero (${absoluteZero[unit]} ${getUnitSymbol(unit)}).`
        );
        return false;
    }

    errorMessage.textContent = "";
    return true;
}

// Get unit symbol
function getUnitSymbol(unit) {
    const symbols = {
        celsius: "°C",
        fahrenheit: "°F",
        kelvin: "K"
    };

    return symbols[unit];
}

// Display error message
function showError(message) {
    errorMessage.textContent = message;
}

// Real-time validation while typing
temperatureInput.addEventListener("input", function () {
    results.hidden = true;
    validateTemperature();
});

// Validate again when changing input unit
unitSelect.addEventListener("change", function () {
    results.hidden = true;

    if (temperatureInput.value.trim() !== "") {
        validateTemperature();
    } else {
        errorMessage.textContent = "";
    }
});

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    results.hidden = true;

    if (!validateTemperature()) {
        return;
    }

    const value = Number(temperatureInput.value);
    const selectedUnit = unitSelect.value;

    let celsius;
    let fahrenheit;
    let kelvin;

    // Convert Celsius
    if (selectedUnit === "celsius") {
        celsius = value;
        fahrenheit = (value * 9 / 5) + 32;
        kelvin = value + 273.15;
    }

    // Convert Fahrenheit
    else if (selectedUnit === "fahrenheit") {
        fahrenheit = value;
        celsius = (value - 32) * 5 / 9;
        kelvin = celsius + 273.15;
    }

    // Convert Kelvin
    else if (selectedUnit === "kelvin") {
        kelvin = value;
        celsius = value - 273.15;
        fahrenheit = (celsius * 9 / 5) + 32;
    }

    // Display results rounded to two decimal places
    celsiusResult.textContent = celsius.toFixed(2) + " °C";
    fahrenheitResult.textContent = fahrenheit.toFixed(2) + " °F";
    kelvinResult.textContent = kelvin.toFixed(2) + " K";

    // Show result section
    results.hidden = false;

    // Clear error
    errorMessage.textContent = "";
});
