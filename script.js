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

function showSuccessMessage(data) {
    feedbackDiv.innerHTML = `
        <div class="success-message">
            ✅ Wiadomość została wysłana (symulacja)!<br>
            <strong>Odebrane dane:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}<br>
            📧 ${escapeHtml(data.email)}<br>
            💬 ${escapeHtml(data.message)}
        </div>
    `;
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

// ============ KONFIGURACJA SUPABASE ============
const SUPABASE_URL = 'https://nbkuiuzhjcnmqnkpynlp.supabase.co';  // PODMIEŃ!
const SUPABASE_ANON_KEY = 'sb_publishable_Dbjy-SOH2EdnPdlyi2r_Gw_e-8K9lNy';           // PODMIEŃ!

// ============ ZAPIS DANYCH DO SUPABASE ============
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
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();
}

// ============ POBIERZ WSZYSTKIE WIADOMOŚCI (do historii) ============
async function fetchAllMessages() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/messages?select=*&order=created_at.desc`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
    });
    
    if (!response.ok) throw new Error('Nie udało się pobrać wiadomości');
    return await response.json();
}

// ============ OBSŁUGA WYSYŁANIA FORMULARZA (z zapisem do Supabase) ============
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

    // Blokada przycisku podczas wysyłania
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Wysyłanie do Supabase...';
    submitBtn.disabled = true;

    try {
        // Zapis do Supabase
        const savedData = await saveToBackend(formData);
        
        // ✅ SUKCES - wyświetl komunikat
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
        
        // ==================================================
        // 🔄 TUTAJ WSTAW ODSWieŻANIE LISTY WIADOMOŚCI
        // ==================================================
        await displayAllMessages();  // Funkcja pokazująca historię z Supabase
        
        // Wyczyść formularz po sukcesie
        form.reset();
        clearAllErrorsAndFeedback();
        
    } catch (error) {
        console.error('Błąd zapisu do Supabase:', error);
        feedbackDiv.innerHTML = `
            <div style="background:#fee2e2; border-left:4px solid #dc2626; padding:0.8rem; border-radius: 1rem; margin-top: 1rem; color:#991b1b;">
                ❌ <strong>Błąd połączenia z Supabase!</strong><br>
                ${error.message}<br>
                Sprawdź konsolę (F12) i konfigurację (URL/klucz).
            </div>
        `;
    } finally {
        // Odblokowanie przycisku
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
}

// ============ WYŚWIETLENIE HISTORII WIADOMOŚCI Z SUPABASE ============
async function displayAllMessages() {
    try {
        const messages = await fetchAllMessages();  // Używa funkcji fetchAllMessages
        
        if (!messages || messages.length === 0) {
            // Ukryj lub wyczyść sekcję, jeśli brak danych
            const historySection = document.getElementById('messagesHistory');
            if (historySection) historySection.style.display = 'none';
            return;
        }
        
        // Przygotuj sekcję historii
        let historySection = document.getElementById('messagesHistory');
        if (!historySection) {
            historySection = document.createElement('div');
            historySection.id = 'messagesHistory';
            historySection.style.cssText = 'margin-top: 20px; background: rgba(0,0,0,0.5); border-radius: 12px; padding: 15px;';
            const formCard = document.querySelector('.form-card');
            if (formCard) formCard.appendChild(historySection);
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

// Załaduj historię przy starcie strony (jeśli serwer działa)
document.addEventListener('DOMContentLoaded', () => {
    displayAllMessages().catch(() => {});
});

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

form.addEventListener('submit', onSubmitHandler);
attachLiveValidation();
clearAllErrorsAndFeedback();

// ============ DYNAMICZNE ŁADOWANIE DANYCH Z JSON (z fallbackiem) ============
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
        html += `
            <li>
                <h3>Niektóre projekty z korzystaniem C#:</h3>
                <ul>
        `;
        cSharpProjects.forEach(proj => {
            const linkHtml = proj.link ? `<u><a href="${proj.link}" target="_blank">Kod programu</a></u>` : '';
            html += `
                <li>
                    <i>${proj.nazwa}</i> ${linkHtml}
                    <p><i>O projekcie:</i> ${proj.opis}</p>
                </li>
            `;
        });
        html += `</ul></li>`;
    }

    if (sqlProjects.length > 0) {
        html += `
            <li>
                <h3><b>Jeden z projektów z korzystaniem SQL:</b></h3>
                <ul>
        `;
        sqlProjects.forEach(proj => {
            html += `
                <li>
                    <i>${proj.nazwa}</i>
                    <p><i>O projekcie:</i> ${proj.opis}</p>
                </li>
            `;
        });
        html += `</ul></li>`;
    }

    if (htmlProjects.length > 0) {
        html += `
            <li>
                <h3><b>Jeden z projektów z korzystaniem HTML:</b></h3>
                <ul>
        `;
        htmlProjects.forEach(proj => {
            const linkHtml = proj.link ? `<u><a href="${proj.link}" target="_blank">Link do strony</a></u>` : '';
            html += `
                <li>
                    <i>${proj.nazwa}</i> ${linkHtml}
                    <p><i>O projekcie:</i> ${proj.opis}</p>
                </li>
            `;
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
            <div>
                <ol>
                    <li><b>Języki (web-)programowania: </b> ${jezyki.join(', ')}</li>
                    <li><b>Narzędzia:</b> ${narzedzia.join(', ')}</li>
                    <li><b>Język(i) obcy(-e):</b> ${jezykiObce}</li>
                    <li><b>Umiejętności miękkie:</b> ${miekkie.join(', ')}</li>
                </ol>
            </div>
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

// Funkcja dla sekcji Umiejętności
var isUmShown = false;

function Um() {
    const um = document.getElementById('Umiejętności');
    const u = document.getElementById('u');
    if (um) {
        if (isUmShown == false) {
            um.style.display = 'block';
            um.style.opacity = '1';
            um.style.height = 'auto';
            um.style.transition = 'all 0.4s ease';
            isUmShown = true;
            u.textContent = 'Ukryj sekcję';
            console.log('[' + new Date().toLocaleString() + '] sekcja Umiejętności została pokazana');
        } else {
            um.style.display = 'none';
            um.style.opacity = '0';
            um.style.height = '0';
            um.style.transition = 'all 0.4s ease';
            isUmShown = false;
            u.textContent = 'Pokaż sekcję';
            console.log('[' + new Date().toLocaleString() + '] sekcja Umiejętności została ukryta');
        }
    }
}

// Funkcja dla sekcji Projekty
var isProjShown = false;

function Proj() {
    const proj = document.getElementById('Projekty');
    const p = document.getElementById('p');
    if (proj) {
        if (isProjShown == false) {
            proj.style.display = 'block';
            proj.style.opacity = '1';
            proj.style.height = 'auto';
            proj.style.transition = 'all 0.4s ease';
            isProjShown = true;
            p.textContent = 'Ukryj sekcję';
            console.log('[' + new Date().toLocaleString() + '] sekcja Projektów została pokazana');
        } else {
            proj.style.display = 'none';
            proj.style.opacity = '0';
            proj.style.height = '0';
            proj.style.transition = 'all 0.4s ease';
            isProjShown = false;
            p.textContent = 'Pokaż sekcję';
            console.log('[' + new Date().toLocaleString() + '] sekcja Projektów została ukryta');
        }
    }
}

// Funkcja dla listy projektów
var isListOfProjectsShown = true;

function projekty() {
    const pokazSection = document.getElementById('PokazProjekty');
    const text = document.getElementById('O_projektach');
    if (pokazSection) {
        if (isListOfProjectsShown == true) {
            pokazSection.style.display = 'none';
            text.textContent = 'Pokaż listę projektów';
            isListOfProjectsShown = false;
            console.log('[' + new Date().toLocaleString() + '] lista projektów została ukryta');
        } else {
            pokazSection.style.display = 'block';
            text.textContent = 'Ukryj listę projektów';
            isListOfProjectsShown = true;
            console.log('[' + new Date().toLocaleString() + '] lista projektów została pokazana');
        }
    }
}

async function loadData() {
    appContainer.innerHTML = '<div style="padding: 2rem; text-align: center;">⏳ Ładowanie danych...</div>';

    try {
        // Próba załadowania z pliku JSON
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Nie można pobrać data.json`);
        }
        const data = await response.json();
        console.log('✅ Dane załadowane z pliku JSON:', data);
        renderPage(data);
    } catch (error) {
        console.warn('⚠️ Błąd ładowania data.json, używam danych domyślnych:', error.message);
        
        // Użycie danych domyślnych z fallbackiem
        appContainer.innerHTML = `
            <div style="background: #fef3c7; border-left: 5px solid #f59e0b; border-radius: 1rem; padding: 0.8rem 1.2rem; margin-bottom: 1rem; color: #78350f;">
                ⚠️ <strong>Uwaga:</strong> Nie udało się załadować pliku <code>data.json</code>. 
                Wyświetlam dane przykładowe. Aby wczytać własne dane:
                <ul style="margin: 0.5rem 0 0 1.5rem;">
                    <li>Uruchom stronę przez <strong>Live Server</strong> w VS Code</li>
                    <li>Lub umieść pliki na serwerze lokalnym (np. XAMPP, Python HTTP server)</li>
                    <li>Sprawdź czy plik <code>data.json</code> istnieje w tym samym folderze co <code>index.html</code></li>
                </ul>
            </div>
        `;
        // Renderowanie z domyślnymi danymi
        renderPage(DEFAULT_DATA);
        console.log('📦 Użyto domyślnych danych (fallback)');
    }
}

