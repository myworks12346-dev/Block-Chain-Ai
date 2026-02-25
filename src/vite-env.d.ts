/// <reference types="vite/client" />

import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export {};
