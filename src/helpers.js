function getFormattedDate(timestamp) {
	return timestamp.toLocaleDateString("en-GB", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export {getFormattedDate}