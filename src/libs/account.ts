import { Address, log } from '@graphprotocol/graph-ts';
import { Account } from '../../generated/schema';

export function buildId(address: Address): string {
  return address.toHexString();
}

export function get(address: Address): Account | null {
  let id = buildId(address);
  log.debug('[Account] Loading account for id {}', [id]);
  let entity = Account.load(id);
  if (entity == null) {
    log.warning('[Account] Account for address {} NOT found.', [id]);
  }
  return entity;
}

export function getOrCreate(address: Address): Account {
  let id = buildId(address);
  log.debug('[Account] Loading account for id {}', [id]);
  let entity = get(address);
  if (entity == null) {
    log.info('[Account] Create account for address {}', [
      address.toHexString(),
    ]);
    entity = new Account(id);
    entity.wallet = address;
    entity.save();
  }
  return entity as Account;
}
