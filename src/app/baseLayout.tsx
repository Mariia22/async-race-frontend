import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Header from '../widgets/header/ui/Header';
import routes from '../shared/lib/routes';
import { MESSAGES } from '../shared/lib/const';

const baseLayout = (
  <ErrorBoundary fallback={<div>{MESSAGES.appError}</div>}>
    <header>
      <Header routes={routes} />
    </header>
    <main>
      <Outlet />
    </main>
  </ErrorBoundary>
);
export default baseLayout;
