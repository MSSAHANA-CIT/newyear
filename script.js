// Global state
let currentSection = 'home';
let nightMode = false;
let soundEnabled = false;
let petalOrder = [];
let objectsFound = 0;
let questStage = 0;

// Names
const herNames = [
  'MY EVERYTHING', 'MY LIGHT IN THE LIFE', 'MY SAHANA', 'MY WIFE',
  'MY SWEETHEART', 'MY CHELLA KUTTY', 'MY CUTE LITTLE RACCON',
  'MY HONEY', 'MY ANGEL', 'MY GODESSS', 'SEXXXXYYY', 'HOTIEEEEE', 'MY LIFE', 'SAHANA MONISH TIJIL'
];

const myNames = ['MONISH TIJIL', 'MO', 'YOURS FOREVER', 'YOUR HUSBAND'];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeMemoryGarden();
  initializeBouquet();
  initializeBook();
  initializeLibrary();
  initializeConstellations();
  initializeMap();
  initializeQuest();
  initializeAI();
  initializeVault();
  createPetals();
  createDust();
  createSparkles();
  setVaultDate();
});

// Navigation
function initializeNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');
  const featureCards = document.querySelectorAll('.feature-card');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      showSection(section);
    });
  });

  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const section = card.dataset.section;
      showSection(section);
    });
  });

  document.getElementById('nightModeToggle').addEventListener('click', toggleNightMode);
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  currentSection = sectionId;

  // Initialize section-specific features
  if (sectionId === 'constellations') {
    setTimeout(() => initConstellationCanvas(), 100);
  } else if (sectionId === 'map') {
    setTimeout(() => animatePlane(), 100);
  } else if (sectionId === 'library') {
    document.body.classList.add('library-cursor');
  } else {
    document.body.classList.remove('library-cursor');
  }
}

function toggleNightMode() {
  nightMode = !nightMode;
  document.body.classList.toggle('night-mode', nightMode);
  document.getElementById('nightModeToggle').textContent = nightMode ? '☀️' : '🌙';
}

// Memory Garden
function initializeMemoryGarden() {
  const cards = document.querySelectorAll('.memory-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        createSparkle(entry.target);
        
        // Animate card content
        const content = entry.target.querySelector('.card-content');
        if (content) {
          const paragraphs = content.querySelectorAll('p');
          paragraphs.forEach((p, index) => {
            setTimeout(() => {
              p.style.opacity = '1';
              p.style.transform = 'translateX(0)';
            }, index * 100);
          });
        }
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));

  const surpriseBtn = document.getElementById('surpriseBtn');
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      const letter = document.getElementById('surpriseLetter');
      letter.classList.remove('hidden');
      const text = letter.querySelector('.typewriter-text');
      typewriter(text, `My dearest ${herNames[2]},\n\nThis is my promise to you - a promise of forever, of endless love, of building our dreams together. You are my everything, my light, my reason.\n\nWith all my love,\n${myNames[1]} (${myNames[0]})`);
    });
  }
}

// Floating Petals for Memory Garden
function createFloatingPetals() {
  const container = document.getElementById('floatingPetals');
  if (!container) return;
  
  const petalEmojis = ['🌸', '🌺', '🌷', '🌹', '🌻', '🌼'];
  
  function createPetal() {
    const petal = document.createElement('div');
    petal.style.position = 'fixed';
    petal.style.fontSize = (20 + Math.random() * 30) + 'px';
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = '-50px';
    petal.style.opacity = 0.7;
    petal.style.pointerEvents = 'none';
    petal.style.zIndex = '1';
    petal.style.animation = `floatPetal ${15 + Math.random() * 10}s linear forwards`;
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    container.appendChild(petal);
    
    setTimeout(() => petal.remove(), 25000);
  }
  
  // Create petals continuously
  setInterval(createPetal, 800);
  
  // Initial burst
  for (let i = 0; i < 10; i++) {
    setTimeout(createPetal, i * 200);
  }
}

