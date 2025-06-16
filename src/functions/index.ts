import { trackOrderFunction, executeTrackOrder } from './trackOrder';

export const functionsMap = {
  track_order: {
    definition: trackOrderFunction,
    executor: executeTrackOrder,
  }
};

export const functionDefinitions = Object.values(functionsMap).map(f => f.definition);