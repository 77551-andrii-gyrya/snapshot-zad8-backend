// ==================================================
// 🔧 KONFIGURACJA SUPABASE - TWOJE DANE
// ==================================================
const SUPABASE_URL = 'https://nbkuiuzhjcnmqnkpynlp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Dbjy-SOH2EdnPdlyi2r_Gw_e-8K9lNy';
// ==================================================

// ============ ZMIANA MOTYWU ============
var isHomeStyle = true;

function zstylu() {
    const link = document.getElementById('theme-style');
    if (isHomeStyle == true) {
        link.setAttribute('href', 'green.css');
        isHomeStyle = false;
    } else {
        link.setAttribute('href', 'red.css');
        isHomeStyle = true;
    }
    console.log('[' + new Date().toLocaleString() + '] motyw został zmieniony');
}

// ============ SEKCJA O MNIE ============
var isOMnieShown = false;

function oMnie() {
    const om = document.getElementById('O');
    const o = document.getElementById('om');
    if (isOMnieShown == false) {
        om.style.display = 'block';
        om.style.opacity = '1';
        om.style.height = 'auto';
        om.style.transition = 'all 0.4s ease';
        isOMnieShown = true;
        o.textContent = 'Ukryj sekcję';
        console.log('[' + new Date().toLocaleString() + '] sekcja została pokazana');
    } else {
        om.style.display = 'none';
        om.style.opacity = '0';
        om.style.height = '0';
        om.style.transition = 'all 0.4s ease';
        isOMnieShown = false;
        o.textContent = 'Pokaż sekcję';
        console.log('[' + new Date().toLocaleString() + '] sekcja została ukryta');
    }
}

// ============ SEKCJA EDUKACJA ============
var isEdShown = false;

function Ed() {
    const ed = document.getElementById('Edukacja');
    const e = document.getElementById('e');
    if (isEdShown == false) {
        ed.style.display = 'block';
        ed.style.opacity = '1';
        ed.style.height = 'auto';
        ed.style.transition = 'all 0.4s ease';
        isEdShown = true;
        e.textContent = 'Ukryj sekcję';
        console.log('[' + new Date().toLocaleString() + '] sekcja została pokazana');
    } else {
        ed.style.display = 'none';
        ed.style.opacity = '0';
        ed.style.height = '0';
        ed.style.transition = 'all 0.4s ease';
        isEdShown = false;
        e.textContent = 'Pokaż sekcję';
        console.log('[' + new Date().toLocaleString() + '] sekcja została ukryta');
    }
}

// ============ SEKCJA DOŚWIADCZENIE ============
var isDośShown = false;

function Doś() {
    const d = document.getElementById('d');
    const doś = document.getElementById('Doświadczenie');
    if (isDośShown == false) {
        doś.style.display = 'block';
        doś.style.opacity = '1';
        doś.style.height = 'auto';
        doś.style.transition = 'all 0.4s ease';
        isDośShown = true;
        d.textContent = 'Ukryj sekcję';
        console.log('[' + new Date().toLocaleString() + '] sekcja została pokazana');
    } else {
        doś.style.display = 'none';
        doś.style.opacity = '0';
        doś.style.height = '0';
        doś.style.transition = 'all 0.4s ease';
        isDośShown = false;
        d.textContent = 'Pokaż sekcję';
        console.log('[' + new Date().toLocaleString() + '] sekcja została ukryta');
    }
}