function typewriter(element, text) {
  element.textContent = '';
  let i = 0;
  const speed = 50;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Bouquet Generator
function initializeBouquet() {
  // Core Emotional Traits
  const coreTraits = [
    { emoji: '🌸', label: 'Your Warmth', note: 'Your warmth wraps around me like a gentle embrace, making everything feel safe and loved.' },
    { emoji: '💜', label: 'Your Gentle Heart', note: 'Your gentle heart sees the world with such beautiful kindness.' },
    { emoji: '🌺', label: 'Your Soft Voice', note: 'Your soft voice is the melody that calms my soul.' },
    { emoji: '🌷', label: 'Your Presence', note: 'Your presence alone makes everything better, brighter, more beautiful.' },
    { emoji: '🌼', label: 'Your Care', note: 'The way you care for me shows in every little thing you do.' },
    { emoji: '🌹', label: 'Your Pure Soul', note: 'Your soul is pure, beautiful, and everything I admire.' },
    { emoji: '🌻', label: 'Your Innocence', note: 'Your innocence is one of the most beautiful things about you.' },
    { emoji: '🌿', label: 'Your Tenderness', note: 'Your tenderness makes me feel so loved and cherished.' },
    { emoji: '🌾', label: 'Your Grace', note: 'You move through life with such grace and beauty.' },
    { emoji: '🌱', label: 'Your Calm Energy', note: 'Your calm energy brings peace to my chaotic world.' }
  ];

  // How She Makes You Feel
  const feelings = [
    { emoji: '💜', label: 'You Make Me Feel Safe', note: 'With you, I feel safe. Completely, utterly safe.' },
    { emoji: '🌙', label: 'You Are My Peace', note: 'You are my peace in a world full of noise.' },
    { emoji: '🏠', label: 'You Are My Home', note: 'You are not just my home, you are where my heart lives.' },
    { emoji: '💚', label: 'You Heal Me', note: 'Your love heals parts of me I didn\'t know were broken.' },
    { emoji: '🌍', label: 'You Ground Me', note: 'You ground me when I feel like I\'m floating away.' },
    { emoji: '☁️', label: 'You Make Life Softer', note: 'You make life softer, gentler, more beautiful.' },
    { emoji: '✨', label: 'You Make Everything Better', note: 'You make everything better just by being you.' },
    { emoji: '💕', label: 'You Make Me Feel Loved', note: 'You make me feel loved in ways I never knew possible.' },
    { emoji: '🛋️', label: 'You Are My Comfort', note: 'You are my comfort, my safe place, my everything.' }
  ];

  // Intimate + Romantic
  const intimate = [
    { emoji: '💖', label: 'The Way You Love Me', note: 'The way you love me is rare, gentle, and pure.' },
    { emoji: '💝', label: 'The Way You Understand Me', note: 'The way you understand me even when I struggle to find words.' },
    { emoji: '💗', label: 'The Way You Choose Me', note: 'The way you choose me, every single day, means everything.' },
    { emoji: '💓', label: 'The Way You Stay', note: 'The way you stay, through everything, shows me what real love is.' },
    { emoji: '💞', label: 'Your Silent Support', note: 'Your silent support speaks louder than words ever could.' },
    { emoji: '💟', label: 'Your Endless Love', note: 'Your endless love is my greatest blessing.' },
    { emoji: '💌', label: 'Your Beautiful Heart', note: 'Your beautiful heart is the most precious thing I know.' }
  ];

  // Future-Oriented
  const future = [
    { emoji: '♾️', label: 'Our Forever', note: 'Our forever starts today, and I can\'t wait for every moment.' },
    { emoji: '🌅', label: 'Our Tomorrow', note: 'Our tomorrow is full of dreams I can\'t wait to build with you.' },
    { emoji: '🏡', label: 'Our Life Together', note: 'Our life together is the story I want to write every day.' },
    { emoji: '🏠', label: 'Our Home', note: 'Our home will be wherever you are, because you are my home.' },
    { emoji: '📖', label: 'Our Love Story', note: 'Our love story is just beginning, and it\'s already my favorite.' },
    { emoji: '🛤️', label: 'Our Journey', note: 'Our journey together is the adventure I\'ve been waiting for.' },
    { emoji: '👨‍👩‍👧', label: 'Our Family', note: 'Our family, our future, our everything.' }
  ];

  // For Daughter
  const daughter = [
    { emoji: '👶', label: 'Our Daughter', note: 'Our daughter will be a little piece of us, of our love.' },
    { emoji: '💝', label: 'A Little Piece of Us', note: 'A little piece of us, with your kindness and beauty.' },
    { emoji: '🌟', label: 'Our Greatest Blessing', note: 'She will be our greatest blessing, our love made visible.' },
    { emoji: '😊', label: 'Our Future Smile', note: 'Our future smile, lighting up our world.' },
    { emoji: '💕', label: 'Love We Created', note: 'Love we created, growing into something beautiful.' }
  ];

  // Ultra-Soft Whispers
  const whispers = [
    'Loving you feels natural.',
    'I choose you every day.',
    'You are everything I prayed for.',
    'I am at peace with you.',
    'My heart knows you.',
    'With you, I am home.'
  ];

  // Special Golden Flower - My Wife
  const specialFlower = {
    emoji: '💍',
    label: 'My Wife',
    note: 'In every lifetime. In every universe. You are mine.',
    special: true
  };

  const allFlowers = [...coreTraits, ...feelings, ...intimate, ...future, ...daughter];

  document.getElementById('generateBouquet').addEventListener('click', () => {
    generateBouquet(allFlowers, specialFlower, whispers);
    document.getElementById('saveBouquet').classList.remove('hidden');
  });

  document.getElementById('saveBouquet').addEventListener('click', saveBouquet);
}

function generateBouquet(flowers, specialFlower, whispers) {
  const canvas = document.getElementById('bouquetCanvas');
  canvas.innerHTML = '';
  
  // Clear previous whispers
  const whispersContainer = document.getElementById('floatingWhispers');
  if (whispersContainer) whispersContainer.innerHTML = '';

  // Select flowers - mix of categories (scattered, not clustered)
  const numFlowers = 25 + Math.floor(Math.random() * 15);
  const selectedFlowers = [];
  const usedFlowers = new Set();

  // Ensure variety - select from all categories randomly
  while (selectedFlowers.length < numFlowers && selectedFlowers.length < flowers.length) {
    const randomIndex = Math.floor(Math.random() * flowers.length);
    const flower = flowers[randomIndex];
    
    // Avoid exact duplicates, but allow similar ones
    if (!usedFlowers.has(flower.label)) {
      selectedFlowers.push(flower);
      usedFlowers.add(flower.label);
    }
    
    // Prevent infinite loop
    if (usedFlowers.size >= flowers.length) break;
  }
  
  // Shuffle for random distribution
  selectedFlowers.sort(() => Math.random() - 0.5);

  // Add special golden flower in center
  const centerX = 50;
  const centerY = 50;

  // Create special flower first (center)
  setTimeout(() => {
    const specialDiv = document.createElement('div');
    specialDiv.className = 'flower special-flower';
    specialDiv.style.left = `${centerX}%`;
    specialDiv.style.top = `${centerY}%`;
    specialDiv.style.fontSize = '80px';
    specialDiv.style.transform = 'translate(-50%, -50%)';
    specialDiv.textContent = specialFlower.emoji;
    specialDiv.dataset.note = specialFlower.note;
    specialDiv.dataset.label = specialFlower.label;

    const label = document.createElement('div');
    label.className = 'flower-label special-label';
    label.textContent = specialFlower.label;
    specialDiv.appendChild(label);

    specialDiv.addEventListener('click', () => showFlowerNote(specialDiv, specialFlower.note));
    specialDiv.addEventListener('mouseenter', () => {
      specialDiv.style.transform = 'translate(-50%, -50%) scale(1.3) rotate(10deg)';
    });
    specialDiv.addEventListener('mouseleave', () => {
      specialDiv.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    canvas.appendChild(specialDiv);

    // Bloom animation
    specialDiv.style.transform = 'translate(-50%, -50%) scale(0)';
    setTimeout(() => {
      specialDiv.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      specialDiv.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
  }, 100);

  // Create other flowers around center
  selectedFlowers.forEach((flower, index) => {
    setTimeout(() => {
      // Position flowers in a circular pattern around center, but with randomness
      const angle = (Math.PI * 2 * index) / selectedFlowers.length + Math.random() * 0.5;
      const distance = 15 + Math.random() * 25;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Keep within bounds
      const finalX = Math.max(10, Math.min(90, x));
      const finalY = Math.max(15, Math.min(85, y));

      const flowerDiv = document.createElement('div');
      flowerDiv.className = 'flower';
      flowerDiv.style.left = `${finalX}%`;
      flowerDiv.style.top = `${finalY}%`;
      flowerDiv.style.fontSize = `${35 + Math.random() * 25}px`;
      flowerDiv.textContent = flower.emoji;
      flowerDiv.dataset.note = flower.note;
      flowerDiv.dataset.label = flower.label;

      const label = document.createElement('div');
      label.className = 'flower-label';
      label.textContent = flower.label;
      flowerDiv.appendChild(label);

      flowerDiv.addEventListener('click', () => showFlowerNote(flowerDiv, flower.note));
      flowerDiv.addEventListener('mouseenter', () => {
        flowerDiv.style.transform = 'scale(1.2) rotate(5deg)';
      });
      flowerDiv.addEventListener('mouseleave', () => {
        flowerDiv.style.transform = 'scale(1)';
      });

      canvas.appendChild(flowerDiv);

      // Bloom animation
      flowerDiv.style.transform = 'scale(0)';
      setTimeout(() => {
        flowerDiv.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        flowerDiv.style.transform = 'scale(1)';
      }, 10);
    }, 200 + index * 150);
  });

  // Create floating whispers
  createFloatingWhispers(whispers);
}

function createFloatingWhispers(whispers) {
  const container = document.getElementById('floatingWhispers');
  if (!container) return;

  whispers.forEach((whisper, index) => {
    setTimeout(() => {
      const whisperDiv = document.createElement('div');
      whisperDiv.className = 'floating-whisper';
      whisperDiv.textContent = whisper;
      whisperDiv.style.left = `${10 + Math.random() * 80}%`;
      whisperDiv.style.top = `${20 + Math.random() * 60}%`;
      whisperDiv.style.animationDelay = `${index * 2}s`;
      
      container.appendChild(whisperDiv);

      setTimeout(() => {
        whisperDiv.style.opacity = '0';
        setTimeout(() => whisperDiv.remove(), 2000);
      }, 8000);
    }, index * 2000);
  });
}

function showFlowerNote(flower, note) {
  const existingNote = document.querySelector('.flower-note.show');
  if (existingNote) existingNote.remove();

  const noteDiv = document.createElement('div');
  noteDiv.className = 'flower-note show';
  noteDiv.textContent = note;

  const rect = flower.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Position note above or below flower based on position
  if (centerY < window.innerHeight / 2) {
    noteDiv.style.top = `${rect.bottom + 20}px`;
  } else {
    noteDiv.style.top = `${rect.top - 200}px`;
  }
  
  noteDiv.style.left = `${centerX}px`;
  noteDiv.style.transform = 'translateX(-50%)';

  document.body.appendChild(noteDiv);

  // Close on click
  noteDiv.addEventListener('click', () => noteDiv.remove());
  
  // Auto-close after 8 seconds
  setTimeout(() => {
    if (noteDiv.parentNode) {
      noteDiv.style.opacity = '0';
      noteDiv.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => noteDiv.remove(), 300);
    }
  }, 8000);
}

function saveBouquet() {
  const canvas = document.getElementById('bouquetCanvas');
  const imageCanvas = document.getElementById('bouquetImageCanvas');
  const ctx = imageCanvas.getContext('2d');

  imageCanvas.width = canvas.offsetWidth;
  imageCanvas.height = canvas.offsetHeight;

  // Draw background
  ctx.fillStyle = 'rgba(58, 28, 90, 0.8)';
  ctx.fillRect(0, 0, imageCanvas.width, imageCanvas.height);

  // Draw flowers (simplified - would need html2canvas for full implementation)
  ctx.fillStyle = '#ba82ff';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Your Digital Bouquet', imageCanvas.width / 2, 50);

  const link = document.createElement('a');
  link.download = 'bouquet.png';
  link.href = imageCanvas.toDataURL();
  link.click();
}

// Book of Us
let currentBookPage = 0;
let totalBookPages = 18;
let isFlipping = false;

function initializeBook() {
  const cover = document.getElementById('bookCover');
  const pages = document.getElementById('bookPages');
  const bookNavigation = document.getElementById('bookNavigation');
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  const currentPageSpan = document.getElementById('currentPage');
  const totalPagesSpan = document.getElementById('totalPages');
  
  const pageElements = document.querySelectorAll('.page');
  totalBookPages = pageElements.length;
  totalPagesSpan.textContent = totalBookPages;

  // Hide all pages initially
  pageElements.forEach((page, index) => {
    page.style.display = 'none';
    if (index === 0) {
      page.style.display = 'block';
    }
  });

  // Open book cover
  cover.addEventListener('click', () => {
    cover.style.transform = 'rotateY(-180deg)';
    cover.style.opacity = '0';
    setTimeout(() => {
      cover.classList.add('hidden');
      pages.classList.remove('hidden');
      bookNavigation.classList.remove('hidden');
      currentBookPage = 0;
      showPage(0);
    }, 600);
  });

  // Next page
  nextBtn.addEventListener('click', () => {
    if (!isFlipping && currentBookPage < totalBookPages - 1) {
      flipPage('next');
    }
  });

  // Previous page
  prevBtn.addEventListener('click', () => {
    if (!isFlipping && currentBookPage > 0) {
      flipPage('prev');
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (pages.classList.contains('hidden')) return;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (!isFlipping && currentBookPage < totalBookPages - 1) {
        flipPage('next');
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (!isFlipping && currentBookPage > 0) {
        flipPage('prev');
      }
    }
  });

  // Click on page to turn (right side for next, left side for prev)
  pageElements.forEach((page) => {
    page.addEventListener('click', (e) => {
      if (isFlipping) return;
      
      const rect = page.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const isRightSide = clickX > rect.width / 2;
      
      if (isRightSide && currentBookPage < totalBookPages - 1) {
        flipPage('next');
      } else if (!isRightSide && currentBookPage > 0) {
        flipPage('prev');
      }
    });
  });

  // Sound toggle
  const soundToggle = document.getElementById('soundToggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggle.textContent = soundEnabled ? '🔇 Sound' : '🔊 Sound';
    });
  }
}

function showPage(pageIndex) {
  const pageElements = document.querySelectorAll('.page');
  const currentPageSpan = document.getElementById('currentPage');
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  
  // Show two pages at a time (left and right)
  pageElements.forEach((page, index) => {
    if (index === pageIndex || index === pageIndex + 1) {
      page.style.display = 'block';
      page.style.opacity = '1';
      page.style.transform = 'rotateY(0deg)';
      if (index === pageIndex) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    } else {
      page.style.display = 'none';
    }
  });
  
  currentBookPage = pageIndex;
  const chapterNumber = Math.floor(pageIndex / 2) + 1;
  currentPageSpan.textContent = chapterNumber;
  
  // Update button states
  prevBtn.style.opacity = pageIndex === 0 ? '0.5' : '1';
  prevBtn.style.pointerEvents = pageIndex === 0 ? 'none' : 'auto';
  nextBtn.style.opacity = pageIndex >= totalBookPages - 2 ? '0.5' : '1';
  nextBtn.style.pointerEvents = pageIndex >= totalBookPages - 2 ? 'none' : 'auto';
}

function flipPage(direction) {
  if (isFlipping) return;
  isFlipping = true;
  
  const pageElements = document.querySelectorAll('.page');
  const currentLeftPage = pageElements[currentBookPage];
  const currentRightPage = pageElements[currentBookPage + 1];
  const nextPageIndex = direction === 'next' ? currentBookPage + 2 : currentBookPage - 2;
  
  if (nextPageIndex < 0 || nextPageIndex >= totalBookPages) {
    isFlipping = false;
    return;
  }
  
  // Play sound if enabled
  if (soundEnabled) {
    // You can add actual sound here if you have a file
  }
  
  // Flip animation
  if (direction === 'next') {
    // Flip right page
    if (currentRightPage) {
      currentRightPage.style.transform = 'rotateY(-180deg)';
      currentRightPage.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      currentRightPage.style.opacity = '0';
    }
    
    setTimeout(() => {
      if (currentRightPage) currentRightPage.style.display = 'none';
      showPage(nextPageIndex);
      const nextLeftPage = pageElements[nextPageIndex];
      if (nextLeftPage) {
        nextLeftPage.style.transform = 'rotateY(0deg)';
        nextLeftPage.style.opacity = '1';
      }
      isFlipping = false;
    }, 800);
  } else {
    // Flip left page
    const prevLeftPage = pageElements[nextPageIndex];
    const prevRightPage = pageElements[nextPageIndex + 1];
    
    if (prevLeftPage) {
      prevLeftPage.style.display = 'block';
      prevLeftPage.style.transform = 'rotateY(-180deg)';
      prevLeftPage.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      prevLeftPage.style.opacity = '0';
    }
    
    setTimeout(() => {
      if (prevLeftPage) {
        prevLeftPage.style.transform = 'rotateY(0deg)';
        prevLeftPage.style.opacity = '1';
      }
      showPage(nextPageIndex);
      if (currentLeftPage) currentLeftPage.style.display = 'none';
      if (currentRightPage) currentRightPage.style.display = 'none';
      isFlipping = false;
    }, 800);
  }
}

// Library
function initializeLibrary() {
  const libraryBooks = document.querySelectorAll('.library-book');
  const modal = document.getElementById('libraryModal');
  const modalText = document.getElementById('libraryModalText');
  const closeModal = document.querySelector('.close-modal');

  const messages = {
    1: "The day I realized you were my everything, my world shifted. Everything made sense, and I knew I had found my home.",
    2: "Your smile is the most beautiful thing I've ever seen. It lights up my entire universe and makes every day worth living.",
    3: "In the quiet moments, when the world fades away, I find myself thinking of you. Those are the moments I treasure most.",
    4: "Distance means nothing when someone means everything. You are my everything, and no distance can change that.",
    5: "Forever isn't long enough with you. I want eternity, and then some more.",
    gift: `My dearest ${herNames[2]},\n\nThis is my heart, my soul, my everything - all wrapped in words that can never fully express what you mean to me.\n\nYou are my light, my love, my forever.\n\nWith all my love,\n${myNames[1]} (${myNames[0]})`
  };

  libraryBooks.forEach(book => {
    book.addEventListener('click', () => {
      const bookId = book.dataset.book;
      modalText.textContent = messages[bookId] || messages[1];
      modal.classList.remove('hidden');
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Library lamp cursor effect
  document.addEventListener('mousemove', (e) => {
    if (currentSection === 'library') {
      const style = document.documentElement.style;
      style.setProperty('--mouse-x', `${e.clientX}px`);
      style.setProperty('--mouse-y', `${e.clientY}px`);
    }
  });
}

// Constellations
let constellationCanvas, constellationCtx;
let stars = [];
let wishes = [];
let mouseX = 0, mouseY = 0;
let connectMode = false;
let selectedStars = [];
let constellations = [];

const constellationMessages = {
  flower: {
    title: "Flower Constellation",
    text: "Like a flower blooming in the night sky, you bloom in my heart every single day."
  },
  heart: {
    title: "Heart Constellation",
    text: "This is my heart, written in the stars, forever yours."
  },
  initials: {
    title: "Your Initials",
    text: "S.M.T - Sahana Monish Tijil. Our names, our love, written in starlight."
  },
  infinity: {
    title: "Infinity",
    text: "Our love is infinite, like the stars themselves."
  }
};

function initializeConstellations() {
  constellationCanvas = document.getElementById('starCanvas');
  if (!constellationCanvas) return;
  
  constellationCtx = constellationCanvas.getContext('2d');

  window.addEventListener('resize', () => {
    if (currentSection === 'constellations') {
      initConstellationCanvas();
    }
  });

  // Mouse tracking for interactive effects
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Wish button
  const wishBtn = document.getElementById('wishBtn');
  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      document.getElementById('wishInput').classList.toggle('hidden');
    });
  }

  // Submit wish
  const submitWish = document.getElementById('submitWish');
  if (submitWish) {
    submitWish.addEventListener('click', () => {
      const wishText = document.getElementById('wishText').value;
      if (wishText) {
        addWishStar(wishText);
        document.getElementById('wishText').value = '';
        document.getElementById('wishInput').classList.add('hidden');
      }
    });
  }

  // Connect stars button
  const connectBtn = document.getElementById('connectBtn');
  if (connectBtn) {
    connectBtn.addEventListener('click', () => {
      connectMode = !connectMode;
      connectBtn.style.background = connectMode ? 'rgba(186, 130, 255, 0.6)' : 'rgba(186, 130, 255, 0.3)';
      selectedStars = [];
    });
  }

  // Reset button
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      initConstellationCanvas();
      wishes = [];
      selectedStars = [];
      connectMode = false;
      if (connectBtn) connectBtn.style.background = 'rgba(186, 130, 255, 0.3)';
    });
  }

  // Click on canvas to interact with constellations
  constellationCanvas.addEventListener('click', (e) => {
    const rect = constellationCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (connectMode) {
      // Find nearest star
      let nearestStar = null;
      let minDist = 50;
      stars.forEach(star => {
        const dist = Math.sqrt(Math.pow(star.x - clickX, 2) + Math.pow(star.y - clickY, 2));
        if (dist < minDist) {
          minDist = dist;
          nearestStar = star;
        }
      });
      if (nearestStar && !selectedStars.includes(nearestStar)) {
        selectedStars.push(nearestStar);
        // Visual feedback
        createSparkleAt(nearestStar.x, nearestStar.y);
        if (selectedStars.length === 2) {
          createConnection(selectedStars[0], selectedStars[1]);
          selectedStars = [];
        }
      }
    } else {
      // Check if clicking on a constellation
      checkConstellationClick(clickX, clickY);
      // Create sparkle effect at click
      createSparkleAt(clickX, clickY);
    }
  });
  
  // Close message handler
  const closeMessage = document.querySelector('.close-message');
  if (closeMessage) {
    closeMessage.addEventListener('click', () => {
      document.getElementById('constellationMessage').classList.add('hidden');
    });
  }
}

function createSparkleAt(x, y) {
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'fixed';
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      sparkle.style.width = '6px';
      sparkle.style.height = '6px';
      sparkle.style.background = '#ffd700';
      sparkle.style.borderRadius = '50%';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '1000';
      sparkle.style.boxShadow = '0 0 15px #ffd700';
      
      const angle = (Math.PI * 2 * i) / 15;
      const distance = 40;
      sparkle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
      sparkle.style.animation = 'sparkleBurst 1.2s ease-out forwards';
      
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1200);
    }, i * 20);
  }
}

