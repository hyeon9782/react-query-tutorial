import { Link } from "react-router-dom";

const Header = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/super-heroes">SuperHeroesPage</Link>
      </li>
      <li>
        <Link to="/rq-super-heroes">RQSuperHeroesPage</Link>
      </li>
      <li>
        <Link to="/rq-parallel">ParallelQueriesPage</Link>
      </li>
      <li>
        <Link to="/rq-paginated">PaginatedQueriesPage</Link>
      </li>
    </ul>
  );
};

export default Header;
