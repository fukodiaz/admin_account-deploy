import React from 'react';

import styles from './news-item.m.less';
import pencil from './pencil.svg';
import trash from './trash.svg';

const NewsItem = ({image, imageType, urlImage, theme,
			date, entityId, editNewsItem, openModalConfirm}) => {
				
	const src = image ? `data:${imageType};base64, ${image}` : urlImage;

	return (
		<li key={entityId}
				className={styles.newsItem}>
			<div className={styles.boxNews}>
				<img src={src} alt="photo news"
						className={styles.imageNews}/>
				<p className={styles.dateNews}>
					{date}
				</p>
				<p className={styles.themeNews}>
					{theme}
				</p>
				<button type="button" className={styles.buttonEdit}
						onClick={editNewsItem}>
					<p className={styles.svgBoxEdit}>
						<svg width="100%" height="100%">
							<use href={`${pencil}#pencil`}></use>
						</svg>
					</p>
				</button>
				<button type="button" className={styles.buttonDelete}
						onClick={openModalConfirm}>
					<p className={styles.svgBoxDelete}>
						<svg width="100%" height="100%">	
							<use href={`${trash}#trash`}></use>
						</svg>
					</p>
				</button>
			</div>
		</li>
	);
};

export default NewsItem;