function initConstellationCanvas() {
  constellationCanvas = document.getElementById('starCanvas');
  if (!constellationCanvas) return;
  
  constellationCtx = constellationCanvas.getContext('2d');
  constellationCanvas.width = window.innerWidth;
  constellationCanvas.height = window.innerHeight;

  // Create background stars (more stars!)
  stars = [];
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: Math.random() * constellationCanvas.width,
      y: Math.random() * constellationCanvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.6,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01
    });
  }

  const centerX = constellationCanvas.width / 2;
  const centerY = constellationCanvas.height / 2;

  // Create Flower Constellation
  const flowerStars = [];
  for (let angle = 0; angle < Math.PI * 2; angle += 0.15) {
    const radius = 120 + Math.sin(angle * 5) * 40;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const star = {
      x: x,
      y: y,
      size: 2.5,
      opacity: 0.9,
      special: true,
      constellation: 'flower',
      twinkle: angle,
      speed: 0.03
    };
    stars.push(star);
    flowerStars.push(star);
  }
  constellations.push({ type: 'flower', stars: flowerStars });

  // Create Heart Constellation (top left)
  const heartStars = [];
  const heartX = constellationCanvas.width * 0.25;
  const heartY = constellationCanvas.height * 0.3;
  for (let t = 0; t < Math.PI * 2; t += 0.2) {
    const x = heartX + 16 * Math.pow(Math.sin(t), 3);
    const y = heartY - (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    const star = {
      x: x,
      y: y,
      size: 2,
      opacity: 0.85,
      special: true,
      constellation: 'heart',
      twinkle: t,
      speed: 0.025
    };
    stars.push(star);
    heartStars.push(star);
  }
  constellations.push({ type: 'heart', stars: heartStars });

  // Create Initials "SMT" (top right)
  const initialStars = [];
  const initX = constellationCanvas.width * 0.75;
  const initY = constellationCanvas.height * 0.25;
  
  // S shape
  for (let i = 0; i < 20; i++) {
    const t = (i / 20) * Math.PI * 2;
    const x = initX + Math.cos(t) * 30;
    const y = initY + Math.sin(t) * 20;
    const star = {
      x: x,
      y: y,
      size: 2,
      opacity: 0.9,
      special: true,
      constellation: 'initials',
      twinkle: t,
      speed: 0.02
    };
    stars.push(star);
    initialStars.push(star);
  }
  constellations.push({ type: 'initials', stars: initialStars });

  // Create Infinity Symbol (bottom center)
  const infinityStars = [];
  const infX = centerX;
  const infY = constellationCanvas.height * 0.75;
  for (let t = 0; t < Math.PI * 2; t += 0.2) {
    const x = infX + 40 * Math.sin(t) / (1 + Math.pow(Math.cos(t), 2));
    const y = infY + 20 * Math.sin(t) * Math.cos(t) / (1 + Math.pow(Math.cos(t), 2));
    const star = {
      x: x,
      y: y,
      size: 2,
      opacity: 0.85,
      special: true,
      constellation: 'infinity',
      twinkle: t,
      speed: 0.025
    };
    stars.push(star);
    infinityStars.push(star);
  }
  constellations.push({ type: 'infinity', stars: infinityStars });

  animateConstellations();
}

