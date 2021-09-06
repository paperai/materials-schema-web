import dataToBeParsed from "../material.json";

import { StaticParser } from "./parse/StaticParser";

/**
 * Validate `material.json`.
 * TODO: Maybe create a common parser for both validation and execution to increase effciency.
 */
if (typeof require !== "undefined" && require.main === module) {
	const dataTypeIds = dataToBeParsed.dataTypes.map((eachMap) => eachMap.id);
	const typeIds = dataToBeParsed.types.map((eachMap) => eachMap.id);
	const propertyIdsInTypes = dataToBeParsed.types.map((eachMap) => eachMap.properties).flat();
	const propertyIds = dataToBeParsed.properties.map((eachMap) => eachMap.id);
	const typeIdsInPropertys = dataToBeParsed.properties.map((eachMap) => eachMap.expectedTypes).flat(); // Contains both `DataType` and `Type`.

	/** Validate duplicate Ids. */
	let hasDuplicateId = false;
	const duplicateDataTypeIds = StaticParser.findDuplicate<string>(dataTypeIds);
	const duplicateTypeIds = StaticParser.findDuplicate<string>(typeIds);
	const duplicatePropertyIds = StaticParser.findDuplicate<string>(propertyIds);

	for (const duplicateIds of [duplicateDataTypeIds, duplicateTypeIds, duplicatePropertyIds]) {
		if (duplicateIds.length > 0) {
			console.log("\x1b[31m" + "Duplicate Ids exist: " + duplicateIds.join(", "));
			hasDuplicateId = true;
		}
	}

	/** Validate absent `Property`s in `Type`. */
	const absentPropertyIds = [];
	for (const expectedPropertyId of [...new Set(propertyIdsInTypes)]) {
		if (!propertyIds.includes(expectedPropertyId)) {
			absentPropertyIds.push(expectedPropertyId);
		}
	}

	/** Validate absent `Type`s in `Property`. */
	const dataTypeAndTypeIds = [...dataTypeIds, ...typeIds];
	const absentTypeIds = [];
	for (const expectedTypeId of [...new Set(typeIdsInPropertys)]) {
		if (!dataTypeAndTypeIds.includes(expectedTypeId)) {
			absentTypeIds.push(expectedTypeId);
		}
	}

	let hasError = false;
	// Set error if any duplicate id exists.
	if (hasDuplicateId) {
		console.log("\x1b[31m" + "Please resolve all duplicate Ids.\n");
		hasError = true;
	}
	if (absentPropertyIds.length > 0) {
		console.log("\x1b[31m" + "These Properties are not defined in `Property`, but appears in Types' reference.");
		console.log(absentPropertyIds.join(",") + "\n");
		hasError = true;
	}
	if (absentTypeIds.length > 0) {
		console.log("\x1b[31m" + "These Types are not defined in `Type`, but appears in Properties' reference.");
		console.log(absentTypeIds.join(",") + "\n");
		hasError = true;
	}

	if (hasError) {
		console.log("\x1b[35m" + "Please resolve the problems and then execute this program again." + "\x1b[0m");
		process.exit(1);
	}
	console.log("\x1b[0m");
}
