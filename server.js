// Import required modules
const express = require('express'); // Express framework for creating the server
const bodyParser = require('body-parser'); // Middleware for parsing form data

// Initialize the app
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.static('public')); // Serve static files (like CSS) from the 'public' folder

// Route for the home page
app.get('/', (req, res) => {
    // Serve the index.html file when the user accesses the root URL
    res.sendFile(__dirname + '/views/index.html');
});

// Route for handling the form submission
app.post('/calculate', (req, res) => {
    // Retrieve the 'weight', 'height', 'age', 'gender' field value from the submitted form
    const weight = req.body.weight; //declare constant variable weight
    const height = req.body.height; //declare constant variable height
    const age = req.body.age; //declare constant variable age
    const gender = req.body.gender; //declare constant variable gender

    function errorPage(mess) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your BMI result</title>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <h1>Input ${mess} is zero</h1>
                <p>Back to previous page and enter input ${mess} bigger than zero!</p>
                <a href="/">Go back</a> 
            </body>
            </html>
        `);
    };

    if (weight <= 0) {
        errorPage("Weight");
    } else if (height == 0) {
        errorPage("Height");
    }

    let bmi = weight / (height * height) //bmi calculation formula

    let category = [
        "Category 1 below 18.5: Underweight",
        "Category 2 18.5 - 24.9: Normal weight",
        "Category 3 25 - 29.9: Overweight",
        "Category 4 30 and above: Obesity",
    ];
    var tips = [
        "Tips:<br>1.	Increase calorie intake: Eat nutrient - dense foods like nuts, seeds, avocado, dairy, lean proteins, and whole grains.<br>2.	Frequent meals: Have 5–6 smaller meals throughout the day to maintain a steady intake of calories.<br>3.	Add healthy snacks: Include snacks like trail mix, peanut butter on whole - grain bread, or yogurt with fruit.<br>4.	Strength training: Focus on resistance exercises to build muscle mass.<br>5.	Hydrate smartly: Drink high - calorie beverages like smoothies or protein shakes, but avoid filling up on water before meals.",
        "Tips:<br>1.	Balanced diet: Maintain a mix of lean proteins, whole grains, healthy fats, fruits, and vegetables.<br>2.	Regular exercise: Combine cardio with strength training for overall fitness and muscle tone.<br>3.	Monitor portion sizes: Avoid overeating even if your weight is normal.<br>4.	Stay hydrated: Drink plenty of water to support metabolism and overall health.<br>5.	Routine health checks: Ensure your weight remains stable by tracking changes and addressing issues early.",
        "Tips:<br>1.	Caloric deficit: Eat fewer calories than you burn by reducing portions and choosing lower - calorie foods.<br>2.	Increase physical activity: Aim for at least 150 minutes of moderate - intensity exercise per week.<br>3.	Eat mindfully: Avoid emotional or distracted eating; focus on hunger and fullness cues.<br>4.	Limit processed foods: Reduce intake of sugary, fried, and highly processed items.<br>5.	Stay consistent: Make gradual changes to habits for long - term success.",
        "Tips:<br>1.	Consult a professional: Work with a dietitian or healthcare provider to create a tailored weight - loss plan.<br>2.	Adopt a structured diet: Follow a plan rich in vegetables, lean proteins, and whole grains while cutting back on sugars and fats.<br>3.	Increase physical activity gradually: Start with low - impact exercises like walking or swimming and build up intensity.<br>4.	Behavioral strategies: Use techniques like journaling, setting realistic goals, and identifying triggers for overeating.<br>5.	Consider medical interventions: Explore options like medications or bariatric surgery if lifestyle changes aren’t enough.",
    ];
    var result;
    // result takes value from array which collects category group
    if (bmi < 18.5) {
        result = 0;
    } else if (bmi < 25) {
        result = 1;
    } else if (bmi < 30) {
        result = 2;
    } else {
        result = 3;
    }


    // Send a personalized greeting as the response
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your BMI result</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Your BMI category</h1>
            <p>${category[result]}</p>
            <p>Your age is ${age} and gender is ${gender}!  Your BMI=${bmi}</p>
            <p class=tips >${tips[result]}</p>
            <a href="/">Go back</a> 
        </body>
        </html>
    `);
});

// Start the server
const PORT = 3000; // Define the port number
app.listen(PORT, () => {
    // Log a message when the server starts
    console.log(`Server is running on http://localhost:${PORT}`);
});
