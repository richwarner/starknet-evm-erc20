import { useContext } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { connect, disconnect, getStarknet } from 'get-starknet'
import kakarotAbi from '../abis/kakarot.json'
import { Abi, Contract, Signature } from 'starknet'
import Interact from '../components/interact'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  // const onClick = async () => {
  //   if (getStarknet().isConnected) {
  //     disconnect()
  //   }
  //   const selected = await getStarknet().enable({ showModal: true })
  //   // setAccountAddress(selected[0])
  //   if (getStarknet().isConnected) {
  //     // contract?.connect(getStarknet().account)
  //   }
  // }

  const hex2bytes = (hexString: string) => hexString.match(/[0-9a-f]{2}/gi)?.map((byte) => parseInt(byte, 16).toString()) || []

  const setAccountRegistry = async () => {
    const wallet = getStarknet()
    if (wallet.isConnected) {
      const contractAddress = '0x03789d7f86abfc8c690f240a179dcd802b3c7c1c090007ffe5d8a39e8fefae25'
      const kakarotContract = new Contract(kakarotAbi.abi as Abi, contractAddress, wallet.account)

      // kakarotContract?.functions['execute'](hex2bytes('60016004600760086009'), hex2bytes('60016004600760086009')).then(
      //   (response) => console.log(response)
      // )

      kakarotContract?.functions['set_account_registry'](60016).then((response) => console.log(response))

      // kakarotContract?.functions['execute_at_address'](0, hex2bytes('60016004600760086009')).then((response) =>
      //   console.log(response)
      // )

      // console.log(await kakarotContract.set_account_registry(123123123123123))
    }
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Interact />

      {/* <section className={utilStyles.headingMd}>
        <button
          className="border-2"
          onClick={async () => {
            try {
              const wallet = await connect({})
              if (wallet) {
                await wallet.enable({ showModal: true })
                //setIsConnected(!!wallet?.isConnected);
              }
            } catch (err) {
              console.error(err)
            }
          }}
        >
          Connect Wallet
        </button>
        <button className="border-2" onClick={setAccountRegistry}>
          setAccountRegistry
        </button>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }
