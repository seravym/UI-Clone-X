const pwInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');

function pasangToggle(input, toggleId) {
  const toggle = document.getElementById(toggleId);

  toggle.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text';
      toggle.textContent = '🔓';
    } else {
      input.type = 'password';
      toggle.textContent = '🔒';
    }
  });
}

function cekKecocokan() {
  const beda = confirmInput.value !== '' && confirmInput.value !== pwInput.value;
  confirmInput.setCustomValidity(beda ? 'Passwords do not match' : '');
}

pasangToggle(pwInput, 'toggle-password');
pasangToggle(confirmInput, 'toggle-confirm-password');

pwInput.addEventListener('input', cekKecocokan);
confirmInput.addEventListener('input', cekKecocokan);