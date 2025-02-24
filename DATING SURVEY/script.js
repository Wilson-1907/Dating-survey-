document.addEventListener("DOMContentLoaded", function () {
    // Check if user has already submitted
    if (localStorage.getItem("surveySubmitted")) {
        alert("🚫 You have already submitted the survey! Thank you. 😊");
        document.getElementById("surveyForm").style.display = "none"; // Hide form
        document.getElementById("alreadySubmitted").style.display = "block"; // Show message
    }

    // Auto-reset survey after 24 hours
    if (localStorage.getItem("surveyTime")) {
        let timePassed = Date.now() - localStorage.getItem("surveyTime");
        if (timePassed > 24 * 60 * 60 * 1000) { // 24 hours
            localStorage.removeItem("surveySubmitted");
            localStorage.removeItem("surveyTime");
        }
    }

    // Handle form submission
    document.getElementById("surveyForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        // Store submission
        localStorage.setItem("surveySubmitted", "true");
        localStorage.setItem("surveyTime", Date.now());

        alert("✅ Thank you for submitting the survey! 🎉 Your response has been recorded.");

        // Hide form after submission
        document.getElementById("surveyForm").style.display = "none";
        document.getElementById("alreadySubmitted").style.display = "block";
    });

    // Optional: Reset Survey Button (If you want users to retake)
    document.getElementById("resetSurvey").addEventListener("click", function () {
        localStorage.removeItem("surveySubmitted");
        localStorage.removeItem("surveyTime");
        alert("🔄 Survey reset! You can now submit again.");
        location.reload();
    });
});
