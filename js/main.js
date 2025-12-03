document.getElementById('contactForm').addEventListener('submit', function(e) {
    let isValid = true;

    function checkField(id, pattern, errorText) {
        const input = document.getElementById(id);
        const errorDiv = document.getElementById('error-' + id);
        const value = input.value.trim();

        if (value === "" || (pattern && !pattern.test(value))) {
            
            errorDiv.style.display = 'block';
            errorDiv.innerText = '⚠️ ' + errorText; 
            isValid = false;
        } else { 
            errorDiv.style.display = 'none';
        }
    }

    // 1. Names
    const namePattern = /^[A-Za-z\s\-]+$/;
    checkField('first_name', namePattern, "Please enter a valid First Name.");
    checkField('last_name', namePattern, "Please enter a valid Last Name.");

    // 2. Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    checkField('email', emailPattern, "Please enter a valid email (e.g. user@domain.com).");

    // 3. Dropdown
    checkField('reason', null, "Please select a Reason for Inquiry.");

    // 4. Message
    checkField('comment', null, "Please enter your message.");

    if (!isValid) {
        e.preventDefault();
    }
});