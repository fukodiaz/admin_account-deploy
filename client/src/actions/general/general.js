const openBlock = (blockName) => ({
	type: 'OPEN_BLOCK',
	blockName
});

const inputChanged = (fieldName, payload) => ({
	type: 'INPUT_CHANGED',
	fieldName,
	payload
});

export {
	openBlock,
	inputChanged
};