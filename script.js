// ============ GLOBAL ============
let currentSlide = 0;
const totalSlides = 8;
let musicPlaying = false;
let audio = document.getElementById('bgMusic');
let musicInterval = null;

// ============ QRIS ============
function openLoading() {
    document.getElementById('qrisScreen').classList.remove('active');
    document.getElementById('loadingScreen').classList.add('active');
    createRainbowHearts();
    
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.remove('active');
        document.getElementById('giftEntryScreen').classList.add('active');
        createGiftBalloons();
    }, 4000);
}

// ============ RAINBOW HEARTS ============
function createRainbowHearts() {
    const container = document.getElementById('rainbowHearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💞', '💘'];
    
    for (let i = 0; i < 35; i++) {
        const el = document.createElement('div');
        el.className = 'rainbow-heart';
        el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        el.style.cssText = `
            left: ${Math.random() * 95}%;
            font-size: ${Math.random() * 20 + 14}px;
            animation-duration: ${Math.random() * 4 + 3}s;
            animation-delay: ${Math.random() * 4}s;
        `;
        container.appendChild(el);
    }
}

// ============ GIFT ENTRY ============
function enterSlideshow() {
    document.getElementById('giftEntryScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
    
    initSlideshow();
    createSlideBalloons();
    
    showToast('🎉 Selamat datang!');
    launchConfetti(80);
}

// ============ SLIDESHOW ============
function initSlideshow() {
    document.getElementById('birthdayName').textContent = 'Sayangku';
    showSlide(0);
    createNavDots();
}

function showSlide(index) {
    const items = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.nav-dot');
    
    items.forEach((el, i) => {
        el.classList.toggle('active', i === index);
        el.classList.toggle('hidden', i !== index);
    });
    
    dots.forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
}

function goToSlide(idx) {
    showSlide(idx);
}

function createNavDots() {
    const container = document.getElementById('navDots');
    container.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        container.appendChild(dot);
    }
}

// ============ BALLOONS ============
function createGiftBalloons() {
    const container = document.getElementById('giftBalloons');
    const emojis = ['🎈', '🎉', '🎊', '💕', '💖', '✨', '⭐', '🌟', '🎀'];
    container.innerHTML = '';
    
    for (let i = 0; i < 18; i++) {
        const el = document.createElement('div');
        el.className = 'gift-balloon';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.cssText = `
            left: ${Math.random() * 95}%;
            font-size: ${Math.random() * 20 + 22}px;
            animation-duration: ${Math.random() * 10 + 8}s;
            animation-delay: ${Math.random() * 6}s;
            opacity: ${Math.random() * 0.4 + 0.2};
        `;
        container.appendChild(el);
    }
}

function createSlideBalloons() {
    const emojis = ['🎈', '🎉', '🎊', '💕', '💖', '✨', '⭐', '🌟', '🎀'];
    
    for (let s = 0; s < totalSlides; s++) {
        const container = document.getElementById('sballoons' + s);
        if (!container) continue;
        container.innerHTML = '';
        
        for (let i = 0; i < 14; i++) {
            const el = document.createElement('div');
            el.className = 'slide-balloon';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.cssText = `
                left: ${Math.random() * 95}%;
                font-size: ${Math.random() * 18 + 20}px;
                animation-duration: ${Math.random() * 10 + 8}s;
                animation-delay: ${Math.random() * 6}s;
                opacity: ${Math.random() * 0.4 + 0.15};
            `;
            container.appendChild(el);
        }
    }
}

// ============ CONFETTI ============
function launchConfetti(count = 80) {
    let container = document.getElementById('confettiContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'confettiContainer';
        document.body.appendChild(container);
    }
    
    const colors = ['#FF6B9D', '#FF1493', '#C44B8B', '#6BCB77', '#FFB347', '#4FC3F7', '#FFD54F'];
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'confetti';
        const size = Math.random() * 10 + 4;
        el.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size * (Math.random() * 0.6 + 0.4)}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            animation-duration: ${Math.random() * 2 + 1.5}s;
            animation-delay: ${Math.random() * 1}s;
        `;
        container.appendChild(el);
    }
    
    setTimeout(() => { container.innerHTML = ''; }, 4000);
}

// ============ TOAST ============
function showToast(msg) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============ MUSIC ============
function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    const disc = document.getElementById('musicDisc');
    const lyric = document.getElementById('musicLyric');
    
    if (musicPlaying) {
        audio.pause();
        musicPlaying = false;
        btn.textContent = '▶️ Putar';
        btn.classList.remove('playing');
        disc.classList.add('paused');
        lyric.textContent = '🎵 Musik dihentikan...';
        lyric.classList.remove('active');
        if (musicInterval) clearInterval(musicInterval);
    } else {
        audio.play().then(() => {
            lyric.textContent = '🎵 Now Playing: Shape of You - Ed Sheeran';
            lyric.classList.add('active');
        }).catch(() => {
            showToast('⚠️ Gagal memutar musik');
        });
        musicPlaying = true;
        btn.textContent = '⏸️ Hentikan';
        btn.classList.add('playing');
        disc.classList.remove('paused');
        startProgress();
    }
}

function startProgress() {
    if (musicInterval) clearInterval(musicInterval);
    let p = 0;
    musicInterval = setInterval(() => {
        if (musicPlaying) {
            p = (p + 0.3) % 100;
            document.getElementById('musicProgressFill').style.width = p + '%';
        }
    }, 100);
}

// ============ KEYBOARD ============
document.addEventListener('keydown', function(e) {
    if (document.getElementById('giftEntryScreen').classList.contains('active')) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enterSlideshow(); }
        return;
    }
    if (!document.getElementById('mainScreen').classList.contains('active')) return;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); nextSlide(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prevSlide(); }
    if (e.key === ' ' || e.key === 'Space') { e.preventDefault(); toggleMusic(); }
});

// ============ RESTART ============
function restart() {
    currentSlide = 0;
    showSlide(0);
    if (musicPlaying) toggleMusic();
    showToast('🔄 Kembali ke awal!');
}

// ============ INIT ============
window.onload = function() {
    document.getElementById('qrisScreen').classList.add('active');
    
    if (!document.getElementById('confettiContainer')) {
        const c = document.createElement('div');
        c.id = 'confettiContainer';
        document.body.appendChild(c);
    }
    if (!document.getElementById('toastContainer')) {
        const t = document.createElement('div');
        t.id = 'toastContainer';
        document.body.appendChild(t);
    }
};