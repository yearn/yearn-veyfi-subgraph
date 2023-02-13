import { Address } from '@graphprotocol/graph-ts';
import { Token } from '../../generated/schema';
import { Token as TokenContract } from '../../generated/GaugeFactory/Token';
import { DEFAULT_DECIMALS } from '../utils/constants';

export function getOrCreate(address: Address): Token {
  let id = address.toHexString();
  let token = Token.load(id);
  if (token == null) {
    token = new Token(id);
    let erc20Contract = TokenContract.bind(address);
    let decimals = erc20Contract.try_decimals();
    let name = erc20Contract.try_name();
    let symbol = erc20Contract.try_symbol();
    token.decimals = decimals.reverted ? DEFAULT_DECIMALS : decimals.value;
    token.name = name.reverted ? 'Not Defined' : name.value;
    token.symbol = symbol.reverted ? 'Not Defined' : symbol.value;
    token.save();
  }
  return token as Token;
}
