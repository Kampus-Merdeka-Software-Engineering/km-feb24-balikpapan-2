function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name === '' || email === '' || message === '') {
        alert('Semua bidang harus diisi!');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Email tidak valid!');
        return false;
    }

    document.getElementById('successMessage').style.display = 'block';
    return false;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
