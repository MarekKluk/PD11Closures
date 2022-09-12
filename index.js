//Task 1
function getDeltaFunction(firstFunctionArguments) {
    return function getDelta (secondFunctionArguments) {
        if (firstFunctionArguments && secondFunctionArguments) {
            const a = secondFunctionArguments.a ?? firstFunctionArguments.a
            const b = secondFunctionArguments.b ?? firstFunctionArguments.b
            const c = secondFunctionArguments.c ?? firstFunctionArguments.c
            return b*b - 4*a*c;
        }
        else return NaN;
    }
}
const getDelta = getDeltaFunction({a:2, b:3});
const delta = getDelta({c:3});
console.log(delta);

//Task 2
class ElectricBlueprint {}
class ConstructionBlueprint {}
class ArchitectBlueprint {}

function createArchitectBlueprint(squareMeters, numberOfRooms, increaseSquareMeters) {
    let currentSquareMeters = squareMeters;
    while(currentSquareMeters/numberOfRooms < 10) {
        currentSquareMeters = increaseSquareMeters();
    }
    return {
        architectBlueprint: new ArchitectBlueprint(),
    }
}
function createElectricBlueprint(numberOfFireDetectors, numberOfRooms, increaseNumberOfFireDetectors) {
    let currentNumberOfFireDetectors = numberOfFireDetectors;
    while(currentNumberOfFireDetectors/numberOfRooms < 4) {
        currentNumberOfFireDetectors = increaseNumberOfFireDetectors();
    }
    return {
        electricBlueprint: new ElectricBlueprint(),
    }
}
function createConstructionBlueprint(squareMeters, numberOfFloors, numberOfPillars, increaseNumberOfPillars) {
    let currentNumberOfPillars = numberOfPillars;
    while(((squareMeters/numberOfFloors)/currentNumberOfPillars) > 25) {
        currentNumberOfPillars = increaseNumberOfPillars();
    }
    return {
        constructionBlueprint: new ConstructionBlueprint(),
    }
}

function createBuildingBlueprint(desiredSquareMeters) {
    let squareMeters = desiredSquareMeters ?? 200;
    const numberOfFloors = 2;
    const numberOfRooms = 14;
    let numberOfFireDetectors = 40;
    let numberOfPillars = 4;

    function increaseSquareMeters () {
        return squareMeters++;
    }
    function increaseNumberOfFireDetectors () {
        return numberOfFireDetectors++;
    }
    function increaseNumberOfPillars() {
        return numberOfPillars++;
    }

    return {
        squareMeters,
        numberOfFloors,
        numberOfRooms,
        numberOfFireDetectors,
        numberOfPillars,
        electricBlueprint: createElectricBlueprint(numberOfFireDetectors, numberOfRooms, increaseNumberOfFireDetectors),
        constructionBlueprint: createConstructionBlueprint(squareMeters, numberOfFloors, numberOfPillars, increaseNumberOfPillars),
        architectBlueprint: createArchitectBlueprint(squareMeters, numberOfRooms, increaseSquareMeters),
    }
}

const desiredSquareMeters = 120;
const blueprint = createBuildingBlueprint(desiredSquareMeters);

const electricBlueprint = blueprint.electricBlueprint;
const constructionBlueprint = blueprint.constructionBlueprint;
const architectBlueprint = blueprint.architectBlueprint;

console.log(electricBlueprint, constructionBlueprint, architectBlueprint);

console.log(blueprint.numberOfFloors, blueprint.squareMeters, blueprint.numberOfRooms, blueprint.numberOfFireDetectors, blueprint.numberOfPillars);