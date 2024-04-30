import { useCallback } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import Button from '../../../shared/ui/Button/Button';
import { generateCars } from '../lib/functions';
import { MESSAGES } from '../../../shared/lib/const';
import { serverErrorHandler } from '../../../shared/lib/functions';

function CarGenerate() {
  const [createCar, { isLoading, isError, error }] = carApi.useCreateCarMutation();

  const generateAndCreateCars = useCallback(() => {
    const cars = generateCars();
    cars.forEach(async (car) => createCar(car));
  }, [createCar]);

  if (isLoading) {
    return <Button name={MESSAGES.loading} disabled onClick={generateAndCreateCars} />;
  }
  if (isError) {
    return <div>{`${MESSAGES.carsAreNotGenerated} ${serverErrorHandler(error)}`}</div>;
  }

  return <Button name="Generate cars" onClick={generateAndCreateCars} />;
}

export default CarGenerate;
