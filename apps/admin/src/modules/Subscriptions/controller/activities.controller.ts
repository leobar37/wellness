import {
  useGetActivitiesQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} from '@wellness/admin-ui/common';
import { Activity } from '@wellness/admin-ui';
import { CreateActivity } from '../domain/schemas';
import { useSubscriptionsStore } from '../data';
import { SafeAny, someBoolean } from '@wellness/common';
import { useActivityModal } from '../data';
import { useEffect } from 'react';
const { patch } = useSubscriptionsStore.getState();

export const useInitActivitiesController = () => {
  const { data, loading } = useGetActivitiesQuery({
    fetchPolicy: 'network-only',
  });
  const { activities } = useSubscriptionsStore();
  const isLoading = someBoolean(loading, !data);
  useEffect(() => {
    if (data?.getActivities) {
      patch((state) => {
        state.activities = data.getActivities as Activity[];
      });
    }
  }, [data]);
  return {
    activities: activities,
    isLoading,
  };
};

const mapActivity = (input: CreateActivity) => {
  return {
    detail: {
      description: input.description,
      name: input.name,
      price: Number(input.price),
    },
    duration: Number(input.duration),
    mode: input.mode,
    visible: input.visible,
    startAt: input.startAt,
  };
};

export const useActivityController = () => {
  const { closeModal } = useActivityModal();
  const [createActivityMutation] = useCreateActivityMutation();
  const [updateActivityMutation] = useUpdateActivityMutation();
  const [deleteActivityMutation] = useDeleteActivityMutation();
  const { addActivity, activity } = useSubscriptionsStore();
  const createActivity = async (input: CreateActivity) => {
    const data = await createActivityMutation({
      variables: {
        input: mapActivity(input),
      },
    });

    addActivity(data.data.createActivity as SafeAny);
    closeModal();
    return data.data.createActivity;
  };

  const updateActivity = async (input: CreateActivity) => {
    const data = await updateActivityMutation({
      variables: {
        id: activity.id,
        input: mapActivity(input),
      },
    });

    closeModal();
    return data.data.updateActivity as Activity;
  };
  const deleteActivity = async () => {
    const result = await deleteActivityMutation({
      variables: {
        id: activity.id,
      },
    });

    return result.data.deleteActivity as Activity;
  };

  return {
    createActivity,
    updateActivity,
    deleteActivity,
  };
};
