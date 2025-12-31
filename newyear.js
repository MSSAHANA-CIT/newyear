// Global state
let isDarkMode = false;

// Initialize New Year Page
document.addEventListener('DOMContentLoaded', () => {
  // Stagger the animations for dramatic effect
  setTimeout(() => {
    createFireworks();
  }, 500);
  
  setTimeout(() => {
    createConfetti();
  }, 1000);
  
  setTimeout(() => {
    createCrackers();
  }, 1500);
  
  setTimeout(() => {
    createSparkles();
  }, 2000);
  
  initializeLetterAnimation();
  
  // Force text visibility immediately and after animations
  const forceTextVisibility = () => {
    const letterContent = document.querySelector('.letter-content');
    if (letterContent) {
      letterContent.style.opacity = '1';
      letterContent.style.visibility = 'visible';
      letterContent.style.zIndex = '100';
    }
    
    // Force all text elements to be visible
    const allTextElements = document.querySelectorAll('.letter-intro, .letter-line, .letter-paragraph, .letter-highlight, .letter-pledge, .letter-signature');
    allTextElements.forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.display = 'block';
      el.style.zIndex = '100';
    });
  };
  
  // Force visibility immediately
  forceTextVisibility();
  
  // Force again after animations complete
  setTimeout(forceTextVisibility, 8000);
  
  // Force periodically to ensure visibility
  setInterval(forceTextVisibility, 2000);
  
  // Auto dark mode toggle every 15 seconds
  setInterval(() => {
    toggleDarkMode();
  }, 15000);
  
  // Enter button with transition effect
  const enterBtn = document.getElementById('enterButton');
  
  // Ensure button is always visible after animation
  setTimeout(() => {
    if (enterBtn) {
      enterBtn.style.opacity = '1';
      enterBtn.style.visibility = 'visible';
      enterBtn.style.display = 'inline-block';
      enterBtn.style.pointerEvents = 'auto';
    }
  }, 8500); // After animation completes (7.5s + 0.8s + buffer)
  
  enterBtn.addEventListener('click', () => {
    // Prevent multiple clicks
    enterBtn.style.pointerEvents = 'none';
    
    // Add fade out effect
    document.body.style.transition = 'opacity 1s ease-out';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);
  });
  
  // Add click effect to button
  enterBtn.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.95)';
  });
  
  enterBtn.addEventListener('mouseup', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  // Ensure button stays visible on window resize or other events
  window.addEventListener('resize', () => {
    if (enterBtn) {
      enterBtn.style.opacity = '1';
      enterBtn.style.visibility = 'visible';
    }
  });
  
  // Force visibility check periodically
  setInterval(() => {
    if (enterBtn && enterBtn.style.opacity === '0') {
      enterBtn.style.opacity = '1';
      enterBtn.style.visibility = 'visible';
    }
  }, 1000);
});

// Create gold cracker function (defined early for use in other functions)
function createGoldCracker(x, y, container) {
  const cracker = document.createElement('div');
  cracker.className = 'cracker gold-cracker';
  cracker.style.left = x + 'px';
  cracker.style.top = y + 'px';
  container.appendChild(cracker);
  
  // Create gold particles
  const particles = 50; // More particles for gold crackers
  for (let i = 0; i < particles; i++) {
    const angle = (Math.PI * 2 * i) / particles + (Math.random() - 0.5) * 0.3;
    const distance = 120 + Math.random() * 180;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - (Math.random() * 40);
    
    const particle = document.createElement('div');
    particle.className = 'cracker-particle gold-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    particle.style.animationDelay = (Math.random() * 0.1) + 's';
    particle.style.animationDuration = (1 + Math.random() * 0.6) + 's';
    
    const size = 6 + Math.random() * 10;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 2000);
  }
  
  // Enhanced flash for gold crackers
  const flash = document.createElement('div');
  flash.style.position = 'absolute';
  flash.style.left = x + 'px';
  flash.style.top = y + 'px';
  flash.style.width = '300px';
  flash.style.height = '300px';
  flash.style.background = 'radial-gradient(circle, rgba(255,215,0,0.9), rgba(255,200,0,0.6), transparent)';
  flash.style.borderRadius = '50%';
  flash.style.transform = 'translate(-50%, -50%)';
  flash.style.animation = 'flash 0.5s ease-out forwards';
  flash.style.pointerEvents = 'none';
  flash.style.boxShadow = '0 0 100px rgba(255,215,0,0.8)';
  container.appendChild(flash);
  
  setTimeout(() => {
    cracker.remove();
    flash.remove();
  }, 2000);
}

// Create special gold cracker burst
function createGoldCrackerBurst() {
  const crackersContainer = document.getElementById('crackers');
  const burstCount = 25; // Lots of gold crackers
  
  for (let i = 0; i < burstCount; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      createGoldCracker(x, y, crackersContainer);
    }, i * 80);
  }
}

