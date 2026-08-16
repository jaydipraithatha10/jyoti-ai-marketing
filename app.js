/* Jyoti AI Marketing — Poster Engine */

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

  if (title) {
    title.textContent = titles[id] || "Jyoti AI Marketing";
  }
}

navs.forEach(nav => {
  nav.addEventListener("click", function () {
    showSection(this.dataset.section);
  });
});


/* =========================
   CANVAS
========================= */

const canvas = document.getElementById("posterCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let uploadedImage = null;
let currentFormat = "square";
let designIndex = 0;


/* =========================
   FORMATS
========================= */

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


/* =========================
   DESIGNS
========================= */

const designs = [
  {
    bg: "#F3E4C7",
    panel: "#5A3218",
    gold: "#C89B3C",
    light: "#FFF8EA"
  },

  {
    bg: "#E9D2AE",
    panel: "#6B3E1E",
    gold: "#D4A84D",
    light: "#FFF7E8"
  },

  {
    bg: "#F7EBDD",
    panel: "#4A2815",
    gold: "#B98A32",
    light: "#FFFDF7"
  }
];


/* =========================
   FORMAT BUTTONS
========================= */

document.querySelectorAll(".format").forEach(button => {

  button.addEventListener("click", function () {

    document.querySelectorAll(".format").forEach(btn => {
      btn.classList.remove("active");
    });

    this.classList.add("active");

    currentFormat = this.dataset.format;

    drawPoster(currentFormat);
  });

});


/* =========================
   PHOTO UPLOAD
========================= */

const photoInput = document.getElementById("photo");

if (photoInput) {

  photoInput.addEventListener("change", function (event) {

    const file = event.target.files && event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

      const img = new Image();

      img.onload = function () {
        uploadedImage = img;
        drawPoster(currentFormat);
      };

      img.onerror = function () {
        alert("Image load failed.");
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });

}


/* =========================
   INPUT EVENTS
========================= */

[
  "productName",
  "weight",
  "price",
  "occasion",
  "tagline"
].forEach(id => {

  const element = document.getElementById(id);

  if (element) {

    element.addEventListener("input", function () {
      drawPoster(currentFormat);
    });

  }

});


/* =========================
   OCCASION
========================= */

function occasionHeadline(occasion, product) {

  const text = String(occasion || "").toLowerCase();

  if (
    text.includes("janmashtami") ||
    text.includes("જન્માષ્ટમી")
  ) {
    return "શ્રી કૃષ્ણ જન્માષ્ટમી સ્પેશિયલ";
  }

  if (
    text.includes("diwali") ||
    text.includes("દિવાળી")
  ) {
    return "દિવાળી સ્પેશિયલ";
  }

  if (
    text.includes("navratri") ||
    text.includes("નવરાત્રી")
  ) {
    return "નવરાત્રી સ્પેશિયલ";
  }

  if (
    text.includes("uttarayan") ||
    text.includes("ઉતરાયણ")
  ) {
    return "ઉતરાયણ સ્પેશિયલ";
  }

  if (
    text.includes("holi") ||
    text.includes("હોળી")
  ) {
    return "હોળી સ્પેશિયલ";
  }

  if (
    text.includes("raksha") ||
    text.includes("રક્ષાબંધન")
  ) {
    return "રક્ષાબંધન સ્પેશિયલ";
  }

  if (
    text.includes("independence") ||
    text.includes("15 aug") ||
    text.includes("સ્વતંત્રતા")
  ) {
    return "સ્વતંત્રતા દિવસ સ્પેશિયલ";
  }

  return product
    ? product + " માટે ખાસ પસંદગી"
    : "આજની ખાસ પસંદગી";
}


/* =========================
   COVER IMAGE
========================= */

function fitCover(img, x, y, w, h) {

  if (!img || !img.width || !img.height) return;

  const ratio = Math.max(
    w / img.width,
    h / img.height
  );

  const newWidth = img.width * ratio;
  const newHeight = img.height * ratio;

  ctx.drawImage(
    img,
    x + (w - newWidth) / 2,
    y + (h - newHeight) / 2,
    newWidth,
    newHeight
  );
}


/* =========================
   ROUNDED IMAGE
========================= */

function roundedRectPath(x, y, w, h, radius) {

  ctx.beginPath();

  if (typeof ctx.roundRect === "function") {

    ctx.roundRect(
      x,
      y,
      w,
      h,
      radius
    );

  } else {

    ctx.moveTo(x + radius, y);

    ctx.lineTo(x + w - radius, y);

    ctx.quadraticCurveTo(
      x + w,
      y,
      x + w,
      y + radius
    );

    ctx.lineTo(
      x + w,
      y + h - radius
    );

    ctx.quadraticCurveTo(
      x + w,
      y + h,
      x + w - radius,
      y + h
    );

    ctx.lineTo(
      x + radius,
      y + h
    );

    ctx.quadraticCurveTo(
      x,
      y + h,
      x,
      y + h - radius
    );

    ctx.lineTo(
      x,
      y + radius
    );

    ctx.quadraticCurveTo(
      x,
      y,
      x + radius,
      y
    );
  }
}


function drawRoundedImage(img, x, y, w, h, radius) {

  ctx.save();

  roundedRectPath(
    x,
    y,
    w,
    h,
    radius
  );

  ctx.clip();

  fitCover(
    img,
    x,
    y,
    w,
    h
  );

  ctx.restore();
}


/* =========================
   DRAW POSTER
========================= */

function drawPoster(format) {

  if (!canvas || !ctx) {
    console.error("posterCanvas not found.");
    return;
  }

  const settings = formats[format];

  if (!settings) {
    console.error("Invalid poster format:", format);
    return;
  }

  const theme =
    designs[designIndex % designs.length];

  const W = settings.width;
  const H = settings.height;

  const vertical = H > W;

  canvas.width = W;
  canvas.height = H;

  /* FORM DATA */

  const name =
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


  /* BACKGROUND */

  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, W, H);


  /* BORDER */

  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 8;

  ctx.strokeRect(
    28,
    28,
    W - 56,
    H - 56
  );


  /* HEADER */

  const headerH =
    vertical ? 245 : 190;

  ctx.fillStyle = theme.panel;

  ctx.fillRect(
    0,
    0,
    W,
    headerH
  );


  ctx.textAlign = "center";

  ctx.fillStyle = theme.gold;

  ctx.font =
    "bold " +
    (vertical ? 42 : 36) +
    "px Arial";

  ctx.fillText(
    "🪔 JYOTI GRUH UDHYOG",
    W / 2,
    vertical ? 88 : 72
  );


  ctx.fillStyle = "#FFF8EA";

  ctx.font = "22px Arial";

  ctx.fillText(
    "RAJKOT • PREMIUM HOMEMADE TASTE",
    W / 2,
    vertical ? 140 : 118
  );


  ctx.fillStyle = theme.gold;

  ctx.font = "bold 18px Arial";

  ctx.fillText(
    settings.label,
    W / 2,
    vertical ? 195 : 165
  );


  /* PRODUCT PHOTO */

  const imgX =
    vertical ? 65 : 80;

  const imgY =
    vertical ? 300 : 235;

  const imgW =
    W - imgX * 2;

  const imgH =
    vertical ? 830 : 500;


  ctx.fillStyle = theme.light;

  ctx.fillRect(
    imgX - 12,
    imgY - 12,
    imgW + 24,
    imgH + 24
  );


  if (uploadedImage) {

    drawRoundedImage(
      uploadedImage,
      imgX,
      imgY,
      imgW,
      imgH,
      28
    );

  } else {

    ctx.fillStyle = "#E3CFAD";

    ctx.fillRect(
      imgX,
      imgY,
      imgW,
      imgH
    );

    ctx.fillStyle = theme.panel;

    ctx.font =
      "bold " +
      (vertical ? 52 : 44) +
      "px Arial";

    ctx.fillText(
      "PRODUCT PHOTO",
      W / 2,
      imgY + imgH / 2
    );
  }


  /* PRODUCT INFO */

  let y =
    imgY +
    imgH +
    (vertical ? 95 : 82);


  /* OCCASION */

  if (occasion) {

    ctx.fillStyle = theme.gold;

    ctx.fillRect(
      80,
      y - 48,
      W - 160,
      70
    );

    ctx.fillStyle = theme.panel;

    ctx.font =
      "bold " +
      (vertical ? 28 : 24) +
      "px Arial";

    ctx.fillText(
      occasionHeadline(
        occasion,
        name
      ),
      W / 2,
      y - 2
    );

    y += 78;
  }


  /* PRODUCT NAME */

  ctx.fillStyle = theme.panel;

  ctx.font =
    "bold " +
    (vertical ? 66 : 58) +
    "px Arial";

  ctx.fillText(
    name,
    W / 2,
    y
  );


  /* TAGLINE */

  ctx.fillStyle = "#6C5138";

  ctx.font =
    (vertical ? 31 : 27) +
    "px Arial";

  ctx.fillText(
    tagline,
    W / 2,
    y + 54
  );


  /* PRICE */

  const badgeY = y + 88;

  ctx.fillStyle = theme.panel;

  roundedRectPath(
    W / 2 - 235,
    badgeY,
    470,
    82,
    41
  );

  ctx.fill();


  ctx.fillStyle = theme.gold;

  ctx.font =
    "bold " +
    (vertical ? 40 : 34) +
    "px Arial";

  ctx.fillText(
    weight + "  •  " + price,
    W / 2,
    badgeY + 55
  );


  /* FOOTER */

  ctx.fillStyle = theme.panel;

  ctx.font =
    "bold " +
    (vertical ? 34 : 29) +
    "px Arial";

  ctx.fillText(
    "📞 Order Now: 9712149344",
    W / 2,
    H - 105
  );


  ctx.fillStyle = "#7B6045";

  ctx.font =
    (vertical ? 21 : 19) +
    "px Arial";

  ctx.fillText(
    "Fresh • Premium • Hygienic • Jyoti Gruh Udhyog",
    W / 2,
    H - 65
  );


  ctx.textAlign = "left";
}


/* =========================
   GENERATE
========================= */

function generateAllPosters(increment = true) {

  if (increment) {
    designIndex++;
  }

  drawPoster("square");

  drawPoster("story");

  drawPoster("status");

  drawPoster(currentFormat);


  const counter =
    document.getElementById("posterCount");

  if (increment && counter) {

    const current =
      Number(counter.textContent) || 0;

    counter.textContent =
      String(current + 1);
  }
}


/* =========================
   DOWNLOAD SINGLE
========================= */

function downloadPoster(format) {

  if (!canvas || !ctx) {
    alert("Poster canvas not found.");
    return;
  }

  drawPoster(format);

  setTimeout(function () {

    try {

      const product =
        document.getElementById("productName")?.value ||
        "jyoti-poster";

      const safe =
        product
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9\-_]/g, "") ||
        "jyoti-poster";


      const imageURL =
        canvas.toDataURL(
          "image/png",
          1.0
        );


      const link =
        document.createElement("a");

      link.href = imageURL;

      link.download =
        safe + "-" + format + ".png";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

    } catch (error) {

      console.error(
        "Download error:",
        error
      );

      alert(
        "Download error. Please try again."
      );
    }

  }, 100);
}


