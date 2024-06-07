var input = document.getElementById("input");
var container = document.getElementsByClassName("container");
var city = document.getElementById("cityname");
var date = document.getElementById("date");
var temp = document.getElementById("temprature");
var typeoftemp = document.getElementById("type");

function dategenerate(d) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[d.getDay()];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let date = d.getDate();

  return `${day} ${date} ${month} ${year}`;
}
let data = {};
var apiid = "8d6b8a9f40c8ba7123157ae41fb370cd";
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    var inputval = document.getElementById("input").value;
    const getdata = async () => {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputval}&units=metric&appid=${apiid}`
      );
      let data = await response.json();
      var dategenerated = dategenerate(new Date());
      city.innerHTML = `${data.name} , ${data.sys.country}`;
      date.innerHTML = `${dategenerated}`;
      temp.innerHTML = `${Math.round(data.main.temp)}°C`;
      typeoftemp.innerHTML = `${data.weather[0].main}`;

      if (data.main.temp > 16) {
        container[0].style.backgroundImage = "url('warm_weather.jpg')";
        container[0].style.backgroundSize = "cover";
      } else {
        container[0].style.backgroundImage = "url('cold_weather.jpg')";
        container[0].style.backgroundSize = "cover";
      }

      input.value = "";
    };
    getdata();
  }
});
