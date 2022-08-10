import React from 'react';
import {connect} from 'react-redux';
import { openBlock } from '../../actions';

import ListDirectories from '../list-directories';
import styles from './management-directories.m.less';

const ManagementDirectories = ({flagOpenDirectories, openBlock}) => {
	const contentDirectories = flagOpenDirectories ? <ListDirectories /> : null;

	return (
		<li>
			<button className={styles.buttonDirectories}
						onClick={openBlock}>
				<h2 className={styles.headerDirectories}>
					Управление справочниками
				</h2>
			</button>
			{contentDirectories}
		</li>
	);
};

const mapStateToProps = ({users: {flagOpenDirectories}}) => ({
	flagOpenDirectories
});

const mapDispatchToProps = (dispatch) => ({
	openBlock: () => dispatch(openBlock('directories'))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagementDirectories);