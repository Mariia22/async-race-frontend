import React from 'react';
import { Outlet } from 'react-router-dom';
import { routes } from '../shared/lib/const';
import LayoutHeader from '../widgets/LayoutHeader/ui/LayoutHeader';

const baseLayout = (
  <>
    <header>
      <LayoutHeader routes={routes} />
    </header>
    <main>
      <Outlet />
    </main>
  </>
);
export default baseLayout;
