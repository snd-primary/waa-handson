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

	fadeInnerShadowAnm.play();
	const [fadeOutAnm, scaleUpAnm] = scaleUpFadeout(1000);

	fadeInnerShadowAnm.play();

	setTimeout(() => {
		fadeOutAnm.play();
		scaleUpAnm.play();
	}, 10000);
}

window.addEventListener("load", init);
function init() {
    const button = document.querySelector(".btn");
    const timeline = document.timeline;

    const commonOptions = {
        iterations: Number.POSITIVE_INFINITY,
        easing: "cubic-bezier(0.1, 0.1, 0.8, 0.8)",
        duration: 2000,
    };

    let fadeInnerShadowAnm, fadeOutAnm, scaleUpAnm;

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

    function startAnimations() {
        // CSSリセットを削除
        button.style.removeProperty('--before-opacity');
        button.style.removeProperty('--after-opacity');
        button.style.removeProperty('--after-scale');

        fadeInnerShadowAnm = fadeInnerShadow();
        [fadeOutAnm, scaleUpAnm] = scaleUpFadeout(1000);

        fadeInnerShadowAnm.play();

        setTimeout(() => {
            fadeOutAnm.play();
            scaleUpAnm.play();
        }, 2000);
    }

    function removeAnimations() {
        if (fadeInnerShadowAnm) {
            fadeInnerShadowAnm.cancel();
            fadeInnerShadowAnm = null;
        }
        if (fadeOutAnm) {
            fadeOutAnm.cancel();
            fadeOutAnm = null;
        }
        if (scaleUpAnm) {
            scaleUpAnm.cancel();
            scaleUpAnm = null;
        }

        // CSSでアニメーション効果をリセット
        button.style.setProperty('--before-opacity', '0');
        button.style.setProperty('--after-opacity', '0');
        button.style.setProperty('--after-scale', '1');
    }

    button.addEventListener('mousedown', removeAnimations);
    button.addEventListener('mouseup', startAnimations);

    // 初期アニメーションの開始
    startAnimations();
}

window.addEventListener("load", init);