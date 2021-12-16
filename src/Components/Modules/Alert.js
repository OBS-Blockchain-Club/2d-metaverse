import ReactDOM from 'react-dom';
import '../../Pages/game.css';

export class Alert {
    static alert;
    static container;
    static enabled;
    static text;

    constructor(text, container) {
        this.text = text;
        this.container = container;
        this.enableAlert('visible');
    }

    enableAlert (enabled) {
        this.enabled = enabled;
        this.alert = (
            <div className='flex justify-center items-center'>
                <div className={` absolute top-0 bg-gray-200 bg-opacity-50 rounded-md px-4 font-pixelated pt-2 py-2 text-black mt-6 text-xl ${this.enabled}`}>{this.text}</div>
            </div>
        )
        ReactDOM.render(this.alert, this.container)
    }

    changeText(text) {
        this.text = text;
        this.alert = (
            <div className='flex justify-center items-center'>
                <div className={` absolute top-0 bg-gray-200 bg-opacity-50 rounded-md px-4 font-pixelated pt-2 py-2 text-black mt-6 text-xl ${this.enabled}`}>{this.text}</div>
            </div>
        )
        ReactDOM.render(this.alert, this.container)
    }
}