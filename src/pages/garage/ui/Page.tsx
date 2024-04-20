import { Fragment, useState } from 'react';
import ControlPanel from '../../../widgets/controlPanel/ui/ControlPanel';
import RaceTrack from '../../../entities/race/ui/RaceTrack';
import Pagination from '../../../shared/ui/Pagination/ui/Pagination';
import { limitCarsPerPage, routes } from '../../../shared/lib/const';
import { carApi } from '../../../entities/car/api/carApi';
import { CarItemType } from '../../../entities/car/model/types';
import Car from '../../../entities/car/ui/Car';

function GaragePage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isFetching, isSuccess } = carApi.useGetAllCarsQuery(currentPage);
  let content;

  if (isFetching) {
    content = <div>Loading...</div>;
  }

  if (!isFetching && data?.count === 0) {
    content = <div>There are no cars in the garage</div>;
  }

  if (isSuccess) {
    content = (
      <div>
        {data.result?.map((car: CarItemType) => (
          <Fragment key={car.id}>
            <Car key={car.id} id={car.id} name={car.name} color={car.color} />
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <>
      <h1>
        {routes[0].name}
        (
        {data?.count || 0}
        )
      </h1>
      <h2>
        Page #
        {currentPage}
      </h2>
      <ControlPanel />
      <RaceTrack />
      {content}
      <Pagination
        currentPage={currentPage}
        totalCount={data?.count}
        pageSize={limitCarsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
export default GaragePage;
