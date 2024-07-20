document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector('#login-form');
    // const logoutLink = document.querySelector('#logout-link');
    const errorMessage = document.getElementById("error-message");

    // xử lý thay đổi trạng thái xác thực
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("User logged in");
            console.log(user); // Thông tin user
            setupUI(user); // Hiển thị thông tin user
            const uid = user.uid; // UID của user
            console.log(uid);
        } else {
            console.log("User logged out");
            // setupUI();
        }
    });

    // xử lý đăng nhập
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.elements['email'].value;
        const password = loginForm.elements['pswd'].value;

        auth.signInWithEmailAndPassword(email, password)
            .then((cred) => {
                loginForm.reset();
                console.log(email);
                alert('Successful login!');
                window.location.href = "../index.html";

            })
            .catch((error) => {
                const errorMessageText = error.message;
                errorMessage.textContent = errorMessageText;
                console.error(errorMessageText);
            });
    });
     
});