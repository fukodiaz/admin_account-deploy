import React from 'react';
import Select from 'react-select';

import './select-items.less';

const SelectItems = (props) => {
	const {value, dataOptions, onChangeSelect,
			height, placeholder='', name, prefix=''} = props;

	const dot = (color = 'rgba(0,0,0,.7)') => ({
		color,
		fontSize: '15px',
		paddingLeft: '1px',
		paddingRight: 20
	});
	
	const selectStyles = (height=104) => ({
		input: styles => ({...styles, ...dot()}),
		placeholder: styles => ({...styles, ...dot()}),
		indicatorSeparator: (styles) => ({display:'none'}),
		control: (base, state) => ({
			...base,
			//maxHeight: '32px !important',
			position: 'relative',
			boxShadow: 'none',
			border: state.isFocused ? '1px solid rgba(23, 135, 247, 0.4)' 
											: '1px solid rgba(160, 158, 158, 0.7)',
			outline: state.isFocused ? '2px solid rgba(23, 135, 247, 0.4) !important' : '1px solid transparent',
			outlineOffset: '-2px',
			'&:hover': {
				borderColor: state.isFocused ? 'rgba(23, 135, 247, 0.4)' 
									: 'rgba(138, 136, 136, 0.4) !important',
				outline: state.isFocused ? '2px solid rgba(23, 135, 247, 0.4) !important' 
													:'1px solid rgba(138, 136, 136, 0.4) !important',
				':after, :before': {
					backgroundColor: state.isFocused  ? 'rgb(97,97,97)' : 'rgb(163,163,163) !important'
				}
			},
			':after, :before': {
				content:'""',
				position: 'absolute',
				top: 19,
				right: 6,
				width: 9,
				height: 2,
				transform: 'rotate(-45deg)',
				backgroundColor: state.isFocused  ? 'rgb(97,97,97)' : '#cccccc'
			},
			':before': {
				right: 12,
				transform: 'rotate(45deg)',
			},
		}),
		dropdownIndicator: base => ({
			...base,
			display:'none'
		}),
		menu: (provided, state) => ({
			...provided,
			width: '100%',
			padding: 0,
			fontSize: '15px',
		}),
		menuList: base => ({
			...base,
			maxHeight: height//104, 
		}),
		singleValue: (provided) => {
			return { ...provided, ...dot(), color:'#000' };
		},
		option: (provided, state) => ({
			...provided,
			color: '#000',
			lineHeight: '20px',
			backgroundColor: state.isSelected ? 'rgba(160, 158, 158, 0.2)' : '#fff',
			padding: '9px 11px 10px',
		// 	paddingTop: '5px',
		// paddingBottom: '5px',
			margin: 0,
			borderBottom: '1px solid rgba(160, 158, 158, 0.4)',
			borderTop: '1px solid rgba(160, 158, 158, 0.1)',
			':first-of-type': {
				borderTop: 'none'
			},
			':last-of-type': {
				borderBottom: 'none'
			},
			'&:hover': {
				backgroundColor: 'rgba(160, 158, 158, 0.2)'
			}
		})
	});

	const stylesItems = selectStyles(height);

	return (
		<Select 	value={value} name={name}
					options={dataOptions}
					onChange={(opt)=> onChangeSelect(opt, name)}
					styles={stylesItems} isSearchable={false}
					placeholder={placeholder} classNamePrefix={prefix}>
		</Select>
	);
};

export default SelectItems;