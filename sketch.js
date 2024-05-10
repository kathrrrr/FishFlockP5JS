function preload(){
    fishImg = loadImage("Fisk.png")
    bluefishImg = loadImage("Bluefish.jpg")
}

let fishes = [];
let blueFishes = [];
let seperationDistanceSlider
let chgVelocitySlider
let seperationDistanceSliderText
let chgVelocitySliderText
let maxVelocitySliderText
function setup() 
{
	createCanvas(windowWidth, windowHeight);
    seperationDistanceSlider = createSlider(0,10,5)
    seperationDistanceSlider.position(10,15)
    seperationDistanceSliderText = createP('Seperation distance');
    seperationDistanceSliderText.position(160, 0);

    chgVelocitySlider = createSlider(5,15,10)
    chgVelocitySlider.position(10,40)
    chgVelocitySliderText = createP('chg velocity')
    chgVelocitySliderText.position(160,25)
    
    maxVelocitySlider = createSlider(0,50,1)
    maxVelocitySlider.position(10,65)
    maxVelocitySliderText= createP('Max Velocity')
    maxVelocitySliderText.position(160,45)
    cohesionFactorSlider = createSlider(0,10,5)
    cohesionFactorSlider.position(10,85)
    cohesionFactorSliderText = createP('Cohesionfaktor');
    cohesionFactorSliderText.position(160, 70);


 //   seperationDistanceSlider.style(width,"80px")


    
    v1 = new Vector(100,50)
    v2= new Vector(20,50)
    v3 = new Vector(100,50);
    v1.draw(20,10)
    v2.draw()
    f1 = new Orangefish(new Vector(100,100),new Vector(1,1))
    

   /* console.log(v1.getLength())
    console.log(v1.dotProduct(v2))
    console.log(v2.dotProduct(v1))
    console.log(v1.scalar(3))
    console.log(v1.isEqual(v3))
    console.log(v1.isEqual(v2))
    console.log(v1.add(v2));
    console.log(v1.normalize())*/

 //console.log(this.tailPosition().x)//,this.tailPosition.getY(),this.tailPosition.getX()-this.velocity.getX(),this.tailPosition.getY()-this.velocity.getY())
        
        
//console.log(this.tailPosition().x)
    //
  //  f1 = new Fish();
    
    for(let i = 0 ; i<100; i++) {
       
        fishes[i]=new Orangefish()
       
    }

    for(let i = 0 ; i<100; i++) {
       
        blueFishes[i]=new Bluefish()
       
    }
 //   console.log(f1)
   // f1.draw()
}

function draw(){
    background(220);


  
    for(let i = 0 ; i<fishes.length; i++) {
       
        
        fishes[i].draw()
        fishes[i].update()
        
       
    }
    for( let i = 0; i< blueFishes.length; i++){

        blueFishes[i].draw()
        blueFishes[i].update()
    }

}

class Vector{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    draw(xStart=0,yStart=0){
        line(xStart,yStart,xStart+this.x,yStart+this.y)
       // line(xStart+this.x-10,yStart+this.y-10,xStart+this.x,yStart+this.y)
       // line(xStart+this.x-10,yStart+this.y+10,xStart+this.x,yStart+this.y)
    }

    drawArrow(base, vec, myColor) {
        push();
        stroke(myColor);
        strokeWeight(3);
        fill(myColor);
        translate(base.x, base.y);
        line(0, 0, vec.x, vec.y);
        rotate(vec.heading());
        let arrowSize = 7;
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
      }

    setX(x){
        this.x = x;
    }
    setY(y){
        this.y=y;

    }

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }

    getLength(){
        //console.log(this.x^2)
        //console.log(this.x*this.x)
        return sqrt(this.x*this.x+this.y*this.y);
    }
    
    dotProduct(v){
        return this.x*v.x+this.y*v.y;
    }

    scalar(k){
        return new Vector(k*this.x,k*this.y);
    }

    normalize(){
      //  console.log("inside normalize")
       // console.log(this.getLength());
        var normV = this.scalar(1/this.getLength())
       // console.log(normV);
        return normV
    }

    isEqual(v){
        return this.x == v.x && this.y == v.y;
    }

    add(v){
        return new Vector(this.x+v.x,this.y+v.y);
    }
    
    subtraher(v){
        return new Vector(this.x-v.x,this.y-v.y);
    }


}

class Fish{
    //constructor(position,velocity){
    constructor(position = new Vector(random(windowWidth),random(windowHeight)),velocity = new Vector(random(-1,1),random(-1,1))){
        this.position = position;
        this.velocity = velocity;


    }

