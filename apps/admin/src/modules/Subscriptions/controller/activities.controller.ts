import {
  useGetActivitiesQuery,
  useCreateActivityMutation,
} from '@wellness/admin-ui/common';

export const useInitActivityController = () => {
  const { data } = useGetActivitiesQuery();

  return {
    activities: data?.getActivities,
  };
};

export const useActivityController = () => {
  const [createActivityMutation] = useCreateActivityMutation();

  const createActivity = () => {
    console.log('uwu');
  };

  return {
    createActivity,
  };
};
