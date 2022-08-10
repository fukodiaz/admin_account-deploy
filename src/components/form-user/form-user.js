import React from 'react';

import SelectItems from '../select-items';
import styles from './form-user.m.less'

const FormUser = (props) => {
	const {heading, dataOptionsDepartments, inputChanged, 
			dataOptionsPositions, position, department,
			onChangeRequiredInput, fio, email, phone,
			password, handleSubmit, onChangeSelect} = props;
	const contentHeading = heading === 'headingNewUser' ? 
				<span>Добавить сотрудника <br /> выбранного управления</span>
				: 'Редактировать данные сотрудника';
	
	return (
		<div className={styles.boxFormUser}>
			<form className={styles.formUser}
					onSubmit={handleSubmit}>
				<h3 className={styles.headingFormUser}>
					{contentHeading}
				</h3>
				<div className={styles.boxInputsUser}>
					<div className={styles.containerInputFIO}>
						<input type="text" name="fio_user" 
							onChange={(e) => onChangeRequiredInput(e,'fio_user','[class^="containerInputFIO"]')}
							value={fio}
							className={styles.inputFIOUser} 
							placeholder="ФИО" />
					</div>
					<div className={styles.containerSelectPosition}>
						<SelectItems 	value={position} name="position_user"
									dataOptions={dataOptionsPositions}
									onChangeSelect={(opt,name)=>onChangeSelect('[class^="position__control"]',opt,name)} 
									placeholder="Должность" isSearchable={false}
									prefix="position" height={167}/>
					</div>
					<div className={styles.containerInputEmail}>
						<input type="email" name="email_user" 
							onChange={(e) => onChangeRequiredInput(e,'email_user','[class^="containerInputEmail"]')}
							value={email}
							className={styles.inputEmailUser} 
							placeholder="Почта" />
					</div>
					<div className={styles.containerInputPhone}>
						<input type="tel" name="phone_user" 
									onChange={(e) => inputChanged('phone_user', e.target.value)}
									value={phone}
									className={styles.inputPhoneUser} 
									placeholder="Телефон" />
					</div>
					<div className={styles.containerSelectDepartment}>
						<SelectItems 	value={department} name="department_user"
									dataOptions={dataOptionsDepartments} isSearchable={false}
									onChangeSelect={(opt, name)=>onChangeSelect('[class^="depart__control"]', opt, name)}
									placeholder="Подразделение" prefix='depart' />
					</div>
					<div className={styles.containerInputPassword}>
						<input type="password" name="password_user" 
									onChange={(e) => inputChanged('password_user', e.target.value)}
									value={password}
									className={styles.inputPasswordUser} 
									placeholder="Пароль" />
					</div>
				</div>

				<div className={styles.boxBtnsFormUser}>
					<button type="submit" className={styles.btnSubmitFormUser}>
						Сохранить
					</button>
				</div>
			</form>
		</div>
	);
};

export default FormUser;