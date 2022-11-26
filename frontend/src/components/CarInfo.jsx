import React from "react";
import "./CarInfo.css"
import axios from 'axios'; 
import { useState } from "react";





const CarInfo = (props) => {

	//stores api get request in these state variables

	const [manufacturer, setManufacturer] = useState()
	const [model, setModel] = useState()
	const [fuelType, setFuelType] = useState()
	const [mileage, setMileage] = useState()
	const [color, setColor] = useState()
	const [description, setDesc] = useState()
	const [image, setImage] = useState()
	const [typeId, setTypeId] = useState()
	const [rentalBranchId, setRentalBranchId] = useState()



	async function get_car_model(id) {

		let res = await axios.get('http://127.0.0.1:8000/cars/' + id);
		let data = res.data;
		
		//set states
		setManufacturer(data.manufacturer)
		setModel(data.model)
		setFuelType(data.fuelType)
		setMileage(data.mileage)
		setColor(data.colour)
		setImage(data.image)
		setTypeId(data.typeID)
		setRentalBranchId(data.BranchID)

		return data
	
	  }

	  async function get_car_desc(id){

		let res = await axios.get('http://127.0.0.1:8000/carType/' );
		let data = res.data;
		const length = Object.keys(data).length;
	
		for (let i =0; i < length; i++){
			
			if (data[i].id == typeId)
				console.log(data[i].id, typeId)
				setDesc(data[i].description)
				return data[i]
		}
	 }



	  function display_info_on_page(id){
		get_car_model(id)
		get_car_desc(id)
		
	  }

	  
	/*Displays all information related to the car info on page*/  
	display_info_on_page(props.car_id)



	/* POST TRANSACTION INFORMATION IN THE DATABASE */

	async function post_customer_transaction_in_db(){

		axios.post('http://127.0.0.1:8000/rental/', {
			 dateFrom:  props.rental_start_date,
			 dateTo: props.rental_end_date,
			 dateReturned: "",
			 totalCost: props.rental_cost,
			 rentalBranchID:  rentalBranchId,
			 returnBranchID: "",
			 carID: props.car_id,
			 typeID: typeId,
			 customerID: props.customer_id,
			 rentalEmployeeID: "",
			 returnEmployeeID: ""

		  })
		  .then((response) => {
			if (response.status === 201) {
			console.log(response);

			}

		  }, (error) => {
			console.log(error);
			console.log( "start date: " + props.rental_start_date  + "\n")
			console.log( "end date:" +  props.rental_end_date + "\n")
			console.log( "cost: " +	props.rental_cost +"\n",)
			console.log( "rental_branch_Id: " +	rentalBranchId +"\n")
			console.log( "Car_Id: " +	props.car_id +"\n")
			console.log( "customer_id: " +	props.customer_id +"\n")
			console.log( "typeId: " +	typeId +"\n")

			 
		  });


	 }




	 /* Clicking on checkout  */
	 function handleClick(e) {
		e.preventDefault();
		console.log('You clicked submit.');
		post_customer_transaction_in_db()
	  }




    return <div> 


<div class ="whole_page">

		
			<div class="car-t">
				<h1> {  manufacturer + " " + model} </h1>
				<div class="vehicle-page-heading__description"> Offers great gas mileage and the ease of driving and parking in high traffic areas. Reserve now and get low rates on a car rental from Exotic Rentals. 100% customer satisfaction guaranteed! 
</div>

			</div>
		


    <div class="car-type-class">
					<p> {description} </p>
					
				</div>


	<div id="wrapper">

    <div id="first" class="car-details">
						<p class="car-details__title">Details</p>
						<ul class="car-details__list">
							<li class="car-details__list-item">
							<span class="car-details__list-icon-wrapper">
								<i class="icon icon-specs-transmission-gray"></i>
							</span>
								<span> {fuelType} </span>
							</li>
							<li class="car-details__list-item">
							<span class="car-details__list-icon-wrapper">
								<i class="icon icon-specs-passenger-gray"></i>
							</span>
								<span> {mileage + " " + "Miles"}</span>
							</li>
							<li class="car-details__list-item">
							<span class="car-details__list-icon-wrapper">
								<i class="icon icon-specs-bags-gray"></i>
							</span>
								<span>{color}</span>
							</li>
						</ul>
					</div>


        <div id="second" class="vehicle-detail-band__detail-spec">
					
					<div class="car-features__column">
						<p class="car-details__title">Features</p>
					
							<div class="car-features">
								<ul class="car-features__list">
									<li class="car-features__list-item">Bluetooth</li>
								
									<li class="car-features__list-item">Cruise Control</li>
								
									<li class="car-features__list-item">AM/FM Stereo Radio</li>
								
									<li class="car-features__list-item">Automatic</li>
								
									<li class="car-features__list-item">Air Conditioning</li>
								</ul>
							</div>
				
					</div>
				</div>


                
                <div id="third" class="car-pic">
				<img class="vehicle-detail-band__car-image" src= {"https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/CA/CARS/CCAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1611777286679.png"} alt="https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/CA/CARS/CCAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1611777286679.png">
                 </img> 
			</div>


			< div class="price-card" >

			<div class="price-tile">
				
				<span class="unit">Price Total:  &nbsp; &nbsp; $</span>
				<span class="amount">{props.rental_cost}</span>

				<div class="renting-dates"> <p > {props.rental_start_date}  | {props.rental_end_date} </p> </div>

				<div>
					 <button  onClick={handleClick} class="button-34"
				type="button"> Checkout </button>
				</div>
				

				</div>
				
			</div>

			

			

                </div>

				</div>

					</div>



}



export default CarInfo;

