export const removeStorageWhenDisconnecting = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('node')
  }
  
  export const setStorageWhenConnecting = (
    accessToken: string,
    addressTokens: { [key: string]: string },
    currentAddress: string,
    listAddresses: string[],
  ) => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    localStorage.setItem('addressTokens', JSON.stringify(addressTokens))
    localStorage.setItem('lastAddressLoggedIn', JSON.stringify(currentAddress))
    localStorage.setItem('hasEverLoggedIn', JSON.stringify(listAddresses))
  }
  