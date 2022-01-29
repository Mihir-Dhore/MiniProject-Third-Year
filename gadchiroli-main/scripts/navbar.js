"use strict";

const navbar = document.getElementById("navbar");
const fixedClass = "fixed";

const callbackFuntion = function (entries, observer) {
	const [entry] = entries;
	if (entry.isIntersecting) {
		navbar.classList.remove(fixedClass);
	} else {
		navbar.classList.add(fixedClass);
	}
};

const observer = new IntersectionObserver(callbackFuntion, {
	root: null,
	threshold: 0.3,
});

observer.observe(document.querySelector(".place--name"));
