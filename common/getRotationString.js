var getRotationString = (function getRotationString() {
	var rStrings = {}
	var cur;
	return function rotationString(rotation) {
		cur = Math.round(radToDegree(rotation) + 'e+2') + 'e-2'
		if (!rStrings[cur]) rStrings[cur] = `rotate(${cur} 0 0)`
		return rStrings[cur]
	}
})()