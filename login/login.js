const usernameInput = document.getElementById('username');
const datalist = document.getElementById('username-suggestions');

function ambilRiwayat() {
  try {
    return JSON.parse(localStorage.getItem('riwayatUsername')) || [];
  } catch {
    return [];
  }
}

function tampilkanSaran() {
  const riwayat = ambilRiwayat();
  datalist.innerHTML = '';
  riwayat.forEach(u => {
    const option = document.createElement('option');
    option.value = u;
    datalist.appendChild(option);
  });
}

tampilkanSaran();

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return;

  let riwayat = ambilRiwayat();
  if (!riwayat.includes(username)) {
    riwayat.unshift(username);
    riwayat = riwayat.slice(0, 5);
    localStorage.setItem('riwayatUsername', JSON.stringify(riwayat));
  }

  sessionStorage.setItem('isLoggedIn', 'true');
  window.location.href = '../home/home.html';
});