const APP_ID = '390175e2cdd909304473b783f4a7be08';
const DEFAULT_VALUE = '--'
const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');

searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
    .then(async res => {
        const data = await res.json();
        console.log('[Search Input]', data);
        cityName.innerHTML = data.name || DEFAULT_VALUE;
        weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
        weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;
        sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
    });
});

// chat bot

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
recognition.lang = 'vi-VI';
recognition.continuous = false;

const microphone = document.querySelector('.microphone');
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const speak = (text) => {
    if (synth.speaking) {
        console.error('Busy.Speaking...');
        return;
    }

    const utter = new SpeechSynthesisUtterance(text);//tạo ra một đối tượng để nói

    

    utter.onend = () => {//khi nói xong
        console.log('SpeechSynthesisUtterance.onend');//log ra màn hình
    }
    utter.onerror = (err) => {//khi lỗi
        console.error('SpeechSynthesisUtterance.onerror', err);//log ra màn hình
    }

    synth.speak(utter);//nói
};

const handleVoice = (text) => {
    console.log('text', text);
    // "thời tiết tại Đà Nẵng" => ["thời tiết tại", "Đà Nẵng"]
    const handledText = text.toLowerCase();//chuyển về chữ thường
    if (handledText.includes('thời tiết tại')) {
        const location = handledText.split('tại')[1].trim();//cắt chuỗi

        console.log('location', location);//lấy tên thành phố
        searchInput.value = location;//gán giá trị cho ô input
        const changeEvent = new Event('change');//tạo sự kiện change
        searchInput.dispatchEvent(changeEvent);//gọi sự kiện change
        return;
    }

    if (handledText.includes('mấy giờ')) {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        const textToSpeech = `${currentHour} giờ ${currentMinute} phút`;
        console.log(textToSpeech);

        // const textToSpeech = `${moment().hours()} giờ ${moment().minutes()} phút`;
        console.log( textToSpeech);
        speak(textToSpeech);
        return;
    }

    if (handledText.includes('ăn sáng chưa')) {
        searchInput.value = 'Tôi không biết';
        speak('tôi không biết');
        return;
    }

    speech.volume = 1;//âm lượng
    speech.rate = 1.1;//tốc độ
    speech.pitch = 1;//giọng nói

    window.speechSynthesis.speak(speech);
}

microphone.addEventListener('click', (e) => {//click vào mic
    e.preventDefault();//ngăn chặn sự kiện mặc định

    recognition.start();
    microphone.classList.add('recording');
});

//khi kết thúc mic
recognition.onspeechend = () => {
    recognition.stop();
    microphone.classList.remove('recording');
}

//khi lỗi
recognition.onerror = (err) => {
    console.error(err);
    microphone.classList.remove('recording');
}

//khi có kết quả
recognition.onresult = (e) => {
    console.log('onresult', e);
    const text = e.results[0][0].transcript;//lấy giá trị từ mic
    handleVoice(text);//xử lý giá trị
}
