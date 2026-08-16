/* =========================================================
   JYOTI AI MARKETING
   COMPLETE APP.JS
   Golden Brown Poster + AI Image Generator
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const AI_API_URL =
  "https://jyoti-ai-image-api.vercel.app/api/generate";


/* =========================================================
   GLOBAL STATE
========================================================= */

let uploadedImage = null;
let uploadedImageData = null;

let currentFormat = "square";
let designIndex = 0;


/* =========================================================
   DOM
========================================================= */

const canvas =
  document.getElementById("posterCanvas");

const ctx =
  canvas ? canvas.getContext("2d") : null;


/* =========================================================
   FORMATS
========================================================= */

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


/* =========================================================
   GOLDEN BROWN DESIGNS
========================================================= */

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


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function showSection(id) {

  document
    .querySelectorAll(".section")
    .forEach(function(section) {

      section.classList.remove("active");

    });


  const target =
    document.getElementById(id);


  if (target) {

    target.classList.add("active");

  }


  document
    .querySelectorAll(".nav")
    .forEach(function(nav) {

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


  const title =
    document.getElementById("pageTitle");


  if (title) {

    title.textContent =
      titles[id] || "Jyoti AI Marketing";

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   NAV BUTTONS
========================================================= */

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


/* =========================================================
   CREATE POSTER BUTTONS
========================================================= */

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


/* =========================================================
   OTHER DASHBOARD BUTTONS
========================================================= */

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


/* =========================================================
   FORM ELEMENTS
========================================================= */

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

const photoInput =
  document.getElementById(
    "photo"
  );


/* =========================================================
   FORM LIVE PREVIEW
========================================================= */

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


/* =========================================================
   FORMAT BUTTONS
========================================================= */

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


/* =========================================================
   WEBP / IMAGE UPLOAD
========================================================= */

if (photoInput) {

  photoInput.addEventListener(
    "change",
    function(event) {

      const file =
        event.target.files &&
        event.target.files[0];


      if (!file) return;


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

          uploadedImageData =
            e.target.result;


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
                "Product image load failed."
              );

            };


          image.src =
            e.target.result;

        };


      reader.onerror =
        function() {

          alert(
            "Product image read failed."
          );

        };


      reader.readAsDataURL(
        file
      );

    }
  );

}


/* =========================================================
   OCCASION HEADLINE
========================================================= */

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


/* =========================================================
   ROUNDED RECTANGLE
========================================================= */

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


/* =========================================================
   IMAGE COVER
========================================================= */

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


/* =========================================================
   ROUNDED IMAGE
========================================================= */

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


/* =========================================================
   DRAW NORMAL POSTER
========================================================= */

function drawPoster(
  format = "square"
) {

  if (!canvas || !ctx) {

    console.error(
      "posterCanvas not found."
    );

    return;

  }


  const settings =
    formats[format];


  if (!settings) return;


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


  canvas.width =
    W;

  canvas.height =
    H;


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

  ctx.lineWidth =
    8;

  ctx.strokeRect(
    28,
    28,
    W - 56,
    H - 56
  );


  /* HEADER */

  const headerHeight =
    vertical ? 245 : 190;


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


  ctx.fillStyle =
    "#FFF8EA";


  ctx.font =
    "22px Arial";


  ctx.fillText(
    "RAJKOT • PREMIUM HOMEMADE TASTE",
    W / 2,
    vertical ? 140 : 118
  );


  ctx.fillStyle =
    theme.gold;


  ctx.font =
    "bold 18px Arial";


  ctx.fillText(
    settings.label,
    W / 2,
    vertical ? 195 : 165
  );


  /* IMAGE */

  const imgX =
    vertical ? 65 : 80;

  const imgY =
    vertical ? 300 : 235;

  const imgW =
    W - imgX * 2;

  const imgH =
    vertical ? 830 : 500;


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


  let y =
    imgY +
    imgH +
    (vertical ? 95 : 82);


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


  /* PRICE */

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
      " • " +
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


/* =========================================================
   NORMAL 3 POSTERS
========================================================= */

function generateAllPosters(
  increase = true
) {

  if (increase) {

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


  if (increase && counter) {

    const value =
      Number(
        counter.textContent
      ) || 0;


    counter.textContent =
      String(value + 1);

  }

}


/* =========================================================
   DOWNLOAD CANVAS POSTER
========================================================= */

function downloadPoster(
  format
) {

  drawPoster(
    format
  );


  setTimeout(function() {

    try {

      const name =
        productName?.value ||
        "jyoti-poster";


      const safe =
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


      const data =
        canvas.toDataURL(
          "image/png"
        );


      const link =
        document.createElement("a");


      link.href =
        data;


      link.download =
        safe +
        "-" +
        format +
        ".png";


      document.body.appendChild(
        link
      );


      link.click();


      link.remove();

    } catch (error) {

      console.error(
        "Download error:",
        error
      );

      alert(
        "Download failed."
      );

    }

  }, 100);

}


/* =========================================================
   DOWNLOAD ALL
========================================================= */

function downloadAllPosters() {

  const list = [
    "square",
    "story",
    "status"
  ];


  list.forEach(
    function(format, index) {

      setTimeout(
        function() {

          downloadPoster(
            format
          );

        },
        index * 1500
      );

    }
  );

}


/* =========================================================
   AI PROMPT
========================================================= */

function buildAIPrompt() {

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
    "Daily Product";


  const productTagline =
    tagline?.value ||
    "Fresh • Premium • Homemade Taste";


  return `

Create a completely NEW premium food advertising poster
for Jyoti Gruh Udhyog, Rajkot.

PRODUCT:
${name}

PACK SIZE:
${productWeight}

PRICE:
${productPrice}

OCCASION:
${productOccasion}

TAGLINE:
${productTagline}

BRAND:
JYOTI GRUH UDHYOG

LOCATION:
RAJKOT

CONTACT:
9712149344

DESIGN STYLE:

Premium Golden Brown.
Deep chocolate brown.
Luxury Indian food brand.
Warm elegant lighting.
Premium commercial food photography.
Clean sophisticated composition.
Gold foil accents.
Embossed / raised 3D typography look.
Premium Gujarati-friendly visual style.

IMPORTANT:

Use the uploaded product photo as the main product reference.

Keep the actual product visually recognizable.

Do not replace the product with an unrelated product.

Do not invent another price.

Do not invent another weight.

Do not invent another phone number.

Do not add unrelated brands.

No watermark.

Make the composition look like a professionally designed
premium Indian food advertisement.

Generate a fresh layout every time.

FINAL SIZE:
1024 x 1024 pixels.

OUTPUT:
WebP.
`;

}


/* =========================================================
   AI GENERATION
========================================================= */

async function generateAIProductPoster() {

  if (!uploadedImageData) {

    alert(
      "પહેલા Product Photo select કરો."
    );

    return;

  }


  const button =
    document.getElementById(
      "generateButton"
    );


  const oldText =
    button
      ? button.textContent
      : "";


  if (button) {

    button.disabled =
      true;

    button.textContent =
      "🤖 AI Design બનાવી રહ્યું છે...";

  }


  try {

    const response =
      await fetch(
        AI_API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            prompt:
              buildAIPrompt(),

            image:
              uploadedImageData,

            productName:
              productName?.value || "",

            weight:
              weight?.value || "",

            price:
              price?.value || "",

            occasion:
              occasion?.value || ""

          })

        }
      );


    const raw =
      await response.text();


    let result;


    try {

      result =
        JSON.parse(raw);

    } catch {

      throw new Error(
        "API returned invalid response."
      );

    }


    console.log(
      "Jyoti AI API:",
      result
    );


    if (!response.ok) {

      throw new Error(
        result.error ||
        result.message ||
        "AI API Error " +
        response.status
      );

    }


    const imageURL =
      result.image_url ||
      result.url ||
      result.image ||
      result.data?.[0]?.url;


    if (!imageURL) {

      throw new Error(
        "AI image URL મળ્યું નથી."
      );

    }


    showAIResult(
      imageURL,
      result
    );


  } catch (error) {

    console.error(
      "Jyoti AI Error:",
      error
    );


    alert(
      "AI Poster Generate Error:\n\n" +
      error.message
    );


  } finally {

    if (button) {

      button.disabled =
        false;

      button.textContent =
        oldText ||
        "🤖 Generate AI Poster";

    }

  }

}


