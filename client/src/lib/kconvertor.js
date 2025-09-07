// K convertor function
export const kconvertor =(num) =>{
    if(num>= 1000){
        return (num/1000).toFixed(1) + "K"
    } else {
        return num
    }
}