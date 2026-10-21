
document.addEventListener("DOMContentLoaded", () => {
  const PRODUCTS_PER_VIEW = 4;
  const ROTATION_INTERVAL = 10000; // 15 seconds
  const FADE_DURATION = 300; // milliseconds

  const affiliateProducts = [
    {
      image: "/assets/images/speedometerprem.webp",
      alt: "XPR3SS GPS Bicycle Speedometer",
      badge: "⭐ Recommended",
      title: "XPR3SS GPS Bicycle Speedometer",
      description: "Accurate speed and distance tracking.",
      link: "https://link.amazon/B0gzQdEXG"
    },
    //2 
    {
      image: "/assets/images/waterproof_odometer.webp",
      alt: "Lista 14 Waterproof Bicycle Odometer",
      badge: "⭐ Cheap and Reliable",
      title: "Lista 14 Waterproof Bicycle Odometer",
      description: "Waterproof design for all-weather conditions.",
      link: "https://amzn.in/d/0bCp19ah"
    },
    {
      image: "/assets/images/cp-plus-img.webp",
      alt: "CP PLUS 64GB microSDXC Memory Card",
      badge: "⭐ Recommended",
      title: "CP PLUS 64GB microSDXC Memory Card",
      description: "UHS-3 Class 10 memory card.",
      link: "https://link.amazon/B0jhKULWl"
    },
    //4
    {
      image: "/assets/images/fastrack-revoltt-s1.webp",
      alt: "Fastrack Revoltt S1 Smart Watch",
      badge: "⭐ Recommended",
      title: "Fastrack Revoltt S1 Smart Watch",
      description: "Bluetooth calling and fitness tracking.",
      link: "https://link.amazon/B07ZdeBbz"
    },
    {
      image: "/assets/images/castrol900ml.webp",
      alt: "Castrol Activ 4T 20W-40 Engine Oil for Bikes 900ml",
      badge: "🏍️ Bike Essential",
      title: "Castrol Activ 4T 20W-40 Engine Oil (0.9L)",
      description: "API SN & JASO MA2 certified for smoother riding and engine protection.",
      link: "https://link.amazon/B0fqJN63g"
    },
    //6
    {
        image: "/assets/images/t800-smart-watch.webp",
        alt: "T800 Smart Watch for Men and Women with 1.99-inch display",
        badge: "⭐ Budget Smartwatch",
        title: "T800 Smart Watch for Men & Women",
        description: "1.99-inch display, Bluetooth calling, heart rate monitoring, IP67 water resistance and smart notifications.",
        link: "https://link.amazon/B03OB1Xd6"
    },
    {
    image: "/assets/images/classic-sunglasses.webp",
    alt: "Classic Black Frame Sunglasses with Gradient Smoke Lenses",
    badge: "🕶️ Everyday Essential",
    title: "Classic Black Frame Gradient Sunglasses",
    description: "Unisex retro style with UV protection and lightweight comfort.",
    link: "https://link.amazon/B075h5V35"
    },
    {
      image: "/assets/images/safety-gloves.webp",
      alt: "Grey and White Nylon Safety Gloves with Nitrile-Coated Palms",
      badge: "🛠️ DIY Essential",
      title: "Nitrile-Coated Safety Gloves (1 Pair)",
      description: "Enhanced grip for mechanics, precision work and DIY projects.",
      link: "https://link.amazon/B01Xhl81n"
    }
  ];

  const container = document.getElementById("affiliate-container");

  if (!container || affiliateProducts.length === 0) return;

  // Keep a shuffled queue of products waiting to be displayed.
  let productQueue = [];
  let rotationTimer;
  let isRotating = false;

  function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function refillQueue(currentProducts) {
    // Do not repeat products currently visible.
    productQueue = shuffle(
      affiliateProducts.filter(
        product => !currentProducts.includes(product)
      )
    );
  }

  function getNextBatch(currentProducts) {
    // Refill only when the remaining queue is too small.
    if (productQueue.length < PRODUCTS_PER_VIEW) {
      refillQueue(currentProducts);
    }
    const nextBatch = productQueue.splice(0, PRODUCTS_PER_VIEW);
    // If the catalog is too small, retain the current products
    // rather than displaying duplicates.
    if (nextBatch.length < PRODUCTS_PER_VIEW) {
      return null;
    }
    return nextBatch;
  }

  function createProductHTML(product) {
    return `
      <article class="affiliate-card"  onclick="this.querySelector('a').click()">
        <img
          src="${product.image}"
          alt="${product.alt}"
          class="affiliate-image"
          loading="lazy"
          decoding="async"
        >
        <div class="affiliate-info">
          <small class="affiliate-badge">${product.badge}</small>
          <h3>${product.title}</h3>
          <p>${product.description}</p>

          <a
            href="${product.link}"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            class="affiliate-link"
          >
            Check Price
          </a>
        </div>
      </article>
    `;
  }

  // Show the first four products in a random order.
  let visibleProducts = shuffle(affiliateProducts).slice(
    0,
    PRODUCTS_PER_VIEW
  );

  // Prepare products that have not appeared yet.
  refillQueue(visibleProducts);

  function renderProducts(products) {
    container.innerHTML = products.map(createProductHTML).join("");
  }

  function rotateProducts() {
    if (isRotating) return;
    const nextBatch = getNextBatch(visibleProducts);
    if (!nextBatch) {
      // Wait until enough unique products are available.
      // This should not occur with a catalog of six products.
      return;
    }
    isRotating = true;
    container.classList.add("affiliate-fade-out");
    setTimeout(() => {
      visibleProducts = nextBatch;
      renderProducts(visibleProducts);
      container.classList.remove("affiliate-fade-out");
      isRotating = false;
      // Once the queue empties, the next batch will be
      // selected from products not currently visible.
    }, FADE_DURATION);
  }

  renderProducts(visibleProducts);
  function startRotation() {
    clearInterval(rotationTimer);
    if (affiliateProducts.length > PRODUCTS_PER_VIEW) {
      rotationTimer = setInterval(
        rotateProducts,
        ROTATION_INTERVAL
      );
    }
  }

  function stopRotation() {
    clearInterval(rotationTimer);
  }
  // Pause rotation while the visitor is on another tab.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopRotation();
    } else {
      startRotation();
    }
  });
  startRotation();
});
