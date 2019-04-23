let mouseX
let mouseY
let mousePressed
let pressArea = 30
let maxWidth = 0.2
let sidebarAnchor

function Lerp (from, to, amount) {
	amount = amount < 0 ? 0 : amount
	amount = amount > 1 ? 1 : amount
	return from + (to - from) * amount
}

$(() => {
	let sidebar = $(".sidebar")
	sidebar.css("max-width", maxWidth * 100 + "%")
	$("html").on("mousemove", (e) => {
		mouseX = e.clientX || 0
		mouseY = e.clientY || 0

		if(e.touches != null) {
			mouseX = e.touches[0].clientX
			mouseY = e.touches[0].clientY
		}
	})

	$("html").on("mousedown", (e) => {
		if(	mouseX < sidebar.width() + pressArea &&
			mouseX > sidebar.width() - pressArea) {
			mousePressed = true
			$("html").css("user-select", "none")
		}
	})

	$("html").on("mouseup", (e) => {
		mousePressed = false
		if(sidebar.width() < window.innerWidth * maxWidth / 3 * 2) {
			sidebarAnchor = "left"
		} else {
			sidebarAnchor = "right"
		}
		$("html").css("user-select", "auto")
	})

	var think = setInterval(() => {
		if(mousePressed) {
			sidebar.css("width", Lerp(sidebar.width(), mouseX, 0.1))
			sidebar.css("border-top-right-radius", Lerp(parseInt(sidebar.css("border-top-right-radius")), mouseY / window.innerHeight * 100, 0.1) + "%")
			sidebar.css("border-bottom-right-radius", Lerp(parseInt(sidebar.css("border-bottom-right-radius")), 100 - mouseY / window.innerHeight * 100, 0.1) + "%")
		} else {
			if(sidebarAnchor === "right") {
				sidebar.css("width", Lerp(sidebar.width(), Math.round(window.innerWidth * maxWidth), 0.1))
			} else {
				sidebar.css("width", Lerp(sidebar.width(), 0, 0.1))
			}
			sidebar.css("border-top-right-radius", Lerp(parseInt(sidebar.css("border-top-right-radius")), 0, 0.1) + "%")
			sidebar.css("border-bottom-right-radius", Lerp(parseInt(sidebar.css("border-bottom-right-radius")), 0, 0.1) + "%")
		}
	}, 15)
})