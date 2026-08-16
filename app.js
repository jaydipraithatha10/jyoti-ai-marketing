/* Jyoti AI Marketing - Main App */

const navs = document.querySelectorAll(".nav");

function showSection(id) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  navs.forEach(nav => {
    nav.classList.toggle("active", nav.dataset.section === id);
  });

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

navs.forEach(nav => {
  nav.addEventListener("click", () => showSection(nav.dataset.section));
});


/* ---------------- Poster Generator ---------------- */

const canvas = document.getElementById("posterCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let uploadedImage = null;
let currentFormat = "square";

const formats = {
  square: {
    width: 1080,
    height: 1080,
    label: "INSTAGRAM POST"
  },
  story: {
    width: 1080,
    height: 1920,
    label: "INSTAGRAM STORY"
  },
  status: {
    width: 1080,
    height: 1920,
    label: "WHATSAPP STATUS"
  }
};


/* Format buttons */

document.querySelectorAll(".format").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".format").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    currentFormat = button.dataset.format;

    drawPoster(currentFormat);
  });
});


/* Product photo */

const photoInput = document.getElementById("photo");

if (photoInput) {
  photoInput.addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) return;

    const image = new Image();

    image.onload = () => {
      uploadedImage = image;
      generateAllPosters();
    };

    image.src = URL.createObjectURL(file);
  });
}


/* Live input update */

[
  "productName",
  "weight",
  "price",
  "occasion",
  "tagline"
].forEach(id => {
  const input = document.getElementById(id);

  if (input) {
    input.addEventListener("input", () => {
      drawPoster(currentFormat);
    });
  }
});


function drawCoverImage(image, x, y, width, height) {
  const ratio = Math.max(
    width / image.width,
    height / image.height
  );

  const newWidth = image.width * ratio;
  const newHeight = image.height * ratio;

  const drawX = x + (width - newWidth) / 2;
  const drawY = y + (height - newHeight) / 2;

  ctx.drawImage(
    image,
    drawX,
    drawY,
    newWidth,
    newHeight
  );
}


function drawPoster(format = "square") {
  if (!canvas || !ctx) return;

  const settings = formats[format];

  canvas.width = settings.width;
  canvas.height = settings.height;

  const width = settings.width;
  const height = settings.height;

  const productName =
    document.getElementById("productName")?.value ||
    "Jyoti Special";

  const weight =
    document.getElementById("weight")?.value ||
    "";

  const price =
    document.getElementById("price")?.value ||
    "";

  const occasion =
    document.getElementById("occasion")?.value ||
    "";

  const tagline =
    document.getElementById("tagline")?.value ||
    "Crispy • Fresh • Homemade Taste";

  const vertical = height > width;

  /* Background */

  ctx.fillStyle = "#f5ecd8";
  ctx.fillRect(0, 0, width, height);

  /* Header */

  const headerHeight = vertical ? 230 : 170;

  ctx.fillStyle = "#123d2b";
  ctx.fillRect(0, 0, width, headerHeight);

  ctx.fillStyle = "#d7ae43";
  ctx.font = `bold ${vertical ? 38 : 34}px Arial`;
  ctx.fillText(
    "🪔 JYOTI GRUH UDHYOG",
    60,
    vertical ? 90 : 75
  );

  ctx.fillStyle = "#ffffff";
  ctx.font = "24px Arial";
  ctx.fillText(
    "RAJKOT",
    62,
    vertical ? 145 : 120
  );


  /* Product image */

  const imageY = vertical ? 310 : 220;
  const imageHeight = vertical ? 820 : 500;

  if (uploadedImage) {
    drawCoverImage(
      uploadedImage,
      70,
      imageY,
      width - 140,
      imageHeight
    );
  } else {
    ctx.fillStyle = "#e5dcc8";

    ctx.fillRect(
      70,
      imageY,
      width - 140,
      imageHeight
    );

    ctx.fillStyle = "#876f43";
    ctx.font = `bold ${vertical ? 48 : 42}px Arial`;
    ctx.textAlign = "center";

    ctx.fillText(
      "PRODUCT PHOTO",
      width / 2,
      imageY + imageHeight / 2
    );

    ctx.textAlign = "left";
  }


  /* Occasion */

  let textY = imageY + imageHeight + 80;

  if (occasion) {
    ctx.fillStyle = "#d7ae43";

    ctx.fillRect(
      70,
      textY - 45,
      width - 140,
      65
    );

    ctx.fillStyle = "#173c2a";
    ctx.font = "bold 25px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
      occasion.toUpperCase(),
      width / 2,
      textY - 5
    );

    ctx.textAlign = "left";

    textY += 70;
  }


  /* Product name */

  ctx.fillStyle = "#123d2b";
  ctx.textAlign = "center";

  ctx.font = `bold ${vertical ? 62 : 55}px Arial`;

  ctx.fillText(
    productName,
    width / 2,
    textY
  );


  /* Tagline */

  ctx.font = `${vertical ? 31 : 26}px Arial`;

  ctx.fillText(
    tagline,
    width / 2,
    textY + 52
  );


  /* Weight + price */

  ctx.font = `bold ${vertical ? 44 : 38}px Arial`;

  ctx.fillText(
    `${weight}   •   ${price}`,
    width / 2,
    textY + 115
  );


  /* Phone */

  ctx.fillStyle = "#123d2b";

  ctx.font = `bold ${vertical ? 34 : 26}px Arial`;

  ctx.fillText(
    "📞 9712149344",
    width / 2,
    height - 90
  );


  /* Format */

  ctx.font = `${vertical ? 22 : 20}px Arial`;

  ctx.fillText(
    settings.label,
    width / 2,
    height - 48
  );

  ctx.textAlign = "left";
}


/* Generate all three */

function generateAllPosters() {
  drawPoster("square");
  drawPoster("story");
  drawPoster("status");

  drawPoster(currentFormat);

  const counter = document.getElementById("posterCount");

  if (counter) {
    counter.textContent =
      String((Number(counter.textContent) || 0) + 1);
  }
}


/* Download one */

function downloadPoster(format) {
  drawPoster(format);

  const product =
    document.getElementById("productName")?.value ||
    "jyoti-poster";

  const safeName =
    product
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]/g, "");

  const link = document.createElement("a");

  link.download =
    `${safeName || "jyoti-poster"}-${format}.png`;

  link.href = canvas.toDataURL("image/png");

  link.click();
}


/* Download all */

function downloadAllPosters() {
  const oldFormat = currentFormat;

  ["square", "story", "status"].forEach(
    (format, index) => {
      setTimeout(() => {
        downloadPoster(format);
      }, index * 600);
    }
  );

  setTimeout(() => {
    currentFormat = oldFormat;
    drawPoster(oldFormat);
  }, 2200);
}


/* ---------------- Calendar ---------------- */

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
    occasions
      .map(item => {
        const parts = item.split(" — ");

        return `
          <div class="plan">
            <b>${parts[0]}</b>
            <span>${parts[1]}</span>
          </div>
        `;
      })
      .join("");
}


/* ---------------- Initial load ---------------- */

generateAllPosters();
