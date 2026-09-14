/* ==========================================================================
   AC MEDIC - LÓGICA INTERACTIVA EN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. NAVBAR SCROLL STYLING & BACK TO TOP BUTTON
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    // Navbar shadow on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility (Mínimo scroll > 80px)
    if (window.scrollY > 80) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Action Back to Top
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 2. MENÚ MOBILE TOGGLE
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  // 4. FILTROS DEL CATÁLOGO DE PRODUCTOS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remueve clase active de todos los botones
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. MODALES INTERACTIVOS DE FICHA TÉCNICA DE PRODUCTOS
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  const detailBtns = document.querySelectorAll('.btn-details');

  // Base de datos de información detallada de productos
  const productDetails = {
    'modal-m1': {
      title: 'Muñequera Abierta con Doble Ajuste (Cod. M1)',
      category: 'Soportes de Muñeca / Neoprene',
      img: '00-FOTOS/Muñequeras/MUÑEQUERA ABIERTA  COD M1.jpg',
      desc: 'Contribuye a una rápida desinflamación y recuperación de lesiones aplicando compresión y calor terapéutico. Su peso ligero y ajuste regulable la convierten en la opción ideal tanto para la práctica deportiva como para el uso diario.',
      patologias: ['Contusiones', 'Esguinces de muñeca', 'Distensiones ligamentarias', 'Debilidad muscular', 'Dolores reumáticos', 'Tendinitis e inflamación tendinosa', 'Artritis de muñeca'],
      talles: [
        'S: 13 cm - 16 cm (contorno de muñeca)',
        'M: 16 cm - 18 cm (contorno de muñeca)',
        'L: 18 cm - 20 cm (contorno de muñeca)'
      ],
      materiales: 'Elaborada en Neoprene de alta densidad, material de gran elasticidad, resistencia y confort. Apta para uso en ambas manos (ambidiestra).'
    },

    'modal-faja630': {
      title: 'Faja Sacrolumbar Alta Reforzada (Cod. 630)',
      category: 'Soporte Lumbar y Columna',
      img: '00-FOTOS/Fajas/FAJA SACROLUMBAR ALTA  COD. 630.jpg',
      desc: 'Soporte ortopédico de máxima firmeza diseñado para estabilizar la región sacrolumbar. Sus ballenas de acero templado acolchadas ayudan a corregir la postura y aliviar lumbalgias agudas o crónicas.',
      patologias: ['Lumbalgias y lumbociáticas', 'Hernias de disco o discopatías', 'Artrosis lumbar', 'Contracturas musculares severas', 'Post-operatorio de columna'],
      talles: [
        'Talle 1 (S): 75 cm - 90 cm (cintura)',
        'Talle 2 (M): 90 cm - 105 cm',
        'Talle 3 (L): 105 cm - 120 cm',
        'Talle 4 (XL): 120 cm - 135 cm'
      ],
      materiales: 'Confeccionada en elástico multibanda de alta compresión con cierre de velcro reforzado y ballenas flexibles posteriores.'
    },

    'modal-r3': {
      title: 'Rodillera Neoprene con Apertura Rotuliana (Cod. R3)',
      category: 'Soportes de Rodilla',
      img: '00-FOTOS/Rodilleras/RODILLERA CON APERTURA ROTULIANA  COD R3.jpg',
      desc: 'Diseñada para centrar la rótula y prevenir desvíos articulares durante la marcha o la práctica de ejercicio físico. El rodete de contención acolchado proporciona estabilidad superior.',
      patologias: ['Condromalacia rotuliana', 'Tendinitis rotuliana', 'Subluxación de rótula', 'Esguinces de rodilla leve a moderado', 'Dolores por desgaste articular'],
      talles: [
        'S: 32 cm - 36 cm (contorno 10cm arriba de rótula)',
        'M: 36 cm - 40 cm',
        'L: 40 cm - 44 cm',
        'XL: 44 cm - 48 cm'
      ],
      materiales: 'Neoprene médico de 4 mm con costuras reforzadas de alta durabilidad.'
    },

    'modal-t2': {
      title: 'Tobillera con Ajuste de Elástico en Ocho (Cod. T2)',
      category: 'Soportes de Tobillo',
      img: '00-FOTOS/Tobilleras/TOBILLERA CON AJUSTE DE ELÁSTICO EN OCHO  COD T2.jpg',
      desc: 'Soporte funcional para tobillo que utiliza una banda de compresión cruzada en formato de ocho para reproducir el efecto de un vendaje profesional.',
      patologias: ['Inestabilidad ligamentaria', 'Prevención de esguinces en deporte', 'Recuperación post-traumática', 'Edemas y distensiones'],
      talles: [
        'S: 18 cm - 22 cm (contorno de tobillo)',
        'M: 22 cm - 26 cm',
        'L: 26 cm - 30 cm'
      ],
      materiales: 'Neoprene respirable con elástico cruzado de alta tracción y cierres regulables.'
    },

    'modal-omron': {
      title: 'Tensiómetro Digital de Brazo OMRON HEM-7120',
      category: 'Equipamiento Diagnóstico',
      img: '00-FOTOS/Tensiometro digital de brazo OMRON/Omron Brazo.png',
      desc: 'Monitor de presión arterial de brazo digital automático. Ofrece mediciones confiables con solo presionar un botón. Incluye alerta de arritmia y detector de error por movimiento.',
      patologias: ['Control de hipertensión arterial', 'Monitoreo cardiovascular de rutina', 'Control médico domiciliario'],
      talles: [
        'Brazalete universal estándar: 22 cm a 42 cm de contorno de brazo.'
      ],
      materiales: 'Tecnología médica japonesa Intellisense. Incluye baterías y manual de usuario en español. 5 años de garantía.'
    },

    'modal-oximetro': {
      title: 'Oxímetro de Pulso Digital OLED (Cod. 302L)',
      category: 'Diagnóstico Neumonológico',
      img: '00-FOTOS/Oximetros/oximetro 302L.webp',
      desc: 'Dispositivo compacto y preciso para medir instantáneamente el porcentaje de saturación de oxígeno en sangre (SpO2) y la frecuencia de pulso arterial.',
      patologias: ['Control respiratorio', 'Asma, EPOC e insuficiencias respiratorias', 'Monitoreo deportivo de altitud'],
      talles: [
        'Adaptable a dedos de niños y adultos.'
      ],
      materiales: 'Pantalla OLED multicolor bidireccional, bajo consumo de energía con apagado automático tras 8 segundos de inactividad.'
    },

    'modal-esteto': {
      title: 'Estetoscopio Clínico Doble Campana Profesional',
      category: 'Equipamiento Médico',
      img: '00-FOTOS/Estetos/esteto tipo littman.jpg',
      desc: 'Instrumento de auscultación acústica de alta sensibilidad para evaluación respiratoria y cardíaca. Olivas blandas que aíslan ruidos ambientales.',
      patologias: ['Auscultación clínica general', 'Diagnóstico médico, enfermería y kinesiología'],
      talles: [
        'Longitud de tubo: 70 cm. Campana doble de acero.'
      ],
      materiales: 'Campana en aleación de zinc / acero inoxidable, tubo libre de látex de gran durabilidad.'
    },

    'modal-cinta': {
      title: 'Cinta de Caminata Ergométrica EuroMix',
      category: 'Rehabilitación y Fitness Médico',
      img: '00-FOTOS/Cinta EuroMix/WhatsApp Image 2024-06-19 at 11.47.26.jpeg',
      desc: 'Equipo ergométrico para caminata y rehabilitación aeróbica guiada. Permite trabajar fuerza, resistencia muscular y acondicionamiento cardiovascular con mínimo impacto articular.',
      patologias: ['Rehabilitación kinesiologia postural', 'Recuperación motora y cardiovascular', 'Acondicionamiento físico para adultos mayores'],
      talles: [
        'Estructura plegable con ruedas de traslado. Peso máximo de usuario: 110 kg.'
      ],
      materiales: 'Chasis de acero reforzado, consola digital con sensor de pulso y velocidad regulable.'
    }
  };

  // Abrir Modal
  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      const data = productDetails[modalKey];

      if (data) {
        let patologiasHTML = '';
        if (data.patologias && data.patologias.length > 0) {
          patologiasHTML = `
            <div style="margin-top: 1rem;">
              <strong style="color: var(--primary); display:block; margin-bottom: 0.4rem;"><i class="fa-solid fa-notes-medical"></i> Indicaciones / Patologías:</strong>
              <ul style="padding-left: 1.2rem; font-size: 0.875rem; color: var(--text-main); line-height: 1.6;">
                ${data.patologias.map(p => `<li>${p}</li>`).join('')}
              </ul>
            </div>
          `;
        }

        let tallesHTML = '';
        if (data.talles && data.talles.length > 0) {
          tallesHTML = `
            <div style="margin-top: 1rem;">
              <strong style="color: var(--primary); display:block; margin-bottom: 0.4rem;"><i class="fa-solid fa-ruler-combined"></i> Guía de Talles / Presentaciones:</strong>
              <ul style="padding-left: 1.2rem; font-size: 0.875rem; color: var(--text-main); line-height: 1.6;">
                ${data.talles.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
          `;
        }

        modalContent.innerHTML = `
          <div class="modal-product-header">
            <img src="${data.img}" alt="${data.title}" class="modal-product-img">
            <div class="modal-product-title-wrap">
              <span class="badge badge-emerald" style="margin-bottom: 0.5rem;">${data.category}</span>
              <h3>${data.title}</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted);">${data.desc}</p>
            </div>
          </div>

          ${patologiasHTML}
          ${tallesHTML}

          <div style="margin-top: 1rem; font-size: 0.85rem; background: var(--bg-light); padding: 0.8rem; border-radius: var(--radius-md);">
            <strong><i class="fa-solid fa-circle-info"></i> Materiales:</strong> ${data.materiales}
          </div>

          <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
            <a href="https://wa.me/5493518026082?text=Hola%20AC%20Medic,%20quiero%20consultar%20por%20el%20producto:%20${encodeURIComponent(data.title)}" 
               target="_blank" rel="noopener" class="btn btn-emerald w-100">
              <i class="fa-brands fa-whatsapp"></i> Consultar Disponibilidad por WhatsApp
            </a>
          </div>
        `;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita el scroll de fondo
      }
    });
  });

  // Cerrar Modal
  const closeModalFunc = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModalFunc);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModalFunc();
      }
    });
  }

  // Tecla Escape para cerrar modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModalFunc();
    }
  });

});
