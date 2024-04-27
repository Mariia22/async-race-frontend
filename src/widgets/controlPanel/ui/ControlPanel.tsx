import ControlRace from '../../../features/race-control/ui/ControlRace';
import CarGenerate from '../../../features/car-generate/ui/CarGenerate';
import CarCreateForm from '../../../features/car-create/ui/CarCreateForm';
import CarUpdateForm from '../../../features/car-update/ui/CarUpdateForm';

type Props = {
  currentPage: number;
  screenSize: number;
};

function ControlPanel({ currentPage, screenSize }: Props) {
  return (
    <>
      <ControlRace currentPage={currentPage} screenSize={screenSize} />
      <CarCreateForm />
      <CarUpdateForm />
      <CarGenerate />
    </>
  );
}

export default ControlPanel;
