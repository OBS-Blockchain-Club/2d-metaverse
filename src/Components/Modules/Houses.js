import { useState, useEffect } from "react"

export default function Houses () {
    const [houses, setHouses] = useState();

    const city = [
    'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9191.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/91.gif', 'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif',
    'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif',
    
    'https://bafybeie4ivzgpdg4hctxep4cmrxw6cihxvh5rdgue3j2b27odkovp63ohm.ipfs.infura-ipfs.io/', 'https://bafybeie4ivzgpdg4hctxep4cmrxw6cihxvh5rdgue3j2b27odkovp63ohm.ipfs.infura-ipfs.io/', 'https://bafybeignpvf2gwy3yv4mo5ddkminpq6ckpwf27ia7zsb54izyj2xu5c2y4.ipfs.infura-ipfs.io/',
    'https://gateway.pinata.cloud/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/911.gif', 'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9191.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/91.gif', 'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif',
    'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://bafybeiaj7kmrbycbqpaodcmqrzeckgts3blurgb3vaga7p7djwjhkhfkde.ipfs.infura-ipfs.io/','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif',

    'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif',
    'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif',
    'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif',
    'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif',
    'https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif','https://cloudflare-ipfs.com/ipfs/Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb/9991.gif',]
    

    useEffect(() => {
        var map = []
        var y = 0
        var x = 0
        for (let i = 0; i < city.length; i++) {
            
            if(i !== 0) {
                x += 400

                if(i%10 === 0 ) {
                    x = 0;
                    y += 400;
                }
            }
            if(city[i].includes('Qmc3SHkH8jZRaJnJYELJnVHeU4SydiqG1sGUCgoXL5cLsb'))
            console.log('house')

            const element = (
                    <img key={i} src={city[i]} className={`absolute`} style={{
                        left: x, 
                        top: y,
                        width: 400,
                        height: 400,
                        maxWidth: 400, 
                        maxHeight: 400,
                    }}/>
            )
    
            map.push(element)
            
        }
        setHouses(map)
    }, [])

    return (
        <div>
            {houses}
        </div>
    )
}