// ============ DANE DOMYŚLNE (gdy plik JSON jest niedostępny) ============
const DEFAULT_DATA = {
    "umiejetnosci": {
        "jezyki": ["C#", "HTML", "CSS", "SQL", "JavaScript"],
        "narzedzia": ["Visual Studio", "SQL Server Management Studio", "VS Code"],
        "jezyki_obce": "Angielski (B1+), Ukraiński (ojczysty), Polski (A2)",
        "miekkie": ["komunikatywność", "praca w zespole", "myślenie analityczne", "samodzielność"]
    },
    "projekty": [
        {
            "kategoria": "C#",
            "nazwa": "Analizator funkcji matematycznych",
            "link": "https://github.com/77551-andrii-gyrya/Analizator-funkcji-matematycznych",
            "opis": "Program, który analizuje funkcje matematyczne, oblicza ich wartości i rysuje wykresy."
        },
        {
            "kategoria": "C#",
            "nazwa": "Symulator Bankomatu i Automatu Vendingowego",
            "link": "https://github.com/77551-andrii-gyrya/Symulator-bankomatu-i-automatu-vendingowego",
            "opis": "Program symulujący działanie bankomatu i automatu vendingowego."
        },
        {
            "kategoria": "SQL",
            "nazwa": "Projektowanie i implementacja bazy danych dla sklepu internetowego",
            "link": null,
            "opis": "Projekt bazy danych dla sklepu internetowego – produkty, klienci, zamówienia."
        },
        {
            "kategoria": "HTML",
            "nazwa": "CV jako strona internetowa",
            "link": "https://77551-andrii-gyrya.github.io/zad1_cv/",
            "opis": "CV jako strona internetowa z umiejętnościami, doświadczeniem i kontaktem."
        }
    ]
};

// ============ WALIDACJA FORMULARZA ============
const form = document.getElementById('contactForm');
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const errorFirstName = document.getElementById('error-firstname');
const errorLastName = document.getElementById('error-lastname');
const errorEmail = document.getElementById('error-email');
const errorMessage = document.getElementById('error-message');

const feedbackDiv = document.getElementById('formFeedback');

function setFieldError(inputElement, errorContainer, errorText) {
    if (errorText) {
        errorContainer.textContent = errorText;
        errorContainer.style.display = 'flex';
        inputElement.classList.add('error-input');
    } else {
        errorContainer.style.display = 'none';
        errorContainer.textContent = '';
        inputElement.classList.remove('error-input');
    }
}

function containsDigits(str) {
    return /\d/.test(str);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!email || typeof email !== 'string') return false;
    return emailRegex.test(email.trim());
}

function isNotEmpty(value) {
    return value && typeof value === 'string' && value.trim().length > 0;
}

function validateForm() {
    const firstNameVal = firstNameInput.value;
    const lastNameVal = lastNameInput.value;
    const emailVal = emailInput.value;
    const messageVal = messageInput.value;

    let errors = {
        firstName: null,
        lastName: null,
        email: null,
        message: null
    };

    if (!isNotEmpty(firstNameVal)) {
        errors.firstName = "Imię jest wymagane.";
    } else if (containsDigits(firstNameVal)) {
        errors.firstName = "Imię nie może zawierać cyfr.";
    }

    if (!isNotEmpty(lastNameVal)) {
        errors.lastName = "Nazwisko jest wymagane.";
    } else if (containsDigits(lastNameVal)) {
        errors.lastName = "Nazwisko nie może zawierać cyfr.";
    }

    if (!isNotEmpty(emailVal)) {
        errors.email = "Adres e-mail jest wymagany.";
    } else if (!isValidEmail(emailVal)) {
        errors.email = "Podaj poprawny adres e-mail (np. imie@domena.pl).";
    }

    if (!isNotEmpty(messageVal)) {
        errors.message = "Treść wiadomości jest wymagana.";
    }

    return errors;
}

function displayErrors(errors) {
    setFieldError(firstNameInput, errorFirstName, errors.firstName);
    setFieldError(lastNameInput, errorLastName, errors.lastName);
    setFieldError(emailInput, errorEmail, errors.email);
    setFieldError(messageInput, errorMessage, errors.message);
}

