import React from 'react';
import App from './src/App.jsx';
import './src/index.css';
import './src/App.css';

export function ValentinesTemplate2({ data = {} }) {
  return <App data={data} />;
}

export const ProveYourLoveTemplate = ValentinesTemplate2;
export const ProveYourLoveValTemplate = ValentinesTemplate2;
export const ReasonsILoveYouTemplate = ValentinesTemplate2;
export default ValentinesTemplate2;