// Dark Mode Toggle
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
  
  // Create extra gold crackers when switching to dark mode
  if (isDarkMode) {
    createGoldCrackerBurst();
  }
  
  // Update sparkles
  const sparklesContainer = document.getElementById('sparkles');
  if (sparklesContainer) {
    // Clear and recreate sparkles with new settings
    sparklesContainer.innerHTML = '';
    createSparkles();
  }
}

// Fireworks
function createFireworks() {
  const fireworksContainer = document.getElementById('fireworks');
  const colors = ['#ffd700', '#ff6b9d', '#ba82ff', '#00d4ff', '#ffb4ff'];
  
  function createFirework() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.5);
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Create firework
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.background = color;
    firework.style.boxShadow = `0 0 10px ${color}`;
    fireworksContainer.appendChild(firework);
    
    // Animate firework up
    let currentY = y;
    const speed = 2 + Math.random() * 2;
    const interval = setInterval(() => {
      currentY -= speed;
      firework.style.top = currentY + 'px';
      
      if (currentY < -10) {
        clearInterval(interval);
        // Create burst
        createBurst(x, currentY + 10, color);
        firework.remove();
      }
    }, 16);
  }
  
  function createBurst(x, y, color) {
    const particles = 20;
    for (let i = 0; i < particles; i++) {
      const angle = (Math.PI * 2 * i) / particles;
      const distance = 50 + Math.random() * 100;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      const particle = document.createElement('div');
      particle.className = 'firework-burst';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.background = color;
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      particle.style.animation = `burst 1s ease-out forwards`;
      particle.style.transform = `translate(${tx}px, ${ty}px)`;
      
      document.getElementById('fireworks').appendChild(particle);
      
      setTimeout(() => particle.remove(), 1000);
    }
  }
  
  // Create fireworks continuously
  setInterval(createFirework, 800);
  // Initial burst
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createFirework(), i * 200);
  }
}

// Confetti
function createConfetti() {
  const confettiContainer = document.getElementById('confetti');
  const colors = ['#ffd700', '#ff6b9d', '#ba82ff', '#00d4ff', '#ffb4ff'];
  
  function createConfettiPiece() {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (5 + Math.random() * 10) + 'px';
    piece.style.height = piece.style.width;
    piece.style.animationDuration = (3 + Math.random() * 4) + 's';
    piece.style.animationDelay = Math.random() * 2 + 's';
    
    confettiContainer.appendChild(piece);
    
    setTimeout(() => piece.remove(), 7000);
  }
  
  // Create confetti continuously
  for (let i = 0; i < 100; i++) {
    setTimeout(() => createConfettiPiece(), i * 50);
  }
  
  setInterval(createConfettiPiece, 200);
}

// Crackers
function createCrackers() {
  const crackersContainer = document.getElementById('crackers');
  
  function createCracker(isGold = false) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    const cracker = document.createElement('div');
    cracker.className = isGold ? 'cracker gold-cracker' : 'cracker';
    cracker.style.left = x + 'px';
    cracker.style.top = y + 'px';
    crackersContainer.appendChild(cracker);
    
    // Create particles with more realistic explosion
    const particles = isGold ? 50 : 40;
    for (let i = 0; i < particles; i++) {
      const angle = (Math.PI * 2 * i) / particles + (Math.random() - 0.5) * 0.5;
      const distance = isGold ? (120 + Math.random() * 180) : (100 + Math.random() * 150);
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - (Math.random() * 30);
      
      const particle = document.createElement('div');
      particle.className = isGold ? 'cracker-particle gold-particle' : 'cracker-particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      particle.style.animationDelay = (Math.random() * 0.1) + 's';
      particle.style.animationDuration = (0.8 + Math.random() * 0.4) + 's';
      
      // Random size variation (larger for gold)
      const size = isGold ? (6 + Math.random() * 10) : (4 + Math.random() * 6);
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      crackersContainer.appendChild(particle);
      
      setTimeout(() => particle.remove(), 1500);
    }
    
    // Enhanced flash
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.left = x + 'px';
    flash.style.top = y + 'px';
    flash.style.width = isGold ? '300px' : '200px';
    flash.style.height = isGold ? '300px' : '200px';
    flash.style.background = isGold 
      ? 'radial-gradient(circle, rgba(255,215,0,0.9), rgba(255,200,0,0.6), transparent)'
      : 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)';
    flash.style.borderRadius = '50%';
    flash.style.transform = 'translate(-50%, -50%)';
    flash.style.animation = 'flash 0.3s ease-out forwards';
    flash.style.pointerEvents = 'none';
    if (isGold) {
      flash.style.boxShadow = '0 0 100px rgba(255,215,0,0.8)';
    }
    crackersContainer.appendChild(flash);
    
    setTimeout(() => {
      cracker.remove();
      flash.remove();
    }, 1500);
  }
  
  // Create crackers at intervals (30% chance of gold)
  setInterval(() => {
    const isGold = Math.random() < 0.3; // 30% gold crackers
    createCracker(isGold);
  }, 1500); // More frequent
  
  // Initial burst - lots of gold crackers
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const isGold = i % 3 === 0; // Every 3rd is gold
      createCracker(isGold);
    }, i * 150);
  }
  
  // Big center gold burst after a delay
  setTimeout(() => {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const cracker = document.createElement('div');
        cracker.className = 'cracker gold-cracker';
        cracker.style.left = centerX + (Math.random() - 0.5) * 300 + 'px';
        cracker.style.top = centerY + (Math.random() - 0.5) * 300 + 'px';
        crackersContainer.appendChild(cracker);
        
        // Create massive gold particle burst
        const particles = 70;
        for (let j = 0; j < particles; j++) {
          const angle = (Math.PI * 2 * j) / particles;
          const distance = 180 + Math.random() * 250;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;
          
          const particle = document.createElement('div');
          particle.className = 'cracker-particle gold-particle';
          particle.style.left = cracker.style.left;
          particle.style.top = cracker.style.top;
          particle.style.setProperty('--tx', tx + 'px');
          particle.style.setProperty('--ty', ty + 'px');
          particle.style.animationDuration = (1 + Math.random() * 0.6) + 's';
          
          const size = 8 + Math.random() * 12;
          particle.style.width = size + 'px';
          particle.style.height = size + 'px';
          
          crackersContainer.appendChild(particle);
          setTimeout(() => particle.remove(), 2000);
        }
        
        setTimeout(() => cracker.remove(), 2000);
      }, i * 80);
    }
  }, 3000);
  
  // Continuous gold cracker bursts (more frequent)
  setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createGoldCracker(x, y, crackersContainer);
  }, 3500);
}

