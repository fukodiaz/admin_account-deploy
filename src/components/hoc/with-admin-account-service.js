import React from 'react';
import { AdminAccountServiceConsumer } from '../admin-account-service-context';

const withAdminAccountService = (mapMethodsToProps) => (Wrapped) => {
	return (props) => {
		return (
			<AdminAccountServiceConsumer>
				{
					(adminAccountService) => {
						const propsFromService = mapMethodsToProps(adminAccountService);
						return (<Wrapped {...props} {...propsFromService} />);
					}
				}
			</AdminAccountServiceConsumer>
		);
	};
};

export default withAdminAccountService;