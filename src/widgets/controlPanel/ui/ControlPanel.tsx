import ControlRace from '../../../features/race-control/ui/ControlRace';
import CarGenerate from '../../../features/car-generate/ui/CarGenerate';
import CarCreateForm from '../../../features/car-create/ui/CarCreateForm';
import CarUpdateForm from '../../../features/car-update/ui/CarUpdateForm';

function ControlPanel() {
  return (
    <>
      <ControlRace />
      <CarCreateForm />
      <CarUpdateForm />
      <CarGenerate />
    </>
  );
}

export default ControlPanel;
