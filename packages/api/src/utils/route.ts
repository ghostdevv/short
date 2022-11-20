import type { Context } from '../types';
import { Handler } from 'worktop';

export const route = (handler: Handler<Context>) => handler;
