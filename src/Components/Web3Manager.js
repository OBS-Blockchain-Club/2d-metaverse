export default class Web3Manager {

    static async connectWeb3(){
        if (window.ethereum) { 
          try { 
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); 
            return accounts[0];
          } catch (error) { 
              if (error.code === 4001) 
              { // User rejected request 
                console.log(error) 
              } 
            }
        }
    }

    static async getNFTsfromSubgraph() {

    }
    
    static async getNFTPlayer() {

    }

    static async getTokenBalance () {

    }
}