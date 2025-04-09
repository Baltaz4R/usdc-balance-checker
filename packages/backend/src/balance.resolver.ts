import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Contract, JsonRpcProvider, formatUnits, isAddress } from 'ethers';

@Resolver()
export class BalanceResolver {
  @Query(() => String)
  async getUsdcBalance(@Args('address') address: string): Promise<string> {
    const ETH_RPC = process.env.ETH_RPC;

    if (!ETH_RPC) throw new InternalServerErrorException();

    if (!isAddress(address)) throw new BadRequestException('Invalid Ethereum address.');

    const contract = new Contract(
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 
      ['function balanceOf(address) view returns (uint256)'], 
      new JsonRpcProvider(process.env.ETH_RPC)
    );

    const balance = await contract.balanceOf(address);

    return Number(formatUnits(balance, 6)).toFixed(2);
  }
}