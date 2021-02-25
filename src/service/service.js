import BaseService from '../model/BaseService'
import axios from 'axios'
import BigNumber from 'big-number'
import Web3 from 'web3'
import pocPoolAbi from '../../build/development/contracts/POC_Pool.json'
import pocTokenAbi from '../../build/development/contracts/POC_Token.json'
import { thousands, weiToPOC, hideAddress } from '@/util/help.js'

let API_URL = process.env.SERVER_URL
const API = {
  PUT_POC_STATS : API_URL + '/pocstats/',
  GET_HISTORY : API_URL + '/pocstats/history/',
  DELETE_STATS : API_URL + '/pocstats/delete/',
  USD_POC_PRICE : API_URL + '/getprice/poc/usd/',
  VND_POC_PRICE : API_URL + '/getprice/poc/vnd/',
  SET_ROLE : API_URL + '/auth/set-role/'
}

let foundation
let web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.nexty.io'))
const PocToken = new web3.eth.Contract(pocTokenAbi.abi, '0x14ccf9f6653eac614a377ee827f0520601d3e68c', {gasPrice: '0'})
const PocPool = new web3.eth.Contract(pocPoolAbi.abi, '0x8d82238C53Db647A1911c6512cC40963b0c19B81', {gasPrice: '0'})
export default class extends BaseService {
  async find(address) {
    console.log(address)
    let a
    let b
    await PocToken.methods.balanceOf(address).call({ from: address }).then((balance) => {
      console.log('balance', weiToPOC(balance))
      a = balance
    }).catch(error=>console.log)
    await PocPool.methods.balanceOf(address).call({ from: address }).then((balance) => {
      console.log('balance', weiToPOC(balance))
      b = balance
    }).catch(error=>console.log)
    return {a,b}
  }
}
