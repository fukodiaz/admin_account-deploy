import React, {Component} from 'react';
import {connect} from 'react-redux';
import { openBlock } from '../../actions';

import FormPersonalData from '../form-personal-data';

import styles from './personal-data.m.less';

class PersonalData extends Component {

	render() {

		const {flagOpenPersonal, openBlock} = this.props;
		let contentItemList = flagOpenPersonal ? <FormPersonalData /> : null;

		return (
			<li className={styles.itemPersonalData}>
				<button className={styles.buttonPersonalData}
							onClick={openBlock}>
					<h2 className={styles.headerPersonalData}>
						Персональные данные
					</h2>
				</button>
				{contentItemList}
			</li>
		);
	}
}

const mapStateToProps = ({personalData: {flagOpenPersonal}}) => ({
	flagOpenPersonal
});

const mapDispatchToProps = (dispatch) => ({
	openBlock: () => dispatch(openBlock('personalData'))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);