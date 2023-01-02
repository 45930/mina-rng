declare type SidebarItemProps = {
  href: string;
  value: string;
};

interface ApiResponse {
  publicKey: {
    x: string,
    y: string
  },
  cipherText: string,
  signature: {
    r: string,
    s: string
  }
}