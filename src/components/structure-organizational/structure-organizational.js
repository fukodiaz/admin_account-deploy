import React, {Component} from 'react';

import styles from './structure-organizational.m.less';

class StructureOrganizational extends Component {

	render() {

		return (
			<li>
				<button className={styles.buttonStructure}>
					<h2 className={styles.headerStructure}>
						Организационно-штатная структура
					</h2>
				</button>
			</li>
		);
	}
}

export default StructureOrganizational;