/**
 * A static functional html writer class.
 *
 * All functions that have no instance status and can be reused should be put into this class.
 */
export class StaticWriter {
	constructor() {
		throw new Error("DO NOT CALL THIS CLASS USING INSTANCE!");
	}

	/**
	 * Make search function in list view.
	 * @note Target row `<tr>` should have class "search-row" and data-name attribute;
	 */
	public static makeRowSearchHtml() {
		const seachJs = `<script>
			$(function() {
				$("#searchInput").on("keyup", function() {
					$(".search-row").hide();
					var searchVal = $("#searchInput").val();
					if (searchVal == "") {
						$(".search-row").show();
					} else {
						$(".search-row").each(function() {
							var thisName = $(this).data("name").toLowerCase();
							if (thisName.indexOf(searchVal) !== -1) {
								$(this).show();
							}
						});
					}
				})
			})
			</script>`;
		// const searchIcon =
		// 	`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="White" class="bi bi-search" viewBox="0 0 15 15">` +
		// 	`<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>` +
		// 	`</svg>`;
		let ret = "";
		ret += `<div class="search-group my-5">`;
		ret += `<div class="input-group">`;
		ret += `<input id="searchInput" type="text" class="form-control" placeholder="Search by Name...">`;
		ret += `<span class="input-group-btn" style="width: 45%;">`;
		// ret += `<button class="btn btn-primary" type="button">${searchIcon}</button>`;
		ret += `</span>`;
		ret += `</div>`;
		ret += `</div>`;
		return ret + seachJs;
	}
}
