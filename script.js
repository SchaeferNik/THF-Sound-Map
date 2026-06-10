const markers = document.querySelectorAll(".marker");

const pointTitle = document.getElementById("point-title");
const description = document.getElementById("description");

const morningContainer = document.getElementById("morning-player-container");
const noonContainer = document.getElementById("noon-player-container");
const eveningContainer = document.getElementById("evening-player-container");

function createPlayer(url) {
    if (!url) {
        return `<p style="font-size:13px; color:#888; margin:4px 0 12px;">No recording available.</p>`;
    }

    const embedUrl =
        "https://w.soundcloud.com/player/?url=" +
        encodeURIComponent(url) +
        "&color=%23343434&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false";

    return `
        <div style="position:relative;">
            <iframe
                width="100%"
                height="120"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                src="${embedUrl}"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            </iframe>
            <p style="display:none; font-size:13px; color:#888; margin:4px 0 12px;">
                Player blocked by browser extension. Try disabling your ad blocker or open in a different browser.
            </p>
        </div>
    `;
}

markers.forEach((marker) => {
    marker.addEventListener("click", () => {

        document.getElementById("audio-section").style.display = "block";

        // hide personal info when a marker is clicked
        document.querySelector(".contact").style.display = "none";
        document.getElementById("description").style.display = "none";

        console.log("clicked marker:", marker.dataset.title);

        pointTitle.textContent = marker.dataset.title || "";
        document.getElementById("point-description").textContent = marker.dataset.description || "";

        morningContainer.innerHTML = createPlayer(marker.dataset.morning);
        noonContainer.innerHTML = createPlayer(marker.dataset.noon);
        eveningContainer.innerHTML = createPlayer(marker.dataset.evening);
    });
});

document.getElementById("map-wrapper").addEventListener("click", (e) => {
    if (!e.target.classList.contains("marker")) {
        document.querySelector(".contact").style.display = "block";
        document.getElementById("description").style.display = "block";
        document.getElementById("audio-section").style.display = "none";
    }
});