function init() {
	const button = document.querySelector(".btn");
	const timeline = document.timeline;

	const commonOptions = {
		iterations: Number.POSITIVE_INFINITY,
		easing: "cubic-bezier(0.1, 0.1, 0.8, 0.8)",
		duration: 2000,
	};

	const fadeInnerShadow = () => {
		const keyframes = [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }];
		const options = {
			...commonOptions,
			pseudoElement: "::before",
		};

		return new Animation(
			new KeyframeEffect(button, keyframes, options),
			timeline
		);
	};

	const scaleUpFadeout = (stopDuration = 1000) => {
		const pseudoElement = "::after";

		const fadeOutKeyframes = [
			{ opacity: 0 },
			{ opacity: 1, offset: 0.1 },
			{ opacity: 0, offset: 0.5 },
			{ opacity: 0, offset: 1 },
		];

		const scaleUpKeyframes = [
			{ transform: "scale(1)", offset: 0 },
			{ transform: "scale(3)", offset: 0.5 },
			{ transform: "scale(3)", offset: 1 },
		];

		const totalDuration = commonOptions.duration / 2 + stopDuration;

		const options = {
			...commonOptions,
			pseudoElement,
			composite: "add",
			duration: totalDuration,
		};

		const fadeOutAnimation = new Animation(
			new KeyframeEffect(button, fadeOutKeyframes, options),
			timeline
		);
		const scaleUpAnimation = new Animation(
			new KeyframeEffect(button, scaleUpKeyframes, options),
			timeline
		);

		return [fadeOutAnimation, scaleUpAnimation];
	};

	const fadeInnerShadowAnm = fadeInnerShadow();
	const [fadeOutAnm, scaleUpAnm] = scaleUpFadeout(1000);

	fadeInnerShadowAnm.play();

	setTimeout(() => {
		fadeOutAnm.play();
		scaleUpAnm.play();
	}, 2000);
}

window.addEventListener("load", init);
