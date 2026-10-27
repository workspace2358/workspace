// WORKSPACE - Soluciones Digitales • Resultados Reales
// 3D Background Engine & Interactive Live Delivery Simulator

// 1. Three.js Background Simulation (Sleek Dark Ribbon Dynamics)
function initWorkspace3D() {
  const canvas = document.getElementById('canvas-3d-workspace');
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 26;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Ambient & Directional Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  const pointLight = new THREE.PointLight(0xffffff, 1.6, 120);
  pointLight.position.set(12, 14, 18);
  scene.add(pointLight);

  const cyanLight = new THREE.PointLight(0x00f0ff, 0.6, 60);
  cyanLight.position.set(-14, -8, 12);
  scene.add(cyanLight);

  // 3D Ribbon Parametric Mesh
  class RibbonWCurve extends THREE.Curve {
    getPoint(t, optionalTarget = new THREE.Vector3()) {
      const u = t * Math.PI * 2;
      const x = Math.sin(u) * 7.0 + Math.sin(u * 2) * 2.2;
      const y = Math.cos(u * 2) * 3.5;
      const z = Math.cos(u) * 3.5;
      return optionalTarget.set(x, y, z);
    }
  }

  const path = new RibbonWCurve();
  const tubeGeometry = new THREE.TubeGeometry(path, 120, 0.85, 20, true);
  const tubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1d26,
    metalness: 0.8,
    roughness: 0.28
  });

  const ribbonMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
  scene.add(ribbonMesh);

  // Floating Micro-particles
  const particleCount = 140;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 70;
    positions[i + 1] = (Math.random() - 0.5) * 70;
    positions[i + 2] = (Math.random() - 0.5) * 50;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.7,
    color: 0x94a3b8,
    transparent: true,
    opacity: 0.4
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // Parallax on Mouse Move
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    ribbonMesh.rotation.y = elapsedTime * 0.14;
    ribbonMesh.rotation.x = Math.sin(elapsedTime * 0.12) * 0.25;

    particleSystem.rotation.y = -elapsedTime * 0.02;

    targetX += (mouseX * 4 - targetX) * 0.04;
    targetY += (-mouseY * 3 - targetY) * 0.04;

    camera.position.x = targetX;
    camera.position.y = targetY;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// 2. Interactive Live WhatsApp Chat Simulator
