/* ==========================================
   JYOTI AI — REAL AI POSTER GENERATOR
========================================== */

const JYOTI_AI_API =
  "https://jyoti-ai-image-api.vercel.app/api/generate";


async function imageToDataURL(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);

    reader.onerror = () =>
      reject(new Error("Product image read failed."));

    reader.readAsDataURL(file);

  });

}


async function generateAIProductPoster() {

  const button =
    document.getElementById("generateButton");

  const photo =
    document.getElementById("photo");

  const product =
    document.getElementById("productName")?.value || "";

  const weightValue =
    document.getElementById("weight")?.value || "";

  const priceValue =
    document.getElementById("price")?.value || "";

  const occasionValue =
    document.getElementById("occasion")?.value || "";

  const taglineValue =
    document.getElementById("tagline")?.value || "";


  if (!photo?.files?.length) {

    alert("પહેલા Product Photo select કરો.");

    return;

  }


  if (button) {

    button.disabled = true;

    button.textContent =
      "🤖 AI Design બનાવી રહ્યું છે...";

  }


  try {

    const file =
      photo.files[0];


    const imageData =
      await imageToDataURL(file);


    const prompt = `

Create a premium advertising poster for Jyoti Gruh Udhyog, Rajkot.

PRODUCT:
${product}

WEIGHT:
${weightValue}

PRICE:
${priceValue}

OCCASION:
${occasionValue}

TAGLINE:
${taglineValue}

DESIGN REQUIREMENTS:

Create a completely new premium design.

Use the uploaded product photo as the main product reference.

Do not replace the product with another product.

Premium Golden Brown and Deep Chocolate Brown theme.

Luxury Indian food advertising style.

Elegant premium composition.

Realistic product presentation.

Warm studio lighting.

Gold foil accents.

Embossed / raised 3D typography appearance.

Premium Gujarati-friendly typography.

JYOTI GRUH UDHYOG

RAJKOT

Order Now:
9712149344

Keep the supplied product, weight and price accurate.

Do not invent another phone number.

Do not invent another price.

Do not add unrelated brands.

No watermark.

Final image:
1024 x 1024 pixels.

Generate a fresh creative composition.
`;


    const response =
      await fetch(
        JYOTI_AI_API,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            prompt: prompt,

            image: imageData,

            productName: product,

            weight: weightValue,

            price: priceValue,

            occasion: occasionValue

          })

        }
      );


    const result =
      await response.json();


    console.log(
      "Jyoti AI Response:",
      result
    );


    if (!response.ok) {

      throw new Error(
        result.error ||
        result.message ||
        "AI API failed."
      );

    }


    if (!result.image_url) {

      throw new Error(
        "AI image response મળ્યો નથી."
      );

    }


    showAIResult(
      result.image_url
    );


  } catch (error) {

    console.error(
      "AI Poster Error:",
      error
    );


    alert(
      "AI Poster Generate Error:\n\n" +
      error.message
    );


  } finally {

    if (button) {

      button.disabled = false;

      button.textContent =
        "🤖 Generate AI Poster";

    }

  }

}


/* ==========================================
   AI RESULT
========================================== */

function showAIResult(imageURL) {

  let resultBox =
    document.getElementById(
      "aiGeneratedPoster"
    );


  if (!resultBox) {

    resultBox =
      document.createElement("div");

    resultBox.id =
      "aiGeneratedPoster";

    resultBox.style.cssText = `
      margin-top:25px;
      padding:18px;
      border-radius:20px;
      background:#5A3218;
      border:2px solid #C89B3C;
      text-align:center;
      color:#FFF8EA;
    `;


    const preview =
      document.querySelector(
        ".preview-card"
      );


    if (preview) {

      preview.appendChild(
        resultBox
      );

    }

  }


  resultBox.innerHTML = `

    <h3>
      ✨ AI Generated Poster
    </h3>

    <p>
      1024 × 1024 • WebP
    </p>

    <img
      src="${imageURL}"
      alt="Jyoti AI Poster"
      style="
        width:100%;
        max-width:600px;
        display:block;
        margin:15px auto;
        border-radius:16px;
      "
    >

    <a
      href="${imageURL}"
      download="jyoti-ai-poster.webp"
      style="
        display:inline-block;
        padding:13px 24px;
        background:#C89B3C;
        color:#4A2815;
        border-radius:12px;
        text-decoration:none;
        font-weight:bold;
      "
    >
      ⬇ Download AI Poster
    </a>

  `;


  resultBox.scrollIntoView({
    behavior:"smooth",
    block:"center"
  });

}


/* ==========================================
   CONNECT BUTTON
========================================== */

const aiGenerateButton =
  document.getElementById(
    "generateButton"
  );


if (aiGenerateButton) {

  aiGenerateButton.onclick =
    generateAIProductPoster;

}


window.generateAIProductPoster =
  generateAIProductPoster;