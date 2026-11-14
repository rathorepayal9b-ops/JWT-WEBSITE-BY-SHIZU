async function fetchToken() {
  const uid = document.getElementById('uidInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();
  const outputBox = document.getElementById('outputBox');
  const generateBtn = document.getElementById('generateBtn');

  if (!uid || !password) {
    outputBox.textContent = 'Please enter both UID and Password first.';
    return;
  }

  const directApiUrl = `https://jwt-api-by-shizuka.vercel.app/token?uid=${encodeURIComponent(uid)}&password=${encodeURIComponent(password)}`;
  const proxyApiUrl = `/api/token?uid=${encodeURIComponent(uid)}&password=${encodeURIComponent(password)}`;

  generateBtn.disabled = true;
  generateBtn.textContent = 'LOADING...';
  outputBox.textContent = 'Fetching data from API...';

  try {
    let response;
    try {
      response = await fetch(proxyApiUrl);
      if (!response.ok && response.status === 404) {
        response = await fetch(directApiUrl);
      }
    } catch (e) {
      response = await fetch(directApiUrl);
    }

    const rawText = await response.text();

    try {
      const jsonData = JSON.parse(rawText);
      outputBox.textContent = JSON.stringify(jsonData, null, 2);
    } catch (e) {
      outputBox.textContent = rawText;
    }
  } catch (error) {
    outputBox.textContent = 'Error connecting to API:\n' + error.message;
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = 'GENERATE TOKEN';
  }
}

function copyOutput() {
  const outputText = document.getElementById('outputBox').textContent;
  const copyBtn = document.getElementById('copyBtn');

  if (!outputText || outputText === 'Output will appear here...') {
    return;
  }

  navigator.clipboard.writeText(outputText).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'COPIED!';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 1500);
  });
}
