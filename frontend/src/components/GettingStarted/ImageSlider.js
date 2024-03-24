// Image Slider component 
import SimpleImageSlider from "react-simple-image-slider"

// Images used for the image slider
const images = [
	{
		url: "/Japan.jpg",
		title: "Japan",
		width: "100%",
		height: "100%",
	},
  	{
		url: "/NewOrleans.jpg",
		title: "NewOrleans",
    	width: "100%",
		height: "100%",
	},
	{
		url: "/Jinhae.jpg",
		title: "Jinhae, South Korea",
    	width: "100%",
		height: "100%",
	},
	{
		url: "/SanSebastian.jpg",
		title: "San Sebastian, Spain",
   	 	width: "100%",
		height: "100%",
	},
	{
		url: "/Lanterns.jpg",
		title: "Lanterns",
		width: "100%",
		height: "100%",
	},
	{
		url: "/CinqueTerre.jpg",
		title: "Italy",
   		width: "100%",
		height: "100%",
	},

];


function ImageSlider() {
	return (
		<div >
		{/*An image slider for the banner of the Getting Started Page */}
			<SimpleImageSlider
			style={{ margin: 'auto', }}
			width={"100%"} // Set width to 100% for responsive behavior
			height={"98vh"} 
			images={images}
			showBullets={true}
			navStyle={2}
			navMargin={20}
			loop={true}
			autoPlay={true}
			autoPlayDelay={3}

			/>
		</div>
	)
}

export default ImageSlider