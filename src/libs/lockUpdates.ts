import { Address, BigInt, ethereum, log } from '@graphprotocol/graph-ts';
import { LockUpdate, Transaction } from '../../generated/schema';
import * as accountLib from '../libs/account';
import * as commonLib from '../utils/commons';

export function buildId(address: Address): string {
  return address.toHexString();
}

export function get(address: Address): LockUpdate | null {
  let id = buildId(address);
  log.debug('[LockUpdate] Loading lock for id {}', [id]);
  let entity = LockUpdate.load(id);
  if (entity == null) {
    log.warning('[LockUpdate] Lock for address {} NOT found.', [id]);
  }
  return entity;
}

export function createLockUpdate(
  accountAddress: Address,
  startLock: BigInt,
  endLock: BigInt,
  veAmount: BigInt,
  ethTx: Transaction,
  event: ethereum.Event,
): LockUpdate {
  let id = commonLib.buildIdFromEvent(event);
  let account = accountLib.getOrCreate(accountAddress);

  log.info('[LockUpdate] Create lock for address {} with id {}', [
    accountAddress.toHexString(),
    id
  ]);
  let entity = new LockUpdate(id);
  entity.timestamp = ethTx.timestamp;
  entity.blockNumber = ethTx.blockNumber;
  entity.createdAt = ethTx.id;
  entity.account = account.id;
  entity.veTokenAmount = veAmount;
  entity.startLock = startLock;
  entity.endLock = endLock;
  entity.save();
  return entity;
}


