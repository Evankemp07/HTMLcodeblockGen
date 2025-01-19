function generateHTML() {
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const output = document.getElementById('output');
    const renderedOutput = document.getElementById('rendered-output');

    fetch('/templates/template.html')
        .then((response) => response.text())
        .then((template) => {
            const fullHTML = template
                .replace('{{description}}', description)
                .replace('{{code}}', code.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
            const simplifiedHTML = `
                <p>${description}</p>
                <pre><code class="python">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
            `;

            renderedOutput.innerHTML = simplifiedHTML;
            output.textContent = fullHTML;
            hljs.highlightAll();
        })
        .catch((error) => {
            console.error('Error fetching the template:', error);
        });
}

function copyToClipboard() {
    const output = document.getElementById('output');
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = output.textContent;
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    showNotification("HTML code copied to clipboard!");
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
