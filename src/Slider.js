export class Slider {
	constructor({ delay = 2500, width = 750, height = 400, root, slides }) {
		this.checkRequired(root, slides);
		const options = { delay, width, height, root, slides };
		this.typeChecks(options);
		this.checkSlidesTypes(slides);
		this.dimensionChecks(width, height);
		this.delay = delay;
		this.width = width;
		this.height = height;
		this.root = root;
		this.slides = slides;
		this.setSliderBase();
	}

	checkRequired(root, slides) {
		if (!root) {
			throw new Error("Missing required root parameter");
		}
		if (!slides) {
			throw new Error("Missing required slides parameter");
		}
		if (slides.length < 1) {
			throw new Error("Slides is empty");
		}
	}

	typeChecks({ delay, width, height, root, slides }) {
		if (typeof delay !== "number") {
			throw new Error("Parameter delay must be of type number")
		}
		if (typeof width !== "number") {
			throw new Error("Parameter width must be of type number")
		}
		if (typeof height !== "number") {
			throw new Error("Parameter height must be of type number")
		}
		if (typeof root !== "string") {
			throw new Error("Parameter root must be of type string");
		}
		if (root[0] !== "#") {
			throw new Error("Root must have # in the beginning")
		}
		if (!Array.isArray(slides)) {
			throw new Error("Parameter slides must be an array");
		}
	}

	checkSlidesTypes(slides) {
		const hexRegex = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
		slides.forEach((slide, idx) => {
			if (!slide.hasOwnProperty("color")) {
				throw new Error(`slide ${idx} is missing color property`);
			}
			if (!slide.hasOwnProperty("text")) {
				throw new Error(`slide ${idx} is missing text property`);
			}
			if (typeof slide.color !== 'string') {
				throw new Error(`slide ${idx} color property must be of type string`);
			}
			if (typeof slide.text !== 'string') {
				throw new Error(`slide ${idx} text property must be of type string`);
			}
			if (!hexRegex.test(slide.color)) {
				throw new Error(`slide ${idx} color must be a hexadecimal`);
			}
			if (slide.text.length < 1) {
				throw new Error(`slide ${idx} must contain at least 1 character`);
			}
		})
	}

	dimensionChecks(width, height) {
		if (width < 100) {
			throw new Error("Width must be at least 100");
		}
		if (height < 100) {
			throw new Error("Height must be at least 100");
		}
	}

	setSliderBase() {
		const appDiv = document.getElementById("app");

		const sliderRootDiv = document.createElement("div");
		sliderRootDiv.setAttribute("id", this.removeHash(this.root));
		sliderRootDiv.setAttribute("class", "slider-root");
		sliderRootDiv.style.width = this.width + "px";

		const sliderContainerDiv = document.createElement("div");
		sliderContainerDiv.setAttribute("class", "slider-container");
		sliderContainerDiv.style.width = this.slides.length * this.width + "px";
		sliderContainerDiv.style.height = this.height + "px";

		sliderRootDiv.appendChild(sliderContainerDiv);
		appDiv.appendChild(sliderRootDiv);
		this.setSlides(sliderContainerDiv);
	}

	removeHash(root) {
		return root.split("").slice(1).join("");
	}

	setSlides(sliderContainerDiv) {
		for (let i = 0; i < this.slides.length; i++) {
			let slideItem = document.createElement("div");
			let slideText = document.createTextNode(this.slides[i].text);

			slideItem.setAttribute("class", "slide-item");
			slideItem.style.flex = `0 0 ${this.width}px`;
			slideItem.style.background = this.slides[i].color;
			slideItem.appendChild(slideText);
			sliderContainerDiv.appendChild(slideItem);
		}
		this.start();
	}

	start() {
		const slideItems = document.querySelectorAll(".slide-item");
		let translateBy = this.width;
		const sliderInterval = setInterval(() => {
			if (translateBy / (this.slides.length - 1) > this.width) {
				clearInterval(sliderInterval);
				return;
			}
			for (let i = 0; i < this.slides.length; i++) {
				slideItems[i].style.transform = `translateX(-${translateBy}px)`
			}
			translateBy += this.width;
		}, this.delay)
	}
}
