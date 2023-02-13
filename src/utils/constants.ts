import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const VE_YFI = 'veYFI';
export const ETH_MAINNET_NETWORK = 'mainnet';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const DEFAULT_DECIMALS = 18;
export let BIGINT_ZERO = BigInt.fromI32(0);
export let BIGINT_ONE = BigInt.fromI32(1);
export let BIGINT_MAX = BigInt.fromString(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935'
);
export let BIG_DECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export let MAX_UINT = BigInt.fromI32(2).times(BigInt.fromI32(255));
