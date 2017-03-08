import { createConfirmation } from 'react-confirm';

import { Confirmation, Prompt } from '../../../../components';

const defaultConfirmation = createConfirmation(Confirmation);

export function confirm(confirmation, options = {}) {
  return defaultConfirmation({ confirmation, ...options });
}

const promptConfirmation = createConfirmation(Pr)

export function prompt(confirmation, options = {}) {
  return promptConfirmation({ confirmation, ...options });
};
