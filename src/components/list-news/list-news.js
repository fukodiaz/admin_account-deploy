import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import {openModalCreationNews, showAllNews, addIdNewsDeleted,
			fetchNewsList, openModalEditNews} from '../../actions';
import { openModal } from '../../utils';

import NewsItem from '../news-item';
import ModalConfirm from '../modal-confirm';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import styles from './list-news.m.less';

class ListNews extends Component {

	componentDidMount() {
		this.props.fetchNewsList();
	}

	createNews = () => {
		this.props.openModalCreationNews();
		openModal('[class^="modalBox"]');
	};

	createNewsItem = (data) => {
		const {entityId} = data;
		return <NewsItem {...data} editNewsItem={(e) => this.editNewsItem(e, data)}
								openModalConfirm={(e) => this.openModalConfirm(e, entityId)} />;
	}

	editNewsItem = (e, data) => {
		this.props.openModalEditNews(data);
		openModal('[class^="modalBox"]');
	}

	openModalConfirm = (e, idNewsDeleted) => {
		this.props.addIdNewsDeleted(idNewsDeleted);
		openModal('[class^="modalConfirm"]');
	}

	render() {
		const {showAllNews, visibleNewsList, newsListLoading, newsListError} = this.props;
		const contentListNews = visibleNewsList ? visibleNewsList.map(this.createNewsItem) : null;

		if (newsListLoading) { 
			return( 
			<div className={styles.boxAdditional}>
				<Spinner />
			</div> )} 

		if (newsListError) { return <ErrorIndicator /> }

		return (
			<div className={styles.containerNews}>
				<ul className={styles.listNews}>
					{contentListNews}
				</ul>
				<button type="button" className={styles.btnCreateNews}
							onClick={this.createNews}>
					Создать новость
				</button>
				<button type="button" className={styles.btnShowAllNews}
							onClick={showAllNews}>
					Показать все новости
				</button>
				<ModalConfirm />
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	getNewsList: adminAccountService.getNewsList,
});

const mapStateToProps = ({news: {visibleNewsList, newsListLoading, newsListError}}) => ({
	visibleNewsList, newsListLoading, newsListError
});

const mapDispatchToProps = (dispatch, {getNewsList}) => ({
	openModalCreationNews: () => dispatch(openModalCreationNews()),
	openModalEditNews: (data) => dispatch(openModalEditNews(data)),
	showAllNews: () => dispatch(showAllNews()),
	addIdNewsDeleted: (id) => dispatch(addIdNewsDeleted(id)),
	fetchNewsList: () => fetchNewsList(getNewsList, dispatch)()
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ListNews);