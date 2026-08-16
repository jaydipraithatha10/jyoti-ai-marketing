/* Jyoti AI Marketing — Premium Golden Brown Poster Engine */

const navs = document.querySelectorAll(".nav");

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  navs.forEach(n => n.classList.toggle("active", n.dataset.section === id));

  const titles = {
    dashboard: "Good Morning, Jyoti Gruh Udhyog",
    poster: "3-Format Poster Generator",
    calendar: "Occasion & Daily Calendar",
    reviews: "Review Marketing",
    publishing: "Social Publishing",
    analytics: "Marketing Analytics"
  };

  const title = document.getElementById("pageTitle");
  if (title) title.textContent = titles[id] || "Jyoti AI Marketing";
}

navs.forEach(n => n.addEventListener("click", () => showSection(n.dataset.section)));

const canvas = document.getElementById("posterCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let uploadedImage = null;
let currentFormat = "square";
let designIndex = 0;

const formats = {
  square: { width: 1080, height: 1080, label: "INSTAGRAM POST" },
  story: { width: 1080, height: 1920, label: "INSTAGRAM STORY" },
  status: { width: 1080, height: 1920, label: "WHATSAPP STATUS" }
};

const designs = [
  { bg: "#F3E4C7", panel: "#5A3218", gold: "#C89B3C", light: "#FFF8EA" },
  { bg: "#E9D2AE", panel: "#6B3E1E", gold: "#D4A84D", light: "#FFF7E8" },
  { bg: "#F7EBDD", panel: "#4A2815", gold: "#B98A32", light: "#FFFDF7" }
];

document.querySelectorAll(".format").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".format").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFormat = btn.dataset.format;
    drawPoster(currentFormat);
  });
});

const photoInput = document.getElementById("photo");
if (photoInput) {
  photoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      uploadedImage = img;
      generateAllPosters(false);
    };
    img.src = URL.createObjectURL(file);
  });
}

["productName", "weight", "price", "occasion", "tagline"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", () => drawPoster(currentFormat));
});

function occasionHeadline(occasion, product) {
  const text = (occasion || "").toLowerCase();
  if (text.includes("janmashtami")) return "શ્રી કૃષ્ણ જન્માષ્ટમી સ્પેશિયલ";
  if (text.includes("diwali") || text.includes("દિવાળી")) return "દિવાળી સ્પેશિયલ";
  if (text.includes("navratri") || text.includes("નવરાત્રી")) return "નવરાત્રી સ્પેશિયલ";
  if (text.includes("uttarayan") || text.includes("ઉતરાયણ")) return "ઉતરાયણ સ્પેશિયલ";
  if (text.includes("holi") || text.includes("હોળી")) return "હોળી સ્પેશિયલ";
  if (text.includes("raksha") || text.includes("રક્ષાબંધન")) return "રક્ષાબંધન સ્પેશિયલ";
  if (text.includes("independence") || text.includes("15 aug")) return "સ્વતંત્રતા દિવસ સ્પેશિયલ";
  return product ? `${product} માટે ખાસ પસંદગી` : "આજની ખાસ પસંદગી";
}

function fitCover(img, x, y, w, h) {
  const ratio = Math.max(w / img.width, h / img.height);
  const nw = img.width * ratio;
  const nh = img.height * ratio;
  ctx.drawImage(img, x + (w - nw) / 2, y + (h - nh) / 2, nw, nh);
}

function drawRoundedImage(img, x, y, w, h, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.clip();
  fitCover(img, x, y, w, h);
  ctx.restore();
}

