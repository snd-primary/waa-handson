function init() {
	// ステージを作成
	const stage = new createjs.Stage("hamonCanvas");
	const canvasWidth = stage.canvas.width;
	const canvasHeight = stage.canvas.height;

	const container = new createjs.Container();
	stage.addChild(container);

	// 読み込む画像のリスト
	const images = [
		{ id: "image1", src: "./img/r3.png" },
		{ id: "image2", src: "./img/r2.png" },
		{ id: "image3", src: "./img/r1.png" },
	];

	// LoadQueueを作成
	const loader = new createjs.LoadQueue(false);

	// 読み込み完了時のイベントリスナーを設定
	loader.addEventListener("complete", handleComplete);
	// 画像の読み込みを開始
	loader.loadManifest(images);

	function handleComplete() {
		let maxWidth = 0;
		let maxHeight = 0;
		const bitmaps = [];

		for (const image of images) {
			const bitmap = new createjs.Bitmap(loader.getResult(image.id));
			const bounds = bitmap.getBounds();

			maxWidth = Math.max(maxWidth, bounds.width);
			maxHeight = Math.max(maxHeight, bounds.height);

			bitmaps.push(bitmap);
		}

		const centerX = canvasWidth / 2;
		const centerY = canvasHeight / 2;

		bitmaps.forEach((bitmap, index) => {
			const bounds = bitmap.getBounds();

			bitmap.regX = bounds.width / 2;
			bitmap.regY = bounds.height / 2;

			bitmap.x = centerX;
			bitmap.y = centerY;

			bitmap.zIndex = index;

			container.addChild(bitmap);
		});

		container.sortChildren((a, b) => b.zIndex - a.zIndex);

		function animateImages() {
			const fadeInDuration = 1000;
			const delayBetweenImages = 500;
			const holdDuration = 2000;
			const fadeOutDuration = 1000;

			// すべての画像をフェードイン
			bitmaps.forEach((bitmap, index) => {
				createjs.Tween.get(bitmap)
					.wait(index * (fadeInDuration * delayBetweenImages))
					.to({ alpha: 1 }, fadeInDuration);
			});

			// すべての画像が表示された後、同時フェードアウト
			createjs.Tween.get({})
				.wait(bitmaps.length * (fadeInDuration * delayBetweenImages) + holdDuration)
				.call(() => {
					// biome-ignore lint/complexity/noForEach: <explanation>
					bitmaps.forEach((bitmap) => {
						createjs.Tween.get(bitmap).to({ alpha: 0 }, fadeOutDuration);
					});
				})
				.wait(fadeOutDuration)
				.call(animateImages);
		}
		animateImages();

		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener("tick", stage);
	}
}

window.addEventListener("load", init);
