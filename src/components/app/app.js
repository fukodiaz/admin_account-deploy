import React, {Component} from 'react';

import PersonalData from '../personal-data';
import NewsEditing from '../news-editing';
import ManagementDirectories from '../management-directories';
import UsersManagement from '../users-management';
import ModalNews from '../modal-news';

import styles from './app.m.less';

export default class App extends Component {

	render() {
		return (
			<div className={styles.mainWrapper}>
				<h1 className={styles.headerAccount}>
					Личный кабинет системного администратора
				</h1>
				<ul className={styles.mainList}>
					<PersonalData />
					<NewsEditing />
					<ManagementDirectories />
					<UsersManagement />
				</ul>
				<ModalNews />
			</div>
		);
	}
}
