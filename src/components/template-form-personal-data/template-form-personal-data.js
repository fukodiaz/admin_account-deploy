import React from 'react';

import styles from './template-form-personal-data.m.less';
import pencil from './pencil.svg';

const TemplateFormPersonalData = (props) => {

	const {
		handleSubmit, photoImage,
		onChangePhoto, disabled,
		fio, email, inputChanged,
		editingPersonalData, classForm } = props;


	return (
		<div className={styles.containerFormPersonal}>
			<form encType="multipart/form-data" className={styles[`${classForm}`]}
						onSubmit={handleSubmit}>
				<div className={styles.wrapperInputs}>
					<div className={styles.blockPhoto}>
						<label htmlFor="photo" className={styles.labelPhotoPersonal}>
							<span>Загрузить фото</span>
							{photoImage}
						</label>
						<input type="file" id="photo" name="photo"
									accept="image/jpeg, image/png"
									className={styles.inputPhotoPersonal} 
									onChange={onChangePhoto} disabled={disabled} />
					</div>
					<div className={styles.blockTextData}>
						<div className={styles.blockFIO}>
							<label htmlFor="fio" className={styles.labelTextData}>
								ФИО
							</label>
							<input type="text" name="fio" 
										onChange={(e) => inputChanged('fio', e.target.value)}
										value={fio} 
										className={styles.inputTextData} 
										placeholder="Васильев Иван Романович" 
										id="fio" 
										required disabled={disabled} />
						</div>
						<div className={styles.blockEmail}>
							<label htmlFor="email" className={styles.labelTextData}>
								Email
							</label>
							<input type="email" name="email" 
										onChange={(e) => inputChanged('email', e.target.value)}
										value={email}	
										className={styles.inputTextData} 
										placeholder="vasiliev@gmail.com" 
										id="email" 
										required disabled={disabled} />
						</div>
					</div>
				</div>
				<button type="submit" className={styles.buttonPersonal}>
					Сохранить
				</button>
			</form>
			<button type="button" className={styles.buttonEditing}
						onClick={editingPersonalData}>
				Редактировать
				<p className={styles.svgBox}>
					<svg width="20" height="20">
						<use href={`${pencil}#pencil`}></use>
					</svg>
				</p>
			</button>
		</div>
	);
};

export default TemplateFormPersonalData;