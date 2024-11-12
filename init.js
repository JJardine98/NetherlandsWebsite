// init.js
document.addEventListener('DOMContentLoaded', function() {
    // Set default language from localStorage or fallback to 'en'
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Initialize i18next with the translations
    i18next.init({
        ...translations,
        lng: currentLang, // Use stored language
    }, function(err, t) {
        if (err) return console.error('i18next initialization error:', err);
        
        // Initial content update
        updateContent();
        
        // Initial button state
        updateButtonStates(currentLang);
    });

    // Add click handlers to language buttons
    document.querySelectorAll('.translate-btn').forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
});

// Function to update content
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = i18next.t(key);
    });
}

// Function to update button states
function updateButtonStates(currentLang) {
    document.querySelectorAll('.translate-btn').forEach(button => {
        if (button.getAttribute('data-lang') === currentLang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Function to change language
function changeLanguage(lang) {
    i18next.changeLanguage(lang, (err) => {
        if (err) return console.error('Language change error:', err);
        
        // Store language preference
        localStorage.setItem('language', lang);
        
        // Update content
        updateContent();
        
        // Update button states
        updateButtonStates(lang);
        
        // Dispatch event for other components that might need to know about language change
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    });
}