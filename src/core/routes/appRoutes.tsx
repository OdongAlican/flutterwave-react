import {
    Route,
    Routes
} from 'react-router';
import Home from '../../app/pages/home';
import { ROUTES } from './routes';
import ListDocuments from '../../app/pages/listDocuments';
import SearchComponent from '../../app/pages/search';
import AuditTrails from '../../app/pages/trails';
import { PrivateRoute } from './privateRoute';
import BookMarks from '../../app/pages/bookmarks';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} >
                <Route index element={<SearchComponent />} />
                <Route path={`${ROUTES.LIST_DOCUMENTS}/:query`} element={<ListDocuments />} />
                <Route element={<PrivateRoute />}>
                    <Route path={ROUTES.MY_DOCUMENTS} element={<AuditTrails />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path={ROUTES.BOOKMARKS} element={<BookMarks />} />
                </Route>
            </Route>
        </Routes>
    )
};

export default AppRoutes;