function drawPoster(format = "square") {
  if (!canvas || !ctx) return;

  const f = formats[format];
  const theme = designs[designIndex % designs.length];
  const W = f.width, H = f.height;
  const vertical = H > W;

  canvas.width = W;
  canvas.height = H;

  const name = document.getElementById("productName")?.value || "Jyoti Special";
  const weight = document.getElementById("weight")?.value || "";
  const price = document.getElementById("price")?.value || "";
  const occasion = document.getElementById("occasion")?.value || "";
  const tagline = document.getElementById("tagline")?.value || "Crispy • Fresh • Homemade Taste";

  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, W, H);

  // Decorative border
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 8;
  ctx.strokeRect(28, 28, W - 56, H - 56);

  // Header
  const headerH = vertical ? 245 : 190;
  ctx.fillStyle = theme.panel;
  ctx.fillRect(0, 0, W, headerH);

  ctx.fillStyle = theme.gold;
  ctx.font = `bold ${vertical ? 42 : 36}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText("🪔 JYOTI GRUH UDHYOG", W / 2, vertical ? 88 : 72);

  ctx.fillStyle = "#FFF8EA";
  ctx.font = "22px Arial";
  ctx.fillText("RAJKOT • PREMIUM HOMEMADE TASTE", W / 2, vertical ? 140 : 118);

  ctx.fillStyle = theme.gold;
  ctx.font = "bold 18px Arial";
  ctx.fillText(f.label, W / 2, vertical ? 195 : 165);

  // Product image area
  const imgX = vertical ? 65 : 80;
  const imgY = vertical ? 300 : 235;
  const imgW = W - imgX * 2;
  const imgH = vertical ? 830 : 500;

  ctx.fillStyle = theme.light;
  ctx.fillRect(imgX - 12, imgY - 12, imgW + 24, imgH + 24);

  if (uploadedImage) {
    drawRoundedImage(uploadedImage, imgX, imgY, imgW, imgH, 28);
  } else {
    ctx.fillStyle = "#E3CFAD";
    ctx.fillRect(imgX, imgY, imgW, imgH);
    ctx.fillStyle = theme.panel;
    ctx.font = `bold ${vertical ? 52 : 44}px Arial`;
    ctx.fillText("PRODUCT PHOTO", W / 2, imgY + imgH / 2);
  }

  let y = imgY + imgH + (vertical ? 95 : 82);

  // Occasion ribbon
  if (occasion) {
    ctx.fillStyle = theme.gold;
    ctx.fillRect(80, y - 48, W - 160, 70);
    ctx.fillStyle = theme.panel;
    ctx.font = `bold ${vertical ? 28 : 24}px Arial`;
    ctx.fillText(occasionHeadline(occasion, name).toUpperCase(), W / 2, y - 2);
    y += 78;
  }

  // Product name
  ctx.fillStyle = theme.panel;
  ctx.font = `bold ${vertical ? 66 : 58}px Arial`;
  ctx.fillText(name, W / 2, y);

  ctx.fillStyle = "#6C5138";
  ctx.font = `${vertical ? 31 : 27}px Arial`;
  ctx.fillText(tagline, W / 2, y + 54);

  // Price badge
  const badgeY = y + 88;
  ctx.fillStyle = theme.panel;
  ctx.beginPath();
  ctx.roundRect(W / 2 - 235, badgeY, 470, 82, 41);
  ctx.fill();

  ctx.fillStyle = theme.gold;
  ctx.font = `bold ${vertical ? 40 : 34}px Arial`;
  ctx.fillText(`${weight}  •  ${price}`, W / 2, badgeY + 55);

  // Footer
  ctx.fillStyle = theme.panel;
  ctx.font = `bold ${vertical ? 34 : 29}px Arial`;
  ctx.fillText("📞 Order Now: 9712149344", W / 2, H - 105);

  ctx.fillStyle = "#7B6045";
  ctx.font = `${vertical ? 21 : 19}px Arial`;
  ctx.fillText("Fresh • Premium • Hygienic • Jyoti Gruh Udhyog", W / 2, H - 65);

  ctx.textAlign = "left";
}

function generateAllPosters(increment = true) {
  if (increment) designIndex++;
  drawPoster("square");
  drawPoster("story");
  drawPoster("status");
  drawPoster(currentFormat);

  const counter = document.getElementById("posterCount");
  if (increment && counter) {
    counter.textContent = String((Number(counter.textContent) || 0) + 1);
  }
}

function downloadPoster(format) {
  drawPoster(format);
  const product = document.getElementById("productName")?.value || "jyoti-poster";
  const safe = product.trim().replace(/\s+/g, "-").replace(/[^\w\-]/g, "") || "jyoti-poster";
  const a = document.createElement("a");
  a.download = `${safe}-${format}.png`;
  a.href = canvas.toDataURL("image/png");
  a.click();
}

function downloadAllPosters() {
  const old = currentFormat;
  ["square", "story", "status"].forEach((format, i) => {
    setTimeout(() => downloadPoster(format), i * 650);
  });
  setTimeout(() => {
    currentFormat = old;
    drawPoster(old);
  }, 2300);
}

// "Generate New Design" can be called from the console or later from a UI button.
function generateNewDesign() {
  generateAllPosters(true);
}

window.generateNewDesign = generateNewDesign;
window.generateAllPosters = generateAllPosters;
window.downloadAllPosters = downloadAllPosters;

const occasions = [
  "Aug 15 — Independence Day",
  "Aug 16 — Daily Product",
  "Aug 26 — Janmashtami",
  "Sep 4 — Ganesh Chaturthi",
  "Sep 15 — Navratri preparation",
  "Oct 20 — Diwali preparation"
];

const calendarList = document.getElementById("calendarList");
if (calendarList) {
  calendarList.innerHTML = occasions.map(item => {
    const p = item.split(" — ");
    return `<div class="plan"><b>${p[0]}</b><span>${p[1]}</span></div>`;
  }).join("");
}

generateAllPosters(false);
