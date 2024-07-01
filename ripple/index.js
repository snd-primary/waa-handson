// 定数
const CANVAS_ID = "hamonCanvas";
const RIPPLE_IMAGE_SRC = "./ripple.png";
const RIPPLE_COUNT = 3;

// アニメーション設定
const ANIMATION_CONFIG = {
	fadeInDuration: 700,
	displayDuration: 200,
	fadeOutDuration: 1000,
	delayBetweenRipples: 300,
	minDelay: 400,
	maxDelay: 2000,
	initialScales: [0.2, 0.4, 0.6],
	scaleFactors: [0.6, 0.8, 1],
	minScale: 1,
	maxScale: 1,
};

// メイン関数
function init() {
	const stage = createStage();
	loadRippleImage(stage);
}

function createStage() {
	const stage = new createjs.Stage(CANVAS_ID);
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", stage);
	return stage;
}

function loadRippleImage(stage) {
	const loader = new createjs.LoadQueue(false);
	loader.addEventListener("complete", (event) => handleImageLoad(event, stage));
	loader.loadFile({ id: "ripple", src: RIPPLE_IMAGE_SRC });
}

function handleImageLoad(event, stage) {
	const image = event.target.getResult("ripple");
	scheduleNextAnimation(image, stage);
}

// ユーティリティ関数
function getRandomDelay(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomScale(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomPosition(stage, effectiveWidth, effectiveHeight) {
	const minX = effectiveWidth / 2;
	const maxX = stage.canvas.width - effectiveWidth / 2;
	const minY = effectiveHeight / 2;
	const maxY = stage.canvas.height - effectiveHeight / 2;

	return {
		x: minX + Math.random() * (maxX - minX),
		y: minY + Math.random() * (maxY - minY),
	};
}

// アニメーション関連関数
function createRippleAnimation(image, stage) {
	const maxScale = getRandomScale(
		ANIMATION_CONFIG.minScale,
		ANIMATION_CONFIG.maxScale
	);
	const { x: randomX, y: randomY } = getRandomPosition(
		stage,
		image.width * maxScale,
		image.height * maxScale
	);

	const ripples = createRipples(image, stage, randomX, randomY);
	animateRipples(ripples, maxScale, stage);
}

function createRipples(image, stage, x, y) {
	return ANIMATION_CONFIG.initialScales.map((initialScale) => {
		const bitmap = new createjs.Bitmap(image);
		bitmap.alpha = 0;
		bitmap.regX = image.width / 2;
		bitmap.regY = image.height / 2;
		bitmap.x = x;
		bitmap.y = y;
		bitmap.scaleX = bitmap.scaleY = initialScale;
		stage.addChild(bitmap);
		return bitmap;
	});
}

function animateRipples(ripples, maxScale, stage) {
	const customEase = createjs.Ease.getPowOut(2);

	ripples.forEach((ripple, index) => {
		const finalScale = maxScale * ANIMATION_CONFIG.scaleFactors[index];
		createjs.Tween.get(ripple)
			.wait(index * ANIMATION_CONFIG.delayBetweenRipples)
			.to(
				{ alpha: 0.6, scaleX: finalScale, scaleY: finalScale },
				ANIMATION_CONFIG.fadeInDuration,
				customEase
			)
			.wait(ANIMATION_CONFIG.displayDuration)
			.to({ alpha: 0 }, ANIMATION_CONFIG.fadeOutDuration, customEase)
			.call(() => stage.removeChild(ripple));
	});
}

function scheduleNextAnimation(image, stage) {
	const delay = getRandomDelay(
		ANIMATION_CONFIG.minDelay,
		ANIMATION_CONFIG.maxDelay
	);
	setTimeout(() => {
		createRippleAnimation(image, stage);
		scheduleNextAnimation(image, stage);
	}, delay);
}

// イベントリスナー
window.addEventListener("load", init);
