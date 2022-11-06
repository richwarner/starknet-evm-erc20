/*
protostar declare ./build/kakarot.json --gateway-url="http://127.0.0.1:5050/" --chain-id=1536727068981429685321
protostar deploy ./build/kakarot.json --gateway-url="http://127.0.0.1:5050/" --chain-id=1536727068981429685321 -i 0x7d130cc98b444811cefb3e531c70dd7baa06fb58b28f28b08d2ed393a529b7b 3194286932864291001653883387773488636435338165024699838868712162053044655501 0x04459ea39edbc6b41a873b833b5ef50d15a02b0df1e0432819d3bc56cc1cb8f1
*/

import { useState } from 'react'
import { connect, disconnect, getStarknet } from 'get-starknet'
import kakarotAbi from '../abis/kakarot.json'
import { Account, Abi, Contract, ec, defaultProvider, RpcProvider, Provider } from 'starknet'
import utilStyles from '../styles/utils.module.css'

export default function Interact() {
  const [result, setResult] = useState('')

  const acctFromWallet = () => {
    const wallet = getStarknet()
    return wallet.isConnected ? wallet.account : null
  }

  const acctFromLocal = () => {
    const starkKeyPair = ec.getKeyPair('0x684ff96a91cc082f4cfde309ab4d493e')
    const accountContractAddress = '0x7d130cc98b444811cefb3e531c70dd7baa06fb58b28f28b08d2ed393a529b7b'
    const provider = new Provider({
      sequencer: {
        baseUrl: 'http://localhost:5050/'
      }
    })
    const account = new Account(provider, accountContractAddress, starkKeyPair)
    return account
  }

  const call = async (walletType: string, func: string, param1, param2) => {
    const account = walletType == 'wallet' ? acctFromWallet() : acctFromLocal()
    const contractAddress = '0x020d63d84759b5557c0056aaff4e2ca50853ad1745c6b20733bbd001673aa150'
    const kakarotContract = new Contract(kakarotAbi.abi as Abi, contractAddress, account)

    if (account === null) {
      console.log('Wallet not connected')
      setResult('Wallet not connected')
      return
    }

    setResult('Calling ' + func + ' using ' + walletType + ' account...')

    try {
      // Test functions
      // console.log(await kakarotContract.get_account_registry())
      // console.log(await kakarotContract.set_account_registry(123123123123123))

      // Example params for execute_at_address: 0, hex2bytes('60016004600760086009')
      if (param1 !== null && param2 != null)
        kakarotContract?.functions[func](param1, param2)
          .then((response) => {
            console.log(response)
            setResult('Result: ' + response.toString())
          })
          .catch((err) => {
            setResult('Error processing call')
            console.log('Error processing call:', err)
          })
      else if (param1 !== null)
        kakarotContract?.functions[func](param1)
          .then((response) => {
            console.log(response)
            setResult('Result: ' + response.toString())
          })
          .catch((err) => {
            setResult('Error processing call')
            console.log('Error processing call:', err)
          })
      else
        kakarotContract?.functions[func]()
          .then((response) => {
            console.log(response)
            setResult('Result: ' + response.toString())
          })
          .catch((err) => {
            setResult('Error processing call')
            console.log('Error processing call:', err)
          })
    } catch (err) {
      setResult('Error processing call to ' + func)
      console.log('Error processing call:', err)
    }
  }

  const hex2bytes = (hexString: string) => hexString.match(/[0-9a-f]{2}/gi)?.map((byte) => parseInt(byte, 16).toString()) || []

  return (
    <div>
      <div className="border-2 border-yellow-300 rounded-lg mb-6 p-6 text-center">{result}</div>
      <div className="grid grid-cols-2 gap-4">
        {/* Connect Wallet */}
        <div></div>
        <div>
          <button
            className={utilStyles.buttonPress}
            onClick={async () => {
              try {
                const wallet = await connect({})
                if (wallet) {
                  await wallet.enable({ showModal: true })
                  setResult('Connected')
                }
              } catch (err) {
                console.error(err)
                setResult('Problem connecting')
              }
            }}
          >
            Connect Wallet
          </button>
        </div>

        {/* Get Account Registry */}
        <div className="flex justify-end mt-2"></div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              const result = await call('wallet', 'get_account_registry', null, null)
            }}
            className={utilStyles.buttonPress}
          >
            Wallet: get_account_registry
          </button>
          <button
            onClick={async () => {
              const result = await call('local', 'get_account_registry', null, null)
            }}
            className={utilStyles.buttonPress}
          >
            Local: get_account_registry
          </button>
        </div>

        {/* Get Name */}
        <div className="flex justify-end mt-2"></div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              const result = await call('wallet', 'execute_at_address', 0, hex2bytes('0x06fdde03'.padEnd(128, '0')))
            }}
            className={utilStyles.buttonPress}
          >
            Wallet: name
          </button>
          <button
            onClick={async () => {
              const result = await call('local', 'execute_at_address', 0, hex2bytes('0x06fdde03'.padEnd(128, '0')))
            }}
            className={utilStyles.buttonPress}
          >
            Local: name
          </button>
        </div>

        {/* Approve */}
        <div className="flex justify-end mt-2">
          <input
            id="approveSpenderAddress"
            type="text"
            placeholder="spender address"
            value="d770134156f9ab742fdb4561a684187f733a9586"
            className="border-3 border-gray-400 rounded-lg h-14 mb-2 mr-2 p-4"
          />
          <input
            id="approveAmount"
            type="text"
            placeholder="amount"
            value="1000000"
            className="border-3 border-gray-400 rounded-lg h-14 p-4"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              const calldata =
                '095ea7b3' +
                document.querySelector('#approveSpenderAddress').value.padStart(64, '0') +
                parseInt(document.querySelector('#approveAmount').value).toString(16).padStart(64, '0')
              console.log('calldata:', calldata)
              await call('wallet', 'execute_at_address', 0, hex2bytes(calldata))
            }}
            className={utilStyles.buttonPress}
          >
            Wallet: approve
          </button>
          <button
            onClick={async () => {
              const calldata =
                '095ea7b3' +
                document.querySelector('#approveSpenderAddress').value.padStart(64, '0') +
                parseInt(document.querySelector('#approveAmount').value).toString(16).padStart(64, '0')
              console.log('calldata:', calldata)
              await call('local', 'execute_at_address', 0, hex2bytes(calldata))
            }}
            className={utilStyles.buttonPress}
          >
            Local: approve
          </button>
        </div>

        {/* Transfer */}
        <div className="flex justify-end mt-0">
          <input
            id="transferAddress"
            type="text"
            placeholder="to"
            value="d770134156f9ab742fdb4561a684187f733a9586"
            className="border-3 border-gray-400 rounded-lg h-14 mb-2 mr-2 p-4"
          />
          <input
            id="transferAmount"
            type="text"
            placeholder="amount"
            value="10"
            className="border-3 border-gray-400 rounded-lg h-14 p-4"
          />
        </div>
        <div className="flex gap-2 mt-0">
          <button
            onClick={async () => {
              const calldata =
                '40c10f19' +
                document.querySelector('#transferAddress').value.padStart(64, '0') +
                parseInt(document.querySelector('#transferAmount').value).toString(16).padStart(64, '0')
              console.log('calldata:', calldata)
              await call('wallet', 'execute_at_address', 0, hex2bytes(calldata))
            }}
            className={utilStyles.buttonPress}
          >
            Wallet: transfer
          </button>
          <button
            onClick={async () => {
              const calldata =
                '40c10f19' +
                document.querySelector('#transferAddress').value.padStart(64, '0') +
                parseInt(document.querySelector('#transferAmount').value).toString(16).padStart(64, '0')
              console.log('calldata:', calldata)
              await call('local', 'execute_at_address', 0, hex2bytes(calldata))
            }}
            className={utilStyles.buttonPress}
          >
            Local: transfer
          </button>
        </div>
      </div>
    </div>
  )
}
