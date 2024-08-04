function main() {
    let x: number = 3;

    for (let i = x; i > 0; i--) {
        let str: string = "";
         for (let j = 1; j <= x; j++) {
            if (j < i) {
                str += " ";
            }
            else {
                str += "#";
            }
         }
         console.log(str);
    }
}


main();