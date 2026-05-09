import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://vhhuaiwrruilkuosclad.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoaHVhaXdycnVpbGt1b3NjbGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMTg2MTUsImV4cCI6MjA5Mzg5NDYxNX0.1WjWa2FO8c5lsc3PWZb8g99XF5kDGIiBGC-Eq3bBbRI'

const supabase = createClient(supabaseUrl, supabaseKey)

function openInvite() {
  let music = document.getElementById("music");

  music.play().catch(() => {});

  document.getElementById("opening").style.opacity = "0";
  document.getElementById("opening").style.pointerEvents = "none";

  setTimeout(() => {
    document.getElementById("opening").style.display = "none";
    document.getElementById("content").style.display = "block";
  }, 500);

  document.body.classList.add("opened");
}

const opening = document.getElementById("opening");
opening.addEventListener("click", openInvite);

// countdown
var countDate = new Date("June 10, 2026 08:00:00").getTime();

setInterval(function() {
  var now = new Date().getTime();
  var distance = countDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  var minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  var seconds = Math.floor((distance % (1000*60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

}, 1000);

// copy rekening
function copyRek(nomor) {
  navigator.clipboard.writeText(nomor);
  alert("Nomor rekening berhasil disalin!");
}

// popup galeri
document.querySelectorAll(".insta-slider img").forEach(img => {
  img.onclick = function() {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("popup-img").src = this.src;
  }
});

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// ucapan
async function kirimUcapan(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;
  const kehadiran = document.getElementById("kehadiran").value;
  const pesan = document.getElementById("pesan").value;

  await supabase.from('ucapan').insert([
    {
      nama: nama,
      kehadiran: kehadiran,
      pesan: pesan
    }
  ]);

  document.querySelector("form").reset();

  loadUcapan();
}

async function loadUcapan() {
  const list = document.getElementById("list-ucapan");

  list.innerHTML = "";

  const { data } = await supabase
    .from('ucapan')
    .select('*')
    .order('id', { ascending: false });

  data.forEach(item => {
    list.innerHTML += `
      <div class="item-ucapan">
        <b>${item.nama}</b> (${item.kehadiran})<br>
        ${item.pesan}
      </div>
    `;
  });
}

loadUcapan();