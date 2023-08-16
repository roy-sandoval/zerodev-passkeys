import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { optimismGoerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
   [optimismGoerli],
   [publicProvider()]
);

const { connectors } = getDefaultWallets({
   appName: 'ZeroDev Passkeys',
   projectId: 'YOUR_PROJECT_ID',
   chains,
});

const wagmiConfig = createConfig({
   autoConnect: true,
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
