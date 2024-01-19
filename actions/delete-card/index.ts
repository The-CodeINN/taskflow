import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-actions';
import { InputType, ReturnType } from './types';
import useAuth from '@/hooks/useAuth';
import { DeleteCard } from './schema';

const Handler = async (data: InputType) => {
  const { user, token } = useAuth();

  if (!user?.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, boardId } = data;
  let card;

  revalidatePath(`/project/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, Handler);
