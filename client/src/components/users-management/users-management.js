import React from 'react';
import {connect} from 'react-redux';
import { openBlock } from '../../actions';

import UsersContainer from '../users-container';
import styles from './users-management.m.less';

const UsersManagement = ({flagShowUsers, openBlock}) => {
	const contentUsers = flagShowUsers ? <UsersContainer /> : null;

	return (
		<li>
			<button className={styles.buttonManagementUsers}
						onClick={openBlock}>
				<h2 className={styles.headerManagementUsers}>
					Управление пользователями
				</h2>
			</button>
			{contentUsers}
		</li>
	);
};

const mapStateToProps = ({users: {flagShowUsers}}) => ({
	flagShowUsers
});

const mapDispatchToProps = (dispatch) => ({
	openBlock: () => dispatch(openBlock('users'))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);