import { Address, BigInt, ethereum, log } from '@graphprotocol/graph-ts';
import { Lock, Transaction } from '../../generated/schema';
import * as accountLib from '../libs/account';
import * as commonLib from '../utils/commons';

export function buildId(address: Address): string {
  return address.toHexString();
}

export function get(address: Address): Lock | null {
  let id = buildId(address);
  log.debug('[Lock] Loading lock for id {}', [id]);
  let entity = Lock.load(id);
  if (entity == null) {
    log.warning('[Lock] Lock for address {} NOT found.', [id]);
  }
  return entity;
}

export function createOrUpdateLock(
  accountAddress: Address,
  startLock: BigInt,
  endLock: BigInt,
  veAmount: BigInt,
  ethTx: Transaction,
  event: ethereum.Event,
): Lock {
  let id = commonLib.buildIdFromEvent(event);
  let account = accountLib.getOrCreate(accountAddress);

  log.debug('[Lock] Loading lock for id {}', [id]);
  let entity = get(accountAddress);
  if (entity === null) {
    log.info('[Lock] Create lock for address {} with id {}', [
      accountAddress.toHexString(),
      id
    ]);
    entity = new Lock(id);
    entity.timestamp = ethTx.timestamp;
    entity.blockNumber = ethTx.blockNumber;
    entity.createdAt = ethTx.id;
    entity.account = account.id;
    entity.veAmount = veAmount;
    entity.startLock = startLock;
    entity.endLock = endLock;
    account.lock = entity.id;
    account.save();
  } else {
    entity.veAmount = veAmount;
    entity.endLock = endLock;
  }
  entity.save();
  return entity as Lock;
}


