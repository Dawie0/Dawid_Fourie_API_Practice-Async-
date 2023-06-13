apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=61c8b18049273a3f9871a4040f010efd'

const city = document.querySelector('.city')
const temperature = document.querySelector('.temp')
const wIcon = document.querySelector('.icon')
const wDescription = document.querySelector('.description')
const wHumidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const container = document.querySelector('.weather')
const high = document.querySelector('.high')
const low = document.querySelector('.low')
const searchBar = document.querySelector('.searchbar')
const button = document.querySelector('.search button')
const apiKey = '61c8b18049273a3f9871a4040f010efd'

const fetchApi =  async (city) => {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
            city +
            '&appid=' + apiKey +
            '&units=imperial')
        
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()
        container.classList.remove('loading')
        return data
    }
    catch (error) {
        console.log(`Could not get data: ${error}`)
    }        
}

displayData = (data) => {
    let { name } = data
    let { temp, humidity, temp_min, temp_max } = data.main
    let { icon, description } = data.weather[0]
    let { speed } = data.wind
    city.innerText = `Weather in ${name}`
    temperature.innerText = `${Math.ceil(temp)}°F`
    wIcon.src = `https://openweathermap.org/img/wn/${icon}.png`
    wDescription.innerText = `${description}`
    wHumidity.innerText = `Humidity: ${humidity}%`
    wind.innerText = `Wind Speed: ${speed}`
    high.innerText = `H: ${Math.ceil(temp_max)} L: ${Math.ceil(temp_min)}`
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?"${name}')`
    searchBar.value = ""
}

getData = (city) => {
    const promise = fetchApi(city)
    promise.then((data) => displayData(data))
}

search = () => {
    getData(searchBar.value)
}

button.addEventListener('click', () => {
    search()
})

searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search()
    }
})
