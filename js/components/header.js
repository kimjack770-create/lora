// ========================================================
// SWIFLORA LOGISTICS - HEADER COMPONENT
// Dynamic navigation bar, active tab tracking, mobile drawer & theme switcher
// ========================================================

import { authService } from '../services/authService.js';
import { MAINTENANCE_MODE } from '../config/maintenance.js';

// Full catalog of languages supported by the Google Translate widget —
// not just a curated shortlist — so visitors can search/select any of them.
// Covers all major Asian languages (Chinese Simplified/Traditional, Japanese,
// Korean, Hindi, Bengali, Urdu, Thai, Vietnamese, Indonesian, Malay, Filipino,
// Khmer, Lao, Burmese, Mongolian, Nepali, Sinhala, Tamil, Telugu, Kannada,
// Malayalam, Punjabi, Marathi, Gujarati, Odia, Uzbek, Kazakh, Kyrgyz, Tajik,
// Turkmen, Uyghur, Pashto, Persian, Hebrew, Armenian, Georgian, Azerbaijani...)
// alongside European, African, and other world languages.
const SITE_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hy', name: 'Հայերեն', flag: '🇦🇲' },
  { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'eu', name: 'Euskara', flag: '🌐' },
  { code: 'be', name: 'Беларуская', flag: '🇧🇾' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'bs', name: 'Bosanski', flag: '🇧🇦' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'ca', name: 'Català', flag: '🌐' },
  { code: 'ceb', name: 'Cebuano', flag: '🇵🇭' },
  { code: 'ny', name: 'Chichewa', flag: '🇲🇼' },
  { code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-TW', name: '中文 (繁體)', flag: '🇹🇼' },
  { code: 'co', name: 'Corsu', flag: '🌐' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'eo', name: 'Esperanto', flag: '🌐' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
  { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'fy', name: 'Frysk', flag: '🌐' },
  { code: 'gl', name: 'Galego', flag: '🌐' },
  { code: 'ka', name: 'ქართული', flag: '🇬🇪' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ht', name: 'Kreyòl Ayisyen', flag: '🇭🇹' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { code: 'haw', name: 'ʻŌlelo Hawaiʻi', flag: '🌐' },
  { code: 'iw', name: 'עברית', flag: '🇮🇱' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'hmn', name: 'Hmong', flag: '🌐' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'is', name: 'Íslenska', flag: '🇮🇸' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ga', name: 'Gaeilge', flag: '🇮🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'jw', name: 'Basa Jawa', flag: '🇮🇩' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'kk', name: 'Қазақ', flag: '🇰🇿' },
  { code: 'km', name: 'ខ្មែរ', flag: '🇰🇭' },
  { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ku', name: 'Kurdî', flag: '🌐' },
  { code: 'ky', name: 'Кыргызча', flag: '🇰🇬' },
  { code: 'lo', name: 'ລາວ', flag: '🇱🇦' },
  { code: 'la', name: 'Latina', flag: '🌐' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lb', name: 'Lëtzebuergesch', flag: '🇱🇺' },
  { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
  { code: 'mg', name: 'Malagasy', flag: '🇲🇬' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'mt', name: 'Malti', flag: '🇲🇹' },
  { code: 'mi', name: 'Māori', flag: '🇳🇿' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'mn', name: 'Монгол', flag: '🇲🇳' },
  { code: 'my', name: 'မြန်မာ', flag: '🇲🇲' },
  { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'ps', name: 'پښتو', flag: '🇦🇫' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'sm', name: 'Gagana Sāmoa', flag: '🇼🇸' },
  { code: 'gd', name: 'Gàidhlig', flag: '🌐' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸' },
  { code: 'st', name: 'Sesotho', flag: '🇱🇸' },
  { code: 'sn', name: 'ChiShona', flag: '🇿🇼' },
  { code: 'sd', name: 'سنڌي', flag: '🇵🇰' },
  { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'so', name: 'Soomaali', flag: '🇸🇴' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'su', name: 'Basa Sunda', flag: '🇮🇩' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'tg', name: 'Тоҷикӣ', flag: '🇹🇯' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'tt', name: 'Татар', flag: '🌐' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'tk', name: 'Türkmençe', flag: '🇹🇲' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'ug', name: 'ئۇيغۇرچە', flag: '🌐' },
  { code: 'uz', name: 'Oʻzbek', flag: '🇺🇿' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'cy', name: 'Cymraeg', flag: '🏴' },
  { code: 'xh', name: 'isiXhosa', flag: '🇿🇦' },
  { code: 'yi', name: 'ייִדיש', flag: '🌐' },
  { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
  { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
];

export function renderHeader() {
  // renderHeader() runs first on every page (public site, admin console,
  // customer portal), so gating here is the one place a site-wide
  // maintenance screen can be toggled without editing every page. Flip
  // MAINTENANCE_MODE back to false in js/config/maintenance.js to restore
  // the real site — nothing else changes.
  if (MAINTENANCE_MODE) {
    document.body.innerHTML = `
      <div class="maintenance-screen">
        <div class="maintenance-content">
          <div class="maintenance-icon"><i class="fas fa-tools"></i></div>
          <h1>We'll be right back</h1>
          <p>Swiflora Logistics is currently undergoing scheduled maintenance. Please check back shortly.</p>
          <a href="mailto:support@swifloralogistics.com" class="btn btn-line">Contact Support</a>
        </div>
      </div>
    `;
    return;
  }

  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;

  const currentUser = authService.getCurrentUser();
  const currentPath = window.location.pathname;
  const siteRootUrl = new URL('../../', import.meta.url);
  const buildSiteHref = (path) => new URL(path, siteRootUrl).pathname;

  headerContainer.innerHTML = `
    <nav class="navbar">
      <div class="container nav-container">
        <a href="${buildSiteHref('index.html')}" class="brand-logo">
          <div class="brand-icon"><img src="${buildSiteHref('favicon.svg')}" alt="Swiflora Logistics"></div>
          SWIFLORA<span>LOGISTICS</span>
        </a>

        <ul class="nav-menu" id="navMenu">
          <li><a href="${buildSiteHref('index.html')}" class="nav-link ${currentPath.includes('index.html') || currentPath === '/' ? 'active' : ''}">Home</a></li>
          <li><a href="${buildSiteHref('about.html')}" class="nav-link ${currentPath.includes('about.html') ? 'active' : ''}">About Us</a></li>
          <li><a href="${buildSiteHref('services.html')}" class="nav-link ${currentPath.includes('services.html') ? 'active' : ''}">Services</a></li>
          <li><a href="${buildSiteHref('pricing.html')}" class="nav-link ${currentPath.includes('pricing.html') ? 'active' : ''}">Pricing</a></li>
          <li><a href="${buildSiteHref('tracking.html')}" class="nav-link ${currentPath.includes('tracking.html') ? 'active' : ''}">Track Package</a></li>
          <li><a href="${buildSiteHref('quote.html')}" class="nav-link ${currentPath.includes('quote.html') ? 'active' : ''}">Get a Quote</a></li>
          <li><a href="${buildSiteHref('faq.html')}" class="nav-link ${currentPath.includes('faq.html') ? 'active' : ''}">FAQ</a></li>
          <li><a href="${buildSiteHref('blog.html')}" class="nav-link ${currentPath.includes('blog.html') ? 'active' : ''}">Blog</a></li>
          <li><a href="${buildSiteHref('contact.html')}" class="nav-link ${currentPath.includes('contact.html') ? 'active' : ''}">Contact</a></li>
        </ul>

        <div class="nav-actions">
          <!-- Language Selector -->
          <div class="lang-selector-wrap" id="langSelectorWrap">
            <button class="theme-toggle-btn" id="langToggleBtn" title="Translate Page" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-globe"></i>
            </button>
            <div class="lang-dropdown-menu" id="langDropdownMenu" role="menu">
              <div class="lang-search-wrap">
                <i class="fas fa-search"></i>
                <input type="text" id="langSearchInput" placeholder="Search ${SITE_LANGUAGES.length} languages..." autocomplete="off">
              </div>
              <div class="lang-options-grid" id="langOptionsGrid">
                ${SITE_LANGUAGES.map(l => `
                  <button type="button" class="lang-option${l.code === 'en' ? ' active' : ''}" data-lang="${l.code}" data-search="${l.name.toLowerCase()} ${l.code}" role="menuitem">
                    <span class="lang-flag">${l.flag}</span><span>${l.name}</span>
                  </button>
                `).join('')}
                <div class="lang-no-results" id="langNoResults" hidden>No languages match your search.</div>
              </div>
            </div>
            <!-- Google Translate needs this element in the DOM to build its
                 language <select>, but the UI above drives it — see .goog-te-hidden -->
            <div id="google_translate_element" class="goog-te-hidden"></div>
          </div>

          <button class="theme-toggle-btn" id="themeToggleBtn" title="Toggle Light/Dark Theme">
            <i class="fas fa-moon"></i>
          </button>

          <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu" aria-expanded="false">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  `;

  // Inject Google Translate script once
  if (!document.getElementById('google-translate-script')) {
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          // No includedLanguages cap — Google's full supported-language set
          // backs the widget so every option in SITE_LANGUAGES resolves.
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };
    const gScript = document.createElement('script');
    gScript.id = 'google-translate-script';
    gScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    gScript.async = true;
    document.head.appendChild(gScript);
  }

  // Switches the page language by driving Google Translate's hidden <select>.
  function setSiteLanguage(langCode) {
    const combo = document.querySelector('#google_translate_element select.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    } else {
      // Widget not ready yet (translate script still loading) — fall back
      // to the cookie Google Translate itself reads on page load.
      document.cookie = `googtrans=/en/${langCode}; path=/`;
      window.location.reload();
    }
  }

  // Language Dropdown Listener
  const langBtn = document.getElementById('langToggleBtn');
  const langMenu = document.getElementById('langDropdownMenu');
  const langSearchInput = document.getElementById('langSearchInput');
  const langNoResults = document.getElementById('langNoResults');
  const langOptions = langMenu ? Array.from(langMenu.querySelectorAll('.lang-option')) : [];

  const filterLangOptions = (query) => {
    const q = query.trim().toLowerCase();
    let visibleCount = 0;
    langOptions.forEach(opt => {
      const matches = !q || opt.getAttribute('data-search').includes(q);
      opt.hidden = !matches;
      if (matches) visibleCount++;
    });
    if (langNoResults) langNoResults.hidden = visibleCount > 0;
  };

  if (langBtn && langMenu) {
    const closeLangMenu = () => {
      langMenu.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    };
    langBtn.onclick = (e) => {
      e.stopPropagation();
      const isOpen = langMenu.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen && langSearchInput) {
        langSearchInput.value = '';
        filterLangOptions('');
        setTimeout(() => langSearchInput.focus(), 0);
      }
    };
    // Keep the menu open while interacting with the search box or scrolling the list.
    langMenu.addEventListener('click', (e) => e.stopPropagation());
    if (langSearchInput) {
      langSearchInput.addEventListener('input', () => filterLangOptions(langSearchInput.value));
      langSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLangMenu();
      });
    }
    langOptions.forEach(opt => {
      opt.onclick = (e) => {
        e.stopPropagation();
        const code = opt.getAttribute('data-lang');
        langOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        setSiteLanguage(code);
        closeLangMenu();
      };
    });
    document.addEventListener('click', closeLangMenu);
  }

  // Theme Toggle Listener
  const themeBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('swf_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeBtn.querySelector('i').className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

  themeBtn.onclick = () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('swf_theme', nextTheme);
    themeBtn.querySelector('i').className = nextTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  };

  // Mobile Menu Drawer Listener
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  const closeMenu = () => {
    navMenu.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.classList.remove('nav-open');
  };

  const openMenu = () => {
    navMenu.classList.add('open');
    mobileBtn.setAttribute('aria-expanded', 'true');
    mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
    document.body.classList.add('nav-open');
  };

  mobileBtn.onclick = () => {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  navMenu.querySelectorAll('a').forEach(link => {
    link.onclick = () => closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !mobileBtn.contains(event.target)) {
      closeMenu();
    }
  });

  renderWhatsAppButton();
}

// Floating WhatsApp chat button — fixed to the viewport so it stays visible
// while scrolling, present on every page that renders the header.
const WHATSAPP_NUMBER = '13645472182'; // +1 (364) 547-2182
function renderWhatsAppButton() {
  if (document.getElementById('whatsappFloatBtn')) return;

  const btn = document.createElement('a');
  btn.id = 'whatsappFloatBtn';
  btn.className = 'whatsapp-float-btn';
  btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Swiflora Logistics, I have a question about a shipment.')}`;
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'Chat with Swiflora Logistics on WhatsApp');
  btn.title = 'Chat with us on WhatsApp';
  btn.innerHTML = '<i class="fab fa-whatsapp"></i>';
  document.body.appendChild(btn);
}
