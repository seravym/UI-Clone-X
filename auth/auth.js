const params = new URLSearchParams(window.location.search);
const type = params.get('type');
const value = params.get('value');
const kodeNegara = params.get('code');

const subtitle = document.getElementById('otp-subtitle');
const demoBox = document.getElementById('otp-demo');
const boxes = document.querySelectorAll('.otp-box');
const resendLink = document.getElementById('resend-link');

const resendInfo = document.getElementById('resend-info');
let infoTimer;

const CONTOH_OTP = '2468';
let countdown;

if (type === 'phone' && value) {
  const nomor = value.replace(/^0+/, '');
  subtitle.textContent = `Kode dikirim ke ${kodeNegara || ''} ${nomor}`.trim();
} else if (type === 'email' && value) {
  subtitle.textContent = `Kode dikirim ke ${value}`;
}

demoBox.textContent = `Kode OTP: ${CONTOH_OTP}`;

function autofill() {
  CONTOH_OTP.split('').forEach((digit, i) => {
    boxes[i].value = digit;
  });
}

autofill();

function cekLengkap() {
  const kode = Array.from(boxes).map(b => b.value).join('');
  if (kode.length === boxes.length) {
    document.getElementById('otp-form').requestSubmit();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener('input', () => {
    box.value = box.value.replace(/[^0-9]/g, '');
    if (box.value.length === 1 && index < boxes.length - 1) {
      boxes[index + 1].focus();
    }
    cekLengkap();
  });

  box.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && box.value === '' && index > 0) {
      boxes[index - 1].focus();
    }
  });

  box.addEventListener('paste', (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
    paste.split('').forEach((char, i) => {
      if (boxes[i]) boxes[i].value = char;
    });
    cekLengkap();
  });
});

document.getElementById('otp-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const kode = Array.from(boxes).map(b => b.value).join('');

  if (kode !== CONTOH_OTP) {
    alert('Kode OTP salah!');
    return;
  }

  const usernameBaru = params.get('username');
    if (usernameBaru) {
        localStorage.setItem('profileUsername', usernameBaru.toLowerCase());
    }

    sessionStorage.setItem('isLoggedIn', 'true');
    window.location.href = '../home/home.html';
});

function mulaiHitungMundur() {
  clearInterval(countdown);
  let detik = 30;
  resendLink.style.pointerEvents = 'none';
  resendLink.style.opacity = '0.5';
  resendLink.textContent = `Kirim ulang (${detik}s)`;

  countdown = setInterval(() => {
    detik--;
    resendLink.textContent = `Kirim ulang (${detik}s)`;

    if (detik <= 0) {
      clearInterval(countdown);
      resendLink.style.pointerEvents = 'auto';
      resendLink.style.opacity = '1';
      resendLink.textContent = 'Kirim ulang';
    }
  }, 1000);
}

resendLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (resendLink.style.pointerEvents === 'none') return;

  autofill();
  mulaiHitungMundur();

  resendInfo.textContent = 'Kode OTP telah dikirim!';
  resendInfo.hidden = false;
  clearTimeout(infoTimer);
  infoTimer = setTimeout(() => {
    resendInfo.hidden = true;
  }, 5000);
});

mulaiHitungMundur();