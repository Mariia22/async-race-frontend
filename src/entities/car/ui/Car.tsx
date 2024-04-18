import React from 'react';
import Button from '../../../shared/ui/Button/Button';
import CarSvg from '../assets/car.svg?react';

function Car() {
  return (
    <>
      <div>
        <Button name="Select" onClick={() => console.log('create')} />
        <Button name="Remove" onClick={() => console.log('create')} />
      </div>
      <div>
        <Button name="A" onClick={() => console.log('create')} />
        <Button name="B" onClick={() => console.log('create')} />
      </div>
      <CarSvg fill="red" />
    </>
  );
}
export default Car;
