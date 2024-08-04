export class Player {
    public name:    string;
    public dices:    number[];
    public score:   number;
    public isPlaying: boolean;


    constructor() {
        this.name = "";
        this.dices = [];
        this.score = 0;
        this.isPlaying = true;
    }
}