"use strict";

// !============ Variables =============
const imgConatiner = document.querySelector(".place--imgs");
const imgs = imgConatiner.querySelectorAll(".place--img");
const previousBtn = imgConatiner.querySelector("#left-btn");
const nextBtn = imgConatiner.querySelector("#right-btn");

// ! ============ For Making The Images Rotator ===============

function ImageDiv() {
	let checkerArrray = [];
	this.imgIndex = {};
	imgs.forEach(elem => {
		let index = Number.parseInt(elem.dataset.index);
		elem.style.transform = `translate(${index * 120}%)`;
		checkerArrray.push(index);
		this.imgIndex[index] = elem;
	});
	this.maxIndex = Math.max(...checkerArrray);

	this.currentIndex = 0;
}

ImageDiv.prototype.getCurrentImg = function () {
	return this.imgIndex[this.currentIndex];
};

ImageDiv.prototype._gotoCurrentIndex = function () {
	imgs.forEach(elem => {
		if (this.currentIndex > this.maxIndex) {
			this.currentIndex = 0;
		}
		if (this.currentIndex < 0) {
			this.currentIndex = this.maxIndex;
		}

		elem.style.transform = `translate(${
			(elem.dataset.index - this.currentIndex) * 120
		}%)`;
	});
};

ImageDiv.prototype.previousImg = function () {
	this.currentIndex--;
	this._gotoCurrentIndex();
};

ImageDiv.prototype.nextImg = function () {
	this.currentIndex++;
	this._gotoCurrentIndex();
};

let imgDiv = new ImageDiv();

nextBtn.addEventListener("click", imgDiv.nextImg.bind(imgDiv));

previousBtn.addEventListener("click", imgDiv.previousImg.bind(imgDiv));

document.addEventListener("keydown", e => {
	switch (e.key) {
		case "Left":
		case "ArrowLeft":
			imgDiv.previousImg();
			break;
		case "Right":
		case "ArrowRight":
			imgDiv.nextImg();
			break;
	}
});

// ! ================ For Handling Height =======================

const setContainerHeight = height => (imgConatiner.style.height = `${height}`);

window.addEventListener("resize", e =>
	setContainerHeight(`${imgDiv.getCurrentImg().height}px`)
);

window.addEventListener("load", e => {
	setContainerHeight(`${imgDiv.getCurrentImg().height}px`);
});