let constellationAnimationId = null;
let time = 0;

function animateConstellations() {
  if (currentSection !== 'constellations' || !constellationCanvas) {
    constellationAnimationId = null;
    return;
  }

  time += 0.01;
  constellationCtx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);

  // Draw gradient background
  const gradient = constellationCtx.createRadialGradient(
    mouseX, mouseY, 0,
    mouseX, mouseY, 500
  );
  gradient.addColorStop(0, 'rgba(186, 130, 255, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  constellationCtx.fillStyle = gradient;
  constellationCtx.fillRect(0, 0, constellationCanvas.width, constellationCanvas.height);

  // Update and draw stars with twinkling
  stars.forEach(star => {
    star.twinkle += star.speed;
    const twinkleOpacity = star.opacity + Math.sin(star.twinkle) * 0.3;
    const finalOpacity = Math.max(0.3, Math.min(1, twinkleOpacity));
    
    // Mouse interaction - stars glow when mouse is near
    const distToMouse = Math.sqrt(Math.pow(star.x - mouseX, 2) + Math.pow(star.y - mouseY, 2));
    const glowIntensity = distToMouse < 100 ? (100 - distToMouse) / 100 : 0;
    
    constellationCtx.beginPath();
    constellationCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    
    if (star.special) {
      const gradient = constellationCtx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
      gradient.addColorStop(0, `rgba(186, 130, 255, ${finalOpacity + glowIntensity * 0.5})`);
      gradient.addColorStop(1, `rgba(186, 130, 255, 0)`);
      constellationCtx.fillStyle = gradient;
      constellationCtx.fill();
      
      // Outer glow
      constellationCtx.beginPath();
      constellationCtx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
      constellationCtx.fillStyle = `rgba(186, 130, 255, ${finalOpacity * 0.3 + glowIntensity * 0.3})`;
      constellationCtx.fill();
    } else {
      constellationCtx.fillStyle = `rgba(255, 255, 255, ${finalOpacity + glowIntensity * 0.3})`;
      constellationCtx.fill();
    }
  });

  // Draw constellation connections
  constellations.forEach(constellation => {
    const stars = constellation.stars;
    constellationCtx.strokeStyle = `rgba(186, 130, 255, ${0.4 + Math.sin(time) * 0.2})`;
    constellationCtx.lineWidth = 2;
    constellationCtx.shadowBlur = 10;
    constellationCtx.shadowColor = 'rgba(186, 130, 255, 0.8)';
    
    for (let i = 0; i < stars.length - 1; i++) {
      constellationCtx.beginPath();
      constellationCtx.moveTo(stars[i].x, stars[i].y);
      constellationCtx.lineTo(stars[i + 1].x, stars[i + 1].y);
      constellationCtx.stroke();
    }
    // Close the shape
    if (stars.length > 2) {
      constellationCtx.beginPath();
      constellationCtx.moveTo(stars[stars.length - 1].x, stars[stars.length - 1].y);
      constellationCtx.lineTo(stars[0].x, stars[0].y);
      constellationCtx.stroke();
    }
    constellationCtx.shadowBlur = 0;
  });

  // Draw wish stars with pulsing effect
  wishes.forEach(wish => {
    wish.twinkle = (wish.twinkle || 0) + 0.1;
    const pulse = Math.sin(wish.twinkle) * 0.3 + 0.7;
    
    const gradient = constellationCtx.createRadialGradient(wish.x, wish.y, 0, wish.x, wish.y, 15);
    gradient.addColorStop(0, `rgba(255, 215, 0, ${wish.opacity * pulse})`);
    gradient.addColorStop(0.5, `rgba(255, 200, 0, ${wish.opacity * pulse * 0.5})`);
    gradient.addColorStop(1, `rgba(255, 215, 0, 0)`);
    
    constellationCtx.fillStyle = gradient;
    constellationCtx.beginPath();
    constellationCtx.arc(wish.x, wish.y, 8 * pulse, 0, Math.PI * 2);
    constellationCtx.fill();
    
    wish.opacity -= 0.003;
    if (wish.opacity <= 0) {
      wishes = wishes.filter(w => w !== wish);
    }
  });

  // Draw particle trails from mouse
  if (mouseX && mouseY) {
    constellationCtx.fillStyle = `rgba(186, 130, 255, 0.3)`;
    constellationCtx.beginPath();
    constellationCtx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
    constellationCtx.fill();
  }

  constellationAnimationId = requestAnimationFrame(animateConstellations);
}

function addWishStar(text) {
  if (!constellationCanvas) return;
  const x = Math.random() * constellationCanvas.width;
  const y = Math.random() * constellationCanvas.height;
  
  wishes.push({
    x: x,
    y: y,
    opacity: 1,
    text: text,
    twinkle: 0
  });
  
  // Create sparkle effect
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'fixed';
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      sparkle.style.width = '4px';
      sparkle.style.height = '4px';
      sparkle.style.background = '#ffd700';
      sparkle.style.borderRadius = '50%';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '1000';
      sparkle.style.boxShadow = '0 0 10px #ffd700';
      
      const angle = (Math.PI * 2 * i) / 20;
      const distance = 30;
      sparkle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
      sparkle.style.animation = 'sparkleBurst 1s ease-out forwards';
      
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }, i * 30);
  }
}

function createConnection(star1, star2) {
  // Create a visual connection between two stars
  const connection = {
    x1: star1.x,
    y1: star1.y,
    x2: star2.x,
    y2: star2.y,
    opacity: 1,
    life: 100
  };
  
  // Animate connection
  const animateConnection = () => {
    if (connection.life > 0) {
      constellationCtx.strokeStyle = `rgba(186, 130, 255, ${connection.opacity})`;
      constellationCtx.lineWidth = 2;
      constellationCtx.beginPath();
      constellationCtx.moveTo(connection.x1, connection.y1);
      constellationCtx.lineTo(connection.x2, connection.y2);
      constellationCtx.stroke();
      connection.life--;
      connection.opacity -= 0.01;
    }
  };
  
  // This would need to be integrated into the main animation loop
}

function checkConstellationClick(x, y) {
  constellations.forEach(constellation => {
    const stars = constellation.stars;
    const centerX = stars.reduce((sum, s) => sum + s.x, 0) / stars.length;
    const centerY = stars.reduce((sum, s) => sum + s.y, 0) / stars.length;
    const dist = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2));
    
    if (dist < 100) {
      showConstellationMessage(constellation.type);
    }
  });
}

function showConstellationMessage(type) {
  const message = constellationMessages[type];
  if (!message) return;
  
  const messageDiv = document.getElementById('constellationMessage');
  const title = messageDiv.querySelector('.message-title');
  const text = messageDiv.querySelector('.message-text');
  
  title.textContent = message.title;
  text.textContent = message.text;
  messageDiv.classList.remove('hidden');
  
  // Auto-close after 5 seconds
  setTimeout(() => {
    messageDiv.classList.add('hidden');
  }, 5000);
}

// Map
function initializeMap() {
  // Set location names
  const usaLocationEl = document.getElementById('usaLocation');
  const indiaLocationEl = document.getElementById('indiaLocation');
  if (usaLocationEl) usaLocationEl.textContent = 'Where I Am';
  if (indiaLocationEl) indiaLocationEl.textContent = 'Where You Are';
  
  // Calculate and display distance (USA to India is approximately 8,000-9,000 miles)
  const distance = 8500; // Approximate distance in miles
  const distanceDisplay = document.getElementById('distanceDisplay');
  if (distanceDisplay) {
    distanceDisplay.textContent = distance.toLocaleString();
  }

  // Animate maps appearing
  setTimeout(() => {
    const usaMap = document.getElementById('usaMap');
    const indiaMap = document.getElementById('indiaMap');
    if (usaMap) usaMap.style.animation = 'fadeInScale 2s ease-out forwards';
    if (indiaMap) indiaMap.style.animation = 'fadeInScale 2s ease-out 0.3s forwards';
  }, 300);

  // Animate connection arc
  const arc = document.getElementById('connectionArc');
  if (arc) {
    setTimeout(() => {
      arc.style.animation = 'drawArc 3s ease-in-out forwards';
    }, 1000);
  }

  // Animate plane
  setTimeout(() => animatePlane(), 2000);

  // Create floating particles along connection
  createConnectionParticles();

  // Create floating hearts
  createFloatingHearts();

  // Country click handlers
  const usaDot = document.getElementById('usaDot');
  const indiaDot = document.getElementById('indiaDot');
  const usaMap = document.getElementById('usaMap');
  const indiaMap = document.getElementById('indiaMap');
  
  if (usaDot || usaMap) {
    const usaElement = usaDot || usaMap;
    usaElement.addEventListener('click', () => {
      showCityMemory('United States', 'Every sunrise here reminds me of you. Even across oceans, you are my home. I carry you in my heart, no matter where I am. This distance is temporary, but our love is eternal.');
    });
  }
  
  if (indiaDot || indiaMap) {
    const indiaElement = indiaDot || indiaMap;
    indiaElement.addEventListener('click', () => {
      showCityMemory('India', 'Where my heart truly belongs. Every moment I spend away from you, I count the days until we\'re together again. You are my anchor, my light, my everything. Distance means nothing when love is this strong.');
    });
  }

  const sendHugBtn = document.getElementById('sendHug');
  if (sendHugBtn) {
    sendHugBtn.addEventListener('click', () => {
      sendHug();
    });
  }

  // Add hover effects to maps
  if (usaMap) {
    usaMap.addEventListener('mouseenter', () => {
      usaMap.style.filter = 'brightness(1.3)';
    });
    usaMap.addEventListener('mouseleave', () => {
      usaMap.style.filter = 'brightness(1)';
    });
  }

  if (indiaMap) {
    indiaMap.addEventListener('mouseenter', () => {
      indiaMap.style.filter = 'brightness(1.3)';
    });
    indiaMap.addEventListener('mouseleave', () => {
      indiaMap.style.filter = 'brightness(1)';
    });
  }
}

