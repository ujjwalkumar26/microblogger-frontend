import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import ApolloProvider from './ApolloProvider';
const root = createRoot(document.getElementById('root'));
root.render(ApolloProvider);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
