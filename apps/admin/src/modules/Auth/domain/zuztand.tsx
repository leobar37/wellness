import create, { SetState, GetState } from 'zustand';
import { combine } from 'zustand/middleware';

interface Store {
  fruits: string[];
  setFruits: (fruits: string[]) => void;
}
const useStore = create<Store>((set, get) => ({
  fruits: ['apple', 'banana', 'orange'],

  setFruits: (fruits) => {
    set((state) => ({
      ...state,
      fruits: fruits,
    }));
    const state = get();

    set({
      fruits,
    });
  },
}));

const useStore2 = create(
  combine(
    {
      fruits: ['apple', 'banana', 'orange'],
    },
    (set, get) => ({
      setFruits: (fruits: string[]) => {
        set((state) => ({
          ...state,
          fruits: fruits,
        }));
        const state = get();

        set({
          fruits,
        });
      },
    })
  )
);

const useExample = () => {
  const { fruits } = useStore();
  return fruits;
};

const useExample2 = () => {
  const { fruits } = useStore2();
  return fruits;
};