function clearAllErrorsAndFeedback() {
    setFieldError(firstNameInput, errorFirstName, null);
    setFieldError(lastNameInput, errorLastName, null);
    setFieldError(emailInput, errorEmail, null);
    setFieldError(messageInput, errorMessage, null);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function resetFeedback() {
    feedbackDiv.innerHTML = '';
}

function validateFieldOnBlur(fieldName) {
    let errors = validateForm();
    switch (fieldName) {
        case 'firstname':
            setFieldError(firstNameInput, errorFirstName, errors.firstName);
            break;
        case 'lastname':
            setFieldError(lastNameInput, errorLastName, errors.lastName);
            break;
        case 'email':
            setFieldError(emailInput, errorEmail, errors.email);
            break;
        case 'message':
            setFieldError(messageInput, errorMessage, errors.message);
            break;
    }
}

function attachLiveValidation() {
    firstNameInput.addEventListener('blur', () => validateFieldOnBlur('firstname'));
    lastNameInput.addEventListener('blur', () => validateFieldOnBlur('lastname'));
    emailInput.addEventListener('blur', () => validateFieldOnBlur('email'));
    messageInput.addEventListener('blur', () => validateFieldOnBlur('message'));

    firstNameInput.addEventListener('input', () => {
        const err = validateForm().firstName;
        if (!err) setFieldError(firstNameInput, errorFirstName, null);
        resetFeedback();
    });
    lastNameInput.addEventListener('input', () => {
        const err = validateForm().lastName;
        if (!err) setFieldError(lastNameInput, errorLastName, null);
        resetFeedback();
    });
    emailInput.addEventListener('input', () => {
        const err = validateForm().email;
        if (!err) setFieldError(emailInput, errorEmail, null);
        resetFeedback();
    });
    messageInput.addEventListener('input', () => {
        const err = validateForm().message;
        if (!err) setFieldError(messageInput, errorMessage, null);
        resetFeedback();
    });
}

// ============ FUNKCJE DO KOMUNIKACJI Z SUPABASE ============
async function fetchAllMessages() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/messages?select=*&order=created_at.desc`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
    });
    if (!response.ok) throw new Error('Nie udało się pobrać wiadomości');
    
    const text = await response.text();
    if (!text || !text.trim()) return [];
    return JSON.parse(text);
}

async function displayAllMessages() {
    try {
        const messages = await fetchAllMessages();
        let historySection = document.getElementById('messagesHistory');
        if (!historySection) {
            historySection = document.createElement('div');
            historySection.id = 'messagesHistory';
            historySection.style.cssText = 'margin-top: 20px; background: rgba(0,0,0,0.5); border-radius: 12px; padding: 15px;';
            const formCard = document.querySelector('.form-card');
            if (formCard) formCard.appendChild(historySection);
        }
        if (!messages || messages.length === 0) {
            historySection.style.display = 'none';
            return;
        }
        historySection.style.display = 'block';
        historySection.innerHTML = `
            <h3>📋 Historia zapisanych wiadomości (Supabase - PostgreSQL)</h3>
            <ul style="max-height: 250px; overflow-y: auto; padding-left: 20px;">
                ${messages.map(msg => `
                    <li style="margin: 10px 0; padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.2);">
                        <strong>${escapeHtml(msg.first_name)} ${escapeHtml(msg.last_name)}</strong> 
                        (${escapeHtml(msg.email)})<br>
                        <small>📅 ${new Date(msg.created_at).toLocaleString()}</small><br>
                        <em>${escapeHtml(msg.message)}</em>
                    </li>
                `).join('')}
            </ul>
            <small>📁 Dane przechowywane w chmurze Supabase (PostgreSQL)</small>
        `;
    } catch (error) {
        console.warn('Nie można wyświetlić historii:', error);
    }
}

async function saveToBackend(formData) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            message: formData.message
        })
    });

    if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } catch(e) {}
        throw new Error(errorMessage);
    }
    
    try {
        const text = await response.text();
        if (text && text.trim()) {
            return JSON.parse(text);
        }
        return { success: true, message: "Dodano wiersz" };
    } catch(e) {
        return { success: true, message: "Dodano wiersz" };
    }
}

// ============ OBSŁUGA WYSYŁANIA FORMULARZA ============
async function onSubmitHandler(event) {
    event.preventDefault();
    resetFeedback();
    clearAllErrorsAndFeedback();

    const errors = validateForm();
    const hasErrors = Object.values(errors).some(err => err !== null);

    if (hasErrors) {
        displayErrors(errors);
        feedbackDiv.innerHTML = `<div style="background:#fee2e2; border-left:4px solid #e53e3e; padding:0.8rem; border-radius: 1rem; margin-top: 1rem; color:#9b2c2c;">
                                    ⚠️ Formularz zawiera błędy. Popraw zaznaczone pola.
                                  </div>`;
        const firstErrorField = document.querySelector('.error-input');
        if (firstErrorField) firstErrorField.focus();
        return;
    }

    const formData = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
    };

    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Wysyłanie do Supabase...';
    submitBtn.disabled = true;

    try {
        const savedData = await saveToBackend(formData);
        
        feedbackDiv.innerHTML = `
            <div class="success-message" style="background: #1f3b2c; border-left: 5px solid #4ade80;">
                ✅ <strong>Wiadomość została zapisana w Supabase!</strong><br>
                📨 Otrzymano: ${escapeHtml(formData.firstName)} ${escapeHtml(formData.lastName)}<br>
                📧 ${escapeHtml(formData.email)}<br>
                💬 ${escapeHtml(formData.message)}<br>
                <hr style="margin: 8px 0; border-color: #2e5a3a;">
                🗄️ <strong>Gdzie trafiły dane?</strong> Zostały zapisane w bazie PostgreSQL (Supabase).<br>
                🆔 ID w bazie: ${savedData[0]?.id || 'ok'} | 📅 Data: ${new Date().toLocaleString()}
            </div>
        `;
        
        await displayAllMessages();
        form.reset();
        clearAllErrorsAndFeedback();
        
    } catch (error) {
        console.error('Błąd zapisu do Supabase:', error);
        feedbackDiv.innerHTML = `
            <div style="background:#fee2e2; border-left:4px solid #dc2626; padding:0.8rem; border-radius: 1rem; margin-top: 1rem; color:#991b1b;">
                ❌ <strong>Błąd połączenia z Supabase!</strong><br>
                ${error.message}<br>
                Sprawdź konsolę (F12) i upewnij się, że tabela 'messages' istnieje w Supabase.
            </div>
        `;
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
}

// ============ DYNAMICZNE ŁADOWANIE DANYCH Z JSON ============
const appContainer = document.getElementById('app');

function generateProjectsList(projekty) {
    if (!projekty || projekty.length === 0) {
        return '<p>Brak projektów do wyświetlenia</p>';
    }

    const cSharpProjects = projekty.filter(p => p.kategoria === 'C#');
    const sqlProjects = projekty.filter(p => p.kategoria === 'SQL');
    const htmlProjects = projekty.filter(p => p.kategoria === 'HTML');

    let html = '<ol>';

    if (cSharpProjects.length > 0) {
        html += `<li><h3>Niektóre projekty z korzystaniem C#:</h3><ul>`;
        cSharpProjects.forEach(proj => {
            const linkHtml = proj.link ? `<u><a href="${proj.link}" target="_blank">Kod programu</a></u>` : '';
            html += `<li><i>${proj.nazwa}</i> ${linkHtml}<p><i>O projekcie:</i> ${proj.opis}</p></li>`;
        });
        html += `</ul></li>`;
    }

    if (sqlProjects.length > 0) {
        html += `<li><h3><b>Jeden z projektów z korzystaniem SQL:</b></h3><ul>`;
        sqlProjects.forEach(proj => {
            html += `<li><i>${proj.nazwa}</i><p><i>O projekcie:</i> ${proj.opis}</p></li>`;
        });
        html += `</ul></li>`;
    }

    if (htmlProjects.length > 0) {
        html += `<li><h3><b>Jeden z projektów z korzystaniem HTML:</b></h3><ul>`;
        htmlProjects.forEach(proj => {
            const linkHtml = proj.link ? `<u><a href="${proj.link}" target="_blank">Link do strony</a></u>` : '';
            html += `<li><i>${proj.nazwa}</i> ${linkHtml}<p><i>O projekcie:</i> ${proj.opis}</p></li>`;
        });
        html += `</ul></li>`;
    }

    html += '</ol>';
    return html;
}

