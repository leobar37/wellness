import { DeleteResult } from 'typeorm';
export const parseDeleteResult = (result: DeleteResult) => {
  return result?.affected && result.affected >= 0;
};
