import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import {newsImageRequested, newsImagePosted, 
			newsImageError, newsDataRequested, 
			newsDataPosted, newsDataError, inputChanged,
			putNewsRequested, putNewsSuccess, putNewsError} from '../../actions';

import FormNews from '../form-news';
import {onClickModalBox, hideModal, changeStyleInvalidInput} from '../../utils';
import styles from './modal-news.m.less';

class ModalNews extends Component {

	handleKeyDown = (e) => {
		if (e.code === 'Escape' && document.querySelector('[class^="modalBox"]').style.display === 'block') {
			hideModal('[class^="modalBox"]');
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const {postNewsData, newsDataRequested, newsDataPosted, newsDataError, 
			theme, text, urlImage, flagImageFile, methodNews, entityId,
			putNewsData, putNewsRequested, putNewsSuccess, putNewsError} = this.props;

		if (theme === '' || text === '' || !urlImage && !flagImageFile) {
			if (theme === '') {
				changeStyleInvalidInput('[class^="inputThemeNews"]');
			}
			if (text === '') {
				changeStyleInvalidInput('[class^="textareaNews"]');
			}
			if (!urlImage && !flagImageFile) {
				changeStyleInvalidInput('[class^="inputLinkImage"]');
				changeStyleInvalidInput('[class^="boxFileImage"]');
			}
			return null;}

			const formData = new FormData(e.target);

			if (methodNews === 'PUT') {
				putNewsRequested();
				putNewsData(entityId, formData)
					.then(data => {
						putNewsSuccess(data);
						console.log(data, '222put');
					})
					.catch(error => putNewsError(error))
					.finally(() => {
						e.target.reset();
						hideModal('[class^="modalBox"]');
					});
			}

			if (methodNews === 'POST') {
				newsDataRequested();
				postNewsData(formData)
					.then(data => {
						newsDataPosted(data); 
						console.log(data, '222ggg');
					})
					.catch(error => newsDataError(error))
					.finally(() => {
						e.target.reset();
						hideModal('[class^="modalBox"]');
					});
				} 
	}

	onChangeImage = (e) => {
		e.preventDefault();

		if (e.target.files[0]) {
			const formData = new FormData();
			formData.append('image', e.target.files[0]);
			this.props.newsImageRequested();

			this.props.postNewsImage(formData)
				.then(data => {
					this.props.newsImagePosted(data);
					document.querySelector('[class^="inputLinkImage"]').style.outline='none';
					document.querySelector('[class^="boxFileImage"]').style.outline='none';
				})
				.catch(error => this.props.newsImageError(error));
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	render() {
		const {headingModal, inputChanged,theme, 
				text, urlImage, nameFileImage} = this.props; 
		return (
			<div className={styles.modalBox}
					onClick={(e) => onClickModalBox('[class^="modalBox"]', e)}>
				<div className={styles.modalNewsDialog}>
					<div className={styles.modalNewsContent}>
						<h3 className={styles.headingModal}>
							{headingModal}
						</h3>
						<FormNews onChangeImage={this.onChangeImage} handleSubmit={this.handleSubmit}
									inputChanged = {inputChanged} theme={theme} text={text}
									urlImage={urlImage}	nameFileImage={nameFileImage} />
					</div>
				</div>
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	postNewsImage: adminAccountService.postNewsImage,
	postNewsData: adminAccountService.postNewsData,
	putNewsData: adminAccountService.putNewsData
});

const mapStateToProps = ({news: {headingModal, newsImage, newsData, 
	theme, text, urlImage, nameFileImage, methodNews, entityId, flagImageFile}}) => ({
	headingModal, newsImage, newsData,theme, text, urlImage,
	nameFileImage, methodNews, entityId, flagImageFile
});

const mapDispatchToProps = (dispatch) => ({
	newsImageRequested: () => dispatch(newsImageRequested()),
	newsImagePosted: (data) => dispatch(newsImagePosted(data)),
	newsImageError: (error) => dispatch(newsImageError(error)),
	newsDataRequested: () => dispatch(newsDataRequested()),
	newsDataPosted: (data) => dispatch(newsDataPosted(data)),
	newsDataError: (error) => dispatch(newsDataError(error)),
	inputChanged: (fieldName, data) => dispatch(inputChanged(fieldName, data)),
	putNewsRequested: () => dispatch(putNewsRequested()),
	putNewsSuccess: (data) => dispatch(putNewsSuccess(data)),
	putNewsError: (error) => dispatch(putNewsError(error))
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ModalNews);