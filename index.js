const txMeisaihyo = document.querySelector(".meisaihyo-background");
const ejectArrowElements = document.querySelectorAll(".ej-arrow");

const startWidth = 1; // 開始値
const maxWidth = 7; // 最大値
let currentWidth = startWidth;
const step = 0.1; // 増分値
let isAnimating = true; // アニメーション中かどうかのフラグ

const updateTextStroke = () => {
	txMeisaihyo.style =
		// biome-ignore lint/style/useTemplate: <explanation>
		"-webkit-text-stroke-width: " + currentWidth + "px";

	if (isAnimating) {
		currentWidth += step;

		if (currentWidth >= maxWidth) {
			currentWidth = maxWidth; // 最大値に達したら値を固定
			isAnimating = false; // アニメーションを止める
		}
	}

	requestAnimationFrame(updateTextStroke);
};
updateTextStroke();

const createFedeInAnimation = (element, delay) => {
	const keyframes = [{ opacity: 0 }, { opacity: 0.4 }];

	const timing = {
		duration: 500,
		delay: delay,
		fill: "forwards",
		easing: "ease-in-out",
	};

	return element.animate(keyframes, timing);
};

ejectArrowElements.forEach((arrow, index) => {
	const delay = index * 500;
	const animation = createFedeInAnimation(arrow, delay);
	animation.play();
});
