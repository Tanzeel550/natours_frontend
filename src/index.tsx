import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import AppRouter from './router/AppRouter';
import configStore from './store/configStore';
import './utils/style.css';
import Loading from './Components/LoadingComponent/Loading';

const jsx = (
    <Suspense fallback={<Loading/>}>
        <Provider store={configStore}>
            <AppRouter/>
        </Provider>
    </Suspense>
);

ReactDOM.render(jsx, document.getElementById('root'));

window.addEventListener('unhandledrejection', e =>
    console.error(`Unhandled rejection (promise: ${e.promise}, reason: ${e.reason}).`)
);
