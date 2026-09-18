/**
 * CAFE DE ARTE — Vibrant 3D Luxury Interactive Engine
 * 100% Pure Vanilla JavaScript + Three.js CDN
 * Location: S.N. Yadav Road, near Toppo House, Nagra Toli, Ranchi, Jharkhand
 */

(function () {
  'use strict';

  // State Management
  const state = {
    introSeen: false,
    cart: [],
    audioActive: false,
    currentLightboxIndex: 0
  };

  // DOM Elements cache
  let introEl, skipBtn, headerEl, cartDrawer, cartBackdrop, cartBadge, cartItemsContainer,
      cartSubtotalEl, cartTotalEl, customCursor, cursorFollower, pullRefreshContainer;

  // Real Menu Database (Verified Cafe De Arte Items & Prices)
  const menuData = [
    {
      id: 'bibimbap-dolsot',
      name: 'Signature Dolsot Bibimbap',
      category: 'korean',
      price: 260,
      priceChicken: 290,
      diet: 'veg',
      badge: 'Signature',
      image: 'assets/menu/bibimbap.jpg',
      description: 'Sizzling stone bowl layered with seasoned mountain vegetables, sautéed namul, shiitake mushrooms, sunny fried egg & authentic gochujang sauce.',
      ingredients: 'Sticky Korean Rice, Spinach, Shiitake Mushrooms, Sautéed Carrots, Bean Sprouts, Egg, House Gochujang, Sesame Oil'
    },
    {
      id: 'chicken-ramyeon',
      name: 'Classic Chicken Ramyeon',
      category: 'korean',
      price: 260,
      diet: 'non-veg',
      badge: 'Chef Favorite',
      image: 'assets/menu/ramyeon.jpg',
      description: 'Springy wavy noodles simmered in a slow-brewed spicy savory broth with succulent roast chicken, soft-boiled marinated egg, nori sheet & scallions.',
      ingredients: 'Artisanal Ramyeon Noodles, Simmered Chicken Broth, Ajitsuke Tamago, Roasted Chicken Cuts, Toasted Nori, Scallions'
    },
    {
      id: 'veg-ragi-momos',
      name: 'Handcrafted Veg Ragi Momos',
      category: 'indigenous',
      price: 180,
      diet: 'veg',
      badge: 'Heritage Craft',
      image: 'assets/menu/ragi-momos.jpg',
      description: 'Unique tribal fusion dumplings made with nutrient-rich finger millet (madua/ragi) flour, stuffed with garden vegetables & local mountain herbs (8 pcs).',
      ingredients: 'Organic Jharkhand Finger Millet (Madua/Ragi), Cabbage, Carrots, Wild Spring Herbs, Garlic-Chili Dip, Mint Emulsion'
    },
    {
      id: 'chicken-ragi-momos',
      name: 'Chicken Ragi Momos',
      category: 'indigenous',
      price: 190,
      diet: 'non-veg',
      badge: 'Indigenous Fusion',
      image: 'assets/menu/ragi-momos.jpg',
      description: 'Finger millet steamed dumplings stuffed with spiced juicy minced chicken and local hill spices, served in a bamboo steamer with fire chili dip (8 pcs).',
      ingredients: 'Madua (Ragi) Dough, Fresh Spiced Minced Chicken, Ginger, Green Onions, Himalayan Chili Glaze'
    },
    {
      id: 'bulgogi-bowl',
      name: 'Bulgogi Chicken Rice Bowl',
      category: 'korean',
      price: 290,
      diet: 'non-veg',
      badge: 'Popular',
      image: 'assets/menu/bulgogi.jpg',
      description: 'Tender chicken slices marinated in caramelized sweet soy, garlic, and toasted sesame, served over steamed sticky rice with fresh house-fermented kimchi.',
      ingredients: 'Soy-Garlic Glazed Chicken, Sesame Seeds, Caramelized Onions, Jasmine Sticky Rice, House Kimchi'
    },
    {
      id: 'mandu-dumpling-soup',
      name: 'Artisan Mandu Dumpling Soup',
      category: 'wok',
      price: 210,
      priceNonVeg: 240,
      diet: 'veg',
      badge: 'Comfort Bowl',
      image: 'assets/menu/mandu-soup.jpg',
      description: 'Delicate handmade Korean dumplings floating in a steaming, fragrant garlic-ginger scallion clear broth with cracked black pepper & sesame oil.',
      ingredients: 'Handmade Mandu Dumplings, Clear Vegetable/Chicken Broth, Chopped Scallions, Sesame Seed Dust'
    },
    {
      id: 'kimchi-fried-rice',
      name: 'Wok Kimchi Fried Rice',
      category: 'wok',
      price: 230,
      diet: 'veg',
      badge: 'Classic',
      image: 'assets/menu/fried-rice.jpg',
      description: 'Wok-tossed sticky rice infused with aged house kimchi, gochugaru chili paste, sesame crunch, topped with a golden runny yolk egg.',
      ingredients: 'House Kimchi, Korean Rice, Gochugaru, Scallions, Crispy Fried Egg, Toasted Nori Strips'
    },
    {
      id: 'spiced-lemon-iced-tea',
      name: 'Spiced Lemon Iced Tea',
      category: 'beverages',
      price: 120,
      diet: 'veg',
      badge: 'Refreshing',
      image: 'assets/menu/iced-tea.jpg',
      description: 'Slow-steeped Assam black tea shaken with fresh cold-pressed lemon juice, wild mint leaves, honey, and crushed local mountain spices.',
      ingredients: 'Assam Tea, Fresh Meyer Lemon, Organic Wild Honey, Crushed Mint, Star Anise Hint'
    },
    {
      id: 'artisanal-filter-coffee',
      name: 'Artisanal Filter Coffee',
      category: 'beverages',
      price: 110,
      diet: 'veg',
      badge: 'Heritage Sip',
      image: 'assets/menu/filter-coffee.jpg',
      description: 'Traditional decoction drip brew poured with frothed whole milk in classic brass dabara tumblers, offering a bold caramel aroma.',
      ingredients: 'Dark Roast Arabica-Robusta Blend, Chicory Infusion, Frothed Milk, Jaggery / Cane Sugar'
    }
  ];

  // Rich Multi-Panel Showcase Database for Gallery Lightbox
  const galleryShowcaseData = [
    {
      id: 'bibimbap-dolsot',
      src: 'assets/images/bibimbap.jpg',
      title: 'Signature Dolsot Bibimbap',
      category: 'Korean Specialty',
      price: '₹260',
      badge: "🔥 Chef's Signature",
      story: 'Sizzling stone bowl layered with seasoned mountain vegetables, sautéed namul, shiitake mushrooms, sunny fried egg & authentic gochujang sauce.',
      craft: 'Served in authentic heavy granite bowls retaining heat at 180°C to create the prized crispy golden rice crust (nurungji).',
      philosophy: 'Anju Toppo bridges Korean ancestral food preservation techniques with Jharkhand tribal forest harvest traditions.',
      pairings: 'Best paired with Spiced Lemon Iced Tea or Artisanal Filter Coffee + House Kimchi.',
      ingredients: ['Granite Sizzled', 'Organic Sticky Rice', 'Wild Herbs', 'House Fermented Paste'],
      prepTime: 'Freshly prepared (~12–15 mins). Sizzling hot.'
    },
    {
      id: 'chicken-ramyeon',
      src: 'assets/images/ramyeon.jpg',
      title: 'Classic Chicken Ramyeon',
      category: 'Comfort Broth',
      price: '₹260',
      badge: '⭐ Patron Favorite',
      story: 'Springy wavy noodles simmered in a slow-brewed spicy savory broth with succulent roast chicken, soft-boiled marinated egg, nori sheet & scallions.',
      craft: 'The broth is slow-simmered for over 6 hours combining Korean kombu, roasted garlic, and local dried hill chilies for deep soul comfort.',
      philosophy: 'Inspired by traditional soul-food ramen carts in Seoul, prepared with Jharkhand culinary soul.',
      pairings: 'Pairs wonderfully with Handcrafted Veg Ragi Momos & Pickled White Radish.',
      ingredients: ['Slow 6-hr Broth', 'Ajitsuke Egg', 'Wavy Noodles', 'Roast Chicken Cuts'],
      prepTime: 'Steaming hot bowl (~10–12 mins).'
    },
    {
      id: 'veg-ragi-momos',
      src: 'assets/images/ragi-momos.jpg',
      title: 'Handcrafted Veg Ragi Momos',
      category: 'Indigenous Fusion',
      price: '₹180',
      badge: '🌱 100% Tribal Grain',
      story: 'Unique tribal fusion dumplings made with nutrient-rich finger millet (madua/ragi) flour, stuffed with garden vegetables & local mountain herbs (8 pcs).',
      craft: 'Hand-rolled dough made from organic finger-millet grown by indigenous farmer collectives across Jharkhand, steamed in bamboo baskets.',
      philosophy: 'A proud culinary celebration of Mandi Eddpa and tribal agricultural heritage in the heart of Nagra Toli.',
      pairings: 'Accompanied by wild garlic-chili relish and chilled mint-coriander emulsion.',
      ingredients: ['Organic Madua (Ragi)', 'Fresh Cabbage & Carrots', 'Jharkhand Wild Herbs', 'Garlic-Chili Dip'],
      prepTime: 'Steamed fresh in bamboo (~12 mins).'
    },
    {
      id: 'cafe-interior',
      src: 'assets/images/cafe-interior.jpg',
      title: 'Vintage Art & Cultural Corner',
      category: 'Toppo House Ambiance',
      price: 'Sanctuary Experience',
      badge: '🎨 Artistic Haven',
      story: 'An intimate living-room dining experience where vintage pop-culture cinema posters converse with black-and-white anthropological tribal portraits.',
      craft: 'Housed within the ancestral Toppo family residence, preserving architectural timber details and warm amber ambient lighting.',
      philosophy: 'Created as a safe, cozy hangout for university students, creators, and families seeking quiet conversations and authentic flavors.',
      pairings: 'Complement with Artisanal Filter Coffee or Hot Korean Jasmine Tea.',
      ingredients: ['Vintage Pop Cinema Art', 'Adivasi Archival Photography', 'Handmade Wood Furniture', 'Acoustic Indie Playlist'],
      prepTime: 'Open daily: Thu–Sun 11 AM–10 PM, Mon–Wed 12 PM'
    },
    {
      id: 'cafe-exterior',
      src: 'assets/images/cafe-exterior.jpg',
      title: 'Ancestral Toppo House Patio',
      category: 'Outdoor Seating',
      price: 'Breezy Hangout',
      badge: '✨ Festoon Lights',
      story: 'Breezy open-air patio seating bathed in warm bistro fairy lights, located just off S.N. Yadav Road in peaceful Nagra Toli.',
      craft: 'Surrounded by lush green planters, rustic brick walls, and shaded canopies for Ranchi’s pleasant evening breezes.',
      philosophy: 'An inviting doorstep haven offering effortless parking and welcoming hospitality by founder Anju Toppo.',
      pairings: 'Perfect setting for sipping iced beverages with friends.',
      ingredients: ['Bistro Fairy Lights', 'Open-Air Patio Benches', 'Garden Planters', 'Two-Wheeler Doorstep Parking'],
      prepTime: 'Best enjoyed around 5:30 PM sunset.'
    },
    {
      id: 'tribe-tree',
      src: 'assets/images/tribe-tree.jpg',
      title: 'Tribe Tree Handloom Corner',
      category: 'Cultural Craft & Textiles',
      price: 'Artisanal Collection',
      badge: '🌿 Indigenous Handloom',
      story: 'A dedicated showcase of indigenous handlooms, traditional weaves, and tribal textile designs honoring Jharkhand crafts.',
      craft: 'Directly supporting indigenous weavers, women artisans, and tribal craft preservation in collaboration with Tribe Tree.',
      philosophy: 'Food and craft unite under one roof to celebrate indigenous identity, sustainability, and creative independence.',
      pairings: 'Explore the textile collection while your stone bowl or ramyeon simmers.',
      ingredients: ['Traditional Cotton Handloom', 'Natural Plant Dyes', 'Tribal Geometric Motifs', 'Artisanal Souvenirs'],
      prepTime: 'Permanent exhibition in cafe lounge.'
    }
  ];

  /* ==========================================================================
     INITIALIZATION ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initDOMElements();
    initIntroSequence();
    initThreeBackground();
    initHero3DParallax();
    initCustomCursor();
    initNavigation();
    initLiveStatusBadge();
    initMenuExperience();
    initCartSystem();
    initModals();
    initReservationForm();
    initGalleryLightbox();
    initAudioEngine();
    initChefPullRefresh();
  });

  function initDOMElements() {
    introEl = document.getElementById('cinematic-intro');
    skipBtn = document.getElementById('skip-intro-btn');
    headerEl = document.querySelector('.site-header');
    cartDrawer = document.getElementById('cart-drawer');
    cartBackdrop = document.getElementById('cart-backdrop');
    cartBadge = document.getElementById('cart-badge-count');
    cartItemsContainer = document.getElementById('cart-items-container');
    cartSubtotalEl = document.getElementById('cart-subtotal');
    cartTotalEl = document.getElementById('cart-total');
    customCursor = document.getElementById('custom-cursor');
    cursorFollower = document.getElementById('cursor-follower');
    pullRefreshContainer = document.getElementById('pull-refresh-container');
  }

  /* ==========================================================================
     1. CINEMATIC 3D LOGO ZOOM-THROUGH OPENING SEQUENCE
     ========================================================================== */
  function initIntroSequence() {
    if (!introEl) return;

    // Check skip parameter or existing session (support ?replay=true, ?freezeIntro=true, ?freezeZoom=true)
    const urlParams = new URLSearchParams(window.location.search);
    const forceReplay = urlParams.get('replay') === 'true';
    const freezeIntro = urlParams.get('freezeIntro') === 'true';
    const freezeZoom = urlParams.get('freezeZoom') === 'true';
    const seen = !forceReplay && !freezeIntro && !freezeZoom && sessionStorage.getItem('cda_intro_experienced');

    if (seen === 'true' || urlParams.get('skipIntro') === 'true') {
      finishIntro();
      return;
    }

    if (freezeZoom) {
      introEl.classList.add('intro-zooming');
      return;
    }

    if (freezeIntro) {
      // Freeze stage 1 (logo appearance) for crisp verification
      return;
    }

    // Stage 1: Logo appears, glows and establishes brand presence (0.0s - 2.2s)
    // Stage 2: Dramatic 3D Zoom-through and Lens-Blur portal opening (2.2s - 3.4s)
    const zoomTimer = setTimeout(() => {
      introEl.classList.add('intro-zooming');
    }, 2200);

    // Stage 3: Smooth reveal of the bright vibrant application (3.4s)
    const finishTimer = setTimeout(() => {
      finishIntro();
    }, 3400);

    // Skip Intro Action
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        clearTimeout(zoomTimer);
        clearTimeout(finishTimer);
        finishIntro();
      });
    }
  }

  function finishIntro() {
    if (!introEl) return;
    introEl.classList.add('intro-hidden');
    sessionStorage.setItem('cda_intro_experienced', 'true');
  }

  /* ==========================================================================
     2. ANIMATED CHEF PULL-TO-REFRESH MECHANISM
     ========================================================================== */
  function initChefPullRefresh() {
    const kitchenBtn = document.getElementById('kitchen-refresh-btn');
    const statusText = document.getElementById('pull-status-text');

    // Desktop/Button trigger
    if (kitchenBtn) {
      kitchenBtn.addEventListener('click', () => {
        triggerChefRefreshAnimation();
      });
    }

    // Touch Pull-to-Refresh on Mobile
    let startY = 0;
    let currentY = 0;
    let isPulling = false;

    window.addEventListener('touchstart', (e) => {
      if (window.scrollY <= 2) {
        startY = e.touches[0].clientY;
        isPulling = true;
      } else {
        isPulling = false;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isPulling || !pullRefreshContainer) return;
      currentY = e.touches[0].clientY;
      const pullDist = currentY - startY;

      if (pullDist > 15 && window.scrollY <= 2) {
        const pullProgress = Math.min(pullDist * 0.5, 90);
        pullRefreshContainer.style.transform = `translateY(${pullProgress - 110}px)`;
        pullRefreshContainer.classList.add('pulling');

        if (pullDist > 90 && statusText) {
          statusText.textContent = 'RELEASE TO REFRESH THE KITCHEN! ♨';
        } else if (statusText) {
          statusText.textContent = 'PULL DOWN TO REFRESH THE KITCHEN';
        }
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (!isPulling || !pullRefreshContainer) return;
      const pullDist = currentY - startY;
      isPulling = false;

      if (pullDist > 90) {
        triggerChefRefreshAnimation();
      } else {
        pullRefreshContainer.style.transform = '';
        pullRefreshContainer.classList.remove('pulling');
      }
    });

    function triggerChefRefreshAnimation() {
      if (!pullRefreshContainer) return;

      pullRefreshContainer.classList.add('active', 'pulling');
      pullRefreshContainer.style.transform = 'translateY(0)';
      if (statusText) statusText.textContent = 'CHEF ANJU IS STEAMING FRESH DISHES... ♨';

      showToast('Chef Anju is refreshing your kitchen menu with piping hot dishes!');

      setTimeout(() => {
        pullRefreshContainer.style.transform = '';
        pullRefreshContainer.classList.remove('active', 'pulling');
        if (statusText) statusText.textContent = 'PULL DOWN TO REFRESH THE KITCHEN';
        // Smoothly scroll to menu and trigger pulse
        const menuEl = document.getElementById('menu');
        if (menuEl) {
          menuEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1600);
    }
  }

  /* ==========================================================================
     3. THREE.JS 3D PARTICLE NEBULA (Warm Golden & Terracotta Embers)
     ========================================================================== */
  function initThreeBackground() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 120;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Golden Amber & Terracotta Sparkling Particles
      const particleCount = window.innerWidth < 768 ? 90 : 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const color1 = new THREE.Color('#E25822'); // Fiery Terracotta
      const color2 = new THREE.Color('#F09A24'); // Amber Gold
      const color3 = new THREE.Color('#FF7038'); // Soft Peach Terracotta

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 260;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

        const mixedColor = i % 3 === 0 ? color1 : (i % 3 === 1 ? color2 : color3);
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const pMaterial = new THREE.PointsMaterial({
        size: 3.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        blending: THREE.NormalBlending
      });

      const particleSystem = new THREE.Points(geometry, pMaterial);
      scene.add(particleSystem);

      let mouseX = 0, mouseY = 0;
      let targetX = 0, targetY = 0;

      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
      });

      const clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particleSystem.rotation.y = elapsedTime * 0.03;
        particleSystem.rotation.x = elapsedTime * 0.015;

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        camera.position.x = targetX * 0.35;
        camera.position.y = -targetY * 0.35;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    } catch (e) {
      console.warn('Three.js initialization skipped:', e);
    }
  }

  /* ==========================================================================
     4. 3D MOUSE PARALLAX ON HERO STAGE
     ========================================================================== */
  function initHero3DParallax() {
    const stage = document.getElementById('hero-3d-stage');
    const heroSection = document.querySelector('.hero-section');
    const flyingFoods = document.querySelectorAll('.flying-food-item');
    if (!heroSection) return;

    let currentTiltX = 0, currentTiltY = 0;
    let targetTiltX = 0, targetTiltY = 0;
    let targetFoodX = 0, targetFoodY = 0;
    let currentFoodX = 0, currentFoodY = 0;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      targetTiltX = -y * 20;
      targetTiltY = x * 24;
      targetFoodX = x * 40;
      targetFoodY = y * 40;
    });

    heroSection.addEventListener('mouseleave', () => {
      targetTiltX = 0;
      targetTiltY = 0;
      targetFoodX = 0;
      targetFoodY = 0;
    });

    function renderStageParallax() {
      currentTiltX += (targetTiltX - currentTiltX) * 0.1;
      currentTiltY += (targetTiltY - currentTiltY) * 0.1;
      currentFoodX += (targetFoodX - currentFoodX) * 0.08;
      currentFoodY += (targetFoodY - currentFoodY) * 0.08;

      if (stage) {
        stage.style.transform = `rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
      }

      if (flyingFoods.length > 0) {
        flyingFoods.forEach((food) => {
          const speed = parseFloat(food.getAttribute('data-speed') || '1.5');
          const rot = parseFloat(food.getAttribute('data-rotate') || '0');
          const offsetX = currentFoodX * speed;
          const offsetY = currentFoodY * speed;
          food.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) rotate(${rot}deg)`;
        });
      }

      requestAnimationFrame(renderStageParallax);
    }
    renderStageParallax();
  }

  /* ==========================================================================
     5. CUSTOM GLOWING CURSOR
     ========================================================================== */
  function initCustomCursor() {
    if (!customCursor || !cursorFollower) return;

    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    function updateFollower() {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(updateFollower);
    }
    updateFollower();

    const hoverTargets = document.querySelectorAll('a, button, .menu-card, .gallery-card, .dropdown-menu-item, input, select');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        customCursor.classList.add('hovered');
        cursorFollower.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hovered');
        cursorFollower.classList.remove('hovered');
      });
    });
  }

  /* ==========================================================================
     6. NAVIGATION & SCROLL
     ========================================================================== */
  function initNavigation() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        headerEl?.classList.add('scrolled');
      } else {
        headerEl?.classList.remove('scrolled');
      }
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
    const mobileCloseBtn = document.getElementById('mobile-nav-close-btn');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item, .mobile-nav-link');

    function closeMobileMenu() {
      if (mobileBtn) mobileBtn.classList.remove('active');
      if (mobileOverlay) {
        mobileOverlay.classList.remove('open');
        mobileOverlay.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    }

    function openMobileMenu() {
      if (mobileBtn) mobileBtn.classList.add('active');
      if (mobileOverlay) {
        mobileOverlay.classList.add('open');
        mobileOverlay.setAttribute('aria-hidden', 'false');
      }
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    }

    if (mobileBtn && mobileOverlay) {
      mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileOverlay.classList.contains('open');
        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });

      if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          closeMobileMenu();
        });
      }

      if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeMobileMenu);
      }

      mobileNavItems.forEach((link) => {
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      });

      // Close on ESC key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) {
          closeMobileMenu();
        }
      });
    }

    // Dropdown items click handling (filter selection)
    const dropdownItems = document.querySelectorAll('.dropdown-menu-item[data-filter]');
    dropdownItems.forEach((item) => {
      item.addEventListener('click', () => {
        const filter = item.getAttribute('data-filter');
        const targetCategoryBtn = document.querySelector(`.category-pill[data-category="${filter}"]`);
        if (targetCategoryBtn) {
          targetCategoryBtn.click();
        }
      });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 140;
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((l) => {
            l.classList.remove('active');
            if (l.getAttribute('href') === `#${id}`) {
              l.classList.add('active');
            }
          });
          mobileNavItems.forEach((ml) => {
            ml.classList.remove('active');
            if (ml.getAttribute('href') === `#${id}`) {
              ml.classList.add('active');
            }
          });
        }
      });
    });
  }

  /* ==========================================================================
     7. REAL-TIME OPERATING HOURS CALCULATOR
     ========================================================================== */
  function initLiveStatusBadge() {
    const statusText = document.getElementById('live-status-text');
    if (!statusText) return;

    function checkOpenStatus() {
      const now = new Date();
      const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours * 60 + minutes;

      let isOpen = false;
      let closingTimeStr = '';

      if (day === 1) {
        // Monday: 12:00 PM to 9:30 PM (720 to 1290)
        isOpen = currentTime >= 720 && currentTime < 1290;
        closingTimeStr = '9:30 PM';
      } else if (day === 2 || day === 3) {
        // Tue & Wed: 12:00 PM to 10:00 PM (720 to 1320)
        isOpen = currentTime >= 720 && currentTime < 1320;
        closingTimeStr = '10:00 PM';
      } else {
        // Thu, Fri, Sat, Sun: 11:00 AM to 10:00 PM (660 to 1320)
        isOpen = currentTime >= 660 && currentTime < 1320;
        closingTimeStr = '10:00 PM';
      }

      if (isOpen) {
        statusText.innerHTML = `<span class="status-indicator"></span> OPEN NOW • Closes at ${closingTimeStr}`;
      } else {
        statusText.innerHTML = `<span class="status-indicator" style="background:#EF4444;box-shadow:0 0 10px #EF4444;"></span> OPENS AT 11:00 AM`;
      }
    }

    checkOpenStatus();
    setInterval(checkOpenStatus, 60000);
  }

  /* ==========================================================================
     8. 3D MENU WITH MOBILE 2-COLUMN APP EXPERIENCE
     ========================================================================== */
  function initMenuExperience() {
    renderMenu('all');
    initMenuFilters();
  }

  function renderMenu(category) {
    const grid = document.getElementById('menu-items-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const items = category === 'all'
      ? menuData
      : menuData.filter(item => item.category === category);

    items.forEach((dish) => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.setAttribute('data-id', dish.id);

      const badgeClass = dish.badge.includes('Signature') ? 'badge-signature' :
                         (dish.badge.includes('Indigenous') || dish.badge.includes('Heritage') ? 'badge-indigenous' : 'badge-beverage');

      card.innerHTML = `
        <div class="menu-card-media">
          <img src="${dish.image}" alt="${dish.name}" loading="lazy" />
          <span class="dish-badge ${badgeClass}">${dish.badge}</span>
          <span class="diet-dot ${dish.diet}"></span>
        </div>
        <div class="menu-card-body">
          <div class="menu-card-top">
            <h4 class="dish-name">${dish.name}</h4>
            <span class="dish-price">₹${dish.price}</span>
          </div>
          <p class="dish-desc">${dish.description}</p>
          <div class="menu-card-actions">
            <button class="btn-add-cart" data-id="${dish.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Add</span>
            </button>
            <button class="btn-quick-view" data-id="${dish.id}" title="Quick View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
      `;

      // 3D Tilt on Hover
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });

      grid.appendChild(card);
    });

    grid.querySelectorAll('.btn-add-cart').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        addToCart(id);
      });
    });

    grid.querySelectorAll('.btn-quick-view').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openQuickView(id);
      });
    });
  }

  function initMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter');
        renderMenu(cat);
      });
    });
  }

  /* ==========================================================================
     9. DEMO CART & SLIDE-OUT DRAWER
     ========================================================================== */
  function initCartSystem() {
    const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
    const closeBtn = document.getElementById('cart-close-btn');
    const checkoutBtn = document.getElementById('checkout-demo-btn');

    cartToggleBtns.forEach((b) => {
      b.addEventListener('click', () => toggleCart(true));
    });

    if (closeBtn) closeBtn.addEventListener('click', () => toggleCart(false));
    if (cartBackdrop) cartBackdrop.addEventListener('click', () => toggleCart(false));

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
          showToast('Your demo cart is currently empty!');
          return;
        }
        toggleCart(false);
        openCheckoutSummaryModal();
      });
    }

    // Initialize cart state
    updateCartUI();

    // Global helpers for demo / testing
    window.cdaAddToCart = addToCart;
    window.cdaToggleCart = toggleCart;
  }

  function toggleCart(open) {
    if (!cartDrawer || !cartBackdrop) return;
    if (open) {
      cartDrawer.classList.add('open');
      cartBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      cartDrawer.classList.remove('open');
      cartBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function addToCart(dishId) {
    const dish = menuData.find(d => d.id === dishId);
    if (!dish) return;

    const existing = state.cart.find(item => item.id === dishId);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        qty: 1
      });
    }

    updateCartUI();
    showToast(`Added "${dish.name}" to demo cart!`);

    if (cartBadge) {
      cartBadge.classList.add('bounce');
      setTimeout(() => cartBadge.classList.remove('bounce'), 400);
    }
  }

  function updateCartUI() {
    const totalItems = state.cart.reduce((acc, item) => acc + item.qty, 0);
    if (cartBadge) cartBadge.textContent = totalItems;

    // Dynamic Cart Visibility: Show header cart button only when cart has items
    const headerCartBtn = document.getElementById('header-cart-btn');
    if (headerCartBtn) {
      if (state.cart.length > 0) {
        headerCartBtn.classList.remove('cart-hidden');
        headerCartBtn.classList.add('cart-visible');
      } else {
        headerCartBtn.classList.add('cart-hidden');
        headerCartBtn.classList.remove('cart-visible');
      }
    }

    if (!cartItemsContainer) return;

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <p>Your demo cart is empty.</p>
          <span style="font-size:0.8rem;color:var(--text-subtle);margin-top:6px;">Add dishes to test the demo order flow!</span>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = '₹0';
      if (cartTotalEl) cartTotalEl.textContent = '₹0';
      return;
    }

    let subtotal = 0;
    cartItemsContainer.innerHTML = '';

    state.cart.forEach((item) => {
      subtotal += item.price * item.qty;
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <img class="cart-item-thumb" src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <p>₹${item.price} each</p>
        </div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn btn-minus" data-id="${item.id}">−</button>
          <span class="cart-item-qty">${item.qty}</span>
          <button class="cart-qty-btn btn-plus" data-id="${item.id}">+</button>
        </div>
      `;
      cartItemsContainer.appendChild(row);
    });

    const gst = Math.round(subtotal * 0.05);
    const total = subtotal + gst;

    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal}`;
    if (cartTotalEl) cartTotalEl.textContent = `₹${total}`;

    cartItemsContainer.querySelectorAll('.btn-plus').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const itm = state.cart.find(i => i.id === id);
        if (itm) {
          itm.qty += 1;
          updateCartUI();
        }
      });
    });

    cartItemsContainer.querySelectorAll('.btn-minus').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const itm = state.cart.find(i => i.id === id);
        if (itm) {
          itm.qty -= 1;
          if (itm.qty <= 0) {
            state.cart = state.cart.filter(i => i.id !== id);
          }
          updateCartUI();
        }
      });
    });
  }

  /* ==========================================================================
     10. QUICK VIEW MODAL
     ========================================================================== */
  function openQuickView(dishId) {
    const dish = menuData.find(d => d.id === dishId);
    if (!dish) return;

    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    document.getElementById('qv-title').textContent = dish.name;
    document.getElementById('qv-price').textContent = `₹${dish.price}`;
    document.getElementById('qv-desc').textContent = dish.description;
    document.getElementById('qv-ingredients').textContent = dish.ingredients;
    document.getElementById('qv-img').src = dish.image;
    document.getElementById('qv-add-btn').setAttribute('data-id', dish.id);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function initModals() {
    const qvModal = document.getElementById('quick-view-modal');
    const qvClose = document.getElementById('qv-close-btn');
    const qvAddBtn = document.getElementById('qv-add-btn');

    if (qvClose && qvModal) {
      qvClose.addEventListener('click', () => {
        qvModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (qvAddBtn && qvModal) {
      qvAddBtn.addEventListener('click', () => {
        const id = qvAddBtn.getAttribute('data-id');
        addToCart(id);
        qvModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
        toggleCart(false);
        const lb = document.getElementById('gallery-lightbox');
        if (lb) lb.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     11. DEMO CHECKOUT SUMMARY MODAL
     ========================================================================== */
  function openCheckoutSummaryModal() {
    const modal = document.getElementById('demo-checkout-modal');
    if (!modal) return;

    const summaryList = document.getElementById('checkout-items-list');
    const totalAmount = document.getElementById('checkout-total-price');

    let total = 0;
    summaryList.innerHTML = '';
    state.cart.forEach((i) => {
      const lineTotal = i.price * i.qty;
      total += lineTotal;
      const li = document.createElement('li');
      li.style.cssText = 'display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);';
      li.innerHTML = `<span>${i.name} × ${i.qty}</span><strong style="color:var(--text-dark)">₹${lineTotal}</strong>`;
      summaryList.appendChild(li);
    });

    const grandTotal = total + Math.round(total * 0.05);
    if (totalAmount) totalAmount.textContent = `₹${grandTotal}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /* ==========================================================================
     12. TABLE RESERVATION FORM
     ========================================================================== */
  function initReservationForm() {
    const reserveModal = document.getElementById('reservation-modal');
    const openBtns = document.querySelectorAll('.open-reserve-modal-btn');
    const closeBtn = document.getElementById('reserve-close-btn');
    const form = document.getElementById('reservation-form');

    openBtns.forEach((b) => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        if (reserveModal) {
          reserveModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (closeBtn && reserveModal) {
      closeBtn.addEventListener('click', () => {
        reserveModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (form && reserveModal) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('res-name').value;
        const date = document.getElementById('res-date').value;
        const time = document.getElementById('res-time').value;
        const guests = document.getElementById('res-guests').value;

        reserveModal.classList.remove('active');
        document.body.style.overflow = '';

        const refCode = 'CDA-' + Math.floor(1000 + Math.random() * 9000);
        showToast(`Table reserved for ${name} (${guests}) on ${date} at ${time}! Ref: ${refCode}`);
        form.reset();
      });
    }
  }

  /* ==========================================================================
     13. RICH MULTI-PANEL GALLERY SHOWCASE & LIGHTBOX
     ========================================================================== */
  function initGalleryLightbox() {
    const cards = document.querySelectorAll('.gallery-card');
    const lightbox = document.getElementById('gallery-lightbox');
    const lbClose = document.getElementById('lightbox-close');

    // DOM Elements inside the rich showcase
    const lbImg = document.getElementById('lightbox-img');
    const lbCategoryBadge = document.getElementById('lb-category-badge');
    const lbTitle = document.getElementById('lb-title');
    const lbStory = document.getElementById('lb-story');
    const lbCraft = document.getElementById('lb-craft');
    const lbPhilosophy = document.getElementById('lb-philosophy');
    const lbCornerTag = document.getElementById('lb-corner-tag');
    const lbPriceTag = document.getElementById('lb-price-tag');
    const lbCounter = document.getElementById('lb-counter');
    const lbPairings = document.getElementById('lb-pairings');
    const lbIngredientsList = document.getElementById('lb-ingredients-list');
    const lbTiming = document.getElementById('lb-timing');
    const lbAddCartBtn = document.getElementById('lb-add-cart-btn');
    const lbReserveTableBtn = document.getElementById('lb-reserve-table-btn');
    const lbPrevBtn = document.getElementById('lb-prev-btn');
    const lbNextBtn = document.getElementById('lb-next-btn');

    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        state.currentLightboxIndex = index;
        openRichLightbox(index);
      });
    });

    function openRichLightbox(idx) {
      const item = galleryShowcaseData[idx];
      if (!item || !lightbox) return;

      lbImg.src = item.src;
      if (lbCategoryBadge) lbCategoryBadge.textContent = item.category;
      if (lbTitle) lbTitle.textContent = item.title;
      if (lbStory) lbStory.textContent = item.story;
      if (lbCraft) lbCraft.textContent = item.craft;
      if (lbPhilosophy) lbPhilosophy.textContent = item.philosophy;
      if (lbCornerTag) lbCornerTag.textContent = item.badge;
      if (lbPriceTag) lbPriceTag.textContent = item.price;
      if (lbCounter) lbCounter.textContent = `${idx + 1} / ${galleryShowcaseData.length}`;
      if (lbPairings) lbPairings.textContent = item.pairings;
      if (lbTiming) lbTiming.textContent = item.prepTime;

      if (lbIngredientsList) {
        lbIngredientsList.innerHTML = '';
        item.ingredients.forEach((ing) => {
          const li = document.createElement('li');
          li.textContent = ing;
          lbIngredientsList.appendChild(li);
        });
      }

      // Add to Cart action inside lightbox
      if (lbAddCartBtn) {
        const dishMatch = menuData.find(d => d.id === item.id);
        if (dishMatch) {
          lbAddCartBtn.style.display = 'inline-flex';
          lbAddCartBtn.onclick = () => {
            addToCart(item.id);
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
          };
        } else {
          lbAddCartBtn.style.display = 'none';
        }
      }

      // Reserve Table action inside lightbox
      if (lbReserveTableBtn) {
        lbReserveTableBtn.onclick = () => {
          lightbox.classList.remove('active');
          const reserveModal = document.getElementById('reservation-modal');
          if (reserveModal) {
            reserveModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        };
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    if (lbPrevBtn) {
      lbPrevBtn.addEventListener('click', () => {
        state.currentLightboxIndex = (state.currentLightboxIndex - 1 + galleryShowcaseData.length) % galleryShowcaseData.length;
        openRichLightbox(state.currentLightboxIndex);
      });
    }

    if (lbNextBtn) {
      lbNextBtn.addEventListener('click', () => {
        state.currentLightboxIndex = (state.currentLightboxIndex + 1) % galleryShowcaseData.length;
        openRichLightbox(state.currentLightboxIndex);
      });
    }

    if (lbClose && lightbox) {
      lbClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  /* ==========================================================================
     14. SOUNDSCAPE SYNTHESIZER (WEB AUDIO API)
     ========================================================================== */
  function initAudioEngine() {
    const audioBtn = document.getElementById('audio-toggle-btn');
    if (!audioBtn) return;

    let audioCtx = null;

    audioBtn.addEventListener('click', () => {
      if (!state.audioActive) {
        try {
          if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
          }
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }

          // Gentle ambient chord drone (Warm C-Major 7th Cafe Chord)
          const frequencies = [130.81, 164.81, 196.00, 246.94];
          frequencies.forEach((freq) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
          });

          state.audioActive = true;
          audioBtn.classList.add('playing');
          audioBtn.title = 'Mute Cafe Ambience';
          showToast('Cafe ambience soundscape enabled');
        } catch (e) {
          console.warn('Audio context unavailable:', e);
        }
      } else {
        if (audioCtx) {
          audioCtx.suspend();
        }
        state.audioActive = false;
        audioBtn.classList.remove('playing');
        audioBtn.title = 'Play Ambient Soundscape';
        showToast('Cafe ambience muted');
      }
    });
  }

  /* ==========================================================================
     15. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  function showToast(message) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E25822" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3400);
  }

})();

