document.getElementById("orderButton").addEventListener("click", function() {
    //this is the event listener to listen for the click, and to run our function
    const flavor = document.getElementById("flavor").value;
    const size = document.getElementById("size").value;
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked')).map(e => e.value);
    const smoothie = new Smoothie(flavor, size, extras);
    document.getElementById("orderSummary").innerText = smoothie.describe();
});

//let's create a flavor listener. Each time the flavor changes, we update the flavor we update the image.
document.getElementById("flavor").addEventListener("change", function() {
    //Take the flavor from the current object.
    const flavor = this.value;
    const flavorImage = document.getElementById("flavorImage");
    //let's create a list of images. We'll use the flavor as the identifier
    const flavorImages = {
        strawberry: "img/strawberry.jpg",
        'mixed berry': "img/mixedberry.jpg",
        mango: "img/mango.jpg",
        blueberry: "img/blueberry.jpg",
        peach: "img/peach.jpg",
        banana: "img/banana.jpg"
    };
    //then set the image source to based on the flavor
    flavorImage.src = flavorImages[flavor];
    flavorImage.alt = flavor + " Flavor";
});

//now we need our Smoothie class
class Smoothie {
    //here's our constructor, where we pass in our flavor, our size and our list of extras
    constructor(flavor, size, extras) {
        //now let's set variables we'll use later based on the variables we passed in from our user input
        this.flavor = flavor;
        this.size = size;
        this.extras = extras;
        //similar to the images, we'll create a list of prices based on the extras.
        this.extraPrices = {
            "protein": 1.99,
            "vitamins": 1.99,
            "energy boost": 2.99,
            "chia seeds": 0.99,
            "honey": 0.99,
            "almond milk": 2.99
            //We will iterate through the extras in calculateSubtotal
        };
        this.sizePrices = {
            //another list - let's create a list of prices based on the extras.
            "child sized": 0.99,
            "small": 1.99,
            "medium": 2.99,
            "large": 3.99,
            "Oh No! sized": 6.66
            //We will add it to subtotal in calculateSubtotal
        };
        this.subtotal = this.calculateSubtotal();
    }

    calculateSubtotal() {
        //first, let's take the price of the size and save it as subtotal
        let subtotal = this.sizePrices[this.size];
        //we need to start with something, and free is where we start.
        for (let extra of this.extras) {
            // we go through each of the extras in our list, grab the price from the extraPrices list in our smoothie class, and add it to the subtotal. This will allow for future expansion in case we need to add taxes.
            // the || 0 will prevent undefined errors in case we have no extras.
            subtotal += this.extraPrices[extra] || 0;
        }
        //then we need to return our subtotal. We want to make sure we don't have any wierd roudning issues so we'll make sure it's returned with 2 decimals.
        return parseFloat(subtotal.toFixed(2));
    }

    describe() {
        //the describe function updates our order output.
        //First, we'll create extra's list. If there is nothing in the list (this.extras.length > 1) then we say there is no extras for the description.
        let extrasDescription = this.extras.length > 1 ? this.extras.join(", ") : "no extras";
        // then return our full statement, including our variables.
        return `Your ${this.size} ${this.flavor} smoothie with ${extrasDescription} is ready. Your order total is $${this.subtotal}. Have a sweet day!`;
    }
}