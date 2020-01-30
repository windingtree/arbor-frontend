export const copyStrToClipboard = str =>  navigator.clipboard.writeText(str).then(resolve =>  resolve);
export const strCenterEllipsis = str => `${str.substr(0,4)}...${str.substr(-4,4)}`;