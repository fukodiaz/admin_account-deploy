import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import ErrorBoundry from './components/error-boundry';
import {AdminAccountServiceProvider} from './components/admin-account-service-context';
import App from './components/app';

import store from './store';
import AdminAccountService from './services/admin-account-service';

const adminAccountService = new AdminAccountService();

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<AdminAccountServiceProvider value={adminAccountService}>
				<Router>
					<App />
				</Router>
			</AdminAccountServiceProvider>
		</ErrorBoundry>
	</Provider>,
	document.getElementById('root'));