function createConnectionParticles() {
  const particlesContainer = document.getElementById('connectionParticles');
  if (!particlesContainer) return;

  // Clear existing particles
  particlesContainer.innerHTML = '';

  // Create particles along the connection arc
  for (let i = 0; i < 15; i++) {
    const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const progress = i / 15;
    const x = 300 + (900 - 300) * progress;
    const y = 250 + Math.sin(progress * Math.PI) * -150;
    
    particle.setAttribute('cx', x);
    particle.setAttribute('cy', y);
    particle.setAttribute('r', '3');
    particle.setAttribute('fill', '#ffb4ff');
    particle.setAttribute('opacity', '0.7');
    particle.classList.add('connection-particle');
    particle.style.animation = `floatParticle ${2 + Math.random()}s ease-in-out infinite`;
    particle.style.animationDelay = `${i * 0.2}s`;
    
    particlesContainer.appendChild(particle);
  }
}

function createFloatingHearts() {
  const heartsContainer = document.getElementById('floatingHearts');
  if (!heartsContainer) return;

  // Create floating hearts around the maps
  const heartSymbols = ['💜', '💕', '💖', '💗', '💝'];
  
  for (let i = 0; i < 8; i++) {
    const heart = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    const x = 200 + Math.random() * 800;
    const y = 100 + Math.random() * 400;
    
    heart.textContent = symbol;
    heart.setAttribute('x', x);
    heart.setAttribute('y', y);
    heart.setAttribute('font-size', '20');
    heart.setAttribute('opacity', '0.6');
    heart.classList.add('floating-heart');
    heart.style.animation = `floatHeart ${3 + Math.random() * 2}s ease-in-out infinite`;
    heart.style.animationDelay = `${i * 0.3}s`;
    
    heartsContainer.appendChild(heart);
  }
}

let planeAnimationId = null;

function animatePlane() {
  if (planeAnimationId) return; // Already animating
  
  const plane = document.getElementById('plane');
  const planeIcon = document.getElementById('planeIcon');
  if (!plane || !planeIcon) return;
  
  let progress = 0;
  const duration = 5000; // 5 seconds for the journey
  const startX = 300; // USA position
  const startY = 250;
  const endX = 900; // India position
  const endY = 250;

  function animate() {
    if (currentSection !== 'map') {
      planeAnimationId = null;
      return;
    }
    
    progress += 16;
    const t = Math.min(progress / duration, 1);
    
    // Calculate position along curved path
    const x = startX + (endX - startX) * t;
    const y = startY + Math.sin(t * Math.PI) * -150; // Curved path
    
    // Update plane position
    plane.setAttribute('cx', x);
    plane.setAttribute('cy', y);
    planeIcon.setAttribute('x', x);
    planeIcon.setAttribute('y', y + 5);
    
    // Rotate plane based on direction
    const angle = Math.atan2(Math.sin(t * Math.PI) * -150, (endX - startX)) * (180 / Math.PI);
    planeIcon.setAttribute('transform', `rotate(${angle} ${x} ${y})`);

    if (progress < duration) {
      planeAnimationId = requestAnimationFrame(animate);
    } else {
      // Reset
      progress = 0;
      plane.setAttribute('cx', startX);
      plane.setAttribute('cy', startY);
      planeIcon.setAttribute('x', startX);
      planeIcon.setAttribute('y', startY + 5);
      planeIcon.setAttribute('transform', '');
      planeAnimationId = null;
      setTimeout(() => {
        if (currentSection === 'map') {
          animatePlane();
        }
      }, 3000); // Wait 3 seconds before next journey
    }
  }

  if (currentSection === 'map') {
    planeAnimationId = requestAnimationFrame(animate);
  }
}

function showCityMemory(city, memory) {
  const popup = document.getElementById('cityMemories');
  const content = document.getElementById('memoryContent');
  if (!popup || !content) return;
  
  content.innerHTML = `<h3>${city}</h3><p>${memory}</p>`;
  popup.classList.remove('hidden');

  const closeBtn = popup.querySelector('.close-memory');
  if (closeBtn) {
    closeBtn.onclick = () => {
      popup.classList.add('hidden');
    };
  }
}

function sendHug() {
  const arc = document.getElementById('connectionArc');
  const mapSvg = document.getElementById('mapSvg');
  if (!arc || !mapSvg) return;
  
  // Enhance connection arc
  arc.style.strokeWidth = '8';
  arc.style.filter = 'drop-shadow(0 0 30px #ba82ff)';
  
  // Create multiple pulse effects along the arc
  for (let i = 0; i < 5; i++) {
    const progress = i / 5;
    const x = 300 + (900 - 300) * progress;
    const y = 250 + Math.sin(progress * Math.PI) * -150;
    
    const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulse.setAttribute('cx', x);
    pulse.setAttribute('cy', y);
    pulse.setAttribute('r', '8');
    pulse.setAttribute('fill', '#ffb4ff');
    pulse.setAttribute('opacity', '0.9');
    pulse.style.animation = 'pulse 1.5s ease-out';
    pulse.style.animationDelay = `${i * 0.1}s`;
    mapSvg.appendChild(pulse);
    
    setTimeout(() => {
      if (pulse.parentNode) pulse.remove();
    }, 1500);
  }
  
  // Create heart burst at India location
  const indiaDot = document.getElementById('indiaDot');
  if (indiaDot) {
    for (let i = 0; i < 10; i++) {
      const heart = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      heart.textContent = '💜';
      heart.setAttribute('x', '900');
      heart.setAttribute('y', '250');
      heart.setAttribute('font-size', '20');
      heart.setAttribute('opacity', '0.9');
      heart.style.animation = `heartBurst 2s ease-out forwards`;
      heart.style.animationDelay = `${i * 0.1}s`;
      heart.setAttribute('transform', `translate(${(Math.random() - 0.5) * 100}, ${(Math.random() - 0.5) * 100})`);
      mapSvg.appendChild(heart);
      
      setTimeout(() => {
        if (heart.parentNode) heart.remove();
      }, 2000);
    }
  }
  
  setTimeout(() => {
    arc.style.strokeWidth = '4';
    arc.style.filter = 'drop-shadow(0 0 10px #ba82ff)';
  }, 2000);

  // Show message
  const sendHugBtn = document.getElementById('sendHug');
  if (sendHugBtn) {
    const originalText = sendHugBtn.textContent;
    sendHugBtn.textContent = '💜 Love Sent! 💜';
    sendHugBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
      sendHugBtn.textContent = originalText;
      sendHugBtn.style.transform = 'scale(1)';
    }, 2000);
  }
}

// Quest
let questStartTime = null;
let questAttempts = 0;

function initializeQuest() {
  // Update total puzzles
  const totalPuzzlesEl = document.getElementById('totalPuzzles');
  if (totalPuzzlesEl) totalPuzzlesEl.textContent = '6';
  
  document.getElementById('startQuest').addEventListener('click', () => {
    questStartTime = Date.now();
    questAttempts = 0;
    document.querySelector('.quest-intro').classList.add('hidden');
    document.getElementById('puzzle1').classList.remove('hidden');
    questStage = 1;
    updateQuestProgress(1);
  });

  // Puzzle 1: Petal Order
  const petals = document.querySelectorAll('.quest-petal');
  const selectedOrderEl = document.getElementById('selectedOrder');
  petals.forEach(petal => {
    petal.addEventListener('click', () => {
      const order = parseInt(petal.dataset.order);
      if (petalOrder.length === 0 || petalOrder[petalOrder.length - 1] < order) {
        petalOrder.push(order);
        petal.classList.add('selected');
        if (selectedOrderEl) {
          selectedOrderEl.textContent = petalOrder.join(' → ');
        }
        
        if (petalOrder.length === 5) {
          setTimeout(() => {
            document.getElementById('puzzle1').classList.add('hidden');
            document.getElementById('puzzle2').classList.remove('hidden');
            questStage = 2;
            updateQuestProgress(2);
            petalOrder = [];
          }, 1500);
        }
      } else {
        // Wrong order, reset
        questAttempts++;
        petalOrder = [];
        petals.forEach(p => p.classList.remove('selected'));
        if (selectedOrderEl) selectedOrderEl.textContent = '';
        showError('Wrong order! Try again.');
      }
    });
  });

  // Puzzle 2: Cipher
  const checkCipherBtn = document.getElementById('checkCipher');
  if (checkCipherBtn) {
    checkCipherBtn.addEventListener('click', () => {
      questAttempts++;
      const answer = document.getElementById('cipherAnswer').value.toLowerCase().trim();
      if (answer === 'forever you love' || (answer.includes('forever') && answer.includes('you') && answer.includes('love'))) {
        showSuccess('Correct!');
        setTimeout(() => {
          document.getElementById('puzzle2').classList.add('hidden');
          document.getElementById('puzzle3').classList.remove('hidden');
          questStage = 3;
          updateQuestProgress(3);
        }, 1000);
      } else {
        showError('Not quite right. Try again!');
      }
    });
  }

  // Puzzle 3: Hidden Objects (now 6 objects)
  const objects = document.querySelectorAll('.hidden-object');
  objects.forEach(obj => {
    obj.addEventListener('click', () => {
      if (!obj.classList.contains('found')) {
        obj.classList.add('found');
        objectsFound++;
        const objectsFoundEl = document.getElementById('objectsFound');
        if (objectsFoundEl) objectsFoundEl.textContent = objectsFound;
        
        // Update progress stars
        const progressStars = document.querySelectorAll('.progress-star');
        if (progressStars[objectsFound - 1]) {
          progressStars[objectsFound - 1].classList.add('found');
        }
        
        // Show found animation
        createSparkle(obj);
        
        if (objectsFound === 6) {
          setTimeout(() => {
            document.getElementById('puzzle3').classList.add('hidden');
            document.getElementById('puzzle4').classList.remove('hidden');
            questStage = 4;
            updateQuestProgress(4);
            initializeMemoryMatch();
          }, 1500);
        }
      }
    });
  });

  // Initialize Puzzle 4: Memory Match
  function initializeMemoryMatch() {
    const grid = document.getElementById('memoryGrid');
    if (!grid || grid.children.length > 0) return;
    
    const cards = ['💜', '💕', '🌹', '💍', '⭐', '💝', '💜', '💕', '🌹', '💍', '⭐', '💝'];
    const shuffled = cards.sort(() => Math.random() - 0.5);
    
    shuffled.forEach((emoji, index) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.dataset.emoji = emoji;
      card.dataset.index = index;
      card.innerHTML = '<div class="card-back">?</div><div class="card-front">' + emoji + '</div>';
      card.addEventListener('click', () => flipCard(card));
      grid.appendChild(card);
    });
  }

  // Puzzle 5: Timeline
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineDropzone = document.getElementById('timelineDropzone');
  let draggedItem = null;
  
  timelineItems.forEach(item => {
    item.draggable = true;
    item.addEventListener('dragstart', (e) => {
      draggedItem = item;
      e.dataTransfer.effectAllowed = 'move';
      item.style.opacity = '0.5';
    });
    item.addEventListener('dragend', () => {
      item.style.opacity = '1';
    });
  });
  
  const dropSlots = document.querySelectorAll('.dropzone-slot');
  dropSlots.forEach(slot => {
    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      slot.classList.add('drag-over');
    });
    slot.addEventListener('dragleave', () => {
      slot.classList.remove('drag-over');
    });
    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');
      if (draggedItem && !slot.hasChildNodes()) {
        const clone = draggedItem.cloneNode(true);
        clone.draggable = false;
        slot.appendChild(clone);
        draggedItem.style.display = 'none';
        checkTimelineOrder();
      }
    });
  });
  
  const checkTimelineBtn = document.getElementById('checkTimeline');
  if (checkTimelineBtn) {
    checkTimelineBtn.addEventListener('click', () => {
      checkTimelineOrder();
    });
  }

  // Puzzle 6: Word Search
  initializeWordSearch();
}

