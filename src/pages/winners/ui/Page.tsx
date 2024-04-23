import { useState } from 'react';
import { limitWinnersPerPage, routes } from '../../../shared/lib/const';
import Pagination from '../../../shared/ui/Pagination/ui/Pagination';

function WinnersPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  let content;
  return (
    <>
      <h1>
        {routes[1].name}
        (
        {/* {data?.count || 0} */}
        )
      </h1>
      <h2>
        Page #
        {currentPage}
      </h2>
      {content}
      <Pagination
        currentPage={currentPage}
        totalCount={2}
        pageSize={limitWinnersPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
export default WinnersPage;
