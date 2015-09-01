view = {
	width: 40,
	length: 40,
	makeTable() {
		var width = this.width,
			length = this.length,
			table = document.createElement("table"),
			docFrag = document.createDocumentFragment(),
			tr = null,
			table_container = document.getElementById("table_container");

		docFrag.appendChild(table);
		table.cellspacing = 0;
		table.cellpadding = 0;


		for (var i = 0; i < width; i++) {
			var tr = document.createElement("tr");
			
			for (var j = 0; j < length; j++) {
				var td = document.createElement("td");
				td.setAttribute("class", "space");
				tr.appendChild(td);
			}

			table.appendChild(tr);
		}
/*
		function f1(i) {
			tr = document.createElement("tr");
			table.appendChild(tr);
		}

		function f2(j, i) {
			var td = document.createElement("td");
			tr.appendChild(td);
			td.className = "space";
		}

		forfor(width, length, f1, f2, this);
*/
		table_container.appendChild(docFrag);
	}
}