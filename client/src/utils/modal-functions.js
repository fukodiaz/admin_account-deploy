const openModal = (modalSelector) => {
	const modal = document.querySelector(modalSelector);

	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';
};

function hideModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.style.display = 'none';
	document.body.style.overflow = '';
}

const onClickModalBox = (modalSelector, e) => {
	const modal = document.querySelector(modalSelector);

	if (e.target == modal) {
		hideModal(modalSelector);
	}
};

export {
	openModal,
	hideModal,
	onClickModalBox
};