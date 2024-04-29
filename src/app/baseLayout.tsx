import { Outlet } from 'react-router-dom';
import Header from '../widgets/header/ui/Header';
import routes from '../shared/lib/routes';

const baseLayout = (
  <>
    <header>
      <Header routes={routes} />
    </header>
    <main>
      <Outlet />
    </main>
  </>
);
export default baseLayout;
