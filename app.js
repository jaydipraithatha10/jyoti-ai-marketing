/* ===============================
   REAL AI IMAGE GENERATOR
   =============================== */

const AI_API_URL =
  "https://jyoti-ai-image-api.vercel.app/api/generate";

async function generateAIImage() {

  const product =
    document.getElementById("productName")?.value || "Jyoti Special";

  const weight =
    document.getElementById("weight")?.value || "";

  const price =
    document.getElementById("price")?.value || "";

  const occasion =
    document.getElementById("occasion")?.value || "";

  const tagline =
    document.getElementById("tagline")?.value ||
    "Fresh • Premium • Homemade Taste";

  const prompt = `
Create a premium advertising poster for Jyoti Gruh Udhyog, Rajkot.

Product: ${product}
Pack Size: ${weight}
Price: ${price}
Occasion: ${occasion}
Tagline: ${tagline}

Design:
Premium Golden Brown and Deep Chocolate Brown theme.
Luxury Indian food brand style.
Realistic appetizing food presentation.
Premium embossed 3D typography.
Gold foil / embossed text effect.
Elegant studio lighting.
Clean premium composition.
JYOTI GRUH UDHYOG branding.
RAJKOT.
Order Now: 9712149344.

Do not invent any additional price,
phone number or brand name.
No watermark.
`;

  try {

    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        size:
          currentFormat === "square"
            ? "1024x1024"
            : "1024x1536"
      })
    });

    const result = await response.json();

    console.log("AI API Response:", result);

    if (!response.ok) {
      throw new Error(
        result.error ||
        result.message ||
        "AI API Error"
      );
    }

    const imageUrl =
      result.image_url ||
      result.url ||
      result.image ||
      result.data?.[0]?.url ||
      result.data?.[0]?.b64_json;

    if (!imageUrl) {
      throw new Error(
        "API response માં image મળ્યું નથી."
      );
    }

    const imageSrc =
      imageUrl.startsWith("data:")
        ? imageUrl
        : imageUrl.startsWith("http")
          ? imageUrl
          : `data:image/png;base64,${imageUrl}`;

    showAIImage(imageSrc);

  } catch (error) {

    console.error("AI Generation Error:", error);

    alert(
      "AI Poster Generate Error:\n\n" +
      error.message
    );
  }
}


function showAIImage(imageSrc) {

  let box =
    document.getElementById("aiResult");

  if (!box) {

    box = document.createElement("div");

    box.id = "aiResult";

    box.style.cssText = `
      margin-top:25px;
      padding:20px;
      background:#5A3218;
      border:2px solid #C89B3C;
      border-radius:20px;
      text-align:center;
      color:white;
    `;

    document
      .getElementById("poster")
      ?.appendChild(box);
  }

  box.innerHTML = `
    <h3>✨ AI Generated Poster</h3>

    <img
      src="${imageSrc}"
      style="
        width:100%;
        max-width:650px;
        border-radius:15px;
        display:block;
        margin:15px auto;
      "
    >

    <a
      href="${imageSrc}"
      download="jyoti-ai-poster.png"
      style="
        display:inline-block;
        background:#C89B3C;
        color:#4A2815;
        padding:12px 22px;
        border-radius:10px;
        text-decoration:none;
        font-weight:bold;
      "
    >
      ⬇ Download AI Poster
    </a>
  `;

  box.scrollIntoView({
    behavior: "smooth"
  });
}

window.generateAIImage = generateAIImage;