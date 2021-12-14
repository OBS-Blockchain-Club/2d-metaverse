import { Redirect } from 'react-router-dom';

export function RedirectToHome({ location }) {
    return <Redirect to={{ ...location, pathname: '/' }} />
}