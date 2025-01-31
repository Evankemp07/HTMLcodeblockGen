function generateHTML() {
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const language = document.getElementById('language').value;
    const output = document.getElementById('output');
    const renderedOutput = document.getElementById('rendered-output');
    const languageScript = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/languages/${language}.min.js`;

    fetch('https://raw.githubusercontent.com/Evankemp07/HTMLcodeblockGen/refs/heads/main/templates/template.html')
        .then((response) => response.text())
        .then((template) => {
            if (!document.querySelector(`script[src="${languageScript}"]`)) {
                const scriptTag = document.createElement('script');
                scriptTag.src = languageScript;
                scriptTag.onload = () => hljs.highlightAll();
                document.body.appendChild(scriptTag);
            } else {
                hljs.highlightAll();
            }

            const fullHTML = template
                .replace('{{description}}', description)
                .replace('{{code}}', code.replace(/</g, "&lt;").replace(/>/g, "&gt;"))
                .replace('{{language}}', language);
            const simplifiedHTML = `
                <p>${description}</p>
                <pre><code class="language-${language}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
            `;

            renderedOutput.innerHTML = simplifiedHTML;
            output.textContent = simplifiedHTML;

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