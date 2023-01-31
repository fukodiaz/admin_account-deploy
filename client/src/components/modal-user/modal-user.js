import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import { inputChanged, userDataRequested,
			userDataSuccess, userDataError,
			putUserDataRequested, putUserDataSuccess,
			putUserDataError } from '../../actions';
import { hideModal, onClickModalBox, changeStyleValidInput,
			changeStyleInvalidInput } from '../../utils';

import FormUser from '../form-user';
import styles from './modal-user.m.less';

class ModalUser extends Component {
	handleKeyDown = (e) => {
		if (e.code === 'Escape' && document.querySelector('[class^="modalUser"]').style.display === 'block') {
			hideModal('[class^="modalUser"]');
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	onChangeRequiredInput = (e, fieldName, classContainer) => {
		this.props.inputChanged(fieldName, e.target.value);
		changeStyleValidInput(e, classContainer);
	}

	onChangeSelect = (classControl, opt, fieldName) => {
		this.props.inputChanged(fieldName, opt);
		if (opt) {
			document.querySelector(classControl).style.outline='none';
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const {fio, position, email, phone, department, password,
				methodUser, postUserData, userDataRequested, 
				userDataSuccess, userDataError, putUserData,
				putUserDataRequested, putUserDataSuccess,
				putUserDataError, userId} = this.props;

		if (fio==='' || !position || email==='' || !department) {
			if (fio==='') {
				changeStyleInvalidInput('[class^="containerInputFIO"]');
			}
			if (!position) {
				changeStyleInvalidInput('[class^="position__control"]');
			}
			if (email==='') {
				changeStyleInvalidInput('[class^="containerInputEmail"]');
			}
			if (!department) {
				changeStyleInvalidInput('[class^="depart__control"]');
			}
			return null;
		}

		const formData = new FormData(e.target);
		const json = JSON.stringify(Object.fromEntries(formData.entries(formData)));
		
		if (methodUser==='POST') {
			userDataRequested();
			postUserData(json)
				.then(data => {
					userDataSuccess(data); 
					console.log(data, '222ggg');})
				.catch(error => {userDataError(error);console.log(error, 44);})
				.finally(() => {
					e.target.reset();
					hideModal('[class^="modalUser"]');
				});
		}

		if (methodUser==='PUT') {
			putUserDataRequested();
			putUserData(userId, json)
				.then(data => {putUserDataSuccess(data); console.log(data, 77);})
				.catch(error => {putUserDataError(error);console.log(error, rr);})
				.finally(() => {
					e.target.reset();
					hideModal('[class^="modalUser"]');
				});
		}
	}

	render() {
		const {heading, currentDepartments, positions, inputChanged,
				position, department, fio, email, phone, password} = this.props;
		const dataOptionsDepartments = currentDepartments ? 
						currentDepartments.map(data => ({'value':data, 'label': data})) : null;
		const dataOptionsPositions = positions ? 
						positions.map(data => ({'value':data, 'label': data})) : null;

		return(
			<div className={styles.modalUser}
					onClick={(e) => onClickModalBox('[class^="modalUser"]', e)}>
				<div className={styles.modalUserDialog}>
					<div className={styles.modalUserContent}>
						<FormUser heading={heading} dataOptionsDepartments={dataOptionsDepartments}
									inputChanged={inputChanged} dataOptionsPositions={dataOptionsPositions}
									position={position} onChangeRequiredInput={this.onChangeRequiredInput} 
									department={department} fio={fio} email={email} phone={phone}
									password={password} handleSubmit={this.handleSubmit}
									onChangeSelect={this.onChangeSelect} />
					</div>
				</div>
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	postUserData: adminAccountService.postUserData,
	putUserData: adminAccountService.putUserData
});

const mapStateToProps = ({users: {headingModalUser, currentDepartments, 
	listPositions, position, department, fioUser, emailUser,
	phoneUser, passwordUser, methodUser, userId}}) => ({
	heading: headingModalUser,
	currentDepartments,
	positions: listPositions,
	position, department,
	fio: fioUser,
	email: emailUser,
	phone: phoneUser,
	password: passwordUser,
	methodUser, userId
	
});

const mapDispatchToProps = (dispatch) => ({
	inputChanged: (fieldName, value) => dispatch(inputChanged(fieldName, value)),
	userDataRequested: () => dispatch(userDataRequested()),
	userDataSuccess: (data) => dispatch(userDataSuccess(data)),
	userDataError: (error) => dispatch(userDataError(error)),
	putUserDataRequested: () => dispatch(putUserDataRequested()),
	putUserDataSuccess: (data) => dispatch(putUserDataSuccess(data)),
	putUserDataError: (error) => dispatch(putUserDataError(error))
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ModalUser);
