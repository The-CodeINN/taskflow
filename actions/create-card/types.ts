import { z } from 'zod';

import { ActionState } from '@/lib/create-safe-actions';
import { CreateCard } from './schema';

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>;
