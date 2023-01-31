const addZerosToNum = (num, start) => {
	for (let i = start, q = 1, z; i >= 10; i = i/10) {
		q = q*10;
		if (num <= i && num >= i/10) {
			z = q.toString().slice(2);
			return `${z}${num}`;
			break;
		}
		if (num > i) {
			return num;
			break;
		}
	}
};

const changeStyleInvalidInput = (selector) => {
	document.querySelector(selector).style.outline='3px solid rgba(226, 79, 79, 0.8)';
	document.querySelector(selector).style.outlineOffset='-2px';
};

const changeStyleValidInput = (e, classContainer='') => {
	if (e.target.value !== '') {
		if (classContainer !== '') {
			document.querySelector(classContainer).style.outline='none';
			return null;
		}
		e.currentTarget.style.outline='none';
	}
};

export {
	addZerosToNum,
	changeStyleInvalidInput,
	changeStyleValidInput
};