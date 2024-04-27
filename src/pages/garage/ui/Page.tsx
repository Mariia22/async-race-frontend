import { Fragment, useEffect, useState } from 'react';
import ControlPanel from '../../../widgets/controlPanel/ui/ControlPanel';
import Pagination from '../../../shared/ui/Pagination/ui/Pagination';
import { distanceAfterFlag, limitCarsPerPage, routes } from '../../../shared/lib/const';
import { carApi } from '../../../entities/car/api/carApi';
import { CarItemType } from '../../../entities/car/model/types';
import Car from '../../../entities/car/ui/Car';

function GaragePage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [width, setWidth] = useState(window.innerWidth - distanceAfterFlag);
  const {
    data, isLoading, isFetching, isSuccess, isError, error,
  } = carApi.useGetAllCarsQuery(currentPage);
  let content;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - distanceAfterFlag);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading) {
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
            <Car key={car.id} car={car} screenSize={width} />
          </Fragment>
        ))}
      </div>
    );
  }

  if (isError) {
    console.log(error);
    content = <div>error</div>;
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
      <ControlPanel currentPage={currentPage} screenSize={width} />
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