/* =========================================================
   AI RESULT DISPLAY
========================================================= */

function showAIResult(
  imageURL,
  apiResult
) {

  let box =
    document.getElementById(
      "aiGeneratedPoster"
    );


  if (!box) {

    box =
      document.createElement(
        "div"
      );


    box.id =
      "aiGeneratedPoster";


    box.style.cssText = `

      margin-top:25px;

      padding:20px;

      border-radius:20px;

      background:#5A3218;

      border:2px solid #C89B3C;

      color:#FFF8EA;

      text-align:center;

    `;


    const preview =
      document.querySelector(
        ".preview-card"
      );


    if (preview) {

      preview.appendChild(
        box
      );

    } else {

      document.body.appendChild(
        box
      );

    }

  }


  const size =
    apiResult?.size_kb
      ? apiResult.size_kb + " KB"
      : "";


  box.innerHTML = "";


  const title =
    document.createElement(
      "h3"
    );


  title.textContent =
    "✨ AI Generated Poster";


  const info =
    document.createElement(
      "p"
    );


  info.textContent =
    "1024 × 1024 • WebP" +
    (size ? " • " + size : "");


  const image =
    document.createElement(
      "img"
    );


  image.src =
    imageURL;


  image.alt =
    "Jyoti Gruh Udhyog AI Poster";


  image.style.cssText = `

    width:100%;

    max-width:650px;

    display:block;

    margin:15px auto;

    border-radius:16px;

  `;


  const download =
    document.createElement(
      "a"
    );


  download.href =
    imageURL;


  download.download =
    "jyoti-ai-poster.webp";


  download.textContent =
    "⬇ Download AI Poster";


  download.style.cssText = `

    display:inline-block;

    padding:13px 24px;

    background:#C89B3C;

    color:#4A2815;

    border-radius:12px;

    text-decoration:none;

    font-weight:bold;

  `;


  box.appendChild(
    title
  );


  box.appendChild(
    info
  );


  box.appendChild(
    image
  );


  box.appendChild(
    download
  );


  box.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}


