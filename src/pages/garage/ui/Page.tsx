import { useEffect, useState } from 'react';
import ControlPanel from '../../../widgets/controlPanel/ui/ControlPanel';
import Pagination from '../../../shared/ui/Pagination/ui/Pagination';
import {
  FINISH, START, CARSPERPAGE, MESSAGES,
} from '../../../shared/lib/const';
import { carApi } from '../../../entities/car/api/carApi';
import { CarItemType } from '../../../entities/car/model/types';
import Car from '../../../entities/car/ui/Car';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import { selectedCurrentCarPage, setCarCurrentPage } from '../../../entities/car/model/carSlice';
import styles from './style.module.scss';

function GaragePage() {
  const currentPage = useAppSelector(selectedCurrentCarPage);
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(window.innerWidth - FINISH - START);
  const {
    data, isLoading, isFetching, isSuccess, isError, error,
  } = carApi.useGetAllCarsQuery(currentPage);
  let content;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - FINISH - START);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading) {
    content = <div>{MESSAGES.loading}</div>;
  }

  if (!isFetching && data?.count === 0) {
    content = <div>{MESSAGES.noCarsInTheGarage}</div>;
  }

  if (isSuccess) {
    content = (
      <>
        <div className={styles.garageCars}>
          {data.result?.map((car: CarItemType) => (
            <div key={car.id}>
              <Car key={car.id} car={car} screenSize={width} totalCount={Number(data?.count)} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalCount={data?.count}
          pageSize={CARSPERPAGE}
          onPageChange={(page) => dispatch(setCarCurrentPage(page))}
        />
      </>
    );
  }

  if (isError) {
    content = <div>{`${MESSAGES.pageNotLoad}, Error:${error}`}</div>;
  }

  return (
    <section className={styles.garage}>
      <h1>
        GARAGE (
        {data?.count || 0}
        )
      </h1>
      <h2>
        Page #
        {currentPage}
      </h2>
      <ControlPanel currentPage={currentPage} screenSize={width} />
      {content}
    </section>
  );
}
export default GaragePage;
