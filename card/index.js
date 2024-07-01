function init() {
	const stage = new createjs.Stage("hamonCanvas");
	// stage.canvas.width = window.innerWidth;
	// stage.canvas.height = window.innerHeight;

	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", stage);

	const loader = new createjs.LoadQueue(false);
	loader.addEventListener("complete", handleComplete);
	loader.loadFile({ id: "ripple", src: "./ripple.png" });

	function handleComplete(event) {
		const image = loader.getResult("ripple");
		scheduleNextAnimation(image, stage);
	}
}

function getRandomDelay(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomScale(min, max) {
	return Math.random() * (max - min) + min;
}

function createRippleAnimation(image, stage) {
	const ripples = [];
	const initialScales = [0.2, 0.4, 0.6]; // 各リップルの初期スケール

	const maxScale = getRandomScale(1, 1); // このループの最大スケール

	// 画像の実際の表示サイズを計算（最大サイズで計算）
	const effectiveWidth = image.width * maxScale;
	const effectiveHeight = image.height * maxScale;

	// 画像が画面内に収まるように位置の範囲を設定
	const minX = effectiveWidth / 2;
	const maxX = stage.canvas.width - effectiveWidth / 2;
	const minY = effectiveHeight / 2;
	const maxY = stage.canvas.height - effectiveHeight / 2;

	// ランダムな位置を計算
	const randomX = minX + Math.random() * (maxX - minX);
	const randomY = minY + Math.random() * (maxY - minY);

	const scaleFactors = [0.6, 0.8, 1]; // 各リップルの相対的なスケールを定義

	for (let i = 0; i < 3; i++) {
		const bitmap = new createjs.Bitmap(image);
		bitmap.alpha = 0;
		bitmap.regX = image.width / 2;
		bitmap.regY = image.height / 2;
		bitmap.x = randomX;
		bitmap.y = randomY;
		bitmap.scaleX = bitmap.scaleY = initialScales[i];
		stage.addChild(bitmap);
		ripples.push(bitmap);
	}

	const fadeInDuration = 500;
	const displayDuration = 400;
	const fadeOutDuration = 500;
	const delayBetweenRipples = 300; // 各リップルの開始タイミングの間隔

	ripples.forEach((ripple, index) => {
		const finalScale = maxScale * scaleFactors[index];
		createjs.Tween.get(ripple)
			.wait(index * delayBetweenRipples)
			.to(
				{ alpha: 0.6, scaleX: finalScale, scaleY: finalScale },
				fadeInDuration,
				createjs.Ease.cubicOut
			)
			.wait(displayDuration)
			.to({ alpha: 0 }, fadeOutDuration, createjs.Ease.cubicIn)
			.call(() => {
				stage.removeChild(ripple);
			});
	});
}

function scheduleNextAnimation(image, stage) {
	const delay = getRandomDelay(1000, 2000); // 3秒から8秒の間でランダムな遅延
	setTimeout(() => {
		createRippleAnimation(image, stage);
		scheduleNextAnimation(image, stage); // 次のアニメーションをスケジュール
	}, delay);
}

window.addEventListener("load", init);
