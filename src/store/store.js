import { createStore } from "vuex";

export default createStore({
    state: {
        count: 0,
        weatherData: {
            icon: "icon",
            temp: 0,
            text: "text",
            location: "location",
            city: "Seoul",
        },
    },
    mutations: {
        addCount(state, payload) {
            state.count += 1 + payload;
        },
        updateWeather(state, payload) {
            state.weatherData.icon = payload.weather[0].icon;
            state.weatherData.temp = payload.main.temp;
            state.weatherData.text = payload.weather[0].description;
            state.weatherData.location = payload.sys.location;
            state.weatherData.city = payload.name;
        },
        onSearchCity(state, payload) {
            state.weatherData.city = payload;
        },
    },
    actions: {
        getWeather(context) {
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${
                context.state.weatherData.city
            }&appid=${import.meta.env.VITE_API_KEY}`;
            fetch(API_URL)
                .then((res) => res.json())
                .then((data) => {
                    context.commit("updateWeather", data);
                })
                .catch((err) => {
                    alert("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
                });
        },
    },
});
