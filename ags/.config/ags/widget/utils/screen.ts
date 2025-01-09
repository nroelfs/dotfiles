import { Gdk } from "astal/gtk3"


/**
 * Calculates the width of a widget based on the screen width
 * @param size Size in css units
 * @returns Size in pixels
 */
export function calcWidth(size:string){
    size = size.trim();
    const width = Gdk.Screen.get_default()?.get_width();
    if(width === undefined || width === null) throw new Error("Could not get screen width");
    print(width);
    const unit =  extractUnit(size.trim());
    const value = parseFloat(size.replace(unit, "").trim());

    switch(unit){
        case "em":
            return value * 16;
        case "rem":
            return value * 16;
        case "%":
            return (value / 100) * width;
        case "vw":
            return (value / 100) * width;
        case "vh":
            return (value / 100) * width;
        case "vmin":
            return (value / 100) * width;
        case "vmax":
            return (value / 100) * width;
        case "px":
        default:
            return value;
    }
}

/**
 * Calculates the height of a widget based on the screen height
 * @param size Size in css units
 * @returns Size in pixels
 */
export function calcHeight(size:string){
    size = size.trim();
    const height = Gdk.Screen.get_default()?.get_height();
    if(height === undefined || height === null) throw new Error("Could not get screen height");

    const unit =  extractUnit(size.trim());
    const value = parseFloat(size.replace(unit, "").trim());

    switch(unit){
        case "em":
            return value * 16;
        case "rem":
            return value * 16;
        case "%":
            return (value / 100) * height;
        case "vw":
            return (value / 100) * height;
        case "vh":
            return (value / 100) * height;
        case "vmin":
            return (value / 100) * height;
        case "vmax":
            return (value / 100) * height;
        case "px":
        default:
            return value;
    }
}


function extractUnit(size:string){
    const unit = size.match(/px|em|rem|%|vw|vh|vmin|vmax/);
    if(unit === null) throw new Error("Could not extract unit from size");
    return unit[0];
}