let flippedCards = [];
let matchedPairs = 0;

function flipCard(card) {
  if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length >= 2) return;
  
  card.classList.add('flipped');
  flippedCards.push(card);
  
  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      // Match!
      setTimeout(() => {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        const matchesFoundEl = document.getElementById('matchesFound');
        if (matchesFoundEl) matchesFoundEl.textContent = matchedPairs;
        createSparkle(card1);
        
        if (matchedPairs === 6) {
          setTimeout(() => {
            document.getElementById('puzzle4').classList.add('hidden');
            document.getElementById('puzzle5').classList.remove('hidden');
            questStage = 5;
            updateQuestProgress(5);
          }, 1500);
        }
        flippedCards = [];
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}

function checkTimelineOrder() {
  const slots = document.querySelectorAll('.dropzone-slot');
  let correct = true;
  
  slots.forEach((slot, index) => {
    const item = slot.querySelector('.timeline-item');
    if (item) {
      const order = parseInt(item.dataset.order);
      if (order !== index + 1) {
        correct = false;
      }
    } else {
      correct = false;
    }
  });
  
  if (correct) {
    showSuccess('Perfect order!');
    setTimeout(() => {
      document.getElementById('puzzle5').classList.add('hidden');
      document.getElementById('puzzle6').classList.remove('hidden');
      questStage = 6;
      updateQuestProgress(6);
    }, 1500);
  } else {
    showError('Not quite right. Try again!');
  }
}

let selectedWordCells = [];
let wordsFoundCount = 0;

function initializeWordSearch() {
  const grid = document.getElementById('wordsearchGrid');
  if (!grid || grid.children.length > 0) return;
  
  const words = ['LOVE', 'FOREVER', 'TOGETHER', 'HAPPINESS'];
  const gridSize = 12;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // Create grid with random letters
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.className = 'wordsearch-cell';
    cell.textContent = letters[Math.floor(Math.random() * letters.length)];
    cell.dataset.index = i;
    grid.appendChild(cell);
  }
  
  // Simplified: Mark words as found when clicking on word list
  const wordElements = document.querySelectorAll('.word-to-find');
  wordElements.forEach(wordEl => {
    wordEl.addEventListener('click', () => {
      if (!wordEl.classList.contains('found')) {
        wordEl.classList.add('found');
        wordsFoundCount++;
        const wordsFoundEl = document.getElementById('wordsFound');
        if (wordsFoundEl) wordsFoundEl.textContent = wordsFoundCount;
        createSparkle(wordEl);
        
        if (wordsFoundCount === 4) {
          setTimeout(() => {
            document.getElementById('puzzle6').classList.add('hidden');
            document.getElementById('questComplete').classList.remove('hidden');
            updateQuestProgress(6);
            createConfetti();
          }, 1500);
        }
      }
    });
  });
}

function updateQuestProgress(stage) {
  const progressFill = document.getElementById('questProgress');
  const currentPuzzleEl = document.getElementById('currentPuzzle');
  if (progressFill) {
    const progress = (stage / 6) * 100;
    progressFill.style.width = progress + '%';
  }
  if (currentPuzzleEl) {
    currentPuzzleEl.textContent = stage;
  }
}

function showSuccess(message) {
  const notification = document.createElement('div');
  notification.className = 'quest-notification success';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2000);
}

function showError(message) {
  const notification = document.createElement('div');
  notification.className = 'quest-notification error';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2000);
}

function createConfetti() {
  for (let i = 0; i < 200; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.width = '12px';
      confetti.style.height = '12px';
      confetti.style.background = ['#ba82ff', '#ffb4ff', '#ffd700', '#ff6b9d', '#ff6bff'][Math.floor(Math.random() * 5)];
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }, i * 15);
  }

  const giftBox = document.querySelector('.gift-box');
  if (giftBox) {
    giftBox.addEventListener('click', () => {
      if (!giftBox.classList.contains('open')) {
        giftBox.classList.add('open');
        const giftContent = document.getElementById('giftContent');
        if (giftContent) {
          setTimeout(() => {
            giftContent.classList.remove('hidden');
            createSparkles();
          }, 1000);
        }
        
        // Update stats
        if (questStartTime) {
          const totalTime = Math.floor((Date.now() - questStartTime) / 1000 / 60);
          const totalTimeEl = document.getElementById('totalTime');
          if (totalTimeEl) totalTimeEl.textContent = totalTime;
        }
        const totalAttemptsEl = document.getElementById('totalAttempts');
        if (totalAttemptsEl) totalAttemptsEl.textContent = questAttempts;
      }
    });
  }
}

// AI Letter - Question Database
const aiQuestions = [
  {
    question: "Why do you love me?",
    answer: "I love you because you are my everything. Your smile lights up my entire world. Your kindness touches every soul you meet. Your strength inspires me every single day. Your intelligence amazes me. Your laughter is my favorite sound. Your presence makes me feel complete. You are not just my wife - you are my light, my home, my forever. I love you because you are you, and that's more than enough reason for a lifetime.",
    icon: "💕",
    category: "love"
  },
  {
    question: "What's your favorite thing about me?",
    answer: "How do I choose just one? Your smile that can light up the darkest days. Your eyes that hold entire galaxies of kindness. Your laugh that makes my heart skip beats. Your intelligence that constantly amazes me. Your strength that inspires me. Your kindness that touches everyone. Your beauty that takes my breath away - inside and out. But if I had to pick one thing... it's how you make me feel. With you, I feel complete, loved, and at home. You are my favorite everything.",
    icon: "⭐",
    category: "favorites"
  },
  {
    question: "When did you know you loved me?",
    answer: "I think I knew from the moment you entered my life, even if I didn't realize it then. But there was a specific moment - when I saw how you cared for others, how you smiled at the smallest things, how you made everything around you better just by being there. That's when I knew. I knew I wanted to spend forever making you smile, protecting your heart, and being the person you could always count on. I knew you were my forever.",
    icon: "💖",
    category: "memories"
  },
  {
    question: "What do you dream about for us?",
    answer: "I dream of mornings waking up next to you. I dream of building a life together, full of adventures and quiet moments. I dream of growing old with you, watching our love story unfold over decades. I dream of being your partner in everything - in joy, in challenges, in dreams. I dream of making you laugh every single day. I dream of being the husband you deserve. Most of all, I dream of forever with you, because every dream I have includes you.",
    icon: "🌙",
    category: "future"
  },
  {
    question: "What makes you happiest?",
    answer: "You. Simply you. Your smile makes me the happiest. Your laugh is my favorite melody. Seeing you happy, seeing you succeed, seeing you shine - that's what makes my heart full. But honestly? Just knowing you exist, knowing you're in my life, knowing I get to love you - that's the source of my happiness. You are my joy, my light, my everything. Your happiness is my happiness.",
    icon: "😊",
    category: "happiness"
  },
  {
    question: "How do you feel when we're apart?",
    answer: "When we're apart, I feel incomplete. Like a part of my heart is missing. But I also feel grateful - grateful that someone like you exists, grateful that you chose me, grateful that distance can't break what we have. Every moment apart makes me appreciate every moment together even more. I count down the seconds until we're together again. Distance means nothing when love is this strong. You're always with me, in my heart, in my thoughts, in my dreams.",
    icon: "💔",
    category: "distance"
  },
  {
    question: "What's your favorite memory with me?",
    answer: "Every memory with you is my favorite. But if I had to choose... it's the small moments. The way you look at me when you think I'm not watching. The way you laugh at my jokes. The way you hold my hand. The way you say my name. Every moment we've shared is precious, but the most beautiful part is knowing we have a lifetime of memories ahead of us. Every day with you becomes my new favorite memory.",
    icon: "📸",
    category: "memories"
  },
  {
    question: "What would you do to make me smile?",
    answer: "Anything. Everything. I would move mountains, cross oceans, climb the highest peaks - all just to see you smile. But you know what? Your smile comes so naturally, so beautifully, that sometimes all I need to do is look at you and there it is - that smile that lights up my entire world. I'll spend my life making sure you have reasons to smile, reasons to laugh, reasons to be happy. Your happiness is my mission.",
    icon: "😄",
    category: "love"
  },
  {
    question: "How do you see our future?",
    answer: "I see a future full of love, laughter, and endless adventures. I see us growing together, learning together, building together. I see us facing challenges hand in hand, celebrating victories together, and creating a life that's uniquely ours. I see us growing old together, still making each other laugh, still falling in love every single day. I see forever. I see us. And it's the most beautiful vision I've ever had.",
    icon: "🔮",
    category: "future"
  },
  {
    question: "What's the best part of being with me?",
    answer: "Everything. But if I had to pick... it's how you make me feel. With you, I feel complete. I feel loved. I feel like I'm exactly where I'm supposed to be. You make me want to be a better person. You make me believe in forever. You make every day brighter. The best part is simply... you. Your presence, your love, your everything. Being with you is the best part of my life.",
    icon: "💝",
    category: "love"
  },
  {
    question: "What do you admire most about me?",
    answer: "I admire your strength - how you face challenges with grace. I admire your kindness - how you care for everyone around you. I admire your intelligence - how you see the world. I admire your beauty - inside and out. I admire your courage - how you never give up. I admire your heart - how big and loving it is. But most of all, I admire how you love. How you love me, how you love others, how you love life. That's what I admire most.",
    icon: "👑",
    category: "admiration"
  },
  {
    question: "What's your promise to me?",
    answer: "I promise to love you in every lifetime, in every universe, in every moment that exists. I promise to be your partner, your friend, your biggest supporter. I promise to make you laugh, to hold you when you cry, to celebrate your victories, and to stand by you through everything. I promise to choose you, every single day, for the rest of my life. I promise to be the husband you deserve. I promise you forever. That's my promise, and I'll keep it always.",
    icon: "🤝",
    category: "promises"
  },
  {
    question: "What makes our love special?",
    answer: "Our love is special because it's real. It's not perfect, but it's genuine. It's not always easy, but it's always worth it. It's built on trust, respect, and genuine care for each other. Our love is special because we choose each other every day. Because we see each other - really see each other - and love what we see. Because we're not just in love, we're building a life together. That's what makes it special. That's what makes it ours.",
    icon: "💎",
    category: "love"
  },
  {
    question: "What would you tell me if I was sad?",
    answer: "I would hold you close and tell you that it's okay to feel sad. I would remind you how strong you are, how loved you are, how incredible you are. I would tell you that I'm here, always, no matter what. I would make you laugh, I would listen, I would be your safe space. I would tell you that storms don't last forever, but my love for you does. I would be your light in the darkness. That's what I would tell you, and that's what I'll always do.",
    icon: "🤗",
    category: "support"
  },
  {
    question: "How do you know I'm the one?",
    answer: "I know because when I'm with you, I feel complete. I know because you're the first person I want to tell everything to. I know because you make me want to be better. I know because the thought of a future without you doesn't make sense. I know because you're my home. I know because when I look at you, I see forever. I know because my heart chose you, and my heart is never wrong. You're not just the one - you're my everything.",
    icon: "💍",
    category: "love"
  },
  {
    question: "What's your favorite way to show me you love me?",
    answer: "In a thousand ways, every single day. Through the small things - remembering what you like, making you laugh, being there when you need me. Through the big things - choosing you, supporting you, building a life with you. Through words - telling you how much you mean to me. Through actions - showing you every day. But my favorite way? Just being yours. Being your husband, your partner, your person. That's how I show you I love you - by being completely, entirely, forever yours.",
    icon: "💐",
    category: "love"
  }
];

