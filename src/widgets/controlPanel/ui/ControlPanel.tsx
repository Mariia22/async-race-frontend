import ControlRace from '../../../features/race-control/ui/ControlRace';
import CarGenerate from '../../../features/car-generate/ui/CarGenerate';
import CarCreateForm from '../../../features/car-create/ui/CarCreateForm';
import CarUpdateForm from '../../../features/car-update/ui/CarUpdateForm';
import styles from './style.module.scss';

type Props = {
  currentPage: number;
  screenSize: number;
};

function ControlPanel({ currentPage, screenSize }: Props) {
  return (
    <section className={styles.controlPanel}>
      <ControlRace currentPage={currentPage} screenSize={screenSize} />
      <CarCreateForm />
      <CarUpdateForm />
      <CarGenerate />
    </section>
  );
}

export default ControlPanel;
