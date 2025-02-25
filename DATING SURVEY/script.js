document.addEventListener("DOMContentLoaded", function () {
    showStep(1);

    // Prevent users from re-answering
    if (localStorage.getItem("surveySubmitted")) {
        document.getElementById("surveyForm").innerHTML = "<h2>🎉 You have already answered! Try again tomorrow.</h2>";
    }
});

function showStep(step) {
    document.querySelectorAll(".step").forEach((el) => (el.style.display = "none"));
    document.getElementById("step" + step).style.display = "block";
}

function nextStep(step) {
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

function drawChart() {
    let ctx = document.getElementById("surveyChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Single", "Dating"],
            datasets: [
                {
                    data: [60, 40], // Example data, adjust accordingly
                    backgroundColor: ["#ff4d4d", "#36A2EB"],
                },
            ],
        },
    });
}