  /* draw(){
        
    }*/

  
    update(){
       // let fishes = []
        if (this.position.x <20 || this.position.x >width-20 ){ 
            this.velocity.x = - this.velocity.x 
        }
        if (this.position.y < 20 || this.position.y > height-20 ){
           this.velocity.y = - this.velocity.y 
        }
    
        this.velocity =this.velocity.add(this.cohesion().scalar(cohesionFactorSlider.value()))
        this.velocity =this.velocity.add(this.alignment())
        this.velocity =this.velocity.add(this.seperation())
      
        if (this.velocity.getLength()>maxVelocitySlider.value() ){
   
            this.velocity = this.velocity.normalize().scalar(3)
        }
  
        this.position = this.position.add(this.velocity)
      

           // this.position = this.position.add(this.velocity)
        

        
    }
    


}

class Orangefish extends Fish {
    constructor(position = new Vector(random(windowWidth),random(windowHeight)),velocity = new Vector(random(-1,1),random(-1,1))){
        super(position = new Vector(random(windowWidth),random(windowHeight)),velocity = new Vector(random(-1,1),random(-1,1)))
    }
    draw(){
        image(fishImg,this.position.x,this.position.y,12,12)

    }

    

    cohesion(){
        let pCenter = new Vector(0,0)
        for (let i = 0; i<fishes.length; i++){

            if (this != fishes[i]) {
                pCenter = pCenter.add(fishes[i].position)
            }
        }
        pCenter = pCenter.scalar(1 / fishes.length)
        return pCenter.subtraher(this.position).scalar(1 /100)
    }

    

    seperation(){
        let pCenter = new Vector(0,0)
        let distance = seperationDistanceSlider.value()
        let diff
        for (let i = 0; i<fishes.length; i++){
            if (this != fishes[i]) {
            //    print(this.position)
                
                diff = this.position.subtraher(fishes[i].position)
                if (diff.getLength()<distance){

                    pCenter = pCenter.subtraher(fishes[i].position.subtraher(this.position))
                }
               
            }
        }
        
        return pCenter
    }




    alignment(){
        let pVelocity = new Vector(0,0)
        let chgVelocity = chgVelocitySlider.value()
        for (let i = 0; i<fishes.length; i++){
            //print(this != fishes[i])
           // print("")
            if (this != fishes[i]) {
                pVelocity = pVelocity.add(fishes[i].velocity)
            }
        }
        pVelocity = pVelocity.scalar(1 / fishes.length)
        return (pVelocity.subtraher(this.velocity)).scalar(1 /chgVelocity)
    }
    
    


}

class Bluefish extends Fish {
    constructor(position = new Vector(random(windowWidth),random(windowHeight)),velocity = new Vector(random(-1,1),random(-1,1))){
        super(position = new Vector(random(windowWidth),random(windowHeight)),velocity = new Vector(random(-1,1),random(-1,1)))
    }
    draw(){
        image(bluefishImg,this.position.x,this.position.y,12,12)

    }


    cohesion(){
        let pCenter = new Vector(0,0)
        for (let i = 0; i<blueFishes.length; i++){

            if (this != blueFishes[i]) {
                pCenter = pCenter.add(blueFishes[i].position)
            }
        }
        pCenter = pCenter.scalar(1 / blueFishes.length)
        return pCenter.subtraher(this.position).scalar(1 /100)
    }

    

    seperation(){
        let pCenter = new Vector(0,0)
        let distance = seperationDistanceSlider.value()
        let diff
        for (let i = 0; i<blueFishes.length; i++){
            if (this != blueFishes[i]) {
            //    print(this.position)
                
                diff = this.position.subtraher(blueFishes[i].position)
                if (diff.getLength()<distance){

                    pCenter = pCenter.subtraher(blueFishes[i].position.subtraher(this.position))
                }
               
            }
        }
        
        return pCenter
    }




    alignment(){
        let pVelocity = new Vector(0,0)
        let chgVelocity = chgVelocitySlider.value()
        for (let i = 0; i<blueFishes.length; i++){
            //print(this != fishes[i])
           // print("")
            if (this != blueFishes[i]) {
                pVelocity = pVelocity.add(blueFishes[i].velocity)
            }
        }
        pVelocity = pVelocity.scalar(1 / blueFishes.length)
        return (pVelocity.subtraher(this.velocity)).scalar(1 /chgVelocity)
    }
    

    


}