function renderPage(data) {
    const jezyki = data?.umiejetnosci?.jezyki || [];
    const narzedzia = data?.umiejetnosci?.narzedzia || [];
    const jezykiObce = data?.umiejetnosci?.jezyki_obce || "Brak danych";
    const miekkie = data?.umiejetnosci?.miekkie || [];
    const projekty = data?.projekty || [];

    appContainer.innerHTML = `
        <h2>Umiejętności <button id="u" onclick="Um()">Pokaż sekcję</button></h2>
        <section id="Umiejętności" style="display: none;">
            <div><ol>
                <li><b>Języki (web-)programowania: </b> ${jezyki.join(', ')}</li>
                <li><b>Narzędzia:</b> ${narzedzia.join(', ')}</li>
                <li><b>Język(i) obcy(-e):</b> ${jezykiObce}</li>
                <li><b>Umiejętności miękkie:</b> ${miekkie.join(', ')}</li>
            </ol></div>
        </section>
        <br/>
        <h2>Projekty <button id="p" onclick="Proj()">Pokaż sekcję</button></h2>
        <section id="Projekty" style="display: none;">
            <p>W przeszłym roku robiłem różne projekty z korzystaniem C#, HTML i SQL</p>
            <button id="O_projektach" onclick="projekty()">Pokaż listę projektów</button>
            <section id="PokazProjekty" style="opacity: 1;">
                ${generateProjectsList(projekty)}
            </section>
        </section>
    `;
}

