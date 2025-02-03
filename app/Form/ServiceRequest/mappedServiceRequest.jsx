"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { serviceRequests, staffOptions, parameterOptions, serviceTypes } from "@/app/src/serviceDatas";

const formSchema = z.object({
  fullName: z.string(),
  preferredDate: z.string().date(),
  date: z.string().date()
})

function MappedServiceRequestForm({ rowData }) {
  const [serviceSelected, setServiceSelected] = useState(rowData.serviceType);
  const [pickUp, setPickUp] = useState(rowData.pickUp);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    }
  });
  
  const [formData, setFormData] = useState({
    visit_type: "",
    companyName: "",
    contactNumber: "",
    email: "",
    address: "",
    serviceType: "",
    parameters: [],
    preferredDate: "",
    allottedTo: "",
    date: "",
    remarks: "",
    drawnBy: "",
    pickUp: "",
    priority: "",
    pickupDate: "",
    ticket_status: "New",
    category: "Ticket"
  });
  
  useEffect(() => {
    if(serviceSelected === "Water: General Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.firstOptions,
      }))}
    else if(serviceSelected === "Water Complete Analysis as per 10500: 2012") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.secondOptions,
      }))}
    else if(serviceSelected === "Water - Construction Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.thirdOptions,
      }))}
    else if(serviceSelected === "Water - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fourthOptions,
      }))}
    else if(serviceSelected === "Water –Complete Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fifthOptions,
      }))}
    else if(serviceSelected === "Food Microbiological Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.sixthOptions,
      }))}
    else if(serviceSelected === "Food Chemical Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.seventhOptions,
      }))}
    else if(serviceSelected === "Sludge Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.eighthOptions,
      }))}
    else if(serviceSelected === "Soil Testing Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.ninethOptions,
      }))}
    else if(serviceSelected === "Oil - Diesel Testing Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.tenthOptions,
      }))}
    else if(serviceSelected === "Oil - Nutrition Value + FSSAI Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.eleventhOptions,
      }))}
    else if(serviceSelected === "Coal Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twelfthOptions,
      }))}
    else if(serviceSelected === "Effluent Water Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.thirteenthOptions,
      }))}
    else if(serviceSelected === "Sewage Water Chemical Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fourteenthOptions,
      }))}
    else if(serviceSelected === "Ambient Air Quality Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fifteenthOptions,
      }))}
    else if(serviceSelected === "DG Stack Emission Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.sixteenthOptions,
      }))}
    else if(serviceSelected === "Ambient Noise Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.seventeenthOptions,
      }))}
    else if(serviceSelected === "DG Noise Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.eighteenthOptions,
      }))}
    else if(serviceSelected === "Lux Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.nineteenthOptions,
      }))}
    else if(serviceSelected === "Indoor Air Quality") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twenteenthOptions,
      }))}
    else if(serviceSelected === "Compressor Air Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyFirstOptions,
      }))}
    else if(serviceSelected === "Feldspar Analysis Parameter") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentySecondOptions,
      }))}
    else if(serviceSelected === "Quartz Sample Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyThirdOptions,
      }))}
    else if(serviceSelected === "Lime Stone Sample Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyFourthOptions,
      }))}
    else if(serviceSelected === "Plate - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyFifthOptions,
      }))}
    else if(serviceSelected === "Swab - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentySixthOptions,
      }))}
    else if(serviceSelected === "Sewage Water Microbiological Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentySeventhOptions,
      }))}
    else if(serviceSelected === "Weather Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyEighthOptions,
      }))}
      else if(serviceSelected === "Oxygen Purity Parameters") {
        setFormData((prevState) => ({
          ...prevState,
          parameters: parameterOptions.twentyNinethOptions,
        }))}
  
      serviceTypes.map((service) => {
        if(service.name == serviceSelected) { 
          console.log(service.code);
        }
      })
  }, [serviceSelected])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /*const handleSelectChangeName = (value) => {
    setFormData({ ...formData, companyName: value})
  }*/

  const handleSelectChangeService = (value) => {
    setFormData({ ...formData, serviceType: value})
    setServiceSelected(value);
  }

  const handleSelectChangeVisitType = (value) => {
    setFormData({ ...formData, visit_type: value})
  }

  const handleSelectChangePickup = (value) => {
    setFormData({ ...formData, pickUp: value})
    setPickUp(value);
  }

  const handleSelectChangeDrawn = (value) => {
    setFormData({ ...formData, drawnBy: value})
  }

  const datePicker = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFormData({...formData, preferredDate: formattedDate});
  }

  const serviceDatePicker = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFormData({...formData, date: formattedDate});
  }
