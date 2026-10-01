const form = document.querySelector('form');
const pwInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');
const errorBox = document.getElementById('form-error');

function showError(message, field) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  field.focus();
}

document.querySelectorAll('.toggle-password').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const hidden = input.type === 'password';
    input.type = hidden ? 'text' : 'password';
    btn.textContent = hidden ? '🔓' : '🔒';
    btn.setAttribute('aria-label', hidden ? 'Hide password' : 'Show password');
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  errorBox.hidden = true;

  const password = pwInput.value;

  if (password.length < 8) {
    return showError('Password must be at least 8 characters.', pwInput);
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return showError('Password must contain letters and numbers.', pwInput);
  }
  if (password !== confirmInput.value) {
    return showError('Passwords do not match.', confirmInput);
  }

  window.location.href = '../login/login.html';
});