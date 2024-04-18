import React from 'react';
import { Link } from 'react-router-dom';
import { RouteType } from '../../../shared/lib/types';

type Props = {
  routes: RouteType[] | RouteType;
};

function Header({ routes }: Props) {
  return (
    <nav>
      <ul>
        {Array.isArray(routes) ? (
          routes.map((link) => (
            <li key={link.key}>
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))
        ) : (
          <li>
            <Link to={routes.link}>{routes.name}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Header;