/*
  const pickupDatePicker = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFormData({...formData, pickupDate: formattedDate});
  }*/
  const handleSelectChangeAllocate = (value) => {
    setFormData({...formData, allottedTo: value});
  }

  const handleSelectChangePriority = (value) => {
    setFormData({...formData, priority: value});
  }

  const handleCheckboxChange = (e) => {
    let { value, checked } = e.target;
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        parameters: [...prevState.parameters, value],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        parameters: prevState.parameters.filter((param) => param !== value),
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted: ", formData);
    const inputElement = document.querySelectorAll("input");
    inputElement.forEach((input) => {
      input.value = ""
    })
    // Add logic to send formData to the server or process it further
  };


  return(
    <div className="p-3 w-full h-[500px] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-3">
            <Card>
              <CardHeader></CardHeader>
              <CardContent>
                <FormField 
                  control={form.control}
                  name="fullName"
                  render={() => 
                    <FormItem className="flex items-center gap-3 mb-8">
                      <FormLabel className="lg:text-nowrap font-semibold">Sample Reference Number :</FormLabel>
                      <FormControl>
                        <Input type="text" defaultValue={rowData.Sample_Reference} readOnly/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} 
                    />    
              </CardContent>
            </Card>

            {/* Customer Details */}  
            <Card>
              <CardHeader className="font-semibold">Customer Details</CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-3">
                  <FormField 
                  control={form.control}
                  name="fullName"
                  render={() => 
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input 
                        name="fullName"
                        defaultValue={rowData.companyName}
                        onChange={handleInputChange}
                        placeholder="Full Name"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
                  <FormField 
                  control={form.control}
                  name="contactNumber"
                  render={() => 
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input 
                        name="contactNumber"
                        defaultValue={rowData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your Number"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
                  <FormField 
                  control={form.control}
                  name="email"
                  render={() => 
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input 
                        name="email"
                        defaultValue={rowData.email}
                        onChange={handleInputChange}
                        placeholder="Email"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
                  <FormField 
                  control={form.control}
                  name="address"
                  render={() => 
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input 
                        name="address"
                        defaultValue={rowData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address..." className="flex h-24"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
                  
                  <FormField 
                  control={form.control}
                  name="visit_type"
                  render={() => 
                    <FormItem className="flex gap-2 items-center">
                      <FormLabel className="text-nowrap">Mode of Request</FormLabel>
                      <FormControl>
                        <Select 
                        defaultValue={rowData.visit_type}
                        onValueChange={handleSelectChangeVisitType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="walkin">Walkin</SelectItem>
                            <SelectItem value="call">Call</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader className="font-semibold">Service Details</CardHeader>
              <CardContent>
                <FormField 
              control={form.control}
              name="serviceType"
              render={() => 
                <FormItem className="flex mb-3 gap-3 items-center">
                  <FormLabel className="text-nowrap">Service Type</FormLabel>
                  <FormControl>
                    <Select
                    name="serviceType"
                    defaultValue={rowData.serviceType}
                    onValueChange={handleSelectChangeService}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Select">Select</SelectItem>
                        {serviceRequests.map((request, index) => <SelectItem value={request} key={index}>{request}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
              />
              <FormLabel>Parameters to Test:</FormLabel>
              {serviceSelected == "Water: General Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Physical Parameter & </div>
                  <div>Chemical Parameter</div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.firstOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Water Complete Analysis as per 10500: 2012" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Physical Parameter & </div>
                  <div>Chemical Parameter</div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.secondOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Water - Construction Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Parameter & </div>
                  <div>Neutralization</div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.thirdOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Water - Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.fourthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Water –Complete Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.fifthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Food Microbiological Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Microbiological Parameter </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.sixthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Food Chemical Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.seventhOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Sludge Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.eighthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Soil Testing Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Physical Parameters & </div>  
                  <div>Chemical Parameters</div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.ninethOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Oil - Diesel Testing Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.tenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Oil - Nutrition Value + FSSAI Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters & </div>
                  <div> FSSAI Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.eleventhOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Coal Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Proximate analysis & Gross Calorific Value(GCV)</div>
                  <div> Ultimate analysis </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twelfthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Effluent Water Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.thirteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Sewage Water Chemical Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.fourteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Ambient Air Quality Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.fifteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "DG Stack Emission Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.sixteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Ambient Noise Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.seventeenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "DG Noise Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.eighteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Lux Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.nineteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Indoor Air Quality" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Physical Parameters & Chemical Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twenteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Compressor Air Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyFirstOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Feldspar Analysis Parameter" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentySecondOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Quartz Sample Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyThirdOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Lime Stone Sample Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyFourthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Plate - Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyFifthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Swab - Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentySixthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Sewage Water Microbiological Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentySeventhOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Weather Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyEighthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Oxygen Purity Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyNinethOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : ""
              }
              <FormField 
              control={form.control}
              name="dateOfService"
              render={({ field }) => 
                <FormItem className="flex gap-3 items-center mt-3">
                  <FormLabel className="text-nowrap">Preferred Date of Service</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button 
                          variant={"outline"}
                          className={"w-full flex pl-3 text-left font-normal" + !field.value && "text-muted-foreground"}>
                          {rowData.preferredDate ? rowData.preferredDate : field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        onDayClick={(e) => datePicker(e)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              }
              />
              <FormField 
              control={form.control}
              name="allotted"
              render={() => 
                <FormItem className="flex gap-3 mt-3 mb-3 items-center">
                  <FormLabel className="text-nowrap">Allotted to</FormLabel>
                  <FormControl>
                    <Select
                    defaultValue={rowData.allottedTo}
                    onValueChange={handleSelectChangeAllocate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select"/>
                      </SelectTrigger>
                      <SelectContent>
                        {
                          serviceSelected == "Water: General Parameters" || 
                          serviceSelected == "Water Complete Analysis as per 10500: 2012" || 
                          serviceSelected == "Water - Construction Parameters" || 
                          serviceSelected == "Food Chemical Parameters" || 
                          serviceSelected == "Sludge Analysis Parameters" || 
                          serviceSelected == "Soil Testing Parameters" || 
                          serviceSelected == "Oil - Diesel Testing Parameters" ||
                          serviceSelected == "Oil - Nutrition Value + FSSAI Parameters" ||
                          serviceSelected == "Coal Analysis Parameters" || 
                          serviceSelected == "Effluent Water Analysis Parameters" || 
                          serviceSelected == "Sewage Water Chemical Parameters" || 
                          serviceSelected == "Feldspar Analysis Parameter" || 
                          serviceSelected == "Quartz Sample Analysis Parameters" || 
                          serviceSelected == "Lime Stone Sample Analysis Parameters" ?
                        <>
                          <SelectItem value="Select">Select</SelectItem>
                          {
                          staffOptions.option1.map((option, index) =>
                          <SelectItem value={option} key={index}>{option}</SelectItem>)}
                        </> : 
                        serviceSelected == "Water - Microbiological Analysis" ||
                        serviceSelected == "Water –Complete Microbiological Analysis" ||
                        serviceSelected == "Food Microbiological Parameters" ||
                        serviceSelected == "Plate - Microbiological Analysis" || 
                        serviceSelected == "Swab - Microbiological Analysis" ||
                        serviceSelected == "Sewage Water Microbiological Parameters" ? 
                        <>
                          <SelectItem value="Select">Select</SelectItem>
                            {
                            staffOptions.option2.map((option, index) =>
                            <SelectItem value={option} key={index}>{option}</SelectItem>)}
                        </> : 
                        serviceSelected == "Ambient Air Quality Monitoring Parameters" ||
                        serviceSelected == "DG Stack Emission Parameters" ||
                        serviceSelected == "Ambient Noise Monitoring Parameters" ||
                        serviceSelected == "DG Noise Monitoring Parameters" ||
                        serviceSelected == "Lux Monitoring Parameters" ||
                        serviceSelected == "Indoor Air Quality" ||
                        serviceSelected == "Compressor Air Monitoring Parameters" ||
                        serviceSelected == "Weather Monitoring Parameters" ||
                        serviceSelected == "Oxygen Purity Parameters" ?
                        <>
                          <SelectItem value="Select">Select</SelectItem>
                          {
                          staffOptions.option3.map((option, index) =>
                            <SelectItem value={option} key={index}>{option}</SelectItem>)}
                        </> : <SelectItem value="Select">Select</SelectItem>}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
              />
              <FormField 
              control={form.control}
              name="drawnBy"
              render={() => 
                <FormItem className="flex gap-4 items-center">
                  <FormLabel className="lg:text-nowrap"> Drawn By </FormLabel>
                  <FormControl>
                    <Select
                    defaultValue={rowData.drawnBy}
                    onValueChange={handleSelectChangeDrawn}>
                      <SelectTrigger>
                        <SelectValue placeholder="EES"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EES">EES</SelectItem>
                        <SelectItem value="Customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              }
              />
              <FormField 
              control={form.control}
              name="serviceDateEntry"
              render={({ field }) => 
                <FormItem className="flex gap-3 items-center mt-3">
                  <FormLabel className="text-nowrap">Entry Service Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button 
                          variant={"outline"}
                          className={"w-full flex pl-3 text-left font-normal" + !field.value && "text-muted-foreground"}>
                          {rowData.date ? rowData.date : field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Service date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        onDayClick={(e) => serviceDatePicker(e)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              }
              />
              </CardContent>
            </Card>
            
            {/* Logistics Details */}

            <Card>
              <CardHeader className="font-semibold">Pickup Details</CardHeader>
              <CardContent>
                <FormField 
              control={form.control}
              name="pickup"
              render={() => 
                <FormItem className="flex gap-3 items-center mb-3">
                  <FormLabel className="text-nowrap">Pickup required?</FormLabel>
                  <FormControl>
                    <Select 
                    defaultValue={rowData.pickUp}
                    onValueChange={handleSelectChangePickup}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
              />
              { pickUp === "Yes" ?
                <FormField 
                control={form.control}
                name="pickupAddress"
                render={() => 
                  <FormItem className="flex gap-3 items-center mb-3">
                    <FormLabel className="text-nowrap">Pickup Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pickup address.." defaultValue={rowData.address} className="h-24"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }
                />
              : pickUp === "No" ? 
              <FormField 
              control={form.control}
              name="dropOffAddress"
              render={() => 
                <FormItem className="flex gap-3 items-center mb-3">
                  <FormLabel className="text-nowrap">Drop-off Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter drop-off address.." defaultValue={rowData.address} className="h-24"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
              /> : "" }
                <FormField 
                  control={form.control}
                  name="pickupDate"
                  render={({ field }) => 
                  <FormItem className="flex gap-3 items-center mb-3">
                    <FormLabel className="text-nowrap">Pickup/Drop-Off Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button 
                              variant={"outline"}
                              className={"w-full flex pl-3 text-left font-normal" + !field.value && "text-muted-foreground"}>
                              {rowData.pickupDate ? rowData.pickupDate : field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pickup date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }
                />

              </CardContent>
            </Card>
            
            <Card>
              <CardHeader></CardHeader>
              <CardContent>
                <FormField 
                control={form.control}
                name="remarks"
                render={() => 
                  <FormItem className="flex gap-3 mb-3 items-start">
                    <FormLabel className="text-nowrap pt-3">Remarks or Special Request</FormLabel>
                    <FormControl>
                      <Input 
                      name="remarks"
                      onChange={handleInputChange}
                      placeholder="type here.." className="h-24"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }
                />
                
                {/* Priority */}

                <FormField 
                  control={form.control}
                  name="priority"
                  render={() => 
                    <FormItem className="flex gap-3 items-center mb-3">
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <Select
                        defaultValue={rowData.priority}
                        onValueChange={handleSelectChangePriority}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select"/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
              </CardContent>
            </Card>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default MappedServiceRequestForm