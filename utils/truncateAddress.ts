export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
        /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/
    );
    if (!match) return `${address.substring(0, 6)}...${address.substring(address.length, address.length - 5)}`
    return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};
