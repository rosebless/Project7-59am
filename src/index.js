import React from 'react';
import ReactDOM from 'react-dom';
import Typography from 'typography';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// config typography'
// use without theme plugin
const typography = new Typography({
  overrideStyles: () => ({
    div: {
      color: '#0978ad',
    },
    'p, label': {
      color: '#000'
    },
    'h1, h2, h3, h4, h5, h6, legend': {
      color: '#000',
    },
  }),
});
typography.injectStyles();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
