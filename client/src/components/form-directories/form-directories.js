import React from 'react';

import styles from './form-directories.m.less';

const FormDirectories = (props) => {
	const {labelSearch, list, type, contentLabels,
			contentInputs, additLabel, additInput,
			inputChanged, searchTitle, handleSubmit} = props; 

	const btnSubmitTitle = type === 'extendable' ? 
			<button type="submit" className={styles.btnSubmitTitle}>
				Сохранить </button> : null;

	return (
		<div className={styles.boxFormDirect}>
			<form className={styles.formDirect}
					onSubmit={handleSubmit}>
				<div className={styles.boxSearch}>
					<label htmlFor="searchTitle" className={styles.labelSearchTitle}>
						{labelSearch}
					</label>
					<input type="search" name="searchTitle" 
								onChange={(e) => inputChanged('searchTitle', e.target.value)}
								value={searchTitle}
								className={styles.inputSearchTitle} 
								placeholder="Поиск по названию" 
								id="searchTitle" />
				</div>

				<div className={styles.containerTiles}>
					<div className={styles.boxLabels}>
						<h3 className={styles.headingBoxLabels}>Идентификатор</h3>
						<ul className={styles.listLabels}>
							{additLabel}
							{contentLabels}
						</ul>
					</div>
					<div className={styles.boxInputsTitle}>
						<h3 className={styles.headingBoxInputs}>Название</h3>
						<ul className={styles.listInputs}>
							{additInput}
							{contentInputs}
						</ul>
					</div>
				</div>
				<div className={styles.boxBtns}>
					{btnSubmitTitle}
				</div>
			</form>
		</div>
	);
};

export default FormDirectories;