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

  const code =
    '608060405234801561001057600080fd5b5060405161080d38038061080d83398101604081905261002f91610197565b815161004290600090602085019061005e565b50805161005690600190602084019061005e565b505050610248565b82805461006a906101f7565b90600052602060002090601f01602090048101928261008c57600085556100d2565b82601f106100a557805160ff19168380011785556100d2565b828001600101855582156100d2579182015b828111156100d25782518255916020019190600101906100b7565b506100de9291506100e2565b5090565b5b808211156100de57600081556001016100e3565b600082601f830112610107578081fd5b81516001600160401b038082111561012157610121610232565b6040516020601f8401601f191682018101838111838210171561014657610146610232565b604052838252858401810187101561015c578485fd5b8492505b8383101561017d5785830181015182840182015291820191610160565b8383111561018d57848185840101525b5095945050505050565b600080604083850312156101a9578182fd5b82516001600160401b03808211156101bf578384fd5b6101cb868387016100f7565b935060208501519150808211156101e0578283fd5b506101ed858286016100f7565b9150509250929050565b60028104600182168061020b57607f821691505b6020821081141561022c57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6105b6806102576000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806340c10f191161006657806340c10f19146100fe57806370a082311461011357806395d89b4114610126578063a9059cbb1461012e578063dd62ed3e1461014157610093565b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100d657806323b872dd146100eb575b600080fd5b6100a0610154565b6040516100ad91906104a4565b60405180910390f35b6100c96100c4366004610470565b6101e2565b6040516100ad9190610499565b6100de61024c565b6040516100ad91906104f7565b6100c96100f9366004610435565b610252565b61011161010c366004610470565b610304565b005b6100de6101213660046103e2565b61033d565b6100a061034f565b6100c961013c366004610470565b61035c565b6100de61014f366004610403565b6103a9565b600080546101619061052f565b80601f016020809104026020016040519081016040528092919081815260200182805461018d9061052f565b80156101da5780601f106101af576101008083540402835291602001916101da565b820191906000526020600020905b8154815290600101906020018083116101bd57829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061023b9086906104f7565b60405180910390a350600192915050565b60025481565b6001600160a01b038316600090815260046020908152604080832033845290915281205460001981146102ae576102898382610518565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b6001600160a01b038516600090815260036020526040812080548592906102d6908490610518565b9091555050506001600160a01b03831660009081526003602052604090208054830190555060019392505050565b80600260008282546103169190610500565b90915550506001600160a01b03909116600090815260036020526040902080549091019055565b60036020526000908152604090205481565b600180546101619061052f565b3360009081526003602052604081208054839190839061037d908490610518565b9091555050506001600160a01b0382166000908152600360205260409020805482019055600192915050565b600460209081526000928352604080842090915290825290205481565b80356001600160a01b03811681146103dd57600080fd5b919050565b6000602082840312156103f3578081fd5b6103fc826103c6565b9392505050565b60008060408385031215610415578081fd5b61041e836103c6565b915061042c602084016103c6565b90509250929050565b600080600060608486031215610449578081fd5b610452846103c6565b9250610460602085016103c6565b9150604084013590509250925092565b60008060408385031215610482578182fd5b61048b836103c6565b946020939093013593505050565b901515815260200190565b6000602080835283518082850152825b818110156104d0578581018301518582016040015282016104b4565b818111156104e15783604083870101525b50601f01601f1916929092016040019392505050565b90815260200190565b600082198211156105135761051361056a565b500190565b60008282101561052a5761052a61056a565b500390565b60028104600182168061054357607f821691505b6020821081141561056457634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea26469706673582212204e53876a7abf080ce7b38dffe1572ec4843a83c565efd2feeb856984b5af6fb764736f6c634300080000330000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000074b616b61726f74000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003534a4e0000000000000000000000000000000000000000000000000000000000'
  const erc20_evm_address = '0xabde10071e8843c13ad24988e8a28d28f8b3d3d2'
  const erc20_starknet_address = '0x6b549d176e41214126dac8c67d9804e1e8843c13ad24988e8a28d28f8b3d3d2'

  const acctFromWallet = () => {
    const wallet = getStarknet()
    return wallet.isConnected ? wallet.account : null
  }

  const acctFromLocal = () => {
    const starkKeyPair = ec.getKeyPair('0x8464b35d2ad793c692a5fbed760373af')
    const accountContractAddress = '0x58d5a52c9a365e7e3487309fd8fa4c8802bc8074673710045fc453c10450b8e'
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
    const contractAddress = '0x079812ebc55fd38232ee35cfe0c48792551ba3d24295b31af608f7faeeab85ff'
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
    <div className="flex flex-col items-center text-center">
      <div className="border-2 border-yellow-300 rounded-lg mb-6 p-6 text-center">{result}</div>
      <div className="grid grid-cols-2 gap-4">
        {/* Connect Wallet */}
        <div></div>
        <div>
          {/* <button
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
          </button> */}
        </div>

        {/* Get Account Registry
        <div className="flex justify-end mt-2"></div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              const result = await call('local', 'get_account_registry', null, null)
            }}
            className={utilStyles.buttonPress}
          >
            Local: get_account_registry
          </button>
        </div> */}

        {/* Get Name
        <div className="flex justify-end mt-2"></div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              const result = await call('local', 'execute_at_address', 0, hex2bytes('0x06fdde03'.padEnd(128, '0')))
            }}
            className={utilStyles.buttonPress}
          >
            Local: name
          </button>
        </div> */}

        {/* BalanceOf */}
        <div className="flex justify-end mt-0">
          <div className="text-start">
            <input
              id="transferAddress"
              type="text"
              placeholder="address"
              // value="d770134156f9ab742fdb4561a684187f733a9586"
              className="border-3 border-gray-400 rounded-lg h-14 mb-2 mr-2 p-4"
            />
          </div>
          {/* <input
            id="transferAmount"
            type="text"
            placeholder="amount"
            value="10"
            className="border-3 border-gray-400 rounded-lg h-14 p-4"
          /> */}
        </div>

        <div className="flex gap-2 mt-0">
          <button
            onClick={async () => {
              // BalanceOf
              const value = parseInt(document.querySelector('#transferAddress').value) % 100
              const calldata = '70a08231' + document.querySelector('#transferAddress').value.padStart(64, '0')
              // parseInt(document.querySelector('#transferAmount').value).toString(16).padStart(64, '0')
              console.log('calldata:', calldata)
              await call('local', 'execute_at_address', erc20_evm_address, hex2bytes(calldata))
            }}
            className={utilStyles.buttonPress}
          >
            BalanceOf
          </button>
        </div>

        {/* Mint */}
        <div className="flex justify-end mt-0">
          <input
            id="mintAddress"
            type="text"
            placeholder="to"
            // value="d770134156f9ab742fdb4561a684187f733a9586"
            className="border-3 border-gray-400 rounded-lg h-14 mb-2 mr-2 p-4"
          />
          <input
            id="mintAmount"
            type="text"
            placeholder="amount"
            // value="10"
            className="border-3 border-gray-400 rounded-lg h-14 p-4"
          />
        </div>
        <div className="flex gap-2 mt-0">
          <button
            onClick={async () => {
              // change to mint
              const calldata =
                '40c10f19' +
                (parseInt(document.querySelector('#mintAddress').value) % 1048576).toString(16).padStart(64, '0') +
                parseInt(document.querySelector('#mintAmount').value).toString(16).padStart(64, '0')
              console.log('calldata:', calldata)
              alert(calldata)
              await call('local', 'execute_at_address', erc20_evm_address, hex2bytes(calldata))
            }}
            className={utilStyles.buttonPress}
          >
            Mint
          </button>
        </div>

        {/* Transfer */}
        <div className="flex justify-end mt-0">
          <input
            id="transferAddress"
            type="text"
            placeholder="to"
            // value="d770134156f9ab742fdb4561a684187f733a9586"
            className="border-3 border-gray-400 rounded-lg h-14 mb-2 mr-2 p-4"
          />
          <input
            id="transferAmount"
            type="text"
            placeholder="amount"
            // value="10"
            className="border-3 border-gray-400 rounded-lg h-14 p-4"
          />
        </div>
        <div className="flex gap-2 mt-0">
          <button
            onClick={async () => {
              const calldata =
                'a9059cbb' +
                document.querySelector('#transferAddress').value.padStart(64, '0') +
                parseInt(document.querySelector('#transferAmount').value).toString(16).padStart(64, '0')
              console.log('calldata:', calldata)
              await call('local', 'execute_at_address', erc20_evm_address, hex2bytes(calldata))
            }}
            className={utilStyles.buttonPress}
          >
            Transfer
          </button>
        </div>

        {/* Approve */}
        <div className="flex justify-end mt-2">
          <input
            id="approveSpenderAddress"
            type="text"
            placeholder="spender address"
            // value="d770134156f9ab742fdb4561a684187f733a9586"
            className="border-3 border-gray-400 rounded-lg h-14 mb-2 mr-2 p-4"
          />
          <input
            id="approveAmount"
            type="text"
            placeholder="amount"
            // value="1000000"
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
              await call('local', 'execute_at_address', erc20_evm_address, hex2bytes(calldata))
            }}
            className={utilStyles.buttonPress}
          >
            Approve
          </button>
        </div>

        {/* Allowence */}
        <div className="flex justify-end mt-2">
          <input
            id="approveSpenderAddress"
            type="text"
            placeholder="spender address"
            className="border-3 border-gray-400 rounded-lg h-14 mb-2 mr-2 p-4"
          />
          <input id="approveAmount" type="text" placeholder="amount" className="border-3 border-gray-400 rounded-lg h-14 p-4" />
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              const calldata =
                'dd62ed3e' +
                document.querySelector('#approveSpenderAddress').value.padStart(64, '0') +
                parseInt(document.querySelector('#approveAmount').value).toString(16).padStart(64, '0')
              console.log('calldata:', calldata)
              await call('local', 'execute_at_address', erc20_evm_address, hex2bytes(calldata))
            }}
            className={utilStyles.buttonPress}
          >
            Allowence
          </button>
        </div>

        {/* TransferFrom */}
        <div className="flex justify-end mt-2">
          <input
            id="approveSpenderAddress"
            type="text"
            placeholder="spender address"
            className="border-3 border-gray-400 rounded-lg h-14 mb-2 mr-2 p-4"
          />
          <input id="approveAmount" type="text" placeholder="amount" className="border-3 border-gray-400 rounded-lg h-14 p-4" />
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              //Transfer from
              const calldata =
                '23b872dd' +
                document.querySelector('#approveSpenderAddress').value.padStart(64, '0') +
                parseInt(document.querySelector('#approveAmount').value).toString(16).padStart(64, '0')
              console.log('calldata:', calldata)
              await call('local', 'execute_at_address', erc20_evm_address, hex2bytes(calldata))
            }}
            className={utilStyles.buttonPress}
          >
            TransferFrom
          </button>
        </div>

        <div className="flex flex-col items-center">
          <h1>Setup</h1>
          <div className="flex flex-col items-center justify-between">
            <button
              onClick={async () => {
                const calldata =
                  '' +
                  document.querySelector('#transferAddress').value.padStart(64, '0') +
                  parseInt(document.querySelector('#transferAmount').value).toString(16).padStart(64, '0')
                console.log('calldata:', calldata)
                await call(
                  'local',
                  'set_account_registry',
                  '0x025596018938f27c730a138738b3c2039d28cc94881c81d3528a76f99e33a426',
                  null
                )
              }}
              className="mt-5 bg-green-700 p-3 rounded-md text-gray-100"
            >
              Local: set_account_registry
            </button>

            <button
              onClick={async () => {
                const result = await call('local', 'execute_at_address', 0, hex2bytes(code))
              }}
              className="mt-5 bg-green-700 p-3 rounded-md text-gray-100"
            >
              Local: Deploy
            </button>

            <button
              onClick={async () => {
                const result = await call('local', 'initiate', erc20_evm_address, erc20_starknet_address)
              }}
              className="mt-5 bg-green-700 p-3 rounded-md text-gray-100"
            >
              Local: Initiate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
