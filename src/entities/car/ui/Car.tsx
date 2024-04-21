import CarDeleteButton from '../../../features/car-delete/ui/CarDeleteButton';
import CarSelectButton from '../../../features/car-select/ui/CarSelectButton';
import CarStartEngine from '../../../features/car-start-engine/ui/CarStartEngine';
import CarStopEngine from '../../../features/car-stop-engine/ui/CarStopEngine';
import CarIcon from '../assets/car.svg?react';
import { CarItemType } from '../model/types';

function Car({ id, name, color }: CarItemType) {
  return (
    <>
      <div>
        <CarSelectButton id={id} name={name} color={color} />
        <CarDeleteButton id={id} />
      </div>
      <div>
        <CarStartEngine id={id} />
        <CarStopEngine id={id} />
      </div>
      <CarIcon fill={color} />
      <p>{name}</p>
    </>
  );
}
export default Car;