/* =========================
   DOWNLOAD ALL
========================= */

function downloadAllPosters() {

  const oldFormat =
    currentFormat;

  const formatsToDownload = [
    "square",
    "story",
    "status"
  ];


  formatsToDownload.forEach(
    function (format, index) {

      setTimeout(
        function () {
          downloadPoster(format);
        },
        index * 1200
      );

    }
  );


  setTimeout(
    function () {

      currentFormat =
        oldFormat;

      drawPoster(oldFormat);

    },
    4000
  );
}


/* =========================
   NEW DESIGN
========================= */

function generateNewDesign() {

  designIndex++;

  generateAllPosters(false);
}


/* =========================
   GLOBAL FUNCTIONS
========================= */

window.showSection =
  showSection;

window.generateAllPosters =
  generateAllPosters;

window.generateNewDesign =
  generateNewDesign;

window.downloadPoster =
  downloadPoster;

window.downloadAllPosters =
  downloadAllPosters;


/* =========================
   CALENDAR
========================= */

const occasions = [

  "Aug 15 — Independence Day",

  "Aug 16 — Daily Product",

  "Aug 26 — Janmashtami",

  "Sep 4 — Ganesh Chaturthi",

  "Sep 15 — Navratri preparation",

  "Oct 20 — Diwali preparation"

];


const calendarList =
  document.getElementById(
    "calendarList"
  );


if (calendarList) {

  calendarList.innerHTML =
    occasions
      .map(function (item) {

        const parts =
          item.split(" — ");

        return `
          <div class="plan">
            <b>${parts[0]}</b>
            <span>${parts[1]}</span>
          </div>
        `;

      })
      .join("");
}


/* =========================
   INITIAL POSTER
========================= */

generateAllPosters(false);

console.log(
  "Jyoti AI Marketing loaded successfully."
);