import {
  Supply as SupplyEvent,
  ModifyLock as ModifyLockEvent,
  Initialized as InitializedEvent,
  Penalty as PenaltyEvent
} from '../../generated/veYFI/veYFI';
import {
  YFIRewardPool as YFIRewardPoolTemplate
} from '../../generated/templates';
import * as lockLib from '../libs/locks';
import * as lockUpdatesLib from '../libs/lockUpdates';
import * as transactionLib from '../libs/transaction';
import * as veYFIStatsLib from '../libs/veYFIStats';
import { log } from '@graphprotocol/graph-ts';

export function handleInitialized(event: InitializedEvent): void {
  transactionLib.getOrCreateTransactionFromEvent(
    event,
    'Initialized'
  );
  veYFIStatsLib.updateVeYfiAndRewardPool(event.params.token, event.address, event.params.reward_pool);
  log.info('[VeYFIMappings] Create YFI reward pool template instance for address {}', [
    event.params.reward_pool.toHexString()
  ]);
  YFIRewardPoolTemplate.create(event.params.reward_pool);
}

export function handleModifyLock(event: ModifyLockEvent): void {
  let tx = transactionLib.getOrCreateTransactionFromEvent(
    event,
    'ModifyLock'
  );
  lockLib.createOrUpdateLock(
    event.params.user,
    event.params.ts,
    event.params.locktime,
    event.params.amount,
    tx,
    event
  );
  lockUpdatesLib.createLockUpdate(
    event.params.user,
    event.params.ts,
    event.params.locktime,
    event.params.amount,
    tx,
    event
  );
}

export function handleSupply(event: SupplyEvent): void {
  transactionLib.getOrCreateTransactionFromEvent(
    event,
    'Supply'
  );
  veYFIStatsLib.updateTotalSupply(event.params.new_supply);
}

export function handlePenalty(event: PenaltyEvent): void {
  transactionLib.getOrCreateTransactionFromEvent(
    event,
    'Penalty'
  );
  veYFIStatsLib.updateTotalPenalties(event.params.amount);
}
