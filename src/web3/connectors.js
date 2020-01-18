import { InjectedConnector } from '@web3-react/injected-connector'
const MAIN_NET = 1;

export const injected = new InjectedConnector({ supportedChainIds: [MAIN_NET/*, 3*/] });

