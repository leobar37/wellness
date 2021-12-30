import { useGetActivityQuery } from '@wellness/admin-ui/common';
import { someBoolean } from '@wellness/common';
type Options = {
  activityId: number;
};
export const useInitActivyController = ({ activityId }: Options) => {
  const {
    data: dataActivity,
    loading,
    error,
  } = useGetActivityQuery({
    variables: {
      id: String(activityId),
    },
  });

  const isLoading = someBoolean(loading);
  return {
    activity: dataActivity?.getActivity,
    isLoading,
    error,
  };
};
