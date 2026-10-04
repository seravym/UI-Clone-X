const username = sessionStorage.getItem('pendingUsername');

if (!username) {
  window.location.href = 'login.html';
}

document.getElementById('username-display').textContent = '@' + username.replace(/^@+/, '');

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

  const bersih = username.replace(/^@+/, '').toLowerCase();
  const sebelumnya = localStorage.getItem('profileUsername');

  if (sebelumnya !== bersih) {
    localStorage.setItem('profileUsername', bersih);
    localStorage.setItem('profileName', bersih);
    localStorage.removeItem('profileBio');
    localStorage.removeItem('profilePic');
  }

  sessionStorage.removeItem('pendingUsername');
  sessionStorage.setItem('isLoggedIn', 'true');
  window.location.href = '../home/home.html';
});