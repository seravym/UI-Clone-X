const username = sessionStorage.getItem('pendingUsername');

if (!username) {
  window.location.href = 'login.html';
}

document.getElementById('username-display').textContent = '@' + username;

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

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  sessionStorage.removeItem('pendingUsername');
  sessionStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('profileUsername', username.replace(/^@+/, '').toLowerCase());
  window.location.href = '../home/home.html';
});