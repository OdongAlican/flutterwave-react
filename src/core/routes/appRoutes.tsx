import {
    Route,
    Routes
} from 'react-router';
import Home from '../../app/pages/home';
import { ROUTES } from './routes';
import ListDocuments from '../../app/pages/listDocuments';

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path={ROUTES.LIST_DOCUMENTS} element={<ListDocuments />} />
        </Routes>
    )
}

export default AppRoutes;
