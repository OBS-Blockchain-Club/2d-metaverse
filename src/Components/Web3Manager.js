import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export class Web3Manager {

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

    static async getNFTsfromSubgraph(address) {
      console.log(address)
      const request = `
        query {
          tokens (where: { owner: "${address}"}){
            contract {
              id
              name
            }
            tokenID
            tokenURI
          }
        }
      `
      const client = new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph',
        cache: new InMemoryCache()
      });

      const result = client.query({
        query: gql(request)
      })
        .then(data => {
          return data;
        })
        .catch(err => { console.log("Error fetching data: ", err) });
      return result;
  

    }
    
    static async getNFTPlayer() {

    }

    static async getTokenBalance () {

    }

    static async fetchNFTMetadata(tokenURI) {
      const requestURL = tokenURI
      if(tokenURI.startsWith('ipfs://')) {
        requestURL = tokenURI.replace("ipfs://", 'https://gateway.ipfs.io/ipfs/')
      }
      if(tokenURI.startsWith("https://")) {
        try {
          const response = await fetch(requestURL)
          const json = await response.json();
          return json;
        } catch(e) {
          console.log(e)
        }
      }
    }
}