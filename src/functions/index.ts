import { trackOrderFunction, executeTrackOrder } from './trackOrder';
import { cancelOrderFunction, executeCancelOrder } from './cancelOrder';

export const functionsMap = {
  track_order: {
    definition: trackOrderFunction,
    executor: executeTrackOrder,
  },
  cancel_order: {
    definition: cancelOrderFunction,
    executor: executeCancelOrder,
  }
};

export const functionDefinitions = Object.values(functionsMap).map(f => f.definition);