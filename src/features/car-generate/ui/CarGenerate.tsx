import { useCallback } from 'react';
import { carApi } from '../../../entities/car/api/carApi';
import Button from '../../../shared/ui/Button/Button';
import { generateCars } from '../lib/functions';

function CarGenerate() {
  const [createCar, { isLoading, isError, error }] = carApi.useCreateCarMutation();

  const generateAndCreateCars = useCallback(() => {
    const cars = generateCars();
    cars.forEach(async (car) => createCar(car));
  }, [createCar]);

  if (isLoading) {
    return <Button name="Loading..." disabled onClick={generateAndCreateCars} />;
  }
  if (isError) {
    console.error(error);
    return <div>Error</div>;
  }

  return <Button name="Generate cars" onClick={generateAndCreateCars} />;
}

export default CarGenerate;
