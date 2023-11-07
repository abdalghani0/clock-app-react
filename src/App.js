import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

export default function App() {
  const [quote, setQuote] = useState({});
  const [time, setTime] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [timezone, setTimezone] = useState("");
  let datetime = time.datetime;
  let d = new Date();

  useEffect(() => {
    fetchTime();
    fetchQuote();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    if (seconds === 60) {
      setSeconds(0);
      setMinutes(minutes + 1);
    }
    if (minutes === 60) {
      setMinutes(0);
      setHours(hours + 1);
    }
    if (hours > 12) setHours(hours - 12);
  }, [seconds]);

  const fetchTime = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://timezoneapi.io/api/ip/?token=aQeIpuUPvzKoqzMRrmEb`
    );
    const data = await response.json();
    setTime(data.data);
    setIsLoading(false);
    setSeconds(data.data.datetime.seconds * 1);
    setMinutes(data.data.datetime.minutes * 1);
    setHours(data.data.datetime.hour_12_wolz * 1 + 1);
    setTimezone(data.data.timezone.id);
    console.log(timezone);
    if (data.data.datetime.timeday_gen.includes("night"))
      document.getElementById("app").style.background =
        "url('images/aurora-borealis-milky-way-purple-sky-night-starry-sky-5120x3200-50.jpg')";
    else {
      document.getElementById("app").style.background =
        "url('images/col-de-la-madeleine-5400x3037-11343.jpg')";
    }
    document.getElementById("app").style.backgroundSize = "cover";
    document.getElementById("app").style.backgroundRepeat = "no-repeat";
    console.log(data.data);
  };

  const fetchQuote = async () => {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": "bjrlFAxNJmNec9m70J9VFcSxA1wEs0BQ6jf1HWf1" }
    });
    const data = await response.json();
    setQuote(data[0]);
    console.log(quote);
  };

  function handleMoreClick() {
    let quote = document.getElementById("quote-container");
    let details = document.getElementById("details");
    let time = document.getElementById("time");
    let btn = document.getElementById("more-btn");
    if(time.classList.contains("hide")) {
      quote.classList.remove("hide");
      quote.classList.add("show");
      time.classList.remove("hide");
      time.classList.add("show");
      details.classList.remove("show");
      details.classList.add("hide");
      btn.innerHTML = "more";
    }
    else {
      quote.classList.remove("show");
      quote.classList.add("hide");
      time.classList.remove("show");
      time.classList.add("hide");
      details.classList.remove("hide");
      details.classList.add("show");
      btn.innerHTML = "less";
    } 
  }

  function handleRefresh() {
    fetchQuote();
  }

  return (
    <main id="app" className="app">
      <section id="quote-container" className="quote-container show">
        <div id="quote-block" className="quote-block">
          <p id="quote">"{quote.quote}"</p>
          <p id="author">{quote.author}</p>
        </div>
        <a
          onClick={() => handleRefresh()}
          id="refresh"
          className="refresh-container"
        >
          <svg
            className="refresh"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z"
              fill-rule="nonzero"
            ></path>
          </svg>
        </a>
      </section>

      <section id="time" className="time show">
        {isLoading ? (
          "loading"
        ) : (
          <div className="time-info">
            <p className="greeting">
              good{" "}
              {datetime.timeday_gen.includes("night") ? "evening " : "morning "}
              , it's currently
            </p>
            <div className="full-time">
              <h2 className="time-now">
                {hours}:{minutes}
              </h2>
              <div className="standard-time">
                <p style={{ marginBottom: "0.5rem" }}>{datetime.hour_am_pm}</p>
                <p>{datetime.offset_gmt.slice(0, 3)}</p>
              </div>
            </div>
            <p style={{ textTransform: "uppercase" }}>in {time.country}</p>
          </div>
        )}
        <a onClick={() => handleMoreClick()} id="more-btn" className="btn">
          more
        </a>
      </section>
      <section id="details" className="details-container hide">
        <ul className="details">
          <li>
            <h2>current time zone</h2>
            <p>{timezone}</p>
          </li>
          <li>
            <h2>Day of the week</h2>
            <p>{d.getDay() + 1}</p>
          </li>
          <li>
            <h2>day of the year</h2>
            <p>280</p>
          </li>
          <li>
            <h2>week number</h2>
            <p>42</p>
          </li>
        </ul>
      </section>
    </main>
  );
}

/*

*/
