import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RacePossibleWinner } from '../../../entities/race/model/types';
import { winnerApi } from '../../../entities/winner/api/winnerApi';
import { WinnerDTO } from '../../../entities/winner/model/types';
import { StatusCode } from '../../../shared/lib/types';

const useUpdateWinner = () => {
  const [createWinner] = winnerApi.useCreateWinnerMutation();
  const [updateWinner] = winnerApi.useUpdateWinnerMutation();
  const [getWinner] = winnerApi.useLazyGetWinnerQuery();

  function createUpdateWinner(result: RacePossibleWinner, time: number) {
    getWinner(result.id)
      .unwrap()
      .then((data: WinnerDTO) => {
        updateWinner({
          id: data.id,
          wins: data.wins + 1,
          time: time < data.time ? time : data.time,
        });
      })
      .catch((error: FetchBaseQueryError) => {
        if (error && error.status === StatusCode.NotFound) {
          createWinner({ id: result.id, wins: 1, time });
        }
      });
  }

  return { createUpdateWinner };
};
export default useUpdateWinner;
