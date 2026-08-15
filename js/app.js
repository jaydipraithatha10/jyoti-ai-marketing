const navs = document.querySelectorAll(".nav");

function showSection(id) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  navs.forEach(nav => {
    nav.classList.toggle("active", nav.dataset.section === id);
  });

  const titles = {
    dashboard: "Good Morning, Jyoti Gruh Udhyog",
    poster: "AI Poster Generator",
    calendar: "Occasion & Daily Calendar",
    reviews: "Review Marketing",
    publishing: "Social Publishing",
    analytics: "Marketing Analytics"
  };

  document.getElementById("pageTitle").textContent =
    titles[id] || "Jyoti AI Marketing";
}

navs.forEach(nav => {
  nav.addEventListener("click", () => {
    showSection(nav.dataset.section);
  });
});

const canvas = document.getElementById("posterCanvas");
const ctx = canvas.getContext("2d");

let uploaded = null;

document.getElementById("photo").addEventListener("change", event => {
  const file = event.target.files[0];

  if (!file) return;

  const image = new Image();

  image.onload = () => {
    uploaded = image;
    generatePoster();
  };

  image.src = URL.createObjectURL(file);
});

function fitImage(image, x, y, width, height) {
  const ratio = Math.max(
    width / image.width,
    height / image.height
  );

  const newWidth = image.width * ratio;
  const newHeight = image.height * ratio;

  ctx.drawImage(
    image,
    x + (width - newWidth) / 2,
    y + (height - newHeight) / 2,
    newWidth,
    newHeight
  );
}

function generatePoster() {
  const name =
    document.getElementById("productName").value ||
    "Jyoti Special";

  const weight =
    document.getElementById("weight").value || "";

  const price =
    document.getElementById("price").value || "";

  const occasion =
    document.getElementById("occasion").value;

  const tagline =
    document.getElementById("tagline").value ||
    "";

  ctx.clearRect(0, 0, 1080, 1080);

  // Background
  ctx.fillStyle = "#f5ecd8";
  ctx.fillRect(0, 0, 1080, 1080);

  // Header
  ctx.fillStyle = "#123d2b";
  ctx.fillRect(0, 0, 1080, 170);

  ctx.fillStyle = "#d7ae43";
  ctx.font = "bold 34px Arial";
  ctx.fillText("JYOTI GRUH UDHYOG", 60, 75);

  ctx.fillStyle = "#ffffff";
  ctx.font = "24px Arial";
  ctx.fillText("RAJKOT", 62, 120);

  // Product image
  if (uploaded) {
    fitImage(
      uploaded,
      90,
      220,
      900,
      500
    );
  } else {
    ctx.fillStyle = "#e5dcc8";
    ctx.fillRect(90, 220, 900, 500);

    ctx.fillStyle = "#876f43";
    ctx.font = "bold 42px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "PRODUCT PHOTO",
      540,
      480
    );

    ctx.textAlign = "left";
  }

  // Occasion
  if (occasion) {
    ctx.fillStyle = "#d7ae43";
    ctx.fillRect(
      90,
      750,
      900,
      55
    );

    ctx.fillStyle = "#173c2a";
    ctx.font = "bold 25px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
      occasion.toUpperCase(),
      540,
      787
    );

    ctx.textAlign = "left";
  }

  // Product name
  ctx.fillStyle = "#123d2b";
  ctx.font = "bold 55px Arial";
  ctx.textAlign = "center";

  ctx.fillText(
    name,
    540,
    870
  );

  // Tagline
  ctx.font = "26px Arial";

  ctx.fillText(
    tagline,
    540,
    915
  );

  // Price
  ctx.font = "bold 38px Arial";

  ctx.fillText(
    `${weight}   •   ${price}`,
    540,
    970
  );

  // Footer
  ctx.font = "22px Arial";

  ctx.fillText(
    "Fresh • Premium • Homemade Taste",
    540,
    1020
  );

  ctx.textAlign = "left";
}

function downloadPoster() {
  const product =
    document.getElementById("productName").value ||
    "jyoti-poster";

  const fileName =
    product.replace(/\s+/g, "-") +
    ".png";

  const link =
    document.createElement("a");

  link.download = fileName;
  link.href =
    canvas.toDataURL("image/png");

  link.click();
}

// Initial poster
generatePoster();


// Marketing calendar
const occasions = [
  "Aug 15 — Independence Day",
  "Aug 16 — Daily Product",
  "Aug 26 — Janmashtami",
  "Sep 4 — Ganesh Chaturthi",
  "Sep 15 — Navratri preparation",
  "Oct 20 — Diwali preparation"
];

const calendarList =
  document.getElementById("calendarList");

if (calendarList) {
  calendarList.innerHTML =
    occasions.map(item => {

      const parts =
        item.split(" — ");

      return `
        <div class="plan">
          <b>${parts[0]}</b>
          <span>${parts[1]}</span>
        </div>
      `;

    }).join("");
}
