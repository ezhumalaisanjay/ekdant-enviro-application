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
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { serviceRequests, staffOptions, parameterOptions, serviceTypes } from "../../src/serviceDatas"

const formSchema = z.object({
  fullName: z.string(),
  preferredDate: z.string().date(),
  date: z.string().date()
})

function ServiceRequestForm({drawerClose}) {
  const { toast } = useToast();
  const [serviceSelected, setServiceSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pickUp, setPickUp] = useState("");
  const [apiCustomerData, setApiCustomerData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [mappedApiData, setMappedApiData] = useState(null);
  const uniqueId = `EES/${Math.floor(Math.random() * 1000)}`;
  const today = new Date()
  const formattedDate = format(today, "yyyy-MM-dd");
  const [formData, setFormData] = useState({
    Sample_Reference: uniqueId,
    visit_type: "",
    companyName: "",
    contactNumber: "",
    email: "",
    address: "",
    serviceType: "",
    parameters: [],
    preferredDate: "",
    allottedTo: "",
    date: formattedDate,
    remarks: "",
    drawnBy: "",
    pickUp: "",
    priority: "",
    pickupDate: "",
    Price: "",
    GST : "",
    Amount: "",
    contactName: "",
    ticket_status: "New",
    category: "Ticket",
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    }
  });
  
  useEffect(() => {
    const getRecords = async (category) => {
      try {
        const response = await fetch("https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_Get_all_record", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(JSON.parse(result.body)); // Return response directly

        const responseData = JSON.parse(result.body);
        setApiCustomerData(responseData)
        console.log("Customer Data" ,responseData);

      } catch (error) { 
        if (error instanceof Error) {
          console.error("Error fetching records:", error.message);
          return { error: error.message };
        } 
        else {
        console.error("Unknown error:", error);
        return { error: "An unknown error occurred" };
        }
      }
    } 
    getRecords("Customer") 

  }, [])

  useEffect(() => {

    const getMappedData = () => {
      const TempMappedApiData = apiCustomerData.filter((data) => data.company_name === selectedCustomerName);
      console.log("TemporarayMapped Data :", TempMappedApiData);
      setMappedApiData(TempMappedApiData[0]);
    }

    if (selectedCustomerName) {
      getMappedData();
    }

  }, [selectedCustomerName])

  useEffect(() => {
    const contactNumber = "contactNumber";
    const email = "email";
    const address = "address";

    const getMappedData = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [contactNumber]: mappedApiData?.Phone || "",
        [email]: mappedApiData?.Email || "",
        [address]: mappedApiData?.Address || "",
      }));
    };

    getMappedData()
  }, [mappedApiData])

  useEffect(() => {
    if(serviceSelected === "Water: General Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.firstOptions[0].parameter,
        Price: parameterOptions.firstOptions[1].Price,
        GST: parameterOptions.firstOptions[1].GST,
      }))}
    else if(serviceSelected === "Water Complete Analysis as per 10500: 2012") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.secondOptions[0].parameter,
        Price: parameterOptions.secondOptions[1].Price,
        GST: parameterOptions.secondOptions[1].GST,
      }))}
    else if(serviceSelected === "Water - Construction Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.thirdOptions[0].parameter,
        Price: parameterOptions.thirdOptions[1].Price,
        GST: parameterOptions.thirdOptions[1].GST,
      }))}
    else if(serviceSelected === "Water - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fourthOptions[0].parameter,
        Price: parameterOptions.fourthOptions[1].Price,
        GST: parameterOptions.fourthOptions[1].GST,
      }))}
    else if(serviceSelected === "Water –Complete Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fifthOptions[0].parameter,
        Price: parameterOptions.fifthOptions[1].Price,
        GST: parameterOptions.fifthOptions[1].GST,
      }))}
    else if(serviceSelected === "Food Microbiological Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.sixthOptions[0].parameter,
        Price: parameterOptions.sixthOptions[1].Price,
        GST: parameterOptions.sixthOptions[1].GST,
      }))}
    else if(serviceSelected === "Food Chemical Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.seventhOptions[0].parameter,
        Price: parameterOptions.seventhOptions[1].Price,
        GST: parameterOptions.seventhOptions[1].GST,
      }))}
    else if(serviceSelected === "Sludge Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.eighthOptions[0].parameter,
        Price: parameterOptions.eighthOptions[1].Price,
        GST: parameterOptions.eighthOptions[1].GST,
      }))}
    else if(serviceSelected === "Soil Testing Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.ninethOptions[0].parameter,
        Price: parameterOptions.ninethOptions[1].Price,
        GST: parameterOptions.ninethOptions[1].GST,
      }))}
    else if(serviceSelected === "Oil - Diesel Testing Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.tenthOptions[0].parameter,
        Price: parameterOptions.tenthOptions[1].Price,
        GST: parameterOptions.tenthOptions[1].GST,
      }))}
    else if(serviceSelected === "Oil - Nutrition Value + FSSAI Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.eleventhOptions[0].parameter,
        Price: parameterOptions.eleventhOptions[1].Price,
        GST: parameterOptions.eleventhOptions[1].GST,
      }))}
    else if(serviceSelected === "Coal Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twelfthOptions[0].parameter,
        Price: parameterOptions.twelfthOptions[1].Price,
        GST: parameterOptions.twelfthOptions[1].GST,
      }))}
    else if(serviceSelected === "Effluent Water Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.thirteenthOptions[0].parameter,
        Price: parameterOptions.thirteenthOptions[1].Price,
        GST: parameterOptions.thirteenthOptions[1].GST,
      }))}
    else if(serviceSelected === "Sewage Water Chemical Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fourteenthOptions[0].parameter,
        Price: parameterOptions.fourteenthOptions[1].Price,
        GST: parameterOptions.fourteenthOptions[1].GST,
      }))}
    else if(serviceSelected === "Ambient Air Quality Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fifteenthOptions[0].parameter,
        Price: parameterOptions.fifteenthOptions[1].Price,
        GST: parameterOptions.fifteenthOptions[1].GST,
      }))}
    else if(serviceSelected === "DG Stack Emission Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.sixteenthOptions[0].parameter,
        Price: parameterOptions.sixteenthOptions[1].Price,
        GST: parameterOptions.sixteenthOptions[1].GST,
      }))}
    else if(serviceSelected === "Ambient Noise Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.seventeenthOptions[0].parameter,
        Price: parameterOptions.seventeenthOptions[1].Price,
        GST: parameterOptions.seventeenthOptions[1].GST,
      }))}
    else if(serviceSelected === "DG Noise Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.eighteenthOptions[0].parameter,
        Price: parameterOptions.eighteenthOptions[1].Price,
        GST: parameterOptions.eighteenthOptions[1].GST,
      }))}
    else if(serviceSelected === "Lux Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.nineteenthOptions[0].parameter,
        Price: parameterOptions.nineteenthOptions[1].Price,
        GST: parameterOptions.nineteenthOptions[1].GST,
      }))}
    else if(serviceSelected === "Indoor Air Quality") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twenteenthOptions[0].parameter,
        Price: parameterOptions.twenteenthOptions[1].Price,
        GST: parameterOptions.twenteenthOptions[1].GST,
      }))}
    else if(serviceSelected === "Compressor Air Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyFirstOptions[0].parameter,
        Price: parameterOptions.twentyFirstOptions[1].Price,
        GST: parameterOptions.twentyFirstOptions[1].GST,
      }))}
    else if(serviceSelected === "Feldspar Analysis Parameter") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentySecondOptions[0].parameter,
        Price: parameterOptions.twentySecondOptions[1].Price,
        GST: parameterOptions.twentySecondOptions[1].GST,
      }))}
    else if(serviceSelected === "Quartz Sample Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyThirdOptions[0].parameter,
        Price: parameterOptions.twentyThirdOptions[1].Price,
        GST: parameterOptions.twentyThirdOptions[1].GST,
      }))}
    else if(serviceSelected === "Lime Stone Sample Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyFourthOptions[0].parameter,
        Price: parameterOptions.twentyFourthOptions[1].Price,
        GST: parameterOptions.twentyFourthOptions[1].GST,
      }))}
    else if(serviceSelected === "Plate - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyFifthOptions[0].parameter,
        Price: parameterOptions.twentyFifthOptions[1].Price,
        GST: parameterOptions.twentyFifthOptions[1].GST,
      }))}
    else if(serviceSelected === "Swab - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentySixthOptions[0].parameter,
        Price: parameterOptions.twentySixthOptions[1].Price,
        GST: parameterOptions.twentySixthOptions[1].GST,
      }))}
    else if(serviceSelected === "Sewage Water Microbiological Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentySeventhOptions[0].parameter,
        Price: parameterOptions.twentySeventhOptions[1].Price,
        GST: parameterOptions.twentySeventhOptions[1].GST,
      }))}
    else if(serviceSelected === "Weather Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyEighthOptions[0].parameter,
        Price: parameterOptions.twentyEighthOptions[1].Price,
        GST: parameterOptions.twentyEighthOptions[1].GST,
      }))}
      else if(serviceSelected === "Oxygen Purity Parameters") {
        setFormData((prevState) => ({
          ...prevState,
          parameters: parameterOptions.twentyNinethOptions[0].parameter,
          Price: parameterOptions.twentyNinethOptions[1].Price,
          GST: parameterOptions.twentyNinethOptions[1].GST,
        }))}
  
      serviceTypes.map((service) => {
        if(service.name == serviceSelected) { 
          console.log(service.code);
        }
      });

  }, [serviceSelected]);

  useEffect(() => {
    
    const calculateTotal = (price, gstPercentage) => {
      price = parseFloat(price);
      gstPercentage = parseFloat(gstPercentage);

      if (isNaN(price) || isNaN(gstPercentage) || price <= 0 || gstPercentage <= 0) {
        console.log("Invalid input");
        return 0;
      }
    
      const gstAmount = (price * gstPercentage) / 100;
      const totalAmount = price + gstAmount

      setFormData((prevState) => ({
        ...prevState,
        Amount: totalAmount,
      }));
    }
    
    calculateTotal(formData.Price, formData.GST);
  }, [formData.Price])

  const filteredRequests = serviceRequests.filter(request => 
    request.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectChangeName = (value) => {
    setFormData({ ...formData, companyName: value})
    setSelectedCustomerName(value);
  }

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

  /*
  const serviceDatePicker = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFormData({...formData, date: formattedDate});
  }
  */

  const pickupDatePicker = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFormData({...formData, pickupDate: formattedDate});
  }
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

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("Form Data Submitted: ", formData);
  
    await createEESRecord(formData, formData.Sample_Reference);
    const inputElement = document.querySelectorAll("input");
    inputElement.forEach((input) => {
      input.value = ""
    })

    setIsLoading(false);
    drawerClose();
    toast({
      title: "Data",
      description: "Data has been submitted Successfully",
    })
    
    // Add logic to send formData to the server or process it further
  };

  return(
    <div className="p-3 w-full h-[682px] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-3">
            {/* Customer Details */}  
            <Card>
              <CardHeader className="font-semibold">Customer Details</CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-3">
                  <FormField 
                  control={form.control}
                  name="companyName"
                  render={() => 
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Select onValueChange={handleSelectChangeName}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {apiCustomerData.map((data, index) => 
                            <SelectItem value={data.company_name} key={index}>{data.company_name}</SelectItem>)
                            }
                          </SelectContent>
                        </Select>
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                        name="contactNumber"
                        defaultValue={mappedApiData?.Phone || ""}
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                        name="email"
                        defaultValue={mappedApiData?.Email || ""}
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
                        defaultValue={mappedApiData?.Address || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your address..." className="flex h-24"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
                  <FormField 
                  control={form.control}
                  name="contactName"
                  render={() => 
                    <FormItem className="flex gap-2 items-center">
                      <FormLabel className="text-nowrap">Contact Name</FormLabel>
                      <FormControl>
                        <Input 
                        name="contactName"
                        onChange={handleInputChange}
                        placeholder="Contact Name"/>
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
                        <Select onValueChange={handleSelectChangeVisitType}>
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
                    onValueChange={handleSelectChangeService}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select"/>
                      </SelectTrigger>
                      <SelectContent>
                        <Input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          placeholder="Search..."
                          className="mb-2 placeholder:text-sm" // Optional styling, for margin at the bottom
                        />
                        <SelectItem value="Select">Select</SelectItem>
                        {filteredRequests.map((request, index) => <SelectItem value={request} key={index}>{request}</SelectItem>)}
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
                  parameterOptions.firstOptions[0].parameter.map( (options, index) => <FormField 
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
                  <div className="flex gap-3">
                    <FormField 
                      control={form.control}
                      name="Price"
                      render={() => 
                        <FormItem className="w-full">
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input 
                            name="Price"
                            defaultValue={formData.Price}
                            placeholder="Price"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      }
                    />
                    <FormField 
                      control={form.control}
                      name="GST"
                      render={() => 
                        <FormItem className="w-full">
                          <FormLabel>GST</FormLabel>
                          <FormControl>
                            <Input 
                            name="GST"
                            defaultValue={formData.GST}
                            placeholder="GST"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      }
                    />
                    <FormField 
                      control={form.control}
                      name="Amount"
                      render={() => 
                        <FormItem className="w-full">
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input 
                            name="Amount"
                            defaultValue={formData.Amount}
                            placeholder="Amount"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      }
                    />
                </div>
              </> : serviceSelected == "Water Complete Analysis as per 10500: 2012" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Physical Parameter & </div>
                  <div>Chemical Parameter</div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.secondOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.secondOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.secondOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Water - Construction Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Parameter & </div>
                  <div>Neutralization</div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.thirdOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.thirdOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.thirdOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Water - Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.fourthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.fourthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.fourthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Water –Complete Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.fifthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.fifthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.fifthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Food Microbiological Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Microbiological Parameter </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.sixthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.sixthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.sixthOptions[0].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Food Chemical Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.seventhOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.seventhOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.seventhOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Sludge Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.eighthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.eighthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.eighthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Soil Testing Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Physical Parameters & </div>  
                  <div>Chemical Parameters</div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.ninethOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.ninethOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.ninethOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Oil - Diesel Testing Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.tenthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.tenthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.tenthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Oil - Nutrition Value + FSSAI Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters & </div>
                  <div> FSSAI Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.eleventhOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.eleventhOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.eleventhOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Coal Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Proximate analysis & Gross Calorific Value(GCV)</div>
                  <div> Ultimate analysis </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twelfthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twelfthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twelfthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Effluent Water Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.thirteenthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.thirteenthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.thirteenthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Sewage Water Chemical Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.fourteenthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.fourteenthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.fourteenthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Ambient Air Quality Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.fifteenthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.fifteenthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.fifteenthOptions[0].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "DG Stack Emission Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.sixteenthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.sixteenthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.sixteenthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Ambient Noise Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.seventeenthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.seventeenthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.seventeenthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "DG Noise Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.eighteenthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.eighteenthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.eighteenthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Lux Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.nineteenthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.nineteenthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.nineteenthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Indoor Air Quality" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Physical Parameters & Chemical Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twenteenthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twenteenthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twenteenthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Compressor Air Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyFirstOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twentyFirstOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twentyFirstOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Feldspar Analysis Parameter" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentySecondOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twentySecondOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twentySecondOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Quartz Sample Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyThirdOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twentyThirdOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twentyThirdOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Lime Stone Sample Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyFourthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twentyFourthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twentyFourthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Plate - Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyFifthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twentyFifthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twentyFifthOptions[0].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Swab - Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentySixthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twentySixthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twentySixthOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Sewage Water Microbiological Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentySeventhOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twentySeventhOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twentySeventhOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Weather Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyEighthOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twentyEighthOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twentyEighthOptions[0].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                </div>
              </> : serviceSelected == "Oxygen Purity Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  parameterOptions.twentyNinethOptions[0].parameter.map( (options, index) => <FormField 
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
                <div className="flex gap-3">
                  <FormField 
                    control={form.control}
                    name="Price"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                          name="Price"
                          defaultValue={parameterOptions.twentyNinethOptions[1].Price}
                          placeholder="Price"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="GST"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>GST</FormLabel>
                        <FormControl>
                          <Input 
                          name="GST"
                          defaultValue={parameterOptions.twentyNinethOptions[1].GST}
                          placeholder="GST"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
                  <FormField 
                    control={form.control}
                    name="Amount"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                          name="Amount"
                          defaultValue={formData.Amount}
                          placeholder="Amount"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                  />
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
                          {field.value ? (
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
                    onValueChange={handleSelectChangeDrawn}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select"/>
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
              {/*<FormField 
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
                          {field.value ? (
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
              />*/}
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
                    <Select onValueChange={handleSelectChangePickup}>
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
                      <Input placeholder="Enter pickup address.." className="h-24"/>
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
                    <Input placeholder="Enter drop-off address.." className="h-24"/>
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
                              {field.value ? (
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
                            onDayClick={(e) => pickupDatePicker(e)}
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

          {/* Submit */}
          <Button type="submit" onClick={handleSubmit}>
            {!isLoading ? "Submit" 
              : <> <Loader2 className="animate-spin" /> Submit </>
            }
          </Button>
          <Button variant="outline" type="reset">Reset</Button>
        </form>
      </Form>
    </div>
  )
}

export async function createEESRecord(requestData, srn) {
  const apiUrl = "https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_Create_Record";
  requestData["Type"] = "Ticket";
  requestData["TicketID"] = srn;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default ServiceRequestForm