import {
    Route,
    Routes
} from 'react-router';
import Home from '../../app/pages/home';
import { ROUTES } from './routes';
import ListDocuments from '../../app/pages/listDocuments';
import SearchComponent from '../../app/pages/search';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} >
                <Route index element={<SearchComponent />} />
                <Route path={ROUTES.LIST_DOCUMENTS} element={<ListDocuments />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;
