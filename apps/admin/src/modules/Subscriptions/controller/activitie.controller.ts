import { useGetActivityQuery, Activity } from '@wellness/admin-ui/common';
import { someBoolean } from '@wellness/common';
import { useEffect } from 'react';
import { useSubscriptionsStore } from '../data';
const { patch } = useSubscriptionsStore.getState();
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

  useEffect(() => {
    if (dataActivity?.getActivity) {
      patch((state) => {
        state.activity = dataActivity?.getActivity as Activity;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataActivity?.getActivity]);

  return {
    activity: dataActivity?.getActivity as Activity,
    isLoading,
    error,
  };
};
