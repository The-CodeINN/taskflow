import { createSafeAction } from '@/lib/create-safe-actions';
import { InputType, ReturnType } from './types';
import useAuth from '@/hooks/useAuth';
import { UpdateCardOrder } from './schema';
import { revalidatePath } from 'next/cache';

const Handler = async (data: InputType) => {
  const { user, token } = useAuth();

  if (!user?.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { items, boardId } = data;
  let updatedCards;

  revalidatePath(`/board/${boardId}`);
  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, Handler);
