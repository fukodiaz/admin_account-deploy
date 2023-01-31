import React, {Component} from 'react';
import {connect} from 'react-redux';

import { editingPersonalData } from '../../actions';
import {compose, withAdminAccountService} from '../hoc';
import { 
	dataPersonalRequested, dataPersonalPosted,
	dataPersonalError, photoPersonalRequested,
	photoPersonalPosted, photoPersonalError, 
	inputChanged} from '../../actions';

import TemplateFormPersonalData from '../template-form-personal-data';
import styles from './form-personal-data.m.less';

class FormPersonalData extends Component {

	state = { image: null };

	handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		this.props.dataPersonalRequested();

		this.props.postDataPersonal(formData)
			.then(data => {
				this.props.dataPersonalPosted(data); 
				console.log(data, '222ggg');
			})
			.catch(error => {this.props.dataPersonalError(error); console.log(error, '444ererer');})
			.finally(() => e.target.reset());
	}

	onChangePhoto = (e) => {
		e.preventDefault();

		if (e.target.files[0]) {
			const formData = new FormData();
			formData.append('photo', e.target.files[0]);
			this.props.photoPersonalRequested();

			this.props.postPhotoPersonal(formData)
				.then(data => {
					this.props.photoPersonalPosted(data); 
					console.log(data, '222ggg');
					if (data.photo !== null) {
						this.setState({image: (<img src={`data:${data.imagePhotoType};base64, ${data.photo}`} 
																alt="personal photo" />)});
					}
				})
				.catch(error => {this.props.photoPersonalError(error); console.log(error, '444ererer');});
		}
	}

	render() {
		const {flagEditingPersonal, editingPersonalData,
					fio, email, inputChanged} = this.props;
		let classForm = flagEditingPersonal ? 'formPersonal' : 'formActive';
		let disabled = flagEditingPersonal ? true : false;

		return <TemplateFormPersonalData handleSubmit={this.handleSubmit}
						photoImage={this.state.image} onChangePhoto={this.onChangePhoto}
						disabled={disabled} inputChanged={inputChanged} classForm={classForm}
						fio={fio} email={email} editingPersonalData={editingPersonalData} />;
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	postDataPersonal: adminAccountService.postDataPersonal,
	postPhotoPersonal: adminAccountService.postPhotoPersonal
});

const mapStateToProps = ({personalData: {flagEditingPersonal, dataPersonal,
			photoPersonal, fio, email}}) => ({
	flagEditingPersonal, dataPersonal,
	photoPersonal, email, fio
});

const mapDispatchToProps = (dispatch) => ({
	editingPersonalData: () => dispatch(editingPersonalData()),
	dataPersonalRequested: () => dispatch(dataPersonalRequested()),
	dataPersonalPosted: (data) => dispatch(dataPersonalPosted(data)),
	dataPersonalError: (error) => dispatch(dataPersonalError(error)),
	photoPersonalRequested: () => dispatch(photoPersonalRequested()),
	photoPersonalPosted: (data) => dispatch(photoPersonalPosted(data)),
	photoPersonalError: (error) => dispatch(photoPersonalError(error)),
	inputChanged: (fieldName, data) => dispatch(inputChanged(fieldName, data))
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(FormPersonalData);