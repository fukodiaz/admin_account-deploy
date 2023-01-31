import React from 'react';

const {
	Provider: AdminAccountServiceProvider,
	Consumer: AdminAccountServiceConsumer
} = React.createContext();

export {
	AdminAccountServiceConsumer,
	AdminAccountServiceProvider
};