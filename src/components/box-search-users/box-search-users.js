import React from 'react';

import styles from './box-search-users.m.less';

const BoxSearchUsers = (props) => {
	const {inputChanged, onSearch, searchUsers} = props;

	return (
		<div className={styles.boxSearchUsers}>
			<input type="search" name="searchUsers" 
								onChange={(e) => inputChanged('searchUsers', e.target.value)}
								value={searchUsers}
								className={styles.inputSearchUsers} 
								placeholder="ФИО + email" />
			<button type="button" className={styles.btnSearchUsers}
						onClick={onSearch}>
				Поиск
			</button>
		</div>
	);
};

export default BoxSearchUsers;