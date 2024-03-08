const obj = {
    x: 10,
    y: 20
}

const prop = Object 
.keys(obj)
.reverse()
.join('')
obj.xy = 30
obj.yx = 40
obj.x10y20 = 50
obj.y20x10 = 60
const result = obj[prop]
console.log(result)