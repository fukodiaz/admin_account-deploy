import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import { fetchDirectories, openModalDirectories, showAllDirectories } from '../../actions';

import DirectoriesItem from '../directories-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import styles from './list-directories.m.less';

class ListDirectories extends Component {

	componentDidMount() {
		this.props.fetchDirectories();
	}

	createDirectory = (data, idx) => {
		const {entityId, label, list, type} = data;
		const {openModalDirectories} = this.props;
		return (
			<li key={entityId}>
				<DirectoriesItem {...data} idx={idx}
					openModalDirectories={() => openModalDirectories({label, list, type, entityId})} />
			</li>
		);
	}

	render() {
		const {visibleDirectories, directoriesLoading, directoriesError, showAllDirectories} = this.props;
		const contentDirectoriesList = visibleDirectories ? visibleDirectories.map(this.createDirectory) : null;

		if (directoriesLoading) { 
			return( 
			<div className={styles.boxAdditional}>
				<Spinner />
			</div> )} 

		if (directoriesError) { return <ErrorIndicator />}

		return (
			<div className={styles.containerDirectories}>
				<ul className={styles.listDirectories}>
					{contentDirectoriesList}
				</ul>
				<button type="button" className={styles.btnShowAllDirect}
								onClick={showAllDirectories}>
					Показать все справочники
				</button>
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	getDataDirectories: adminAccountService.getDataDirectories,
});

const mapStateToProps = ({users: {directoriesList, directoriesLoading, 
								directoriesError,visibleDirectories}}) => ({
	directoriesList, directoriesLoading, 
	directoriesError, visibleDirectories
});

const mapDispatchToProps = (dispatch, {getDataDirectories}) => ({
	fetchDirectories: () => fetchDirectories(getDataDirectories, dispatch)(),
	showAllDirectories: () => dispatch(showAllDirectories()),
	openModalDirectories: (data) => dispatch(openModalDirectories(data)),
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ListDirectories);