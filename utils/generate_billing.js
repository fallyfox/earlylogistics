export function billing (w,l,b,h) {
    //10cm3 = N750 
    //0.5kg = N1000

    const volume = l * b * h;
    const volumeCost = volume * 750 / 10;
    const weightCost = 1000 / 0.5 * w;
    const total = volumeCost + weightCost;
    
    return total;
}