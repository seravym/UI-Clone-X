const USERS = [
  { id: "u1", name: "Dian Kartika", handle: "@diankartika", bio: "UI/UX enthusiast. Ngoding sambil ngopi.", initials: "DK", color: "c1", followed: false },
  { id: "u2", name: "Rafi Pratama", handle: "@rafi_dev", bio: "Front-end dev | JavaScript enjoyer", initials: "RP", color: "c2", followed: true },
  { id: "u3", name: "Kelompok 9 FEP", handle: "@kelompok9fep", bio: "Project UTS Front-End Programming — Clone X", initials: "K9", color: "c3", followed: false },
  { id: "u4", name: "Sinta Wulandari", handle: "@sintawld", bio: "Mahasiswa Informatika, suka desain web.", initials: "SW", color: "c4", followed: false },
  { id: "u5", name: "Bagas Nugroho", handle: "@bagasn", bio: "Belajar jQuery buat tugas UTS 😅", initials: "BN", color: "c5", followed: false },
  { id: "u6", name: "Universitas Tarumanagara", handle: "@untar_official", bio: "Akun resmi kampus.", initials: "UT", color: "c6", followed: true },
];

const POSTS = [
  { id: "p1", userId: "u2", time: "2j", text: "Akhirnya halaman Search buat tugas Front-End kelar juga. Tinggal debugging dikit lagi 🔥 #UTS #FrontEnd", likes: 24, reposts: 3, replies: 5, liked:false, reposted:false },
  { id: "p2", userId: "u4", time: "4j", text: "Belajar vanilla JavaScript ternyata lebih seru dari yang dikira, asal sabar aja bacain dokumentasinya.", likes: 58, reposts: 12, replies: 9, liked:false, reposted:false },
  { id: "p3", userId: "u1", time: "6j", text: "Tips desain UI tanpa framework CSS: mulai dari sistem warna dan spacing yang konsisten dulu, baru komponen.", likes: 102, reposts: 30, replies: 14, liked:false, reposted:false },
  { id: "p4", userId: "u5", time: "1h", text: "Ada yang tau cara bikin fitur trending topic pakai JS murni? lagi struggle bagian sorting-nya wkwk", likes: 9, reposts: 0, replies: 4, liked:false, reposted:false },
  { id: "p5", userId: "u3", time: "1h", text: "Progress Clone X Kelompok 9: Login ✅ Home Feed ✅ Profile ✅ Search & Explore lagi proses ✍️", likes: 41, reposts: 8, replies: 2, liked:false, reposted:false },
  { id: "p6", userId: "u6", time: "3h", text: "Pengumuman: jadwal UTS Front-End Programming sudah bisa dicek di sistem akademik.", likes: 210, reposts: 55, replies: 20, liked:false, reposted:false },
];

const TRENDS = [
  { id: "t1", category: "Teknologi · Trending", topic: "JavaScript", posts: "45.2K", region: "world" },
  { id: "t2", category: "Pendidikan · Trending di Indonesia", topic: "#UTSFrontEnd", posts: "12.8K", region: "id" },
  { id: "t3", category: "Trending di Indonesia", topic: "Clone X", posts: "8.941", region: "id" },
  { id: "t4", category: "Teknologi", topic: "Vanilla JS", posts: "6.204", region: "world" },
  { id: "t5", category: "Bisnis & keuangan · Trending", topic: "IHSG", posts: "31.5K", region: "id" },
  { id: "t6", category: "Olahraga", topic: "Liga 1", posts: "18.3K", region: "id" },
  { id: "t7", category: "Hiburan · Trending", topic: "#OOTD", posts: "22.1K", region: "id" },
  { id: "t8", category: "Trending", topic: "CSS Grid", posts: "3.402", region: "world" },
  { id: "t9", category: "Sains", topic: "AI Generatif", posts: "27.7K", region: "world" },
  { id: "t10", category: "Trending di Indonesia", topic: "Jakarta Banjir", posts: "15.9K", region: "id" },
];

const NEWS = [
  { id: "n1", meta: "Trending di Teknologi · 3j lalu", title: "Framework front-end baru diklaim lebih ringan dari sebelumnya" },
  { id: "n2", meta: "Pendidikan · 5j lalu", title: "Tren mahasiswa belajar coding otodidak makin meningkat" },
  { id: "n3", meta: "Trending · 1h lalu", title: "Event hackathon nasional buka pendaftaran minggu ini" },
];

const RECENT_SEARCHES = [
  { id: "r1", type: "query", label: "clone x front end" },
  { id: "r2", type: "user", userId: "u2" },
  { id: "r3", type: "query", label: "#UTSFrontEnd" },
];

function userById(id){
  return USERS.find(u => u.id === id);
}