// Wywołanie ładowania danych
loadData();



// ========================
        // MODUŁ LOCAL STORAGE (lista zadań)
        // ========================
        (function() {
            // Klucz pod jakim dane są przechowywane w localStorage
            const STORAGE_KEY = 'user_todo_list';
            
            // Referencje do elementów DOM
            const todoInput = document.getElementById('todoInput');
            const addBtn = document.getElementById('addTodoBtn');
            const todoContainer = document.getElementById('todoListContainer');
            const storageInfo = document.getElementById('storageInfo');
            
            // ---------- Funkcje pomocnicze ----------
            // Pobieranie listy zadań z localStorage
            function getTasks() {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (!stored) {
                    return []; // brak zadań
                }
                try {
                    return JSON.parse(stored);
                } catch(e) {
                    console.error('Błąd parsowania JSON z localStorage', e);
                    return [];
                }
            }
            
            // Zapis listy zadań do localStorage
            function saveTasks(tasks) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
                // Dodatkowo: wyświetlenie przybliżonego rozmiaru (debug)
                const size = new Blob([JSON.stringify(tasks)]).size;
                if (storageInfo) {
                    storageInfo.innerHTML = `📦 Zapisanoh elementów: ${tasks.length} | ~${size} bajtów`;
                }
            }
            
            // Renderowanie listy zadań na stronie
            function renderTodoList() {
                const tasks = getTasks();
                if (!todoContainer) return;
                
                // Czyścimy kontener (oprócz ewentualnych statycznych wiadomości)
                todoContainer.innerHTML = '';
                
                if (tasks.length === 0) {
                    todoContainer.innerHTML = '<li class="empty-message">📭 Brak zadań. Dodaj pierwsze zadanie!</li>';
                    if(storageInfo) storageInfo.innerHTML = `📦 Brak danych | 0 bajtów`;
                    return;
                }
                
                // Dla każdego zadania tworzymy element li
                tasks.forEach((task, index) => {
                    const li = document.createElement('li');
                    
                    const spanText = document.createElement('span');
                    spanText.className = 'todo-text';
                    spanText.textContent = task.text;   // text zadania
                    
                    const delBtn = document.createElement('button');
                    delBtn.textContent = '🗑 Usuń';
                    delBtn.className = 'delete-btn';
                    // Obsługa usuwania – przekazujemy index zadania
                    delBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        deleteTaskByIndex(index);
                    });
                    
                    li.appendChild(spanText);
                    li.appendChild(delBtn);
                    todoContainer.appendChild(li);
                });
                
                // Aktualizacja info o rozmiarze
                const raw = JSON.stringify(tasks);
                const size = new Blob([raw]).size;
                if(storageInfo) storageInfo.innerHTML = `📦 Zadania: ${tasks.length} | Zajętość: ~${size} bajtów`;
            }
            
            // Dodanie nowego zadania
            function addNewTask() {
                if (!todoInput) return;
                const rawText = todoInput.value.trim();
                if (rawText === "") {
                    alert("Proszę wpisać treść zadania!");
                    return;
                }
                
                const currentTasks = getTasks();
                // nowe zadanie - unikalne ID oparte na czasie (opcjonalnie) ale używamy indeksu, struktura: { id: Date.now(), text: ... }
                const newTask = {
                    id: Date.now(),
                    text: rawText
                };
                currentTasks.push(newTask);
                saveTasks(currentTasks);
                renderTodoList();
                // Czyszczenie pola input
                todoInput.value = "";
                // Fokus z powrotem
                todoInput.focus();
                console.log(`[LocalStorage] Dodano zadanie: "${rawText}"`);
            }
            
            // Usuwanie zadania po indeksie (licząc wg aktualnej tablicy)
            function deleteTaskByIndex(index) {
                const tasks = getTasks();
                if (index >= 0 && index < tasks.length) {
                    const removed = tasks.splice(index, 1);
                    saveTasks(tasks);
                    renderTodoList();
                    console.log(`[LocalStorage] Usunięto zadanie: "${removed[0]?.text}"`);
                } else {
                    console.warn("Nieprawidłowy indeks do usunięcia");
                }
            }
            
            // Obsługa przycisku dodawania
            if (addBtn) {
                addBtn.addEventListener('click', addNewTask);
            }
            // Dodanie obsługi klawisza Enter w polu tekstowym
            if (todoInput) {
                todoInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        addNewTask();
                    }
                });
            }
            
            // Inicjalizacja - odczyt i renderowanie przy starcie (po załadowaniu DOM)
            function initLocalStorage() {
                renderTodoList();
                // Sprawdzenie czy localStorage jest dostępne
                try {
                    const testKey = '__test_ls';
                    localStorage.setItem(testKey, 'ok');
                    localStorage.removeItem(testKey);
                    console.log("localStorage jest dostępny");
                } catch(e) {
                    console.warn("localStorage niedostępny!", e);
                    if(storageInfo) storageInfo.innerHTML = "⚠️ localStorage niedostępny w przeglądarce";
                }
            }
            
            // Wywołanie po pełnym załadowaniu DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initLocalStorage);
            } else {
                initLocalStorage();
            }
        })();
// Załaduj historię po załadowaniu strony (jeśli Supabase działa)
document.addEventListener('DOMContentLoaded', () => {
    displayAllMessages().catch(err => {
        console.log('Supabase niedostępny lub brak konfiguracji');
    });
});
