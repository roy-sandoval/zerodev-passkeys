import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { ZeroDevConnector } from '@zerodev/wagmi';
import { createPasskeyOwner, getPasskeyOwner } from '@zerodev/sdk/passkey';
import { useConnect, configureChains, useAccount } from 'wagmi';
import { chains } from './_app';

const projectId = '71445dcd-5a18-4412-b501-1b14a5df2aa7';

const Home: NextPage = () => {
   const { connect } = useConnect();
   const { address, isConnected } = useAccount();

   const handleRegister = async () => {
      connect({
         connector: new ZeroDevConnector({
            chains,
            options: {
               projectId,
               owner: await createPasskeyOwner({
                  name: 'Woosh Test',
                  projectId,
               }),
            },
         }),
      });
   };
   const handleLogin = async () => {
      connect({
         connector: new ZeroDevConnector({
            chains,
            options: {
               projectId,
               owner: await getPasskeyOwner({ projectId }),
            },
         }),
      });
   };

   return (
      <div>
         <div>{isConnected ? 'logged in' : 'not logged in'}</div>
         <div>{address ? address : null}</div>
         {isConnected ? (
            <>
               <button>Withdraw Funds</button>
            </>
         ) : (
            <>
               <button onClick={handleRegister}>Sign Up</button>
               <button onClick={handleLogin}>Login</button>
            </>
         )}
      </div>
   );
};

export default Home;
