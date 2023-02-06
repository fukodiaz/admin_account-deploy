const openModal = (modalSelector) => {
	const modal = document.querySelector(modalSelector);

	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';
	//document.body.style.setProperty('margin-right', 'calc(-1 * (100vw - 100%))');
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