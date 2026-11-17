/**
 * Sweet Crumbs Narok - 3D Celebration Cake Studio
 * Standalone Three.js 3D Cake Interactive Visualizer
 *
 * Setup Instructions:
 * 1. Include Three.js in your HTML:
 *    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
 *
 * 2. Add container element:
 *    <div id="cake-3d-canvas" style="width: 100%; height: 420px; position: relative;"></div>
 *
 * 3. Include this script!
 */

(function initSweetCrumbs3DCake() {
  const container = document.getElementById('cake-3d-canvas') || document.body;
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || 420;

  // 1. Scene & Camera Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 4.5, 9);
  camera.lookAt(0, 1.2, 0);

  // 2. WebGL Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // 3. Lighting (Warm Artisanal Bakery Ambience)
  const ambientLight = new THREE.AmbientLight(0xfdf9f3, 0.85);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xfff3e0, 1.4);
  mainLight.position.set(6, 10, 7);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  const warmRimLight = new THREE.DirectionalLight(0xc86d51, 0.7);
  warmRimLight.position.set(-6, 3, -5);
  scene.add(warmRimLight);

  // 4. Cake Studio Master Group
  const cakeGroup = new THREE.Group();
  scene.add(cakeGroup);

  // Color Palette Constants (Artisanal Warmth)
  const COLORS = {
    marbleStand: 0xf5f0ea,
    goldRim: 0xd4af37,
    spongeCream: 0xfbf6ee,
    terracottaDrip: 0xc86d51,
    chocolateGanache: 0x3d2314,
    strawberryRed: 0xd92d3e,
    berryBlue: 0x2e294e,
    leafGreen: 0x386641,
    candleWax: 0xfffcf0,
    candleFlame: 0xffaa00
  };

  // Materials
  const marbleMat = new THREE.MeshStandardMaterial({
    color: COLORS.marbleStand,
    roughness: 0.25,
    metalness: 0.1
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: COLORS.goldRim,
    roughness: 0.3,
    metalness: 0.85
  });

  const frostingMat = new THREE.MeshStandardMaterial({
    color: COLORS.spongeCream,
    roughness: 0.45,
    metalness: 0.05
  });

  const caramelDripMat = new THREE.MeshStandardMaterial({
    color: COLORS.terracottaDrip,
    roughness: 0.2,
    metalness: 0.15
  });

  const berryMat = new THREE.MeshStandardMaterial({
    color: COLORS.strawberryRed,
    roughness: 0.3,
    metalness: 0.1
  });

  const blueberryMat = new THREE.MeshStandardMaterial({
    color: COLORS.berryBlue,
    roughness: 0.4,
    metalness: 0.1
  });

  // A. Pedestal Marble Cake Stand
  const standBaseGeo = new THREE.CylinderGeometry(1.6, 2.0, 0.25, 48);
  const standBase = new THREE.Mesh(standBaseGeo, marbleMat);
  standBase.position.y = -0.5;
  standBase.receiveShadow = true;
  cakeGroup.add(standBase);

  const standStemGeo = new THREE.CylinderGeometry(0.45, 0.6, 0.8, 32);
  const standStem = new THREE.Mesh(standStemGeo, goldMat);
  standStem.position.y = 0.0;
  cakeGroup.add(standStem);

  const plateGeo = new THREE.CylinderGeometry(2.9, 2.9, 0.2, 64);
  const plate = new THREE.Mesh(plateGeo, marbleMat);
  plate.position.y = 0.45;
  plate.receiveShadow = true;
  cakeGroup.add(plate);

  const plateRimGeo = new THREE.TorusGeometry(2.9, 0.04, 16, 64);
  const plateRim = new THREE.Mesh(plateRimGeo, goldMat);
  plateRim.rotation.x = Math.PI / 2;
  plateRim.position.y = 0.52;
  cakeGroup.add(plateRim);

  // B. Bottom Tier (Celebration Sponge)
  const bottomTierGeo = new THREE.CylinderGeometry(2.2, 2.2, 1.4, 48);
  const bottomTier = new THREE.Mesh(bottomTierGeo, frostingMat);
  bottomTier.position.y = 1.25;
  bottomTier.castShadow = true;
  bottomTier.receiveShadow = true;
  cakeGroup.add(bottomTier);

  // Bottom Tier Decorative Gold Pearls
  const pearlCount = 36;
  const pearlRadius = 2.22;
  for (let i = 0; i < pearlCount; i++) {
    const angle = (i / pearlCount) * Math.PI * 2;
    const pearlGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const pearl = new THREE.Mesh(pearlGeo, goldMat);
    pearl.position.set(Math.cos(angle) * pearlRadius, 0.62, Math.sin(angle) * pearlRadius);
    cakeGroup.add(pearl);
  }

  // C. Top Tier
  const topTierGeo = new THREE.CylinderGeometry(1.4, 1.4, 1.2, 48);
  const topTier = new THREE.Mesh(topTierGeo, frostingMat);
  topTier.position.y = 2.5;
  topTier.castShadow = true;
  topTier.receiveShadow = true;
  cakeGroup.add(topTier);

  // Top Tier Caramel Glaze & Drips
  const topGlazeGeo = new THREE.CylinderGeometry(1.42, 1.42, 0.12, 48);
  const topGlaze = new THREE.Mesh(topGlazeGeo, caramelDripMat);
  topGlaze.position.y = 3.1;
  cakeGroup.add(topGlaze);

  // Dripping caramel droplets around top perimeter
  const dripDrops = 14;
  for (let i = 0; i < dripDrops; i++) {
    const angle = (i / dripDrops) * Math.PI * 2;
    const dripLen = 0.2 + ((i % 3) * 0.15);
    const dripGeo = new THREE.ConeGeometry(0.09, dripLen, 16);
    const dripMesh = new THREE.Mesh(dripGeo, caramelDripMat);
    dripMesh.rotation.x = Math.PI;
    dripMesh.position.set(Math.cos(angle) * 1.38, 3.05 - (dripLen / 2), Math.sin(angle) * 1.38);
    cakeGroup.add(dripMesh);
  }

  // D. Organic Berries & Fruit Toppers
  for (let b = 0; b < 7; b++) {
    const angle = (b / 7) * Math.PI * 2 + 0.2;
    const r = 0.85;
    // Strawberries
    const strawberryGeo = new THREE.ConeGeometry(0.18, 0.32, 16);
    const strawberry = new THREE.Mesh(strawberryGeo, berryMat);
    strawberry.position.set(Math.cos(angle) * r, 3.25, Math.sin(angle) * r);
    strawberry.rotation.x = 0.3;
    strawberry.rotation.z = Math.sin(b) * 0.4;
    cakeGroup.add(strawberry);

    // Blueberries
    const bbGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const bb = new THREE.Mesh(bbGeo, blueberryMat);
    bb.position.set(Math.cos(angle + 0.3) * (r * 0.6), 3.2, Math.sin(angle + 0.3) * (r * 0.6));
    cakeGroup.add(bb);
  }

  // E. Birthday Candle & Flickering Flame
  const candleGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.8, 16);
  const candleMat = new THREE.MeshStandardMaterial({ color: COLORS.candleWax });
  const candle = new THREE.Mesh(candleGeo, candleMat);
  candle.position.set(0, 3.55, 0);
  cakeGroup.add(candle);

  // Wick
  const wickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.15, 8);
  const wickMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
  const wick = new THREE.Mesh(wickGeo, wickMat);
  wick.position.set(0, 3.98, 0);
  cakeGroup.add(wick);

  // Flame
  const flameGeo = new THREE.ConeGeometry(0.09, 0.25, 16);
  const flameMat = new THREE.MeshBasicMaterial({ color: COLORS.candleFlame });
  const flame = new THREE.Mesh(flameGeo, flameMat);
  flame.position.set(0, 4.14, 0);
  cakeGroup.add(flame);

  const flamePointLight = new THREE.PointLight(0xffaa22, 1.2, 5);
  flamePointLight.position.set(0, 4.2, 0);
  scene.add(flamePointLight);

  // 5. Interactive Touch / Mouse Drag Rotation
  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };
  let autoRotate = true;
  let targetRotationY = 0;
  let targetRotationX = 0;

  function onPointerDown(e) {
    isDragging = true;
    autoRotate = false;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    prevMousePos = { x: clientX, y: clientY };
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const deltaX = clientX - prevMousePos.x;
    const deltaY = clientY - prevMousePos.y;

    targetRotationY += deltaX * 0.008;
    targetRotationX += deltaY * 0.004;
    targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX));

    prevMousePos = { x: clientX, y: clientY };
  }

  function onPointerUp() {
    isDragging = false;
    setTimeout(() => { autoRotate = true; }, 3000);
  }

  container.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  container.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // 6. Window Resize Handler
  window.addEventListener('resize', () => {
    const newW = container.clientWidth || window.innerWidth;
    const newH = container.clientHeight || 420;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });

  // 7. Render Loop with Physics & Flame Flicker
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (autoRotate) {
      targetRotationY += 0.008;
    }

    // Smooth inertia interpolation
    cakeGroup.rotation.y += (targetRotationY - cakeGroup.rotation.y) * 0.06;
    cakeGroup.rotation.x += (targetRotationX - cakeGroup.rotation.x) * 0.06;

    // Organic flame flicker
    flame.scale.x = 1 + Math.sin(elapsedTime * 15) * 0.15;
    flame.scale.y = 1 + Math.cos(elapsedTime * 18) * 0.12;
    flamePointLight.intensity = 1.0 + Math.sin(elapsedTime * 20) * 0.25;

    // Subtle breathing float
    cakeGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

    renderer.render(scene, camera);
  }

  animate();
})();
