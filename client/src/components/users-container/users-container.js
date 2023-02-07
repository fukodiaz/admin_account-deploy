import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import {filterOffices, openModalNewUser, inputChanged,
			onSearchUsers, onBtnArrow, onBtnPagin,
			onLastBtnPagin, selectChanged, fetchUsersData} from '../../actions'; 
import {openModal} from '../../utils';

import ListBtnsOffices from '../list-btns-offices';
import BoxSearchUsers from '../box-search-users';
import UsersTable from '../users-table';
import ModalUser from '../modal-user';
import ModalConfirm from '../modal-confirm';
import PaginationUsers from '../pagination-users';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import styles from './users-container.m.less';

class UsersContainer extends Component {

	componentDidMount() {
		this.props.fetchUsersData();
	}

	addUser = () => {
		this.props.openModalNewUser();
		openModal('[class^="modalUser"]');
	}

	render() {
		const {listOffices, filterOffices, isActiveOffice,
				inputChanged, onSearch, searchUsers,
				visibleUsersList, start, onBtnArrow, 
				activeIdx, onBtnPagin, onLastBtn, 
				selectChanged, curPage, totalPaginBtns} = this.props;
		
		return (
			<div>
				<div className={styles.boxBtnsOffices}>
					<ListBtnsOffices listOffices={listOffices} filterOffices={filterOffices}
								isActiveOffice={isActiveOffice} />
					<button type="button" className={styles.btnAddUser}
								onClick={this.addUser}>
						Добавить пользователя
					</button>
				</div>
				<BoxSearchUsers inputChanged={inputChanged} 
						onSearch={onSearch} searchUsers={searchUsers} />
				<UsersTable />
				<ModalUser />
				<ModalConfirm />
				<PaginationUsers visibleUsersList={visibleUsersList} start={start}
							onBtnArrow={onBtnArrow} activeIdx={activeIdx} onBtnPagin={onBtnPagin}
							onLastBtn={onLastBtn} selectChanged={selectChanged} curPage={curPage}
							totalPaginBtns={totalPaginBtns} />
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	getUsers: adminAccountService.getUsers,
});

const mapStateToProps = ({users: {listOffices, isActiveOffice, searchUsers, 
	visibleUsersList, startPagin, activeIdxPagin, curSelectedPage, 
	totalPaginBtns, flagShowUsers}}) => ({
	listOffices, isActiveOffice,
	searchUsers, visibleUsersList,
	start: startPagin,
	activeIdx: activeIdxPagin,
	curPage: curSelectedPage,
	totalPaginBtns
});

const mapDispatchToProps = (dispatch, {getUsers}) => ({
	filterOffices: (id) => dispatch(filterOffices(id)),
	fetchUsersData: () => fetchUsersData(getUsers, dispatch)(),
	openModalNewUser: () => dispatch(openModalNewUser()),
	inputChanged: (fieldName, value) => dispatch(inputChanged(fieldName, value)),
	onSearch: () => dispatch(onSearchUsers()),
	onBtnArrow: (data) => dispatch(onBtnArrow(data)),
	onBtnPagin: (idx) => dispatch(onBtnPagin(idx)),
	onLastBtn: (payload) => dispatch(onLastBtnPagin(payload)),
	selectChanged: (payload, name, start) => dispatch(selectChanged(payload, name, start))
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer);