export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CHAIN_ID = +process.env.NEXT_PUBLIC_CHAIN_ID || 97;

export const USDT_DECIMAL = 18

export const RAMP_CONTRACT_ADDRESS = {
    56: "0x70586Ec8A0e5ACA137094C8BA698f94FF80EF254", // "0x8f3d1EB6Dffa65589ab175FE2d092D30aCb9a1d5", // "0xf36698955BE1539fEcF16349E23B8bCE4cD10A23", // "0xA828F39B36dBB9feECa586bd3f5fB9c0Af7056BF", //0xffAA61991dfe51B969cE39F9218B15286E627528
    97: "0xFb72b5dBDCACeF0C72e1D063785A469AC3d745b6",
}

export const NETWORK_URLS = {
    56: "https://bsc-dataseed.binance.org/",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545"
}