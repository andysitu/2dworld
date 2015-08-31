function forfor(len1, len2, func1, func2, context) {

	for (var i = 0; i < len1; i++) {
		func1.call(context, i)
		for (var j = 0; j < len2; j++) {
			func2.call(context, j, i)
		}
	}
}