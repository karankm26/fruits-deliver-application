document.addEventListener("DOMContentLoaded", function () {
  var e = new Date("Jan 1, 2025").getTime(),
    d = setInterval(function () {
      var t = new Date().getTime(),
        t = e - t,
        n =
          '<div className="countdownlist-item"><div className="count-title">Days</div><div className="count-num">' +
          Math.floor(t / 864e5) +
          '</div></div><div className="countdownlist-item"><div className="count-title">Hours</div><div className="count-num">' +
          Math.floor((t % 864e5) / 36e5) +
          '</div></div><div className="countdownlist-item"><div className="count-title">Minutes</div><div className="count-num">' +
          Math.floor((t % 36e5) / 6e4) +
          '</div></div><div className="countdownlist-item"><div className="count-title">Seconds</div><div className="count-num">' +
          Math.floor((t % 6e4) / 1e3) +
          "</div></div>";
      document.getElementById("countdown") &&
        (document.getElementById("countdown").innerHTML = n),
        t < 0 &&
          (clearInterval(d),
          (document.getElementById("countdown").innerHTML =
            '<div className="countdown-endtxt">The countdown has ended!</div>'));
    }, 1e3);
});
