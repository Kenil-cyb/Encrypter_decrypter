function toggleDarkMode() {
    document.body.classList.toggle('dark');
    
    // Save preference to localStorage
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
  }
  
  // Initialize dark mode from localStorage
  function initDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark');
    }
  }
  
  // Encryption
  function encryptText() {
    const text = document.querySelector('.input-area').value;
    const password = document.querySelector('.password').value;
    const resultField = document.querySelector('.output-area');
  
    if (!text) {
      resultField.value = "Please enter text to encrypt.";
      return;
    }
  
    resultField.value = password 
      ? btoa(password + text)  // Encrypt with password
      : btoa(text);            // Encrypt without password
  
    saveToLocalStorage(resultField.value);
  }
  
  // Decryption
  function decryptText() {
    const text = document.querySelector('.input-area').value;
    const password = document.querySelector('.password').value;
    const resultField = document.querySelector('.output-area');
  
    try {
      const decoded = atob(text);
      
      if (password && decoded.startsWith(password)) {
        resultField.value = decoded.slice(password.length);
      } else if (!password) {
        resultField.value = decoded;
      } else {
        resultField.value = "❌ Invalid password!";
      }
    } catch (error) {
      resultField.value = "❌ Invalid encrypted text!";
    }
  }
  
  // Copy result
  function copyResult() {
    const resultField = document.querySelector('.output-area');
    resultField.select();
    document.execCommand('copy');
  }
  
  // Reset fields
  function resetFields() {
    document.querySelector('.input-area').value = '';
    document.querySelector('.password').value = '';
    document.querySelector('.output-area').value = '';
  }
  
  // Save to localStorage
  function saveToLocalStorage(message) {
    const messages = JSON.parse(localStorage.getItem('encryptedMessages')) || [];
    messages.push(message);
    localStorage.setItem('encryptedMessages', JSON.stringify(messages));
    displayPastMessages();
  }
  
  // Display history
  function displayPastMessages() {
    const list = document.getElementById('pastMessages');
    list.innerHTML = '';
  
    const messages = JSON.parse(localStorage.getItem('encryptedMessages')) || [];
    
    if (messages.length === 0) {
      list.innerHTML = '<li class="empty-state">No encrypted messages yet</li>';
    } else {
      messages.forEach(msg => {
        const li = document.createElement('li');
        li.textContent = msg;
        list.appendChild(li);
      });
    }
  }
  
  // Clear history
  function clearHistory() {
    if (confirm("⚠️ Delete ALL encryption history?")) {
      localStorage.removeItem('encryptedMessages');
      displayPastMessages();
    }
  }
  
  // Initialize on load
  window.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    displayPastMessages();
  });
