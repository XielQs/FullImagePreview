//! Style
styleEl = document.createElement("style");
style =
	'img[src]:not(.imgNormal){cursor:pointer}.imgModal{z-index:9999;position:fixed;width:100%;height:100%;top:0;left:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;font-family:sans-serif;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:400;font-size:18px}.imgModal>.img{max-width:1068px;max-height:537px;min-width:450px;min-height:535px}.imgModal>.img>img{width:100%;height:100%}.imgModal .footer{position:absolute;bottom:5px;left:5px;color:#fff}.imgModal .footer .textHead{display:block;font-weight:700}.imgModal .footer .textHead::after{content:":"}.imgModal .footer span a{color:unset;text-decoration:none}.imgModal .footer span a:hover{text-decoration:underline}.imgModal-backdrop{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,0.6);z-index:9998}.hide{opacity:0;-webkit-transition:300ms all;transition:300ms all}.show{opacity:1;-webkit-transition:300ms all;transition:300ms all}';
styleEl.textContent = style;
document.head.appendChild(document.createComment(" Code Injected By FullImagePreview "));
document.head.appendChild(styleEl);
//? End
function __convertFileSize(size) {
	var i = Math.floor(Math.log(size) / Math.log(1024));
	return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
}
const imgs = document.querySelectorAll("img[src]");
[...imgs].map((img) => {
	img.addEventListener("click", (e) => {
		const modal = document.createElement("div");
		modal.classList.add("imgModal");
		modal.classList.add("hide");
		modal.innerHTML = `<div class="img">
            <img class="imgNormal" src="${e.target.src}" />
        </div>
        <div class="footer">
            <div class="imageAlt">
                <span class="textHead"> Image Alt </span>
                <span> ${e.target.alt || "underfined"} </span>
            </div>
            <div class="size">
                <span class="textHead"> Size </span>
                <span> ${e.target.width}x${e.target.height} </span>
            </div>
            <div class="imageUrl">
                <span class="textHead"> Image Url </span>
                <span> <a href="${e.target.src}" target="_blank">${e.target.src.length >= 120 ? e.target.src.slice(0, 120) + "..." : e.target.src}</a> </span>
            </div>
            <div class="imageExt">
                <span class="textHead"> Image Extension </span>
                <span> ${e.target.src.split(/[#?]/)[0].split(".").pop().trim()} </span>
            </div>
            <div class="fileSize">
                <span class="textHead"> File Size </span>
                <span> Calculating.. </span>
            </div>
        </div>`;
		[...document.body.getElementsByClassName("imgModal")].map((img) => img.remove());
		document.body.appendChild(modal);
		modal.insertAdjacentHTML("afterEnd", '<div class="imgModal-backdrop"></div>');
		document.body.style.overflow = "hidden";
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				if (xhr.status >= 200 && xhr.status <= 400) {
					if (!document.querySelectorAll(".imgModal .footer .fileSize>span+span")[0]) return false;
					document.querySelectorAll(".imgModal .footer .fileSize>span+span")[0].innerText = __convertFileSize(xhr.getResponseHeader("Content-Length"));
				} else {
					throw new Error("XMLHttpRequest Failed\nStatus : " + xhr.status);
				}
			}
		};
		setTimeout(() => {
			modal.classList.remove("hide");
			modal.classList.add("show");
		}, 100);
		xhr.open("GET", e.target.src, true);
		xhr.send();
	});
});
function closeImagePrew() {
	[...document.getElementsByClassName("imgModal")].map((modal) => {
		modal.classList.remove("show");
		modal.classList.add("hide");
		setTimeout(() => {
			modal.remove();
		}, 350);
	});
	[...document.getElementsByClassName("imgModal-backdrop")].map((backdrop) => {
		backdrop.classList.remove("show");
		backdrop.classList.add("hide");
		setTimeout(() => {
			backdrop.remove();
		}, 350);
	});
	document.body.style.overflow = "";
}
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("imgModal")) {
		closeImagePrew();
	}
});
document.addEventListener("keydown", (e) => {
	if (e.key == "Escape") {
		closeImagePrew();
	}
});
