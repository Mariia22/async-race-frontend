import ControlRace from '../../../features/race-control/ui/ControlRace';
import CarForm from '../../../features/car-create-update/ui/CarForm';
import CarGenerate from '../../../features/car-generate/ui/CarGenerate';

function ControlPanel() {
  return (
    <div>
      <ControlRace />
      <CarForm name="Create" onClick={() => console.log('create')} />
      <CarForm name="Update" onClick={() => console.log('update')} />
      <CarGenerate />
    </div>
  );
}

export default ControlPanel;
