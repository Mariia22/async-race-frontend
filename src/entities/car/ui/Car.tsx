import CarDeleteButton from '../../../features/car-delete/ui/CarDeleteButton';
import Button from '../../../shared/ui/Button/Button';
import CarIcon from '../assets/car.svg?react';
import { CarItemType } from '../model/types';

function Car({ id, name, color }: CarItemType) {
  return (
    <>
      <div>
        <Button name="Select" onClick={() => console.log('create')} />
        <CarDeleteButton id={id} />
      </div>
      <div>
        <Button name="A" onClick={() => console.log('create')} />
        <Button name="B" onClick={() => console.log('create')} />
      </div>
      <CarIcon fill={color} />
      <p>{name}</p>
    </>
  );
}
export default Car;
