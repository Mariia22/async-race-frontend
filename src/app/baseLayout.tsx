import { Outlet } from 'react-router-dom';
import { routes } from '../shared/lib/const';
import Header from '../widgets/header/ui/Header';

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
