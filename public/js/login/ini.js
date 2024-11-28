document.getElementById('showRegisterForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('showLoginForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('showForgotPasswordForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('forgotPasswordForm').style.display = 'block';
});

document.getElementById('showLoginFormFromForgot').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('forgotPasswordForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

//mostrar/ocultar logo
document.querySelectorAll('.toggle-password').forEach(item => {
    item.addEventListener('click', function () {
        // Encuentra el input relacionado con este toggle
        var passwordInput = this.parentElement.querySelector('input');
        var toggleIcon = this.querySelector('i');

        // Alterna el tipo de input entre 'password' y 'text'
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye-slash');  // Cambio de ícono a visible
            toggleIcon.classList.add('fa-eye');           // Ícono que indica visibilidad
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye');        // Cambio de ícono a oculto
            toggleIcon.classList.add('fa-eye-slash');     // Ícono que indica ocultamiento
        }
    });
});

//celular
function validarCelular(celular) {
    const regex = /^[0-9]{10}$/; 
    return regex.test(celular);
  }

