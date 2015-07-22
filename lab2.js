'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/
function Blob() {
  this.rate = 0;
  this.hour = 0;
  this.total = 0;
  while (this.total < 1000) {
    this.rate++;
    this.hour++;
    this.total += this.rate;
  }
}
var blob = new Blob();
var hoursSpentInDowington = 45; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.
  this.total = 0;
  this.rate = peoplePerHour;
  this.hour = 0;
  while (this.total < population) {
    this.hour++;
    this.total += this.rate;
    this.rate++;
  }
  return this.hour;
};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
assert(blob.hoursToOoze(9, 1) === 4,
  'starting at 1 per hour, a population of 9 takes 4 hours');
assert(blob.hoursToOoze(1598, 2000) === 1,
  'the blob is too powerful and will finish the town in only its first hour');
assert(blob.hoursToOoze(15, 2) === 5,
  'starting at 2 per hour, a population of 15 will take 5 hours');

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.
// console.log(hello.romulan);

function SentientBeing(planet, languages) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.planet = planet;
  this.languages = languages;
}

// sb is a SentientBeing object
SentientBeing.prototype.sayHello = function(sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating
  console.log(hello[this.languages]);
  return hello[sb.languages];
    //TODO: put this on the SentientBeing prototype
};

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).
function Klingon() {
}
Klingon.prototype = new SentientBeing('Qo\'noS', 'klingon');
function Human() {
}
Human.prototype = new SentientBeing('Earth', 'federation standard');
function Romulan() {
}
Romulan.prototype = new SentientBeing('Romulus', 'romulan');
// console.log(Klingon());

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the Human should hear hello');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the Human should hear hello');

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    var lastA = a.charAt(a.length - 1);
    var lastB = b.charAt(b.length - 1);
    if (lastA < lastB) {
      return -1;
    }
    if (lastA > lastB) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }
  stringArray.sort(byLastLetter);
  return stringArray;
}
var names = ['felix', 'cano', 'cruz', 'seager'];
var alWest = ['seattle', 'houston', 'los angeles', 'oakland'];

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  function makeSum(element) {
    sum += element;
  }
  numberArray.forEach(makeSum);

  return sum;
}
var numbers = [34, 22, 23, 15];
var ichiroMarinerHits = [242, 208, 212, 262, 206, 224, 238, 213, 225, 214, 184, 105];

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    // console.log(item);
    var sumOfA = sumArray(a);
    var sumOfB = sumArray(b);
    return sumOfA - sumOfB;
  });
  return arrayOfArrays;

}

var arrOfNumbers = [[3, 11, 24, 51], [51, 34, 29, 11], [34, 22, 23, 15]];
var mariners2015Starters = [[3, 20, 22, 5, 15], [35, 16, 7], [23],
  [34, 65, 18, 33, 32], [97, 57, 41, 54, 56, 39]];

assert(lastLetterSort(names).toString() === 'cano,seager,felix,cruz',
  'last letter alphabetically should be o-r-x-z');
assert(lastLetterSort(alWest).toString() === 'oakland,seattle,houston,los angeles',
  'last letter alphabetically should be d-e-n-s');
assert(sumArray(numbers) === 34 + 22 + 23 + 15,
  'the numbers should add up to 94');
assert(sumArray(ichiroMarinerHits) === 2533,
  'Ichiro had 2533 career hits as a Mariner');
assert(sumSort(arrOfNumbers).toString() === '3,11,24,51,34,22,23,15,51,34,29,11',
 'order: set 1 = 89, set 3 = 94, set 2 = 125,');
assert(sumSort(mariners2015Starters).toString() ===
  '23,35,16,7,3,20,22,5,15,34,65,18,33,32,97,57,41,54,56,39',
  'order: DH = 23, OF = 58, IF = 65, SP = 182, RP = 344');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