// Sparkles
function createSparkles() {
  const sparklesContainer = document.getElementById('sparkles');
  
  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 3 + 's';
    sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
    
    // More gold sparkles, especially in dark mode
    const colors = isDarkMode 
      ? ['#ffd700', '#ffaa00', '#fff700', '#ffd700', '#ffaa00', '#ffffff']
      : ['#ffd700', '#ff6b9d', '#ba82ff', '#ffffff'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Enhanced glow for gold sparkles
    if (sparkle.style.background.includes('ffd700') || sparkle.style.background.includes('ffaa00')) {
      sparkle.style.boxShadow = '0 0 15px #ffd700, 0 0 30px rgba(255,215,0,0.5)';
    }
    
    sparklesContainer.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 5000);
  }
  
  // Create sparkles continuously (more in dark mode)
  const interval = isDarkMode ? 200 : 300;
  setInterval(createSparkle, interval);
  
  // Initial sparkles (more if dark mode)
  const initialCount = isDarkMode ? 80 : 50;
  for (let i = 0; i < initialCount; i++) {
    setTimeout(() => createSparkle(), i * 100);
  }
}

// Letter Animation
function initializeLetterAnimation() {
  // The CSS animations handle the letter appearance
  // This function can be used for additional interactive effects
  
  const letterPaper = document.querySelector('.letter-paper');
  if (letterPaper) {
    letterPaper.addEventListener('mouseenter', () => {
      letterPaper.style.transform = 'scale(1.02)';
      letterPaper.style.transition = 'transform 0.3s ease';
    });
    
    letterPaper.addEventListener('mouseleave', () => {
      letterPaper.style.transform = 'scale(1)';
    });
  }
}

// Add floating effect to title with sparkles
function animateTitle() {
  const title = document.getElementById('mainTitle');
  if (title) {
    // Create sparkles around title (more in dark mode)
    const sparkleInterval = isDarkMode ? 300 : 500;
    setInterval(() => {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'absolute';
      sparkle.style.width = '8px';
      sparkle.style.height = '8px';
      sparkle.style.background = '#ffd700';
      sparkle.style.borderRadius = '50%';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.boxShadow = '0 0 15px #ffd700, 0 0 30px rgba(255,215,0,0.6)';
      sparkle.style.filter = 'brightness(1.5)';
      
      const rect = title.getBoundingClientRect();
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      sparkle.style.animation = 'sparkleBurst 1.2s ease-out forwards';
      
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1200);
    }, sparkleInterval);
  }
}

animateTitle();

// Add particle effect on button hover
document.getElementById('enterButton').addEventListener('mouseenter', function() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'absolute';
      sparkle.style.width = '4px';
      sparkle.style.height = '4px';
      sparkle.style.background = '#ffd700';
      sparkle.style.borderRadius = '50%';
      sparkle.style.left = '50%';
      sparkle.style.top = '50%';
      sparkle.style.pointerEvents = 'none';
      
      const angle = (Math.PI * 2 * i) / 20;
      const distance = 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      sparkle.style.transform = `translate(${x}px, ${y}px)`;
      sparkle.style.animation = 'sparkleBurst 1s ease-out forwards';
      
      this.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 1000);
    }, i * 30);
  }
});
