import {
    Navigate,
    Outlet
} from 'react-router-dom';
import { isAuthenticated } from '../../app/pages/authentication/requireAuth';

export const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/" />
};
