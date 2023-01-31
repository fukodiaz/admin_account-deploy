import React, {Component} from 'react';

import styles from './list-btns-offices.m.less';

class ListBtnsOffices extends Component {

	createButton = ({title, entityId}) => {
		const {filterOffices, isActiveOffice} = this.props;
		const classBtn = isActiveOffice === entityId ? 'activeBtnOffice' : 'btnOffice';
		return (
			<li key={entityId} className={styles.itemListBtns}>
				<button type="button" className={styles[classBtn]}
							onClick={() => filterOffices(entityId)}>
					{title}
				</button>
			</li>
		);
	}

	render() {
		const {listOffices, filterOffices} = this.props;
		const contentListBtns = listOffices ? listOffices.map(this.createButton) : null;

		return (
			<ul className={styles.listBtnsOffices}>
				{contentListBtns}
			</ul>
		);
	}
}

export default ListBtnsOffices;