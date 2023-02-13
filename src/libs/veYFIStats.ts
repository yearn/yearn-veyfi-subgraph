import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { VeYFIStat } from '../../generated/schema';
import { BIGINT_ZERO, VE_YFI, ZERO_ADDRESS } from '../utils/constants';

export function getOrCreateVeYFIStat(): VeYFIStat {
  let id = VE_YFI;
  log.debug('[VeYFIStat] Loading ve yfi stat for id {}', [id]);
  let entity = VeYFIStat.load(id);
  if (entity == null) {
    log.info('[VeYFIStat] Create ve yfi stat with id {}', [
      id
    ]);
    entity = new VeYFIStat(id);
    entity.totalSupply = BIGINT_ZERO;
    entity.totalPenalties = BIGINT_ZERO;
    entity.yfi = Address.fromHexString(ZERO_ADDRESS);
    entity.veYFI = Address.fromHexString(ZERO_ADDRESS);
    entity.rewardPool = Address.fromHexString(ZERO_ADDRESS);
    entity.save();
  }
  return entity as VeYFIStat;
}

export function updateTotalPenalties(newTotalPenalties: BigInt): VeYFIStat {
  let entity = getOrCreateVeYFIStat();
  entity.totalPenalties = newTotalPenalties;
  entity.save();
  return entity;
}

export function updateTotalSupply(newTotalSupply: BigInt): VeYFIStat {
  let entity = getOrCreateVeYFIStat();
  entity.totalSupply = newTotalSupply;
  entity.save();
  return entity;
}

export function updateVeYFI(newVeYFI: Address): VeYFIStat {
  let entity = getOrCreateVeYFIStat();
  entity.veYFI = newVeYFI;
  entity.save();
  return entity;
}

export function updateRewardPool(newRewardPool: Address): VeYFIStat {
  let entity = getOrCreateVeYFIStat();
  entity.rewardPool = newRewardPool;
  entity.save();
  return entity;
}

export function updateVeYfiAndRewardPool(newYFI: Address, newVeYFI: Address, newRewardPool: Address): VeYFIStat {
  let entity = getOrCreateVeYFIStat();
  entity.yfi = newYFI;
  entity.veYFI = newVeYFI;
  entity.rewardPool = newRewardPool;
  entity.save();
  return entity;
}
