import Button from '../../../shared/ui/Button/Button';
import CarIcon from '../assets/car.svg?react';
import { CarItemType } from '../model/types';

function Car({ id, name, color }: CarItemType) {
  return (
    <div id={String(id)}>
      <div>
        <Button name="Select" onClick={() => console.log('create')} />
        <Button name="Remove" onClick={() => console.log('create')} />
      </div>
      <div>
        <Button name="A" onClick={() => console.log('create')} />
        <Button name="B" onClick={() => console.log('create')} />
      </div>
      <CarIcon fill={color} />
      <p>{name}</p>
    </div>
  );
}
export default Car;
