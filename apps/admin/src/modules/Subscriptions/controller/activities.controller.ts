import {
  useGetActivitiesQuery,
  useCreateActivityMutation,
} from '@wellness/admin-ui/common';
import { CreateActivity } from '../domain/schemas';
import { useSubscriptionsStore } from '../data';
import { someBoolean } from '@wellness/common';
export const useInitActivitiesController = () => {
  const { data, loading } = useGetActivitiesQuery();

  const isLoading = someBoolean(loading);
  return {
    activities: data?.getActivities,
    isLoading,
  };
};

const { addActivity } = useSubscriptionsStore.getState();
export const useActivityController = () => {
  const [createActivityMutation] = useCreateActivityMutation();

  const createActivity = async (input: CreateActivity) => {
    const data = await createActivityMutation({
      variables: {
        input: {
          detail: {
            description: input.description,
            name: input.name,
            price: Number(input.price),
          },
          duration: Number(input.duration),
          mode: input.mode,
          visible: input.visible,
          startAt: input.startAt,
        },
      },
    });
    addActivity(data.data.createActivity);

    return data.data.createActivity;
  };

  return {
    createActivity,
  };
};
