/** gets random position along the x axis within viewport
 * @param {Number} width - viewport width
 * @returns {Number} scaled value along viewport width
 */
export const getRandomXPos = (width) => {
    return (Math.random() * width) - width / 2;
}