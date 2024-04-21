import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { initialColor } from '../../lib/const';

type Props = {
  name: string;
  clickHandler: (id: number, name: string, color: string) => Promise<void>;
  initialState: { id: number; name: string; color: string };
};

function Form({ name, clickHandler, initialState }: Props) {
  const [carName, setCarName] = useState<string>('');
  const [carColor, setColorName] = useState<string>(initialColor);
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    setCarName(initialState.name);
    setColorName(initialState.color);
  }, [initialState]);

  async function submitForm(event: React.MouseEvent | React.KeyboardEvent) {
    event.preventDefault();
    if (carName === '' || carName.length < 3) {
      setFormError('Please enter car name');
    } else {
      await clickHandler(initialState.id, carName, carColor);
      setCarName('');
      setColorName(initialColor);
      setFormError('');
    }
  }

  return (
    <form>
      <input
        name="carName"
        type="text"
        placeholder="Car name"
        value={carName}
        onChange={(event) => setCarName(event.target.value)}
      />
      <input
        name="color"
        type="color"
        value={carColor}
        onChange={(event) => setColorName(event.target.value)}
      />
      <Button
        name={name}
        isFormSubmit
        onClick={async (event) => {
          await submitForm(event);
        }}
      />
      <div>{formError}</div>
    </form>
  );
}

export default Form;
