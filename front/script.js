function generate() {
    const summary = document.getElementById('summary').value.trim();
    const tech = document.getElementById('tech').value.trim();
    const workflow = document.getElementById('workflow').value.trim();
    const resultDiv = document.getElementById('result');

    if (!summary || !tech) {
        alert("Project Summary and Tech Stack are mandatory.");
        return;
    }

    resultDiv.innerHTML = "⏳ Generating Q&A... Please wait...";

    fetch('https://projqa.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            summary: summary,
            tech: tech,
            workflow: workflow
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Server Error or Daily Limit Exceeded");
        }
        return res.json();
    })
    .then(data => {
        if (data.output) {
            resultDiv.innerText = data.output;
        } else if (data.error) {
            resultDiv.innerText = "❌ Error: " + data.error;
        }
    })
    .catch(err => {
        console.error(err);
        resultDiv.innerText = "❌ Error occurred: " + err.message;
    });
}
