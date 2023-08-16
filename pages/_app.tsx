import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { optimismGoerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import 'dotenv/config';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
   [optimismGoerli],
   [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
   appName: 'ZeroDev Passkeys',
   projectId: 'YOUR_PROJECT_ID',
   chains,
});

const wagmiConfig = createConfig({
   autoConnect: false,
   connectors,
   publicClient,
   webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <WagmiConfig config={wagmiConfig}>
         <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
         </RainbowKitProvider>
      </WagmiConfig>
   );
}

export default MyApp;
