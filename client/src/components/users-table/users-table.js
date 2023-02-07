import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import {fetchUsersData, openModalEditUser, 
			addIdUserDeleted, filterOffices} from '../../actions';
import {openModal} from '../../utils';

import styles from './users-table.m.less';
import pencil from './pencil.svg';
import trash from './trash.svg';

class UsersTable extends Component {

	componentDidMount() {
		this.props.fetchUsersData();
		this.props.filterOffices('educational');
		
		// if (this.props.usersList?.length) {
		// 	this.props.filterOffices('educational');
		// 	console.log(78);
		// }
	}

	componentDidUpdate(prevProps) {
		if (prevProps.usersList?.length !== this.props.usersList?.length) {
			console.log('dif', this.props.usersList);
			this.props.filterOffices('educational');
			//console.log('showing', this.props.showingUsers);
			console.log('dif', this.props.usersList);
		}
		// if (prevProps.isActiveOffice !== this.props.isActiveOffice) {
		// 	this.props.filterOffices('educational');
		// 	console.log('showing', this.props.showingUsers);
		// 	//console.log('dif', this.props.usersList);
		// }
	}

	editUser = (userData) => {
		this.props.openModalEditUser(userData);
		openModal('[class^="modalUser"]');
	}

	openModalConfirm = (idUser) => {
		this.props.addIdUserDeleted(idUser);
		openModal('[class^="modalConfirm"]');
	}

	createRow = (user, idx, arr) => {
		const userData = arr[arr.length - idx - 1];
		const {entityId, index, fio, department, email, phone, password} = userData;

		return (
			<tr key={entityId} className={styles.rowTbodyUser}>
				<td className={styles.userIndex}>{index}</td>
				<td className={styles.userFIO}>{fio}</td>
				<td className={styles.userDepartment}>{department}</td>
				<td className={styles.userPhone}>{phone}</td>
				<td className={styles.userEmail}>{email}</td>
				<td className={styles.userPassword}>{password}</td>
				<td className={styles.userActions}>
					<button type="button" className={styles.buttonEditing}
							onClick={() => this.editUser(userData)}>
						<p className={styles.svgBoxEditing}>
							<svg width="100%" height="100%">
								<use href={`${pencil}#pencil`}></use>
							</svg>
						</p>
					</button>
					<button type="button" className={styles.buttonDel}
							onClick={() => this.openModalConfirm(entityId)}>
						<p className={styles.svgBoxDel}>
							<svg width="100%" height="100%">	
								<use href={`${trash}#trash`}></use>
							</svg>
						</p>
					</button>
				</td>
			</tr>
		);
	}

	render() {
		const {usersListError, visUsersList, showingUsers} = this.props;
		const contentUsers = showingUsers ?  showingUsers.map(this.createRow) : null;
		console.log(showingUsers, 111);
		return (
			<table className={styles.tableUsers}>
				<thead>
					<tr className={styles.rowTheadUsers}>
						<th className={styles.userHindex}>№</th>
						<th className={styles.userHFIO}>ФИО</th>
						<th className={styles.userHdepartment}>Структурное подразделение</th>
						<th className={styles.userHphone}>Телефон</th>
						<th className={styles.userHemail}>Почта</th>
						<th className={styles.userHpassword}>Пароль</th>
						<th className={styles.userHactions}>Действия</th>
					</tr>
				</thead>
				<tbody>
					{contentUsers}
				</tbody>
			</table>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	getUsers: adminAccountService.getUsers,
});

const mapStateToProps = ({users: {usersList, usersListError, 
	visibleUsersList, showingUsersList, isActiveOffice}}) => ({
	usersList, usersListError,
	visUsersList: visibleUsersList,
	showingUsers: showingUsersList,
	isActiveOffice
});

const mapDispatchToProps = (dispatch, {getUsers}) => ({
	fetchUsersData: () => fetchUsersData(getUsers, dispatch)(),
	openModalEditUser: (payload) => dispatch(openModalEditUser(payload)),
	addIdUserDeleted: (id) => dispatch(addIdUserDeleted(id)),
	filterOffices: (payload) => dispatch(filterOffices(payload))
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(UsersTable);