function getAIResponse(input) {
  const lowerInput = input.toLowerCase();
  
  // Check if input matches any question
  for (const q of aiQuestions) {
    if (lowerInput.includes(q.question.toLowerCase().substring(0, 10))) {
      return q.answer;
    }
  }
  
  if (lowerInput.includes('love') && (lowerInput.includes('why') || lowerInput.includes('do'))) {
    return aiQuestions[0].answer;
  } else if (lowerInput.includes('favorite')) {
    return aiQuestions[1].answer;
  } else if (lowerInput.includes('dream')) {
    return aiQuestions[3].answer;
  } else if (lowerInput.includes('compliment')) {
    return generateCompliment();
  } else if (lowerInput.includes('happy')) {
    return aiQuestions[4].answer;
  }
  return `I'm here to tell you how much you mean to me. Ask me anything, or click on the questions in the sidebar for instant answers! 💜`;
}

const compliments = [
  'You are the most beautiful person I know, inside and out.',
  'Your smile lights up my entire world.',
  'Your intelligence amazes me every single day.',
  'You make me want to be a better person.',
  'Your kindness touches everyone around you.',
  'You are stronger than you know.',
  'Being with you feels like home.',
  'You are my everything, my light, my love.',
  'Your laugh is my favorite sound in the entire universe.',
  'You make every day brighter just by existing.',
  'I fall in love with you more every single day.',
  'You are perfect in every way that matters.'
];

function initializeAI() {
  const input = document.getElementById('aiInput');
  const terminalBody = document.getElementById('terminalBody');
  const generateBtn = document.getElementById('generateCompliment');
  const questionsList = document.getElementById('questionsList');
  const questionsCount = document.getElementById('questionsCount');

  // Populate questions sidebar
  if (questionsList) {
    aiQuestions.forEach((q, index) => {
      const questionItem = document.createElement('div');
      questionItem.className = 'question-item';
      questionItem.dataset.index = index;
      questionItem.innerHTML = `
        <div class="question-icon">${q.icon}</div>
        <div class="question-text">${q.question}</div>
        <div class="question-arrow">→</div>
      `;
      questionItem.addEventListener('click', () => showAnswer(q));
      questionsList.appendChild(questionItem);
    });
  }

  if (questionsCount) {
    questionsCount.textContent = aiQuestions.length;
  }

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleAIInput(input.value, terminalBody);
      input.value = '';
    }
  });

  generateBtn.addEventListener('click', () => {
    const compliment = generateCompliment();
    addTerminalLine(terminalBody, `AI> ${compliment}`, 'response');
  });

  // Close modal handlers
  const modal = document.getElementById('answerModal');
  const closeBtn = document.querySelector('.answer-modal-close');
  const overlay = document.querySelector('.answer-modal-overlay');
  const askAgainBtn = document.querySelector('.ask-again');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeAnswerModal());
  }
  if (overlay) {
    overlay.addEventListener('click', () => closeAnswerModal());
  }
  if (askAgainBtn) {
    askAgainBtn.addEventListener('click', () => closeAnswerModal());
  }
}

function showAnswer(question) {
  const modal = document.getElementById('answerModal');
  const questionEl = document.getElementById('answerQuestion');
  const answerEl = document.getElementById('answerText');

  if (modal && questionEl && answerEl) {
    questionEl.textContent = question.question;
    answerEl.textContent = question.answer;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Add sparkle effect
    createSparkles();
  }
}

function closeAnswerModal() {
  const modal = document.getElementById('answerModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function handleAIInput(input, terminalBody) {
  addTerminalLine(terminalBody, `You> ${input}`, 'user');
  
  const response = getAIResponse(input);
  
  setTimeout(() => {
    addTerminalLine(terminalBody, `AI> ${response}`, 'response');
  }, 500);
}

function addTerminalLine(container, text, type) {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.innerHTML = `<span class="prompt">${type === 'user' ? 'You>' : 'AI>'}</span><span class="text">${text.split('> ')[1] || text}</span>`;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

function generateCompliment() {
  return compliments[Math.floor(Math.random() * compliments.length)];
}

// Vault Game
let gameState = {
  currentLevel: 1,
  attempts: { 1: 3, 2: 3, 3: 3 },
  hintsUsed: 0,
  vaultsUnlocked: 0,
  startTime: null,
  totalAttempts: 0
};

const vaultKeys = {
  1: ['sahana', 'my everything', 'my light', 'my wife', 'my sweetheart', 'my honey', 'my angel', 'my goddess', 'my life', 'sahana monish tijil'],
  2: ['mo', 'monish', 'monish tijil', 'your husband', 'yours forever'],
  3: ['forever', 'love', 'marriage', 'together', 'us']
};

const vaultHints = {
  1: "Think of the names I call you... like 'My Everything' or 'My Light'",
  2: "What's my nickname? The short one you use...",
  3: "What word describes our relationship? Think of promises..."
};

function initializeVault() {
  const startGameBtn = document.getElementById('startGame');
  const closeRulesBtn = document.getElementById('closeRules');
  const gameRules = document.getElementById('gameRules');
  const gameStats = document.getElementById('gameStats');
  const vaultLevels = document.getElementById('vaultLevels');
  const retryBtn = document.getElementById('retryBtn');
  const playAgainBtn = document.getElementById('playAgain');

  // Start game
  if (startGameBtn) {
    startGameBtn.addEventListener('click', () => {
      gameRules.classList.add('hidden');
      gameStats.classList.remove('hidden');
      vaultLevels.classList.remove('hidden');
      document.getElementById('level1').classList.remove('hidden');
      gameState.startTime = Date.now();
      updateGameStats();
    });
  }

  // Close rules
  if (closeRulesBtn) {
    closeRulesBtn.addEventListener('click', () => {
      gameRules.classList.add('hidden');
      gameStats.classList.remove('hidden');
      vaultLevels.classList.remove('hidden');
      document.getElementById('level1').classList.remove('hidden');
      gameState.startTime = Date.now();
      updateGameStats();
    });
  }

  // Initialize level 1
  setupVaultLevel(1);
  setupVaultLevel(2);
  setupVaultLevel(3);

  // Retry button
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      resetGame();
    });
  }

  // Play again button
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
      resetGame();
    });
  }
}

function setupVaultLevel(level) {
  const unlockBtn = document.getElementById(`unlockVault${level}`);
  const hintBtn = document.getElementById(`hintBtn${level}`);
  const vaultKey = document.getElementById(`vaultKey${level}`);
  const vaultDoor = document.getElementById(`vaultDoor${level}`);
  const attemptsEl = document.getElementById(`attempts${level}`);

  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
      tryUnlockVault(level, vaultKey.value);
    });
  }

  if (vaultKey) {
    vaultKey.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        tryUnlockVault(level, vaultKey.value);
      }
    });
  }

  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      showHint(level);
    });
  }

  // Update attempts display
  if (attemptsEl) {
    attemptsEl.textContent = gameState.attempts[level];
  }
}

