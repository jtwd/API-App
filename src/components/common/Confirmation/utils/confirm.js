import { createConfirmation } from 'react-confirm';

import { Confirmation } from '../../../../components';

const defaultConfirmation = createConfirmation(Confirmation);

export function confirm(confirmation, options = {}) {
  return defaultConfirmation({ confirmation, ...options });
}
