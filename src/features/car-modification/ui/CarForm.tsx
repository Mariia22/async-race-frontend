import React from 'react';
import Button from '../../../shared/ui/Button/Button';

type Props = {
  name: string;
  onClick: () => void;
};

function CarForm({ name, onClick }: Props) {
  return (
    <form>
      <input type="text" placeholder="Car name" />
      <input type="color" />
      <Button name={name} isFormSubmit onClick={onClick} />
    </form>
  );
}

export default CarForm;
