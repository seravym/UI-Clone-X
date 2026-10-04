document.getElementById('otp-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const kode = Array.from(boxes).map(b => b.value).join('');

  if (kode !== CONTOH_OTP) {
    alert('Kode OTP salah!');
    return;
  }

  const usernameBaru = params.get('username');
    if (usernameBaru) {
        const bersih = usernameBaru.toLowerCase();
        if (localStorage.getItem('profileUsername') !== bersih) {
            localStorage.setItem('profileUsername', bersih);
            localStorage.setItem('profileName', bersih);
            localStorage.removeItem('profileBio');
            localStorage.removeItem('profilePic');
        }
    }

  sessionStorage.setItem('isLoggedIn', 'true');
  window.location.href = '../home/home.html';
});