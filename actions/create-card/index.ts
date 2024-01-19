import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-actions';
import { InputType, ReturnType } from './types';
import useAuth from '@/hooks/useAuth';
import { CreateCard } from './schema';

const Handler = async (data: InputType) => {
  const { user, token } = useAuth();

  if (!user?.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, boardId, listId } = data;
  let card;

  revalidatePath(`/project/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, Handler);