var isUmShown = false;
function Um() {
    const um = document.getElementById('Umiejętności');
    const u = document.getElementById('u');
    if (um) {
        if (isUmShown == false) {
            um.style.display = 'block';
            um.style.opacity = '1';
            um.style.height = 'auto';
            isUmShown = true;
            u.textContent = 'Ukryj sekcję';
        } else {
            um.style.display = 'none';
            um.style.opacity = '0';
            um.style.height = '0';
            isUmShown = false;
            u.textContent = 'Pokaż sekcję';
        }
    }
}

var isProjShown = false;
function Proj() {
    const proj = document.getElementById('Projekty');
    const p = document.getElementById('p');
    if (proj) {
        if (isProjShown == false) {
            proj.style.display = 'block';
            proj.style.opacity = '1';
            proj.style.height = 'auto';
            isProjShown = true;
            p.textContent = 'Ukryj sekcję';
        } else {
            proj.style.display = 'none';
            proj.style.opacity = '0';
            proj.style.height = '0';
            isProjShown = false;
            p.textContent = 'Pokaż sekcję';
        }
    }
}

var isListOfProjectsShown = true;
function projekty() {
    const pokazSection = document.getElementById('PokazProjekty');
    const text = document.getElementById('O_projektach');
    if (pokazSection) {
        if (isListOfProjectsShown == true) {
            pokazSection.style.display = 'none';
            text.textContent = 'Pokaż listę projektów';
            isListOfProjectsShown = false;
        } else {
            pokazSection.style.display = 'block';
            text.textContent = 'Ukryj listę projektów';
            isListOfProjectsShown = true;
        }
    }
}

async function loadData() {
    appContainer.innerHTML = '<div style="padding: 2rem; text-align: center;">⏳ Ładowanie danych...</div>';
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('✅ Dane załadowane z pliku JSON:', data);
        renderPage(data);
    } catch (error) {
        console.warn('⚠️ Błąd ładowania data.json, używam danych domyślnych');
        appContainer.innerHTML = `<div style="background: #fef3c7; border-left: 5px solid #f59e0b; border-radius: 1rem; padding: 0.8rem; margin-bottom: 1rem;">
            ⚠️ Nie udało się załadować data.json. Wyświetlam dane przykładowe.
        </div>`;
        renderPage(DEFAULT_DATA);
    }
}

// ============ INICJALIZACJA (NA KOŃCU!) ============
form.addEventListener('submit', onSubmitHandler);
attachLiveValidation();
clearAllErrorsAndFeedback();
loadData();

// To jest bezpieczne – funkcja displayAllMessages istnieje teraz przed wywołaniem
document.addEventListener('DOMContentLoaded', () => {
    displayAllMessages().catch(err => console.log('Supabase inicjalizacja:', err));
});
