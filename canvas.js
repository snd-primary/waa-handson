const canvas = document.getElementById("tutorial");
const ctx = canvas.getContext("2d");

const imgPath = "./image/ej_arrow.png";
const imgWidth = 202;
const imgHeight = 276;

const images = [];
const img1 = new Image();
const img2 = new Image();
const img3 = new Image();
img1.src = imgPath;
img2.src = imgPath;
img3.src = imgPath;
images.push(img1, img2, img3);

const fadeIn = (img, x, y, delay) => {
	let opacity = 0;
	let delayCounter = delay;

	const animate = (timestanp) => {
		if (delayCounter > 0) {
			delayCounter -= timestanp;
			requestAnimationFrame(animate);
			return;
		}

		ctx.clearRect(0, 0, 768, 400);

		ctx.globalAlpha = opacity;
		ctx.drawImage(img, x, y);

		opacity += 0.01;

		if (opacity < 1) {
			requestAnimationFrame(animate);
		}
	};

	requestAnimationFrame(animate);
};

fadeIn(images[0], 0, 0, 0); // 1枚目は即座にフェードイン
fadeIn(images[1], 100, 100, 1000); // 2枚目は1秒遅れてフェードイン
