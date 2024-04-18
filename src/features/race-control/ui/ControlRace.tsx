import Button from '../../../shared/ui/Button/Button';

function ControlRace() {
  return (
    <div>
      <Button name="Race" onClick={() => console.log('race')} />
      <Button name="Reset" onClick={() => console.log('reset')} />
    </div>
  );
}

export default ControlRace;
