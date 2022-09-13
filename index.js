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

function createArchitectBlueprint(squareMeters, numberOfRooms, increaseSquareMeters, increaseNumberOfRooms) {
    function recountTheParameters() {
        if (!numberOfRooms) {
            let currentNumberOfRooms = 1;
            let currentSquareMeters = squareMeters;
            while (currentNumberOfRooms < 10/squareMeters) {
                currentNumberOfRooms = increaseNumberOfRooms();
            }
            while (currentSquareMeters/currentNumberOfRooms < 10) {
                currentSquareMeters = increaseSquareMeters();
            }
        }
        else if (!squareMeters) {
            let currentSquareMeters = 1;
            while (currentSquareMeters/numberOfRooms < 10) {
                currentSquareMeters = increaseSquareMeters();
            }
        }
    }
    if(squareMeters && numberOfRooms) {
        let currentSquareMeters = squareMeters;
        while (currentSquareMeters/numberOfRooms < 10) {
            currentSquareMeters = increaseSquareMeters();
        }
        return {
            architectBlueprint: new ArchitectBlueprint(),
        }
    }
    return {
        recountTheParameters,
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
    while((squareMeters/numberOfFloors)/currentNumberOfPillars > 25) {
        currentNumberOfPillars = increaseNumberOfPillars();
    }
    return {
        constructionBlueprint: new ConstructionBlueprint(),
    }
}

function createBuildingBlueprint(desiredSquareMeters, desiredNumberOfRooms) {
    const numberOfFloors = 2;
    let numberOfRooms = desiredNumberOfRooms;
    let squareMeters = desiredSquareMeters;
    let numberOfFireDetectors = 40;
    let numberOfPillars = 4;

    function increaseSquareMeters() {
        squareMeters = squareMeters ?? 1;
        return squareMeters++;
    }
    function increaseNumberOfFireDetectors() {
        return numberOfFireDetectors++;
    }
    function increaseNumberOfPillars() {
        return numberOfPillars++;
    }
    function increaseNumberOfRooms() {
        numberOfRooms = numberOfRooms ?? 1;
        return numberOfRooms++;
    }

    const createArchitectBlueprintReturnValue = createArchitectBlueprint(squareMeters, numberOfRooms, increaseSquareMeters, increaseNumberOfRooms)
    if(!squareMeters || !numberOfRooms) {
        createArchitectBlueprintReturnValue.recountTheParameters();
    }

    return {
        architectBlueprint: createArchitectBlueprintReturnValue.architectBlueprint,
        electricBlueprint: createElectricBlueprint(numberOfFireDetectors, numberOfRooms, increaseNumberOfFireDetectors),
        constructionBlueprint: createConstructionBlueprint(squareMeters, numberOfFloors, numberOfPillars, increaseNumberOfPillars),
        squareMeters,
        numberOfFloors,
        numberOfRooms,
        numberOfFireDetectors,
        numberOfPillars,
    }
}

const desiredSquareMeters = 3;
const desiredNumberOfRooms = undefined;
const blueprint = createBuildingBlueprint(desiredSquareMeters, desiredNumberOfRooms);

const electricBlueprint = blueprint.electricBlueprint;
const constructionBlueprint = blueprint.constructionBlueprint;
const architectBlueprint = blueprint.architectBlueprint;

console.log(electricBlueprint, constructionBlueprint, architectBlueprint);

console.log(blueprint.numberOfFloors, blueprint.squareMeters, blueprint.numberOfRooms, blueprint.numberOfFireDetectors, blueprint.numberOfPillars);