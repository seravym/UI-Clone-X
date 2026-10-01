const togglePw = document.getElementById('toggle-password');
const pwInput = document.getElementById('password');

togglePw.addEventListener('click', () => {
  if (pwInput.type === 'password') {
    pwInput.type = 'text';
    togglePw.textContent = '🔓';
  } else {
    pwInput.type = 'password';
    togglePw.textContent = '🔒';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const savedEmail = localStorage.getItem('rememberedEmail');
  if (savedEmail) {
    document.getElementById('email').value = savedEmail;
    document.getElementById('remember').checked = true;
  }
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const remember = document.getElementById('remember').checked;

  if (remember) {
    localStorage.setItem('rememberedEmail', email);
  } else {
    localStorage.removeItem('rememberedEmail');
  }

  sessionStorage.setItem('isLoggedIn', 'true');
  
  window.location.href = '../home/home.html';
});