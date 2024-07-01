function init() {
	const cardImage = document.getElementById("card-image");

	function moveToUpperScreen() {
		const keyFrames = [{}];
	}
	function layDownWithRotation() {}
}
window.addEventListener("load", init);

const box = document.getElementById("box");

const keyframes = [
	{ transform: "translateY(0)" },
	{ transform: "translateY(-100vh)" },
];

const options = {
	duration: 2000,
	easing: "ease-in-out",
	iterations: Number.POSITIVE_INFINITY,
	direction: "alternate",
};

const animation = box.animate(keyframes, options);
