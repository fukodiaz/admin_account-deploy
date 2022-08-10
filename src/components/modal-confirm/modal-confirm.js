import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import {newsDeleteRequested, newsDeleted, newsDeleteError,
		addIdNewsDeleted, addIdUserDeleted, userDeleteRequested,
		userDeleted, userDeleteError} from '../../actions';

import {onClickModalBox, hideModal} from '../../utils';
import styles from './modal-confirm.m.less';

const ModalConfirm = (props) => {
	const {deleteNews, IdNewsDeleted, newsDeleteRequested,
			newsDeleted, newsDeleteError, pieceHeader,
			addIdNewsDeleted, addIdUserDeleted,
			IdUserDeleted, deleteUser, userDeleteRequested,
			userDeleted, userDeleteError } = props;

	const handleKeyDown = (e) => {
		if (e.code === 'Escape' && document.querySelector('[class^="modalConfirm"]').style.display === 'block') {
			addIdNewsDeleted(null);
			addIdUserDeleted(null);
			hideModal('[class^="modalConfirm"]');
		}
	};

	const hideModalConfirm = () => {
		addIdNewsDeleted(null);
		addIdUserDeleted(null);
		hideModal('[class^="modalConfirm"]');
	};

	const onClickModalConfirm = (e) => {
		addIdNewsDeleted(null);
		addIdUserDeleted(null);
		onClickModalBox('[class^="modalConfirm"]', e);
	};

	const confirmDelete = (idNews, idUser) => {
		if (IdUserDeleted) {
			userDeleteRequested();
			deleteUser(idUser)
				.then(data => {userDeleted(data);console.log(data, '11del');})
				.catch(error => {userDeleteError(error); console.log(error, '55erDel');})
				.finally(hideModalConfirm);
		}

		if (IdNewsDeleted) {
			newsDeleteRequested();
			deleteNews(idNews)
				.then((data) => {newsDeleted(data);console.log(data, '222del');})
				.catch((error) => {newsDeleteError(error); console.log(error, '444erDel');})
				.finally(hideModalConfirm);
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<div className={styles.modalConfirm}
					onClick={onClickModalConfirm}>
			<div className={styles.modalNewsDialog}>
				<div className={styles.modalNewsContent}>
					<h3 className={styles.headingModal}>
						<span>Вы действительно хотите <br /> 
							удалить <span>{pieceHeader}</span> ?
						</span>
					</h3>
					<div className={styles.boxButtons}>
						<button type="submit" className={styles.btnConfirm}
									onClick={() => confirmDelete(IdNewsDeleted, IdUserDeleted)}>
							Ок
						</button>
						<button type="button" className={styles.btnCancel}
									onClick={hideModalConfirm}>
							Отмена
						</button>
				</div>
				</div>
			</div>
		</div>
	);
};

const mapMethodsToProps = (adminAccountService) => ({
	deleteNews: adminAccountService.deleteNews,
	deleteUser: adminAccountService.deleteUser
});

const mapStateToProps = ({news: {IdNewsDeleted, pieceDeletedHeader},
			users: {IdUserDeleted} = {}}) => ({
	IdNewsDeleted,
	IdUserDeleted,
	pieceHeader: pieceDeletedHeader
});

const mapDispatchToProps = (dispatch) => ({
	newsDeleteRequested: () => dispatch(newsDeleteRequested()),
	newsDeleted: (data) => dispatch(newsDeleted(data)),
	newsDeleteError: (error) => dispatch(newsDeleteError(error)),
	addIdNewsDeleted: (id) => dispatch(addIdNewsDeleted(id)),
	addIdUserDeleted: (id) => dispatch(addIdUserDeleted(id)),
	userDeleteRequested: () => dispatch(userDeleteRequested()),
	userDeleted: (data) => dispatch(userDeleted(data)),
	userDeleteError: (error) => dispatch(userDeleteError(error))
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ModalConfirm);