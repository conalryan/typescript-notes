export function randomArray(max, size) {
    let result = new Array(size);
    for (let i = 0; i < size; i++) {
        let random = Math.floor(Math.random() * max);
        result[i] = random;
    }
    return result;
}
