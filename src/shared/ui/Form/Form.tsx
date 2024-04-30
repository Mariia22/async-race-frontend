import { useState } from 'react';
import Button from '../Button/Button';
import { INITIALCOLOR, MESSAGES } from '../../lib/const';
import styles from './style.module.scss';

type Props = {
  name: string;
  initialState: { id: number; name: string; color: string } | null;
  clickHandler: (id: number, name: string, color: string) => Promise<void>;
  changeNameHandler: (name: string) => void;
  changeColorHandler: (color: string) => void;
};

function Form({
  name, clickHandler, initialState, changeNameHandler, changeColorHandler,
}: Props) {
  const carName = initialState?.name || '';
  const carColor = initialState?.color || INITIALCOLOR;
  const [formError, setFormError] = useState<string>('');

  async function submitForm(event: React.MouseEvent | React.KeyboardEvent) {
    event.preventDefault();
    if (carName === '' || carName.length < 3) {
      setFormError(MESSAGES.carEnterError);
    } else {
      await clickHandler(initialState?.id || 0, carName, carColor);
      setFormError('');
    }
  }

  return (
    <form className={styles.carForm}>
      <input
        name="carName"
        type="text"
        placeholder="Type car brand"
        value={carName}
        onChange={(event) => changeNameHandler(event.target.value)}
      />
      <input
        name="color"
        type="color"
        value={carColor}
        onChange={(event) => changeColorHandler(event.target.value)}
      />
      <Button
        name={name}
        disabled={!initialState}
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
