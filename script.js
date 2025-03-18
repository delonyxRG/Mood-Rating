const moodSlider = document.getElementById('moodSlider');
const ratingValue = document.getElementById('ratingValue');
const emojiDisplay = document.getElementById('emojiDisplay');
const saveButton = document.getElementById('saveButton');
const savedMessage = document.getElementById('savedMessage');
const phoneInput = document.getElementById('phoneInput');

const emojis = {
    1: '☹️', // Sangat Sedih
    2: '🙁', // Sedih
    3: '😐', // Netral
    4: '😊', // Bahagia
    5: '🤩'  // Sangat Bahagia
};

// Load saved rating from localStorage
const savedRating = localStorage.getItem('moodRating');
if (savedRating) {
    moodSlider.value = savedRating;
    ratingValue.textContent = savedRating;
    emojiDisplay.textContent = emojis[savedRating];
}

// Update display when slider is moved
moodSlider.addEventListener('input', function() {
    ratingValue.textContent = moodSlider.value;
    emojiDisplay.textContent = emojis[moodSlider.value];
    emojiDisplay.classList.add('animate');
    setTimeout(() => {
        emojiDisplay.classList.remove('animate');
    }, 300);
});

// Add +62 prefix when user starts typing
phoneInput.addEventListener('focus', function() {
    if (phoneInput.value === '') {
        phoneInput.value = '+62';
    }
});

phoneInput.addEventListener('input', function() {
    if (!phoneInput.value.startsWith('+62')) {
        phoneInput.value = '+62' + phoneInput.value.replace(/^\+62/, '');
    }
});

function sendRatingToWhatsApp(phone, rating) {
    const emoji = emojis[rating];
    const message = `Halo, terima kasih telah memberikan rating: ${rating} ${emoji}`;
    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;

    console.log("Pesan:", message);
    console.log("URL:", url);
    location.href = url;
}

// Save rating and send to WhatsApp
saveButton.addEventListener('click', function() {
    const rating = moodSlider.value;
    const phone = phoneInput.value;

    if (phone) {
        // Save rating to localStorage
        localStorage.setItem('moodRating', rating);

        // Send rating to WhatsApp
        sendRatingToWhatsApp(phone, rating);
        
        // Show saved message with animation
        savedMessage.textContent = `⩥Rating ${rating} ${emojis[rating]} akan dikirim ke WhatsApp!`;
        savedMessage.style.animation = 'fadeOut 5s steps(30, end) forwards';
        
    } else {
        alert('Masukkan Nomor WA Anda!');
    }
});