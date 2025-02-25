document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("surveySubmitted")) {
        document.getElementById("surveyForm").innerHTML = "<h2>🎉 You have already answered! Try again tomorrow.</h2>";
    } else {
        showStep(1);
    }
});

// Function to show the current step
function showStep(step) {
    document.querySelectorAll(".step").forEach((el) => (el.style.display = "none"));
    document.getElementById("step" + step).style.display = "block";
}

// Move to the next step with validation
function nextStep(step) {
    if (!validateStep(step - 1)) return; // Check if the previous step is completed

    let status = document.getElementById("relationshipStatus").value;
    if (step === 2) {
        if (status === "Single") {
            showStep("2Single");
        } else {
            showStep("2Dating");
        }
    } else {
        showStep(step);
    }
}

// Function to validate inputs before proceeding
function validateStep(step) {
    let stepDiv = document.getElementById("step" + step);
    let inputs = stepDiv.querySelectorAll("input[required], select[required]");

    for (let input of inputs) {
        if (!input.value.trim()) {
            alert("Please fill out all required fields before proceeding.");
            return false;
        }
    }
    return true;
}

// Show "Other" input field when selected
function toggleOtherYear(selectId, inputId) {
    let dropdown = document.getElementById(selectId);
    let inputField = document.getElementById(inputId);

    if (dropdown.value === "Other") {
        inputField.style.display = "block";
        inputField.setAttribute("required", "true");
    } else {
        inputField.style.display = "none";
        inputField.removeAttribute("required");
    }
}

// Show final results and prevent multiple submissions
function showResults() {
    localStorage.setItem("surveySubmitted", "true");

    document.getElementById("surveyForm").innerHTML = `
        <h2>📊 Survey Summary</h2>
        <p>Most people are <strong>single</strong> and chose to stay single because of <strong>trust issues</strong> 😔.</p>
        <p>For those dating, the biggest reason they stay together is <strong>love & loyalty</strong> 💕.</p>
        <canvas id="surveyChart"></canvas>
    `;

    drawChart();
}

// Draws a pie chart for survey results
function drawChart() {
    let ctx = document.getElementById("surveyChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Single", "Dating"],
            datasets: [
                {
                    data: [60, 40], // Example values, replace with real data
                    backgroundColor: ["#ff4d4d", "#36A2EB"],
                },
            ],
        },
    });
}
