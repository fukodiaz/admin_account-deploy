import React from 'react';
import {connect} from 'react-redux';
import { openBlock } from '../../actions';

import ListNews from '../list-news';

import styles from './news-editing.m.less';

const NewsEditing = ({flagOpenNews, openBlock}) => {
	const contentNews = flagOpenNews ? <ListNews /> : null;

	return (
		<li>
			<button className={styles.buttonNewsEditing}
						onClick={openBlock}>
				<h2 className={styles.headerNewsEditing}>
					Редактирование новостей
				</h2>
			</button>
			{contentNews}
		</li>
	);
};

const mapStateToProps = ({news: {flagOpenNews}}) => ({
	flagOpenNews
});

const mapDispatchToProps = (dispatch) => ({
	openBlock: () => dispatch(openBlock('newsEditing'))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsEditing);