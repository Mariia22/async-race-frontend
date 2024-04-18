import React from 'react';
import Button from '../../../shared/ui/Button/Button';
import generateCar from '../../../features/car-generate/lib/generateCar';

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
      <div style={{ width: '150px', height: '50px' }}>{generateCar('#000000')}</div>
    </>
  );
}
export default Car;
