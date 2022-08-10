import React from 'react';

import { openModal } from '../../utils';

import ModalDirectories from '../modal-directories';
import styles from './directories-item.m.less';

const DirectoriesItem = ({idx, type, openModalDirectories}) => {
	const labelType = type === 'extendable' ? 'расширяемый' : 'нерасширяемый';
	const labelButton = type === 'extendable' ? 'добавить' : 'посмотреть'; 
	const classButton = type === 'extendable' ? 'btnExtendDirect' : 'btnUnextendDirect';

	const showModalDirectories = () => {
		openModalDirectories();
		openModal('[class^="modalDirectories"]');
	};

	return (
		<div className={styles.directories}>
			<h3 className={styles.headingDirectories}>
				Справочник {idx + 1}
			</h3>
			<p className={styles.typeDirectories}>
				{labelType}
			</p>
			<button className={styles[classButton]}
						onClick={showModalDirectories}>
				{labelButton}
			</button>
			<ModalDirectories />
		</div>
	);
};

export default DirectoriesItem;