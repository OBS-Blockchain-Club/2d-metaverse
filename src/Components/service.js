export default class Utils {

    calcSpeed(prev, next) {
    
        var x = Math.abs(prev[1] - next[1]);
        var y = Math.abs(prev[0] - next[0]);
        
        var greatest = x > y ? x : y;
        
        var speedModifier = 0.008;
    
        var speed = Math.ceil(greatest/speedModifier);
    
        return speed;
    
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    returnMonsterObject(i, min, max) {
        return {
            id: i, 
            facing: 'down',
            walking: 'false',
            x: this.randomIntFromInterval(min, max),
            y: this.randomIntFromInterval(min, max),
          }
    }
    
    delay = ms => new Promise(res => setTimeout(res, ms))
}