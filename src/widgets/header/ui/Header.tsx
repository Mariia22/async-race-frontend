import { Link } from 'react-router-dom';
import { RouteType } from '../../../shared/lib/types';
import styles from './style.module.scss';

type Props = {
  routes: RouteType[] | RouteType;
};

function Header({ routes }: Props) {
  return (
    <nav>
      <ul className={styles.headerList}>
        {Array.isArray(routes) ? (
          routes.map((link) => (
            <li key={link.key} className={styles.headerListItem}>
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
