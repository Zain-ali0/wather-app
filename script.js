let weather = {
    apikey : "5223933753a953ac5bc2675d63cb9596",
    fetchweather : function GetData(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q= " + city + "&units=metric&appid="+this.apikey
        )   .then((response) => {
            if (!response.ok) {
            document.querySelector(".weather").innerHTML = " City Not Found";
            }
            return response.json();
        })
        .then((data) => this.DisplayWeather(data));
    },
    
    DisplayWeather:function (data) {
        const {name} = data;
        const {icon,description} = data.weather[0];
        const {temp,humidity} = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerHTML =  "Weather in " +name;
        document.querySelector(".temp").innerHTML = temp + "° C";
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind Speed: " +speed + " Km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    Search : function () {
        this.fetchweather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click",function () {
    weather.Search();
});

document.querySelector(".search-bar").addEventListener("keyup",function(event) {
    if (event.key == "Enter"){
        weather.Search();
    }
})


weather.fetchweather("Baghdad")
