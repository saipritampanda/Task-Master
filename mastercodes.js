// Disable right-click functionality
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Prevent opening developer tools or saving/viewing source via shortcuts
document.addEventListener("keydown", function (e) {
    // Block Ctrl+Shift+J or Cmd+Shift+J
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyJ") {
        e.preventDefault();
    }

    // Block Ctrl+Shift+I or Cmd+Shift+I
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyI") {
        e.preventDefault();
    }

    // Block F12 key
    if (e.code === "F12") {
        e.preventDefault();
    }

    // Block Ctrl+U or Cmd+Option+U
    if ((e.ctrlKey || e.metaKey) && (e.code === "KeyU" || e.altKey)) {
        e.preventDefault();
    }

    // Block Ctrl+S or Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyS") {
        e.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Version number
    const versionNumber = "v2.3.0" + ".";
    //Version - Top
    const versionTopElements = document.querySelectorAll("#version-top");
    versionTopElements.forEach(element => {
        element.innerHTML = `<b>Version:&nbsp; ${versionNumber}</b>`;
    });
    //Version - Bottom
    const versionBottomElements = document.querySelectorAll("#version-bottom");
    versionBottomElements.forEach(element => {
        element.innerHTML = `<b>Version:&nbsp; ${versionNumber}</b>`;
    });
});

// JavaScript for showing current Year in the Footer
document.addEventListener("DOMContentLoaded", () => {
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").textContent = currentYear;
});