function tryUnlockVault(level, key) {
  const vaultKey = document.getElementById(`vaultKey${level}`);
  const attemptsEl = document.getElementById(`attempts${level}`);
  const keyLower = key.toLowerCase().trim();
  
  // Check if key is valid
  const validKeys = vaultKeys[level];
  const isValid = validKeys.some(valid => 
    keyLower.includes(valid.toLowerCase()) || 
    valid.toLowerCase().includes(keyLower)
  );

  if (isValid) {
    // Success!
    unlockVault(level);
  } else {
    // Wrong key
    gameState.attempts[level]--;
    gameState.totalAttempts++;
    updateGameStats();
    
    if (attemptsEl) {
      attemptsEl.textContent = gameState.attempts[level];
    }

    if (gameState.attempts[level] <= 0) {
      // Out of attempts
      showFailure(level);
    } else {
      // Show error
      showError(`Wrong key! ${gameState.attempts[level]} attempts remaining.`);
      if (vaultKey) {
        vaultKey.value = '';
        vaultKey.style.borderColor = '#ef4444';
        setTimeout(() => {
          vaultKey.style.borderColor = '';
        }, 1000);
      }
    }
  }
}

function unlockVault(level) {
  const vaultDoor = document.getElementById(`vaultDoor${level}`);
  const successMessage = document.getElementById('successMessage');
  const successText = document.getElementById('successText');
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  
  gameState.vaultsUnlocked++;
  updateGameStats();

  // Animate vault opening
  if (vaultDoor) {
    vaultDoor.classList.add('unlocked');
    createConfetti();
  }

  // Show success message
  if (successMessage && successText) {
    const levelNames = { 1: 'Bronze', 2: 'Silver', 3: 'Gold' };
    successText.textContent = `You've unlocked the ${levelNames[level]} Vault!`;
    successMessage.classList.remove('hidden');
  }

  // Setup next level button
  if (nextLevelBtn) {
    nextLevelBtn.onclick = () => {
      successMessage.classList.add('hidden');
      
      if (level < 3) {
        // Move to next level
        document.getElementById(`level${level}`).classList.add('hidden');
        document.getElementById(`level${level + 1}`).classList.remove('hidden');
        gameState.currentLevel = level + 1;
        updateGameStats();
      } else {
        // All vaults unlocked!
        showFinalReward();
      }
    };
  }
}

function showHint(level) {
  if (gameState.attempts[level] <= 1) {
    showError("You don't have enough attempts to use a hint!");
    return;
  }

  gameState.attempts[level]--;
  gameState.hintsUsed++;
  gameState.totalAttempts++;
  updateGameStats();

  const attemptsEl = document.getElementById(`attempts${level}`);
  if (attemptsEl) {
    attemptsEl.textContent = gameState.attempts[level];
  }

  // Show hint
  const hint = vaultHints[level];
  showHintModal(hint);
}

function showHintModal(hint) {
  const modal = document.createElement('div');
  modal.className = 'hint-modal';
  modal.innerHTML = `
    <div class="hint-modal-content">
      <div class="hint-icon">💡</div>
      <h3>Hint</h3>
      <p>${hint}</p>
      <button class="vault-btn close-hint-btn">Got it!</button>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.close-hint-btn');
  closeBtn.addEventListener('click', () => {
    modal.remove();
  });

  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

function showFailure(level) {
  const failureMessage = document.getElementById('failureMessage');
  if (failureMessage) {
    failureMessage.classList.remove('hidden');
  }
}

function showFinalReward() {
  const vaultLevels = document.getElementById('vaultLevels');
  const gameStats = document.getElementById('gameStats');
  const vaultContent = document.getElementById('vaultContent');
  const totalAttemptsEl = document.getElementById('totalAttempts');
  const totalHintsEl = document.getElementById('totalHints');
  const completionTimeEl = document.getElementById('completionTime');

  if (vaultLevels) vaultLevels.classList.add('hidden');
  if (gameStats) gameStats.classList.add('hidden');
  if (vaultContent) vaultContent.classList.remove('hidden');

  // Calculate completion time
  if (gameState.startTime && completionTimeEl) {
    const timeElapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    completionTimeEl.textContent = timeElapsed;
  }

  if (totalAttemptsEl) {
    totalAttemptsEl.textContent = gameState.totalAttempts;
  }

  if (totalHintsEl) {
    totalHintsEl.textContent = gameState.hintsUsed;
  }

  createConfetti();
  createSparkles();
}

function resetGame() {
  gameState = {
    currentLevel: 1,
    attempts: { 1: 3, 2: 3, 3: 3 },
    hintsUsed: 0,
    vaultsUnlocked: 0,
    startTime: null,
    totalAttempts: 0
  };

  // Reset UI
  document.getElementById('gameRules').classList.remove('hidden');
  document.getElementById('gameStats').classList.add('hidden');
  document.getElementById('vaultLevels').classList.add('hidden');
  document.getElementById('vaultContent').classList.add('hidden');
  document.getElementById('successMessage').classList.add('hidden');
  document.getElementById('failureMessage').classList.add('hidden');

  // Reset all levels
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`level${i}`).classList.add('hidden');
    const vaultKey = document.getElementById(`vaultKey${i}`);
    const attemptsEl = document.getElementById(`attempts${i}`);
    const vaultDoor = document.getElementById(`vaultDoor${i}`);
    
    if (vaultKey) vaultKey.value = '';
    if (attemptsEl) attemptsEl.textContent = '3';
    if (vaultDoor) vaultDoor.classList.remove('unlocked');
  }

  document.getElementById('level1').classList.remove('hidden');
}

function updateGameStats() {
  const currentLevelEl = document.getElementById('currentLevel');
  const attemptsLeftEl = document.getElementById('attemptsLeft');
  const vaultsUnlockedEl = document.getElementById('vaultsUnlocked');
  const hintsUsedEl = document.getElementById('hintsUsed');

  if (currentLevelEl) {
    currentLevelEl.textContent = gameState.currentLevel;
  }

  if (attemptsLeftEl) {
    attemptsLeftEl.textContent = gameState.attempts[gameState.currentLevel];
  }

  if (vaultsUnlockedEl) {
    vaultsUnlockedEl.textContent = gameState.vaultsUnlocked;
  }

  if (hintsUsedEl) {
    hintsUsedEl.textContent = gameState.hintsUsed;
  }
}

function showError(message) {
  const error = document.createElement('div');
  error.className = 'vault-error';
  error.textContent = message;
  document.body.appendChild(error);

  setTimeout(() => {
    error.classList.add('show');
  }, 10);

  setTimeout(() => {
    error.classList.remove('show');
    setTimeout(() => error.remove(), 300);
  }, 3000);
}

function setVaultDate() {
  // Not needed for game version
}

// Effects
function createPetals() {
  // Create initial petals
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.width = `${8 + Math.random() * 8}px`;
      petal.style.height = petal.style.width;
      petal.style.animationDuration = `${10 + Math.random() * 10}s, ${3 + Math.random() * 3}s`;
      document.body.appendChild(petal);
      
      setTimeout(() => petal.remove(), 20000);
    }, i * 200);
  }
  
  // Continue creating petals
  setInterval(() => {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.width = `${8 + Math.random() * 8}px`;
    petal.style.height = petal.style.width;
    petal.style.animationDuration = `${10 + Math.random() * 10}s, ${3 + Math.random() * 3}s`;
  document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 20000);
  }, 900);
}

function createDust() {
  for (let i = 0; i < 20; i++) {
    const dust = document.createElement('div');
    dust.className = 'dust-particle';
    dust.style.left = Math.random() * 100 + '%';
    dust.style.animationDelay = Math.random() * 20 + 's';
    dust.style.animationDuration = `${15 + Math.random() * 10}s`;
    document.getElementById('dust').appendChild(dust);
  }
}

function createSparkles(element) {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      const rect = element.getBoundingClientRect();
      sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
      sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
      document.getElementById('sparkles').appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 2000);
    }, i * 50);
  }
}

// Nebula Effects
function createNebula() {
  const nebulaContainer = document.getElementById('nebula');
  if (!nebulaContainer) return;
  
  const colors = [
    'rgba(186, 130, 255, 0.3)',
    'rgba(255, 180, 255, 0.25)',
    'rgba(255, 107, 157, 0.2)',
    'rgba(0, 212, 255, 0.15)'
  ];
  
  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'nebula-cloud';
    cloud.style.width = (200 + Math.random() * 300) + 'px';
    cloud.style.height = cloud.style.width;
    cloud.style.background = colors[Math.floor(Math.random() * colors.length)];
    cloud.style.left = Math.random() * 100 + '%';
    cloud.style.top = Math.random() * 100 + '%';
    cloud.style.animationDelay = Math.random() * 30 + 's';
    cloud.style.animationDuration = (20 + Math.random() * 20) + 's';
    nebulaContainer.appendChild(cloud);
  }
}

// Shooting Stars
function createShootingStars() {
  const container = document.getElementById('shootingStars');
  if (!container) return;
  
  function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * 50 + '%';
    star.style.top = Math.random() * 30 + '%';
    star.style.animationDuration = (1.5 + Math.random() * 1) + 's';
    star.style.opacity = Math.random() * 0.5 + 0.5;
    container.appendChild(star);
    
    setTimeout(() => star.remove(), 3000);
  }
  
  // Create shooting stars periodically
  setInterval(createShootingStar, 3000);
  
  // Initial burst
  for (let i = 0; i < 3; i++) {
    setTimeout(createShootingStar, i * 500);
  }
}

// Particles
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (10 + Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}

// Add fall animation for confetti
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    to {
      transform: translateY(110vh) rotate(360deg);
    }
  }
`;
document.head.appendChild(style);
