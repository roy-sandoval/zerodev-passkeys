import { useCallback, useRef, useState } from 'react';
import {
   useAccount,
   useBalance,
   useContractWrite,
   useNetwork,
   usePrepareContractWrite,
} from 'wagmi';
import { abi, contractAddress } from './resources/contracts/depositVault';
import { parseEther } from 'ethers/lib/utils';

export function Withdraw() {
   const { address } = useAccount();
   const { chain } = useNetwork();
   const { data: balance, isLoading: balanceLoading } = useBalance({ address });

   const [loading, setLoading] = useState(false);

   const { config } = usePrepareContractWrite({
      address: contractAddress[420][0],
      abi,
      functionName: 'withdraw',
      args: [
         parseEther('0.001'),
         BigInt(2),
         '0xac799a18562730b801b75322f753012762ae8fcb9a38d08aca7363707b3bcc9d1cbf0124aad378084694abdf50d4fa044cb0af405381259e095dac8a7586930b1b',
         address,
      ],
      enabled: address ? true : false,
   });

   const { write: withdraw } = useContractWrite(config);

   return (
      <div>
         <div>Connected account: {address}</div>
         <div>
            Balance: {balance?.formatted} {balance?.symbol}
         </div>

         <button onClick={withdraw}>Withdraw Funds</button>
      </div>
   );
}

export default Withdraw;