/* =========================================================
   GENERATE BUTTON
========================================================= */

const generateButton =
  document.getElementById(
    "generateButton"
  );


if (generateButton) {

  generateButton.addEventListener(
    "click",
    function() {

      generateAIProductPoster();

    }
  );

}


/* =========================================================
   DOWNLOAD ALL BUTTON
========================================================= */

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


/* =========================================================
   REVIEW
========================================================= */

const reviewButton =
  document.getElementById(
    "reviewPosterButton"
  );


if (reviewButton) {

  reviewButton.addEventListener(
    "click",
    function() {

      showSection(
        "poster"
      );

    }
  );

}


/* =========================================================
   CALENDAR
========================================================= */

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
      .map(function(item) {

        const parts =
          item.split(" — ");


        return `

          <div class="plan">

            <b>
              ${parts[0]}
            </b>

            <span>
              ${parts[1]}
            </span>

          </div>

        `;

      })
      .join("");

}


/* =========================================================
   30 DAY PLAN
========================================================= */

const planButton =
  document.getElementById(
    "planButton"
  );


if (planButton) {

  planButton.addEventListener(
    "click",
    function() {

      alert(
        "30-Day AI Marketing Plan will be connected next."
      );

    }
  );

}


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.showSection =
  showSection;

window.generateAllPosters =
  generateAllPosters;

window.downloadPoster =
  downloadPoster;

window.downloadAllPosters =
  downloadAllPosters;

window.generateAIProductPoster =
  generateAIProductPoster;


/* =========================================================
   INITIAL PREVIEW
========================================================= */

if (canvas) {

  generateAllPosters(
    false
  );

}


console.log(
  "✅ Jyoti AI Marketing loaded."
);