window.simulateChat = function(type) {
  const chatBody = document.getElementById('phone-chat-body');
  if (!chatBody) return;

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function appendMsg(text, isOutgoing = false) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isOutgoing ? 'outgoing' : 'incoming'}`;
    bubble.innerHTML = `<p>${text}</p><span class="bubble-time">${getTime()}</span>`;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  if (type === 'delivery') {
    appendMsg("Hola, quiero pedir delivery de 1 Trío Marino y 1 Porción de Makis a mi casa 🛵", true);
    setTimeout(() => {
      appendMsg("¡Excelente elección! 🍽️ Anotado:<br>• 1 Trío Marino: S/ 38.00<br>• 1 Tabla Makis x10: S/ 18.00<br><strong>Total: S/ 56.00</strong><br><br>📍 Por favor indícanos tu dirección exacta y método de pago (Yape/Plin o Tarjeta).");
    }, 600);
  } else if (type === 'menu') {
    appendMsg("¿Cuáles son los precios de los platos más pedidos?", true);
    setTimeout(() => {
      appendMsg("🌊 ¡Nuestros platos estrella hoy!<br>• Ceviche Clásico: S/ 28.00<br>• Arroz c/ Mariscos: S/ 30.00<br>• Makis Tabla x10: S/ 18.00<br>• Promo 2x1 Chilcanos: S/ 25.00 🍹<br><br>¿Deseas que te preparemos uno para delivery?");
    }, 600);
  } else if (type === 'yape') {
    appendMsg("Ya hice el Yape, aquí te mando la captura de pago 📲", true);
    setTimeout(() => {
      appendMsg("🎉 ¡Pago verificado con éxito!<br>Tu pedido <strong>#CN-2849</strong> ya entró a cocina. Tiempo estimado de entrega: <strong>30 minutos</strong>. Te avisaremos cuando el motorizado vaya en camino 🛵💨");
    }, 600);
  }
};

window.resetSimulator = function() {
  const chatBody = document.getElementById('phone-chat-body');
  if (!chatBody) return;
  chatBody.innerHTML = `
    <div class="chat-bubble incoming">
      <p>¡Hola! 👋 Bienvenido a nuestro servicio de atención automática. ¿Qué deseas hacer hoy?</p>
      <span class="bubble-time">12:00 PM</span>
    </div>
  `;
};

// 3. Dynamic 3-Industry Calculator & Transparent Budget Estimator
const INDUSTRY_DATA = {
  restaurante: {
    label: "Restaurante / Restobar / Cevichería",
    step1Title: "1. Selecciona el servicio principal para tu Restaurante:",
    step2Title: "2. Funciones adicionales recomendadas para Restaurantes:",
    services: [
      {
        id: "carta_qr",
        icon: "fa-solid fa-qrcode",
        title: "Carta Virtual con QR por Mesa",
        desc: "Tus clientes escanean el QR en su mesa, ven fotos reales, personalizan su plato y piden al instante.",
        price: 400,
        checked: true
      },
      {
        id: "bot_delivery",
        icon: "fa-brands fa-whatsapp",
        title: "Bot de WhatsApp para Delivery & Pedidos",
        desc: "Atiende pedidos a domicilio, calcula el costo de envío, da precios y avisa a tu teléfono.",
        price: 450
      },
      {
        id: "banners_publicidad",
        icon: "fa-solid fa-wand-magic-sparkles",
        title: "Generación de Banners Profesionales y Publicidad",
        desc: "Diseño de banners de alta calidad para tus platos, combos, estados de WhatsApp, redes y campañas publicitarias para atraer clientes.",
        price: 250
      },
      {
        id: "pack_restaurante",
        icon: "fa-solid fa-crown",
        title: "Pack Restaurante Pro (Carta QR + Bot + Banners)",
        desc: "Carta digital interactiva para las mesas + Sistema de Delivery por WhatsApp + Banners publicitarios.",
        price: 850
      }
    ],
    addons: [
      {
        id: "tele_cocina",
        icon: "fa-brands fa-telegram",
        title: "Comandas a Telegram para Cocina / Mozo",
        desc: "Cada comanda llega directamente a la cocina o barra con nombre y mesa.",
        price: 80
      },
      {
        id: "banners_addon",
        icon: "fa-solid fa-bullhorn",
        title: "Generación de Banners Profesionales y Publicidad",
        desc: "Pack de banners y creativos publicitarios para tus platos y promociones.",
        price: 120
      },
      {
        id: "yape_pos",
        icon: "fa-solid fa-credit-card",
        title: "Módulo de Cobro Yape, Plin y POS en Mesa",
        desc: "Envío automático de datos de pago y confirmación de comprobantes.",
        price: 100
      },
      {
        id: "express_3d",
        icon: "fa-solid fa-bolt",
        title: "Lanzamiento Express en 3 Días",
        desc: "Tu restaurante listo y atendiendo en tiempo récord.",
        price: 120
      }
    ]
  },
  tienda: {
    label: "Tienda / Comercio / Productos",
    step1Title: "1. Selecciona el servicio principal para tu Tienda o Comercio:",
    step2Title: "2. Funciones adicionales recomendadas para Tiendas:",
    services: [
      {
        id: "tienda_virtual",
        icon: "fa-solid fa-store",
        title: "Tienda Virtual con Carrito de Compras",
        desc: "Catálogo de productos online con fotos, tallas, stock y botón de pago directo sin intermediarios.",
        price: 450,
        checked: true
      },
      {
        id: "bot_asistente",
        icon: "fa-brands fa-whatsapp",
        title: "Asistente de Ventas por WhatsApp",
        desc: "Responde consultas de stock, muestra fotos de productos, cotiza y toma los datos de envío.",
        price: 450
      },
      {
        id: "pack_tienda",
        icon: "fa-solid fa-crown",
        title: "Pack Tienda Pro (Web + Asistente WhatsApp)",
        desc: "Tu tienda online conectada a tu WhatsApp para vender y cobrar en automático las 24 horas.",
        price: 800
      }
    ],
    addons: [
      {
        id: "sheets_gastos",
        icon: "fa-solid fa-file-invoice-dollar",
        title: "Registro de Ventas y Gastos en Sheets",
        desc: "El bot anota automáticamente cada venta y gasto en una hoja de Google Sheets.",
        price: 90
      },
      {
        id: "tele_despacho",
        icon: "fa-brands fa-telegram",
        title: "Avisos a Telegram para Despacho",
        desc: "Tu equipo de almacén recibe el aviso inmediato del producto a empaquetar.",
        price: 80
      },
      {
        id: "express_3d",
        icon: "fa-solid fa-bolt",
        title: "Lanzamiento Express en 3 Días",
        desc: "Tu tienda lista y vendiendo en 3 días hábiles.",
        price: 120
      }
    ]
  },
  empresa: {
    label: "Empresa / Servicios / Consultoría",
    step1Title: "1. Selecciona el servicio principal para tu Empresa o Microempresa:",
    step2Title: "2. Funciones adicionales recomendadas para Empresas:",
    services: [
      {
        id: "web_corporativa",
        icon: "fa-solid fa-laptop-code",
        title: "Sitio Web Corporativo Profesional",
        desc: "Presentación de tus servicios, portafolio de clientes, testimonios y formulario de captación.",
        price: 450,
        checked: true
      },
      {
        id: "bot_citas",
        icon: "fa-brands fa-whatsapp",
        title: "Agente IA de WhatsApp para Citas & Consultas",
        desc: "Califica prospectos, responde preguntas frecuentes 24/7 y agenda reuniones en calendario.",
        price: 500
      },
      {
        id: "pack_empresa",
        icon: "fa-solid fa-crown",
        title: "Pack Empresa Integral (Web + Agente IA)",
        desc: "Presencia digital completa y atención comercial automatizada para captar clientes.",
        price: 850
      }
    ],
    addons: [
      {
        id: "tele_ventas",
        icon: "fa-brands fa-telegram",
        title: "Avisos al Equipo Comercial en Telegram",
        desc: "Tus asesores reciben la alerta al instante cuando un cliente calificado solicita cotización.",
        price: 80
      },
      {
        id: "adelantos_pagos",
        icon: "fa-solid fa-credit-card",
        title: "Módulo de Cobro de Servicios y Adelantos",
        desc: "Cobro seguro con Yape, Plin o tarjeta bancaria.",
        price: 100
      },
      {
        id: "express_3d",
        icon: "fa-solid fa-bolt",
        title: "Lanzamiento Express en 3 Días",
        desc: "Tu proyecto corporativo listo en 3 días hábiles.",
        price: 120
      }
    ]
  }
};

let currentIndustry = "restaurante";

window.openIndustryConfig = function(indKey) {
  const portalView = document.getElementById('industry-portal-view');
  const configView = document.getElementById('industry-config-view');
  const activeTitle = document.getElementById('active-ind-title');
  const activeIcon = document.getElementById('active-ind-icon');

  if (!portalView || !configView) return;

  const data = INDUSTRY_DATA[indKey];
  if (!data) return;

  currentIndustry = indKey;

  // Icon mapping
  const icons = {
    restaurante: 'fa-solid fa-utensils',
    tienda: 'fa-solid fa-bag-shopping',
    empresa: 'fa-solid fa-building'
  };

  if (activeTitle) activeTitle.textContent = data.label;
  if (activeIcon) activeIcon.className = icons[indKey] || 'fa-solid fa-gear';

  portalView.classList.remove('active');
  portalView.classList.add('hidden');

  configView.classList.add('active');

  renderIndustry(indKey);

  // Smooth scroll to top of configurator
  document.getElementById('cotizador').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.closeIndustryConfig = function() {
  const portalView = document.getElementById('industry-portal-view');
  const configView = document.getElementById('industry-config-view');

  if (!portalView || !configView) return;

  configView.classList.remove('active');
  portalView.classList.remove('hidden');
  portalView.classList.add('active');

  document.getElementById('cotizador').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function renderIndustry(indKey) {
  const data = INDUSTRY_DATA[indKey];
  const servicesContainer = document.getElementById('dynamic-services-grid');
  const addonsContainer = document.getElementById('dynamic-addons-grid');
  const step1Title = document.getElementById('step1-title');
  const step2Title = document.getElementById('step2-title');

  if (!data || !servicesContainer || !addonsContainer) return;

  if (step1Title) step1Title.textContent = data.step1Title;
  if (step2Title) step2Title.textContent = data.step2Title;

  // Render Base Services
  servicesContainer.innerHTML = data.services.map((s, idx) => `
    <label class="choice-card ${s.checked || idx === 0 ? 'active' : ''}">
      <input type="radio" name="base_service" value="${s.id}" data-price="${s.price}" ${s.checked || idx === 0 ? 'checked' : ''}>
      <div class="choice-inner">
        <i class="${s.icon}"></i>
        <strong>${s.title}</strong>
        <span>${s.desc}</span>
        <span class="choice-price">S/ ${s.price}</span>
      </div>
    </label>
  `).join('');

  // Render Addons
  addonsContainer.innerHTML = data.addons.map(a => `
    <label class="addon-card">
      <input type="checkbox" name="extra_addon" value="${a.title}" data-price="${a.price}">
      <div class="addon-inner">
        <i class="${a.icon}"></i>
        <div class="addon-texts">
          <strong>${a.title}</strong>
          <span>${a.desc}</span>
        </div>
        <span class="addon-tag">+S/ ${a.price}</span>
      </div>
    </label>
  `).join('');

  // Rebind events on new elements
  servicesContainer.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', updateBudget);
  });
  addonsContainer.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', updateBudget);
  });

  updateBudget();
}

function updateBudget() {
  const form = document.getElementById('calc-form');
  if (!form) return;

  const data = INDUSTRY_DATA[currentIndustry];
  const baseSelected = form.querySelector('input[name="base_service"]:checked');
  const basePrice = baseSelected ? parseInt(baseSelected.getAttribute('data-price'), 10) : 400;
  const baseTitle = baseSelected ? baseSelected.closest('.choice-card').querySelector('strong').textContent : "Servicio Principal";

  // Addons
  const addonsSelected = form.querySelectorAll('input[name="extra_addon"]:checked');
  let addonsPrice = 0;
  const addonsList = [];

  addonsSelected.forEach(addon => {
    addonsPrice += parseInt(addon.getAttribute('data-price'), 10);
    addonsList.push(addon.value);
  });

  const total = basePrice + addonsPrice;

  // Update active styles
  document.querySelectorAll('.choice-card').forEach(card => {
    const r = card.querySelector('input');
    card.classList.toggle('active', r && r.checked);
  });

  document.querySelectorAll('.addon-card').forEach(card => {
    const c = card.querySelector('input');
    card.classList.toggle('active', c && c.checked);
  });

  const totalDigits = document.getElementById('live-total-digits');
  const summaryEl = document.getElementById('live-selection-summary');
  const waBtn = document.getElementById('btn-send-wa-quote');

  if (totalDigits) totalDigits.textContent = total;

  if (summaryEl) {
    if (addonsList.length > 0) {
      summaryEl.innerHTML = `Rubro: <strong>${data.label}</strong> • ${baseTitle} + ${addonsList.length} extra(s).`;
    } else {
      summaryEl.innerHTML = `Rubro: <strong>${data.label}</strong> • ${baseTitle} (S/ ${basePrice}).`;
    }
  }

  // Pre-fill WhatsApp message
  const phone = "51965691363";
  let text = `¡Hola WORKSPACE! 🚀 He configurado un paquete para mi negocio en su web:\n\n`;
  text += `🏢 *Rubro:* ${data.label}\n`;
  text += `📦 *Servicio Principal:* ${baseTitle} (S/ ${basePrice})\n`;
  if (addonsList.length > 0) {
    text += `✨ *Funciones Extra:* \n${addonsList.map(a => `  • ${a}`).join('\n')}\n`;
  }
  text += `💰 *Presupuesto Total Estimado:* S/ ${total} PEN\n\n`;
  text += `¿Podríamos coordinar los detalles para iniciar?`;

  if (waBtn) {
    waBtn.onclick = () => {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    };
  }
}

function initCalculator() {
  // Initial pre-render
  renderIndustry("restaurante");
}

// 4. FAQ Accordion
function initFAQ() {
  document.querySelectorAll('.faq-accordion-item').forEach(item => {
    const btn = item.querySelector('.faq-btn');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-accordion-item').forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initWorkspace3D();
  initCalculator();
  initFAQ();
});
