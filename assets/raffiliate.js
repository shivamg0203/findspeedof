```js
// ============================================================
// AFFILIATE PRODUCT ROTATOR
// ============================================================

// How many products to show at once
const PRODUCTS_PER_VIEW = 4;

// How often to change products (milliseconds)
// 15000 = 15 seconds
const ROTATION_INTERVAL = 15000;


// ============================================================
// PRODUCT LIST
// Add as many products as you want here
// ============================================================

const affiliateProducts = [

    // --------------------------------------------------------
    // PRODUCT 1
    // --------------------------------------------------------
    {
        image: "/assets/images/speedometerprem.webp",
        alt: "XPR3SS GPS Bicycle Speedometer",
        badge: "⭐ Recommended",
        title: "XPR3SS GPS Bicycle Speedometer",
        description: "Accurate speed & distance tracking.",
        link: "https://link.amazon/B0gzQdEXG"
    },


    // --------------------------------------------------------
    // PRODUCT 2
    // --------------------------------------------------------
    {
        image: "/assets/images/waterproof_odometer.webp",
        alt: "Lista 14 Waterproof Bicycle Odometer",
        badge: "⭐ Cheap and Reliable",
        title: "Lista 14 Waterproof Bicycle Odometer",
        description: "Waterproof design for all weather conditions.",
        link: "https://amzn.in/d/0bCp19ah"
    },


    // --------------------------------------------------------
    // PRODUCT 3
    // --------------------------------------------------------
    {
        image: "/assets/images/cp-plus-img.webp",
        alt: "CP PLUS 64GB microSDXC Memory Card",
        badge: "⭐ Recommended",
        title: "CP PLUS 64GB microSDXC Memory Card",
        description: "UHS-3 Class 10 card with up to 70 Mbps read & 30 Mbps write speeds.",
        link: "https://link.amazon/B0jhKULWl"
    },


    // --------------------------------------------------------
    // PRODUCT 4
    // --------------------------------------------------------
    {
        image: "/assets/images/fastrack-revoltt-s1.webp",
        alt: "Fastrack Revoltt S1 Smart Watch",
        badge: "⭐ Recommended",
        title: "Fastrack Revoltt S1 Smart Watch",
        description: "1.83” TFT 2.5D display, Bluetooth calling, heart rate, SpO2 & sleep tracking, IP68 & up to 5 days battery.",
        link: "https://link.amazon/B07ZdeBbz"
    },


    // --------------------------------------------------------
    // PRODUCT 5 - EXAMPLE
    // --------------------------------------------------------
    {
        image: "/assets/images/product5.webp",
        alt: "Fitness Resistance Bands",
        badge: "⭐ Fitness Pick",
        title: "Resistance Bands Workout Set",
        description: "Compact workout equipment for home, gym and travel.",
        link: "YOUR_AFFILIATE_LINK"
    },


    // --------------------------------------------------------
    // PRODUCT 6 - EXAMPLE
    // --------------------------------------------------------
    {
        image: "/assets/images/product6.webp",
        alt: "Gym Duffel Bag",
        badge: "⭐ Popular",
        title: "Premium Gym Duffel Bag",
        description: "Spacious and convenient bag for your daily gym essentials.",
        link: "YOUR_AFFILIATE_LINK"
    },


    // --------------------------------------------------------
    // PRODUCT 7 - EXAMPLE
    // --------------------------------------------------------
    {
        image: "/assets/images/product7.webp",
        alt: "Smart Fitness Watch",
        badge: "⭐ Trending",
        title: "Smart Fitness Watch",
        description: "Track workouts, activity and everyday fitness.",
        link: "YOUR_AFFILIATE_LINK"
    },


    // --------------------------------------------------------
    // PRODUCT 8 - EXAMPLE
    // --------------------------------------------------------
    {
        image: "/assets/images/product8.webp",
        alt: "Adjustable Dumbbells",
        badge: "⭐ Gym Essential",
        title: "Adjustable Dumbbell Set",
        description: "Space-saving strength training equipment for home workouts.",
        link: "YOUR_AFFILIATE_LINK"
    }

    // --------------------------------------------------------
    // ADD MORE PRODUCTS BELOW
    // --------------------------------------------------------

];


// ============================================================
// PRODUCT POOL
// ============================================================

let productPool = [];


// ============================================================
// SHUFFLE FUNCTION
// Fisher-Yates shuffle
// ============================================================

function shuffleProducts(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
        [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


// ============================================================
// GET NEXT PRODUCTS
// ============================================================

function getNextProducts() {

    // If there aren't enough products left,
    // create a fresh shuffled pool.
    if (productPool.length < PRODUCTS_PER_VIEW) {

        productPool = shuffleProducts(affiliateProducts);
    }

    const selectedProducts =
        productPool.slice(0, PRODUCTS_PER_VIEW);

    productPool =
        productPool.slice(PRODUCTS_PER_VIEW);

    return selectedProducts;
}


// ============================================================
// CREATE PRODUCT HTML
// ============================================================

function createProductHTML(product) {

    return `
        <div class="affiliate-card"
             onclick="this.querySelector('a').click()">

            <img
                src="${product.image}"
                alt="${product.alt}"
                class="affiliate-image"
                loading="lazy"
                decoding="async"
            >

            <div class="affiliate-info">

                <small>${product.badge}</small>

                <h3>${product.title}</h3>

                <p>${product.description}</p>

                <a
                    href="${product.link}"
                    target="_blank"
                    rel="nofollow sponsored noopener"
                >
                    Check Price
                </a>

            </div>

        </div>
    `;
}


// ============================================================
// SHOW PRODUCTS
// ============================================================

function showAffiliateProducts() {

    const container =
        document.getElementById("affiliate-container");

    if (!container) return;

    const products = getNextProducts();

    // Fade out
    container.classList.add("affiliate-fade-out");

    setTimeout(() => {

        container.innerHTML =
            products.map(createProductHTML).join("");

        // Fade in
        container.classList.remove("affiliate-fade-out");

    }, 300);
}


// ============================================================
// INITIAL DISPLAY
// ============================================================

showAffiliateProducts();


// ============================================================
// AUTOMATIC ROTATION
// ============================================================

setInterval(
    showAffiliateProducts,
    ROTATION_INTERVAL
);
```

### Add this CSS

Put this in your existing CSS:

```css id="p6q2nr"
#affiliate-container {
    transition: opacity 0.3s ease;
}

#affiliate-container.affiliate-fade-out {
    opacity: 0;
}

.affiliate-card {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.affiliate-card:hover {
    transform: translateY(-3px);
}

.affiliate-card a {
    position: relative;
    z-index: 2;
}
```

### Your HTML stays exactly the same

```html
<div id="affiliate-container"></div>
```

{/* ### Adding products

You only need to add another object: */}

```js
{
    image: "/assets/images/my-product.webp",
    alt: "My Product",
    badge: "⭐ Recommended",
    title: "My Product Name",
    description: "Short description of the product.",
    link: "https://link.amazon/XXXXXXXX"
},
```

{/* You can have **10, 30, 50 or even 100 products** in the array.
One important improvement over the earlier version: this uses a proper **Fisher-Yates shuffle** instead of `.sort(() => Math.random() - 0.5)`, so the rotation is more reliably randomized. */}
