/* =====================================================
   JYOTI AI MARKETING
   PREMIUM POSTER ENGINE
   Version 2.0
===================================================== */


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let uploadedImage = null;

let currentFormat = "square";

let designIndex = 0;


/* =====================================================
   ELEMENTS
===================================================== */

const canvas =
  document.getElementById("posterCanvas");

const ctx =
  canvas
    ? canvas.getContext("2d")
    : null;


/* =====================================================
   FORMATS
===================================================== */

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


/* =====================================================
   DESIGNS
===================================================== */

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


/* =====================================================
   SECTION NAVIGATION
===================================================== */

function showSection(id) {

  const sections =
    document.querySelectorAll(".section");

  sections.forEach(function(section) {

    section.classList.remove("active");

  });


  const target =
    document.getElementById(id);

  if (target) {

    target.classList.add("active");

  }


  const navs =
    document.querySelectorAll(".nav");

  navs.forEach(function(nav) {

    nav.classList.toggle(
      "active",
      nav.dataset.section === id
    );

  });


  const titles = {

    dashboard:
      "Good Morning, Jyoti Gruh Udhyog",

    poster:
      "3-Format Poster Generator",

    calendar:
      "Occasion & Daily Calendar",

    reviews:
      "Review Marketing",

    publishing:
      "Social Publishing",

    analytics:
      "Marketing Analytics"

  };


  const pageTitle =
    document.getElementById("pageTitle");


  if (pageTitle) {

    pageTitle.textContent =
      titles[id] || "Jyoti AI Marketing";

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   NAV BUTTONS
===================================================== */

document
  .querySelectorAll(".nav")
  .forEach(function(nav) {

    nav.addEventListener(
      "click",
      function() {

        showSection(
          this.dataset.section
        );

      }
    );

  });


/* =====================================================
   CREATE POSTER BUTTONS
===================================================== */

const topCreatePoster =
  document.getElementById(
    "topCreatePoster"
  );


if (topCreatePoster) {

  topCreatePoster.addEventListener(
    "click",
    function() {

      showSection("poster");

    }
  );

}


document
  .querySelectorAll(".create-poster-btn")
  .forEach(function(button) {

    button.addEventListener(
      "click",
      function() {

        showSection("poster");

      }
    );

  });


/* =====================================================
   OTHER SECTION BUTTONS
===================================================== */

document
  .querySelectorAll(".open-section-btn")
  .forEach(function(button) {

    button.addEventListener(
      "click",
      function() {

        const section =
          this.dataset.open;

        if (section) {

          showSection(section);

        }

      }
    );

  });


/* =====================================================
   FORMAT BUTTONS
===================================================== */

document
  .querySelectorAll(".format")
  .forEach(function(button) {

    button.addEventListener(
      "click",
      function() {

        document
          .querySelectorAll(".format")
          .forEach(function(btn) {

            btn.classList.remove(
              "active"
            );

          });


        this.classList.add("active");


        currentFormat =
          this.dataset.format;


        drawPoster(
          currentFormat
        );

      }
    );

  });


/* =====================================================
   INPUT ELEMENTS
===================================================== */

const productName =
  document.getElementById(
    "productName"
  );

const weight =
  document.getElementById(
    "weight"
  );

const price =
  document.getElementById(
    "price"
  );

const occasion =
  document.getElementById(
    "occasion"
  );

const tagline =
  document.getElementById(
    "tagline"
  );


[
  productName,
  weight,
  price,
  occasion,
  tagline
].forEach(function(element) {

  if (!element) return;

  element.addEventListener(
    "input",
    function() {

      drawPoster(
        currentFormat
      );

    }
  );

});


/* =====================================================
   IMAGE UPLOAD
===================================================== */

const photoInput =
  document.getElementById(
    "photo"
  );


if (photoInput) {

  photoInput.addEventListener(
    "change",
    function(event) {

      const file =
        event.target.files &&
        event.target.files[0];


      if (!file) {

        return;

      }


      if (
        !file.type ||
        !file.type.startsWith("image/")
      ) {

        alert(
          "Please select a valid image."
        );

        return;

      }


      const reader =
        new FileReader();


      reader.onload =
        function(e) {

          const image =
            new Image();


          image.onload =
            function() {

              uploadedImage =
                image;


              drawPoster(
                currentFormat
              );

            };


          image.onerror =
            function() {

              alert(
                "Image load failed."
              );

            };


          image.src =
            e.target.result;

        };


      reader.readAsDataURL(
        file
      );

    }
  );

}


/* =====================================================
   OCCASION HEADLINE
===================================================== */

function occasionHeadline(
  value,
  product
) {

  const text =
    String(value || "")
      .toLowerCase();


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


/* =====================================================
   ROUNDED RECTANGLE
===================================================== */

function roundedRect(
  x,
  y,
  width,
  height,
  radius
) {

  ctx.beginPath();


  if (
    typeof ctx.roundRect ===
    "function"
  ) {

    ctx.roundRect(
      x,
      y,
      width,
      height,
      radius
    );

    return;

  }


  ctx.moveTo(
    x + radius,
    y
  );


  ctx.lineTo(
    x + width - radius,
    y
  );


  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );


  ctx.lineTo(
    x + width,
    y + height - radius
  );


  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );


  ctx.lineTo(
    x + radius,
    y + height
  );


  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
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


/* =====================================================
   IMAGE COVER
===================================================== */

function fitCover(
  image,
  x,
  y,
  width,
  height
) {

  if (
    !image ||
    !image.width ||
    !image.height
  ) {

    return;

  }


  const ratio =
    Math.max(
      width / image.width,
      height / image.height
    );


  const newWidth =
    image.width * ratio;


  const newHeight =
    image.height * ratio;


  ctx.drawImage(

    image,

    x +
      (width - newWidth) / 2,

    y +
      (height - newHeight) / 2,

    newWidth,

    newHeight

  );

}


/* =====================================================
   ROUNDED IMAGE
===================================================== */

function drawRoundedImage(
  image,
  x,
  y,
  width,
  height,
  radius
) {

  ctx.save();


  roundedRect(
    x,
    y,
    width,
    height,
    radius
  );


  ctx.clip();


  fitCover(
    image,
    x,
    y,
    width,
    height
  );


  ctx.restore();

}


/* =====================================================
   DRAW POSTER
===================================================== */

function drawPoster(
  format
) {

  if (!canvas || !ctx) {

    console.error(
      "Canvas not found."
    );

    return;

  }


  const settings =
    formats[format];


  if (!settings) {

    console.error(
      "Invalid format:",
      format
    );

    return;

  }


  const theme =
    designs[
      designIndex %
      designs.length
    ];


  const W =
    settings.width;

  const H =
    settings.height;


  const vertical =
    H > W;


  canvas.width = W;

  canvas.height = H;


  /* FORM VALUES */

  const name =
    productName?.value ||
    "Jyoti Special";


  const productWeight =
    weight?.value ||
    "";


  const productPrice =
    price?.value ||
    "";


  const productOccasion =
    occasion?.value ||
    "";


  const productTagline =
    tagline?.value ||
    "Crispy • Fresh • Homemade Taste";


  /* BACKGROUND */

  ctx.fillStyle =
    theme.bg;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );


  /* BORDER */

  ctx.strokeStyle =
    theme.gold;

  ctx.lineWidth = 8;

  ctx.strokeRect(
    28,
    28,
    W - 56,
    H - 56
  );


  /* HEADER */

  const headerHeight =
    vertical
      ? 245
      : 190;


  ctx.fillStyle =
    theme.panel;


  ctx.fillRect(
    0,
    0,
    W,
    headerHeight
  );


  ctx.textAlign =
    "center";


  /* BRAND */

  ctx.fillStyle =
    theme.gold;


  ctx.font =
    "bold " +
    (vertical ? 42 : 36) +
    "px Arial";


  ctx.fillText(
    "🪔 JYOTI GRUH UDHYOG",
    W / 2,
    vertical ? 88 : 72
  );


  /* SUBTITLE */

  ctx.fillStyle =
    "#FFF8EA";


  ctx.font =
    "22px Arial";


  ctx.fillText(
    "RAJKOT • PREMIUM HOMEMADE TASTE",
    W / 2,
    vertical ? 140 : 118
  );


  /* FORMAT */

  ctx.fillStyle =
    theme.gold;


  ctx.font =
    "bold 18px Arial";


  ctx.fillText(
    settings.label,
    W / 2,
    vertical ? 195 : 165
  );


  /* PRODUCT IMAGE */

  const imgX =
    vertical
      ? 65
      : 80;


  const imgY =
    vertical
      ? 300
      : 235;


  const imgW =
    W -
    imgX * 2;


  const imgH =
    vertical
      ? 830
      : 500;


  ctx.fillStyle =
    theme.light;


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

    ctx.fillStyle =
      "#E3CFAD";


    ctx.fillRect(
      imgX,
      imgY,
      imgW,
      imgH
    );


    ctx.fillStyle =
      theme.panel;


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


  /* PRODUCT DETAILS */

  let y =
    imgY +
    imgH +
    (
      vertical
        ? 95
        : 82
    );


  /* OCCASION */

  if (productOccasion) {

    ctx.fillStyle =
      theme.gold;


    ctx.fillRect(
      80,
      y - 48,
      W - 160,
      70
    );


    ctx.fillStyle =
      theme.panel;


    ctx.font =
      "bold " +
      (vertical ? 28 : 24) +
      "px Arial";


    ctx.fillText(
      occasionHeadline(
        productOccasion,
        name
      ),
      W / 2,
      y - 2
    );


    y += 78;

  }


  /* PRODUCT NAME */

  ctx.fillStyle =
    theme.panel;


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

  ctx.fillStyle =
    "#6C5138";


  ctx.font =
    (vertical ? 31 : 27) +
    "px Arial";


  ctx.fillText(
    productTagline,
    W / 2,
    y + 54
  );


  /* PRICE BADGE */

  const badgeY =
    y + 88;


  ctx.fillStyle =
    theme.panel;


  roundedRect(
    W / 2 - 235,
    badgeY,
    470,
    82,
    41
  );


  ctx.fill();


  ctx.fillStyle =
    theme.gold;


  ctx.font =
    "bold " +
    (vertical ? 40 : 34) +
    "px Arial";


  ctx.fillText(
    productWeight +
      "  •  " +
      productPrice,
    W / 2,
    badgeY + 55
  );


  /* FOOTER */

  ctx.fillStyle =
    theme.panel;


  ctx.font =
    "bold " +
    (vertical ? 34 : 29) +
    "px Arial";


  ctx.fillText(
    "📞 Order Now: 9712149344",
    W / 2,
    H - 105
  );


  ctx.fillStyle =
    "#7B6045";


  ctx.font =
    (vertical ? 21 : 19) +
    "px Arial";


  ctx.fillText(
    "Fresh • Premium • Hygienic • Jyoti Gruh Udhyog",
    W / 2,
    H - 65
  );


  ctx.textAlign =
    "left";

}


/* =====================================================
   GENERATE 3 POSTERS
===================================================== */

function generateAllPosters(
  increaseCounter
) {

  if (
    increaseCounter === undefined
  ) {

    increaseCounter = true;

  }


  if (increaseCounter) {

    designIndex++;

  }


  drawPoster("square");

  drawPoster("story");

  drawPoster("status");


  drawPoster(
    currentFormat
  );


  const counter =
    document.getElementById(
      "posterCount"
    );


  if (
    increaseCounter &&
    counter
  ) {

    const value =
      Number(
        counter.textContent
      ) || 0;


    counter.textContent =
      String(value + 1);

  }

}


/* =====================================================
   DOWNLOAD ONE POSTER
===================================================== */

function downloadPoster(
  format
) {

  if (!canvas) {

    alert(
      "Poster canvas not found."
    );

    return;

  }


  drawPoster(
    format
  );


  setTimeout(
    function() {

      try {

        const name =
          productName?.value ||
          "jyoti-poster";


        const safeName =
          name
            .trim()
            .replace(
              /\s+/g,
              "-"
            )
            .replace(
              /[^a-zA-Z0-9\-_]/g,
              ""
            ) ||
          "jyoti-poster";


        const dataURL =
          canvas.toDataURL(
            "image/png"
          );


        const link =
          document.createElement(
            "a"
          );


        link.href =
          dataURL;


        link.download =
          safeName +
          "-" +
          format +
          ".png";


        document.body.appendChild(
          link
        );


        link.click();


        document.body.removeChild(
          link
        );

      }

      catch(error) {

        console.error(
          error
        );


        alert(
          "Download failed. Please try again."
        );

      }

    },
    150
  );

}


/* =====================================================
   DOWNLOAD ALL
===================================================== */

function downloadAllPosters() {

  const list = [
    "square",
    "story",
    "status"
  ];


  let index = 0;


  function nextDownload() {

    if (
      index >= list.length
    ) {

      drawPoster(
        currentFormat
      );

      return;

    }


    downloadPoster(
      list[index]
    );


    index++;


    setTimeout(
      nextDownload,
      1800
    );

  }


  nextDownload();

}


/* =====================================================
   GENERATE BUTTON
===================================================== */

const generateButton =
  document.getElementById(
    "generateButton"
  );


if (generateButton) {

  generateButton.addEventListener(
    "click",
    function() {

      generateAllPosters(
        true
      );

    }
  );

}


/* =====================================================
   DOWNLOAD ALL BUTTON
===================================================== */

const downloadAllButton =
  document.getElementById(
    "downloadAllButton"
  );


if (downloadAllButton) {

  downloadAllButton.addEventListener(
    "click",
    function() {

      downloadAllPosters();

    }
  );

}


/* =====================================================
   CALENDAR
===================================================== */

const occasions =
  [

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
      .map(function(item) {

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


/* =====================================================
   30 DAY PLAN
===================================================== */

const planButton =
  document.getElementById(
    "planButton"
  );


if (planButton) {

  planButton.addEventListener(
    "click",
    function() {

      alert(
        "30-Day Marketing Plan તૈયાર થશે. AI API integration પછી automatic plan generation પણ જોડાશે."
      );

    }
  );

}


/* =====================================================
   REVIEW BUTTON
===================================================== */

const reviewPosterButton =
  document.getElementById(
    "reviewPosterButton"
  );


if (reviewPosterButton) {

  reviewPosterButton.addEventListener(
    "click",
    function() {

      showSection(
        "poster"
      );

    }
  );

}


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.showSection =
  showSection;


window.generateAllPosters =
  generateAllPosters;


window.downloadPoster =
  downloadPoster;


window.downloadAllPosters =
  downloadAllPosters;


/* =====================================================
   INITIAL POSTER
===================================================== */

if (canvas) {

  generateAllPosters(
    false
  );

}


console.log(
  "✅ Jyoti AI Marketing app.js loaded successfully."
);