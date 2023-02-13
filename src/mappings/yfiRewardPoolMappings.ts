import {
  Initialized as InitializedEvent
} from '../../generated/templates/YFIRewardPool/YFIRewardPool';
import * as veYFIStatsLib from '../libs/veYFIStats';
import * as transactionLib from '../libs/transaction';

export function handleInitialized(event: InitializedEvent): void {
  let tx = transactionLib.getOrCreateTransactionFromEvent(
    event,
    'Initialized'
  );
  
}

