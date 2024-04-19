import { useState } from 'react';
import ControlPanel from '../../../widgets/controlPanel/ui/ControlPanel';
import RaceTrack from '../../../entities/race/ui/RaceTrack';
import Pagination from '../../../shared/ui/Pagination/ui/Pagination';
import { routes } from '../../../shared/lib/const';

function GaragePage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageNumber = 1;
  const carNumber = 1;
  return (
    <>
      <h1>
        {routes[0].name}
        (
        {carNumber}
        )
      </h1>
      <h2>
        Page #
        {pageNumber}
      </h2>
      <ControlPanel />
      <RaceTrack />
      <Pagination
        currentPage={currentPage}
        totalCount={10}
        pageSize={7}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
export default GaragePage;
