"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { serviceRequests, staffOptions, parameterOptions, serviceTypes } from "../../src/serviceDatas"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  fullName: z.string(),
  preferredDate: z.string().date(),
  date: z.string().date(),
})

function ServiceRequestForm({ drawerClose }) {
  const { toast } = useToast()
  const [serviceSelected, setServiceSelected] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [pickUp, setPickUp] = useState("")
  const [apiCustomerData, setApiCustomerData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomerName, setSelectedCustomerName] = useState("")
  const [mappedApiData, setMappedApiData] = useState(null)
  const uniqueId = `EES/${Math.floor(Math.random() * 1000)}`
  const today = new Date()
  const formattedDate = format(today, "yyyy-MM-dd")
  const [formData, setFormData] = useState({
    Sample_Reference: uniqueId,
    visit_type: "",
    companyName: "",
    contactNumber: "",
    email: "",
    address: "",
    billingAddress: "",
    reportingAddress: "",
    gstNumber: "",
    paymentStatus: "",
    billType: "",
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
    Price: "0",
    GST: "18",
    Amount: "0",
    contactName: "",
    ticket_status: "New",
    category: "Ticket",
    sampleQuantity: "",
    sampleMark: "",
    samplingLocation: "",
    dueDate: "",
    discountPercentage: 0,
    hikePercentage: 0,
    courierDrawnBy: "",
    extraIndividualParameters: [],
    referSNo: "",
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  })

  // Price mapping for extra parameters - moved outside the handler for reusability
  const priceMapping = {
    "Total microbial count (cfu/ml) a. at 20 -22 C in 72 hours b. At 37 C in 24 hours.": { price: 500, gst: 18 },
    "Total yeast and mould count": { price: 500, gst: 18 },
    "E.coli": { price: 500, gst: 18 },
    "F.coliforms": { price: 500, gst: 18 },
    "Enterobacteriaceae (Coliforms)": { price: 500, gst: 18 },
    "Faecal streptococci": { price: 650, gst: 18 },
    "S. aureus": { price: 650, gst: 18 },
    "Sulphite reducing anaerobes": { price: 650, gst: 18 },
    Salmonella: { price: 650, gst: 18 },
    Shigella: { price: 650, gst: 18 },
    "V. cholera": { price: 650, gst: 18 },
    "V. parahaemolyticus": { price: 650, gst: 18 },
    "Ps. aeruginosa": { price: 650, gst: 18 },
    Turbidity: { price: 250, gst: 18 },
    pH: { price: 100, gst: 18 },
    "Total Hardness as CaCO3": { price: 250, gst: 18 },
    "Iron ( Total) as Fe" : { price: 300, gst: 18 },
    "Silica ( Reactive) as SiO2" : { price: 250, gst: 18 },
    "Total Suspended Solids (TSS)" : { price: 400, gst: 18 },
    "Total Dissolved Solids (TDS)" : { price: 400, gst: 18 },
    "Chemical Oxygen Demand" : { price: 400, gst: 18 },
    "Bio chemical Oxygen Demand " : { price: 400, gst: 18 },
    "Oil & Grease" : { price: 400, gst: 18 },
    "Total Nitrogen" : { price: 400, gst: 18 },
    "Total Phosphorus " : { price: 400, gst: 18 },
    "Chlorides as Cl" : { price: 400, gst: 18 },
    "Nitrate as No3" : { price: 400, gst: 18 },
    "Mercury as Hg (mg/l)" : { price: 750, gst: 18 },
    "Cadmium as Cd (mg/l)" : { price: 750, gst: 18 },
    "Selenium as Se (mg/l)" : { price: 750, gst: 18 },
    "Arsenic as As (mg/l)" : { price: 750, gst: 18 },
    "Cyanide as CN( mg/l)" : { price: 750, gst: 18 },
    "Lead as Pb (mg/l)" : { price: 750, gst: 18 },
    "Zinc as Zn (mg/l)" : { price: 750, gst: 18 },
    "Chromium as Cr6+( mg/l)" : { price: 750, gst: 18 },
    "Aluminium as Al(mg/l)" : { price: 750, gst: 18 },
    "Barium as Ba (mg / l)" : { price: 750, gst: 18 },
    "Nickel as Ni (mg/l)" : { price: 750, gst: 18 },
  }

  useEffect(() => {
    const getRecords = async (category) => {
      try {
        const response = await fetch("https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_Get_all_record", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        console.log(JSON.parse(result.body))

        const responseData = JSON.parse(result.body)
        setApiCustomerData(responseData)
        console.log("Customer Data", responseData)
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching records:", error.message)
          return { error: error.message }
        } else {
          console.error("Unknown error:", error)
          return { error: "An unknown error occurred" }
        }
      }
    }
    getRecords("Customer")
  }, [])

  useEffect(() => {
    const getMappedData = () => {
      const TempMappedApiData = apiCustomerData.filter((data) => data.company_name === selectedCustomerName)
      console.log("TemporarayMapped Data :", TempMappedApiData)
      setMappedApiData(TempMappedApiData[0])
    }

    if (selectedCustomerName) {
      getMappedData()
    }
  }, [selectedCustomerName, apiCustomerData])

  useEffect(() => {
    const contactNumber = "contactNumber"
    const email = "email"
    const address = "address"

    const getMappedData = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [contactNumber]: mappedApiData?.Phone || "",
        [email]: mappedApiData?.Email || "",
        [address]: mappedApiData?.Address || "",
      }))
    }

    getMappedData()
  }, [mappedApiData])

  // Modified service selection useEffect to preserve extra parameter prices
  useEffect(() => {
    if (!serviceSelected || serviceSelected === "Select") {
      return
    }
    
    let servicePrice = 0
    let serviceGST = 18
    let serviceParameters = []
    
    // Find the service type options
    if (serviceSelected === "Water: General Parameters") {
      serviceParameters = parameterOptions.firstOptions[0].parameter
      servicePrice = parameterOptions.firstOptions[1].Price
      serviceGST = parameterOptions.firstOptions[1].GST
    } else if (serviceSelected === "Water: General Parameters & Microbiology") {
      serviceParameters = parameterOptions.firstonOptions[0].parameter
      servicePrice = parameterOptions.firstonOptions[1].Price
      serviceGST = parameterOptions.firstonOptions[1].GST
    } else if (serviceSelected === "DM Water Analysis") {
      serviceParameters = parameterOptions.firstondsOptions[0].parameter
      servicePrice = parameterOptions.firstondsOptions[1].Price
      serviceGST = parameterOptions.firstondsOptions[1].GST
    } else if (serviceSelected === "Water Complete Analysis as per 10500: 2012") {
      serviceParameters = parameterOptions.secondOptions[0].parameter
      servicePrice = parameterOptions.secondOptions[1].Price
      serviceGST = parameterOptions.secondOptions[1].GST
    } else if (serviceSelected === "Water - Construction Parameters") {
      serviceParameters = parameterOptions.thirdOptions[0].parameter
      servicePrice = parameterOptions.thirdOptions[1].Price
      serviceGST = parameterOptions.thirdOptions[1].GST
    } else if (serviceSelected === "Water - Microbiological Analysis") {
      serviceParameters = parameterOptions.fourthOptions[0].parameter
      servicePrice = parameterOptions.fourthOptions[1].Price
      serviceGST = parameterOptions.fourthOptions[1].GST
    } else if (serviceSelected === "Water –Complete Microbiological Analysis") {
      serviceParameters = parameterOptions.fifthOptions[0].parameter
      servicePrice = parameterOptions.fifthOptions[1].Price
      serviceGST = parameterOptions.fifthOptions[1].GST
    } else if (serviceSelected === "Food Microbiological Parameters") {
      serviceParameters = parameterOptions.sixthOptions[0].parameter
      servicePrice = parameterOptions.sixthOptions[1].Price
      serviceGST = parameterOptions.sixthOptions[1].GST
    } else if (serviceSelected === "Food Chemical Parameters") {
      serviceParameters = parameterOptions.seventhOptions[0].parameter
      servicePrice = parameterOptions.seventhOptions[1].Price
      serviceGST = parameterOptions.seventhOptions[1].GST
    } else if (serviceSelected === "Sludge Analysis Parameters") {
      serviceParameters = parameterOptions.eighthOptions[0].parameter
      servicePrice = parameterOptions.eighthOptions[1].Price
      serviceGST = parameterOptions.eighthOptions[1].GST
    } else if (serviceSelected === "Soil Testing Parameters") {
      serviceParameters = parameterOptions.ninethOptions[0].parameter
      servicePrice = parameterOptions.ninethOptions[1].Price
      serviceGST = parameterOptions.ninethOptions[1].GST
    } else if (serviceSelected === "Oil - Diesel Testing Parameters") {
      serviceParameters = parameterOptions.tenthOptions[0].parameter
      servicePrice = parameterOptions.tenthOptions[1].Price
      serviceGST = parameterOptions.tenthOptions[1].GST
    } else if (serviceSelected === "Oil - Nutrition Value + FSSAI Parameters") {
      serviceParameters = parameterOptions.eleventhOptions[0].parameter
      servicePrice = parameterOptions.eleventhOptions[1].Price
      serviceGST = parameterOptions.eleventhOptions[1].GST
    } else if (serviceSelected === "Coal Analysis Parameters") {
      serviceParameters = parameterOptions.twelfthOptions[0].parameter
      servicePrice = parameterOptions.twelfthOptions[1].Price
      serviceGST = parameterOptions.twelfthOptions[1].GST
    } else if (serviceSelected === "Effluent Water Analysis Parameters") {
      serviceParameters = parameterOptions.thirteenthOptions[0].parameter
      servicePrice = parameterOptions.thirteenthOptions[1].Price
      serviceGST = parameterOptions.thirteenthOptions[1].GST
    } else if (serviceSelected === "Sewage Water Chemical Parameters") {
      serviceParameters = parameterOptions.fourteenthOptions[0].parameter
      servicePrice = parameterOptions.fourteenthOptions[1].Price
      serviceGST = parameterOptions.fourteenthOptions[1].GST
    } else if (serviceSelected === "Ambient Air Quality Monitoring Parameters") {
      serviceParameters = parameterOptions.fifteenthOptions[0].parameter
      servicePrice = parameterOptions.fifteenthOptions[1].Price
      serviceGST = parameterOptions.fifteenthOptions[1].GST
    } else if (serviceSelected === "DG Stack Emission Parameters") {
      serviceParameters = parameterOptions.sixteenthOptions[0].parameter
      servicePrice = parameterOptions.sixteenthOptions[1].Price
      serviceGST = parameterOptions.sixteenthOptions[1].GST
    } else if (serviceSelected === "Ambient Noise Monitoring Parameters") {
      serviceParameters = parameterOptions.seventeenthOptions[0].parameter
      servicePrice = parameterOptions.seventeenthOptions[1].Price
      serviceGST = parameterOptions.seventeenthOptions[1].GST
    } else if (serviceSelected === "DG Noise Monitoring Parameters") {
      serviceParameters = parameterOptions.eighteenthOptions[0].parameter
      servicePrice = parameterOptions.eighteenthOptions[1].Price
      serviceGST = parameterOptions.eighteenthOptions[1].GST
    } else if (serviceSelected === "Lux Monitoring Parameters") {
      serviceParameters = parameterOptions.nineteenthOptions[0].parameter
      servicePrice = parameterOptions.nineteenthOptions[1].Price
      serviceGST = parameterOptions.nineteenthOptions[1].GST
    } else if (serviceSelected === "Indoor Air Quality") {
      serviceParameters = parameterOptions.twenteenthOptions[0].parameter
      servicePrice = parameterOptions.twenteenthOptions[1].Price
      serviceGST = parameterOptions.twenteenthOptions[1].GST
    } else if (serviceSelected === "Compressor Air Monitoring Parameters") {
      serviceParameters = parameterOptions.twentyFirstOptions[0].parameter
      servicePrice = parameterOptions.twentyFirstOptions[1].Price
      serviceGST = parameterOptions.twentyFirstOptions[1].GST
    } else if (serviceSelected === "Feldspar Analysis Parameter") {
      serviceParameters = parameterOptions.twentySecondOptions[0].parameter
      servicePrice = parameterOptions.twentySecondOptions[1].Price
      serviceGST = parameterOptions.twentySecondOptions[1].GST
    } else if (serviceSelected === "Quartz Sample Analysis Parameters") {
      serviceParameters = parameterOptions.twentyThirdOptions[0].parameter
      servicePrice = parameterOptions.twentyThirdOptions[1].Price
      serviceGST = parameterOptions.twentyThirdOptions[1].GST
    } else if (serviceSelected === "Lime Stone Sample Analysis Parameters") {
      serviceParameters = parameterOptions.twentyFourthOptions[0].parameter
      servicePrice = parameterOptions.twentyFourthOptions[1].Price
      serviceGST = parameterOptions.twentyFourthOptions[1].GST
    } else if (serviceSelected === "Plate - Microbiological Analysis") {
      serviceParameters = parameterOptions.twentyFifthOptions[0].parameter
      servicePrice = parameterOptions.twentyFifthOptions[1].Price
      serviceGST = parameterOptions.twentyFifthOptions[1].GST
    } else if (serviceSelected === "Swab - Microbiological Analysis") {
      serviceParameters = parameterOptions.twentySixthOptions[0].parameter
      servicePrice = parameterOptions.twentySixthOptions[1].Price
      serviceGST = parameterOptions.twentySixthOptions[1].GST
    } else if (serviceSelected === "Sewage Water Microbiological Parameters") {
      serviceParameters = parameterOptions.twentySeventhOptions[0].parameter
      servicePrice = parameterOptions.twentySeventhOptions[1].Price
      serviceGST = parameterOptions.twentySeventhOptions[1].GST
    } else if (serviceSelected === "Weather Monitoring Parameters") {
      serviceParameters = parameterOptions.twentyEighthOptions[0].parameter
      servicePrice = parameterOptions.twentyEighthOptions[1].Price
      serviceGST = parameterOptions.twentyEighthOptions[1].GST
    } else if (serviceSelected === "Oxygen Purity Parameters") {
      serviceParameters = parameterOptions.twentyNinethOptions[0].parameter
      servicePrice = parameterOptions.twentyNinethOptions[1].Price
      serviceGST = parameterOptions.twentyNinethOptions[1].GST
    }

    // Calculate extra parameter price
    let extraParamPrice = 0
    formData.extraIndividualParameters.forEach(param => {
      if (priceMapping[param]) {
        extraParamPrice += priceMapping[param].price
      }
    })
    
    // Add service price and extra parameter price
    const totalPrice = Number(servicePrice) + extraParamPrice

    setFormData((prevState) => ({
      ...prevState,
      parameters: serviceParameters,
      Price: totalPrice.toString(),
      GST: serviceGST.toString()
    }))

    serviceTypes.map((service) => {
      if (service.name == serviceSelected) {
        console.log(service.code)
      }
    })
  }, [serviceSelected, formData.extraIndividualParameters])

  // Improved calculation effect
  useEffect(() => {
    const calculateTotal = (price, gstPercentage, discountPercentage, hikePercentage) => {
      price = Number.parseFloat(price) || 0
      gstPercentage = Number.parseFloat(gstPercentage) || 0
      discountPercentage = Number.parseFloat(discountPercentage) || 0
      hikePercentage = Number.parseFloat(hikePercentage) || 0

      if (price < 0 || gstPercentage < 0) {
        console.log("Invalid input - negative values")
        return 0
      }

      let adjustedPrice = price
      if (discountPercentage > 0) {
        adjustedPrice -= (price * discountPercentage) / 100
      }
      if (hikePercentage > 0) {
        adjustedPrice += (price * hikePercentage) / 100
      }

      const gstAmount = (adjustedPrice * gstPercentage) / 100
      const totalAmount = adjustedPrice + gstAmount

      setFormData((prevState) => ({
        ...prevState,
        Amount: totalAmount.toFixed(2),
      }))
    }

    calculateTotal(formData.Price, formData.GST, formData.discountPercentage, formData.hikePercentage)
  }, [formData.Price, formData.GST, formData.discountPercentage, formData.hikePercentage])

  const filteredRequests = serviceRequests.filter((request) =>
    request.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSelectChangeName = (value) => {
    setFormData({ ...formData, companyName: value })
    setSelectedCustomerName(value)
  }

  const handleSelectChangeService = (value) => {
    setFormData({ ...formData, serviceType: value })
    setServiceSelected(value)
  }

  const handleSelectChangeVisitType = (value) => {
    setFormData({ ...formData, visit_type: value })
  }

  const handleSelectChangePickup = (value) => {
    setFormData({ ...formData, pickUp: value })
    setPickUp(value)
  }

  const handleSelectChangeDrawn = (value) => {
    setFormData({ ...formData, drawnBy: value })
  }

  const handleSelectChangeCourierDrawn = (value) => {
    setFormData({ ...formData, courierDrawnBy: value })
  }

  const datePicker = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd")
    setFormData({ ...formData, preferredDate: formattedDate })
  }

  const pickupDatePicker = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd")
    setFormData({ ...formData, pickupDate: formattedDate })
  }

  const dueDatePicker = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd")
    setFormData({ ...formData, dueDate: formattedDate })
  }

  const handleSelectChangeAllocate = (value) => {
    setFormData({ ...formData, allottedTo: value })
  }

  const handleSelectChangePriority = (value) => {
    setFormData({ ...formData, priority: value })
  }

  const handleSelectChangePaymentStatus = (value) => {
    setFormData({ ...formData, paymentStatus: value })
  }

  const handleSelectChangeBillType = (value) => {
    setFormData({ ...formData, billType: value })
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        parameters: [...prevState.parameters, value],
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        parameters: prevState.parameters.filter((param) => param !== value),
      }))
    }
  }

  // Improved extra parameter handler
  const handleExtraParameterChange = (e) => {
    const { value, checked } = e.target

    // Update the extraIndividualParameters array
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        extraIndividualParameters: [...prevState.extraIndividualParameters, value],
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        extraIndividualParameters: prevState.extraIndividualParameters.filter((param) => param !== value),
      }))
    }

    // Calculate price based on current selection and service
    setTimeout(() => {
      // Get base price from service if selected, otherwise 0
      let basePrice = 0
      let baseGST = 18
      
      if (serviceSelected && serviceSelected !== "Select") {
        // Extract base price from service options similar to the useEffect
        const serviceOptionKey = Object.keys(parameterOptions).find(key => {
          const options = parameterOptions[key]
          if (options[1] && options[1].Price !== undefined) {
            return true
          }
          return false
        })
        
        if (serviceOptionKey) {
          basePrice = Number(parameterOptions[serviceOptionKey][1].Price) || 0
          baseGST = Number(parameterOptions[serviceOptionKey][1].GST) || 18
        }
      }
      
      // Calculate price from extraIndividualParameters
      let extraParamPrice = 0
      const updatedExtraParams = checked 
        ? [...formData.extraIndividualParameters, value] 
        : formData.extraIndividualParameters.filter(param => param !== value)
      
      updatedExtraParams.forEach(param => {
        if (priceMapping[param]) {
          extraParamPrice += priceMapping[param].price
        }
      })
      
      // Set the updated price
      const totalPrice = basePrice + extraParamPrice
      
      setFormData(prevState => ({
        ...prevState,
        Price: totalPrice.toString(),
        GST: baseGST.toString()
      }))
    }, 0)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    console.log("Form Data Submitted: ", formData)

    await createEESRecord(formData, formData.Sample_Reference)
    const inputElement = document.querySelectorAll("input")
    inputElement.forEach((input) => {
      input.value = ""
    })

    setIsLoading(false)
    drawerClose()
    toast({
      title: "Data",
      description: "Data has been submitted Successfully",
    })

    // Add logic to send formData to the server or process it further
  }

  return (
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
                    render={() => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Select onValueChange={handleSelectChangeName}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {apiCustomerData.map((data, index) => (
                                <SelectItem value={data.company_name} key={index}>
                                  {data.company_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={() => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            name="contactNumber"
                            defaultValue={mappedApiData?.Phone || ""}
                            onChange={handleInputChange}
                            placeholder="Enter your Number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={() => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            name="email"
                            defaultValue={mappedApiData?.Email || ""}
                            onChange={handleInputChange}
                            placeholder="Email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={() => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            name="address"
                            defaultValue={mappedApiData?.Address || ""}
                            onChange={handleInputChange}
                            placeholder="Enter your address..."
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="billingAddress"
                    render={() => (
                      <FormItem>
                        <FormLabel>Billing Address</FormLabel>
                        <FormControl>
                          <Textarea
                            name="billingAddress"
                            onChange={handleInputChange}
                            placeholder="Enter billing address..."
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reportingAddress"
                    render={() => (
                      <FormItem>
                        <FormLabel>Reporting Address</FormLabel>
                        <FormControl>
                          <Textarea
                            name="reportingAddress"
                            onChange={handleInputChange}
                            placeholder="Enter reporting address..."
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={() => (
                      <FormItem className="flex gap-2 items-center">
                        <FormLabel className="text-nowrap">Contact Name</FormLabel>
                        <FormControl>
                          <Input name="contactName" onChange={handleInputChange} placeholder="Contact Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gstNumber"
                    render={() => (
                      <FormItem>
                        <FormLabel>GST Number</FormLabel>
                        <FormControl>
                          <Input name="gstNumber" onChange={handleInputChange} placeholder="Enter GST Number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={() => (
                      <FormItem>
                        <FormLabel>Payment Status</FormLabel>
                        <FormControl>
                          <Select onValueChange={handleSelectChangePaymentStatus}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="not_paid">Not Paid</SelectItem>
                              <SelectItem value="advance">Advance</SelectItem>
                              <SelectItem value="balance">Balance</SelectItem>
                              <SelectItem value="full_payment">Full Payment</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="billType"
                    render={() => (
                      <FormItem>
                        <FormLabel>Bill Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={handleSelectChangeBillType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gst_bill">GST Bill</SelectItem>
                              <SelectItem value="cash_bill">Cash Bill</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="visit_type"
                    render={() => (
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
                    )}
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
                  render={() => (
                    <FormItem className="flex mb-3 gap-3 items-center">
                      <FormLabel className="text-nowrap">Service Type</FormLabel>
                      <FormControl>
                        <Select name="serviceType" onValueChange={handleSelectChangeService}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <Input
                              type="text"
                              value={searchQuery}
                              onChange={handleSearchChange}
                              placeholder="Search..."
                              className="mb-2 placeholder:text-sm"
                            />
                            <SelectItem value="Select">Select</SelectItem>
                            {filteredRequests.map((request, index) => (
                              <SelectItem value={request} key={index}>
                                {request}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Parameters to Test:</FormLabel>
                {serviceSelected == "Water: General Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div>Physical Parameter & </div>
                      <div>Chemical Parameter</div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.firstOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Water Complete Analysis as per 10500: 2012" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div>Physical Parameter & </div>
                      <div>Chemical Parameter</div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.secondOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Water: General Parameters & Microbiology" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div>Physical Parameter & </div>
                      <div>Chemical Parameter</div>
                      <div>Microbiological</div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-3 items-center">
                      {parameterOptions.firstonOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "DM Water Analysis" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div>Physical Parameter & </div>
                      <div>Chemical Parameter</div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.firstondsOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Water - Construction Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div>Parameter & </div>
                      <div>Neutralization</div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.thirdOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Water - Microbiological Analysis" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div>Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.fourthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Water –Complete Microbiological Analysis" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div>Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.fifthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Food Microbiological Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Microbiological Parameter </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.sixthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Food Chemical Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.seventhOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Sludge Analysis Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.eighthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Soil Testing Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div>Physical Parameters & </div>
                      <div>Chemical Parameters</div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.ninethOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Oil - Diesel Testing Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.tenthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Oil - Nutrition Value + FSSAI Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters & </div>
                      <div> FSSAI Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.eleventhOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Coal Analysis Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Proximate analysis & Gross Calorific Value(GCV)</div>
                      <div> Ultimate analysis </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twelfthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Effluent Water Analysis Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.thirteenthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Sewage Water Chemical Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.fourteenthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Ambient Air Quality Monitoring Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.fifteenthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "DG Stack Emission Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.sixteenthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Ambient Noise Monitoring Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.seventeenthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "DG Noise Monitoring Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.eighteenthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Lux Monitoring Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.nineteenthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Indoor Air Quality" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Physical Parameters & Chemical Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twenteenthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Compressor Air Monitoring Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twentyFirstOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Feldspar Analysis Parameter" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twentySecondOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Quartz Sample Analysis Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twentyThirdOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Lime Stone Sample Analysis Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twentyFourthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Plate - Microbiological Analysis" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twentyFifthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Swab - Microbiological Analysis" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twentySixthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Sewage Water Microbiological Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twentySeventhOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Weather Monitoring Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twentyEighthOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : serviceSelected == "Oxygen Purity Parameters" ? (
                  <>
                    <div className="flex mt-3 mb-3 gap-3">
                      <div> Parameters </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 items-center">
                      {parameterOptions.twentyNinethOptions[0].parameter.map((options, index) => (
                        <FormField
                          control={form.control}
                          name="checkbox"
                          key={index}
                          render={() => (
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options} />
                              </FormControl>
                              <FormLabel>{options}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  ""
                )}

                {/* Extra Individual Parameters */}
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="extraIndividualParameters"
                    render={() => (
                      <FormItem>
                        <FormLabel>Extra Individual Parameters</FormLabel>
                        <div className="grid lg:grid-cols-2 gap-3 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="total-microbial"
                              value="Total microbial count (cfu/ml) a. at 20 -22 C in 72 hours b. At 37 C in 24 hours."
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value:
                                      "Total microbial count (cfu/ml) a. at 20 -22 C in 72 hours b. At 37 C in 24 hours.",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="total-microbial" className="text-sm font-medium leading-none">
                              Total microbial count (cfu/ml) a. at 20 -22 C in 72 hours b. At 37 C in 24 hours. - ₹500 +
                              18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="total-yeast"
                              value="Total yeast and mould count"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Total yeast and mould count",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="total-yeast" className="text-sm font-medium leading-none">
                              Total yeast and mould count - ₹500 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="e-coli"
                              value="E.coli"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "E.coli",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="e-coli" className="text-sm font-medium leading-none">
                              E.coli - ₹500 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="f-coliforms"
                              value="F.coliforms"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "F.coliforms",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="f-coliforms" className="text-sm font-medium leading-none">
                              F.coliforms - ₹500 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="enterobacteriaceae"
                              value="Enterobacteriaceae (Coliforms)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Enterobacteriaceae (Coliforms)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="enterobacteriaceae" className="text-sm font-medium leading-none">
                              Enterobacteriaceae (Coliforms) - ₹500 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="faecal-streptococci"
                              value="Faecal streptococci"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Faecal streptococci",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="faecal-streptococci" className="text-sm font-medium leading-none">
                              Faecal streptococci - ₹650 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="s-aureus"
                              value="S. aureus"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "S. aureus",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="s-aureus" className="text-sm font-medium leading-none">
                              S. aureus - ₹650 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="sulphite-reducing"
                              value="Sulphite reducing anaerobes"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Sulphite reducing anaerobes",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="sulphite-reducing" className="text-sm font-medium leading-none">
                              Sulphite reducing anaerobes - ₹650 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="salmonella"
                              value="Salmonella"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Salmonella",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="salmonella" className="text-sm font-medium leading-none">
                              Salmonella - ₹650 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="shigella"
                              value="Shigella"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Shigella",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="shigella" className="text-sm font-medium leading-none">
                              Shigella - ₹650 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="v-cholera"
                              value="V. cholera"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "V. cholera",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="v-cholera" className="text-sm font-medium leading-none">
                              V. cholera - ₹650 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="v-parahaemolyticus"
                              value="V. parahaemolyticus"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "V. parahaemolyticus",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="v-parahaemolyticus" className="text-sm font-medium leading-none">
                              V. parahaemolyticus - ₹650 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="ps-aeruginosa"
                              value="Ps. aeruginosa"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Ps. aeruginosa",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="ps-aeruginosa" className="text-sm font-medium leading-none">
                              Ps. aeruginosa - ₹650 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="turbidity"
                              value="Turbidity"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Turbidity",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="turbidity" className="text-sm font-medium leading-none">
                              Turbidity - ₹250 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="ph"
                              value="pH"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "pH",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="ph" className="text-sm font-medium leading-none">
                              pH - ₹100 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="total-hardness"
                              value="Total Hardness as CaCO3"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Total Hardness as CaCO3",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="total-hardness" className="text-sm font-medium leading-none">
                              Total Hardness as CaCO3 - ₹250 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="iron"
                              value="Iron ( Total) as Fe"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Iron ( Total) as Fe",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="iron" className="text-sm font-medium leading-none">
                              Iron ( Total) as Fe - ₹300 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="silica"
                              value="Silica ( Reactive) as SiO2"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Silica ( Reactive) as SiO2",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="silica" className="text-sm font-medium leading-none">
                              Silica ( Reactive) as SiO2 - ₹250 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="total-suspended"
                              value="Total Suspended Solids (TSS)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Total Suspended Solids (TSS)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="total-suspended" className="text-sm font-medium leading-none">
                            Total Suspended Solids (TSS) - ₹400 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="total-dissolved"
                              value="Total Dissolved Solids (TDS)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Total Dissolved Solids (TDS)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="total-dissolved" className="text-sm font-medium leading-none">
                            Total Dissolved Solids (TDS) - ₹400 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="chemical-oxygen"
                              value="Chemical Oxygen Demand"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Chemical Oxygen Demand",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="chemical-oxygen" className="text-sm font-medium leading-none">
                            Chemical Oxygen Demand - ₹400 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="bio-chemical"
                              value="Bio chemical Oxygen Demand"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Bio chemical Oxygen Demand",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="bio-chemical" className="text-sm font-medium leading-none">
                            Bio chemical Oxygen Demand - ₹400 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="oil-grease"
                              value="Oil & Grease"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Oil & Grease",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="oil-grease" className="text-sm font-medium leading-none">
                            Oil & Grease - ₹400 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="total-nitrogen"
                              value="Total Nitrogen"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Total Nitrogen",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="total-nitrogen" className="text-sm font-medium leading-none">
                            Total Nitrogen - ₹400 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="total-phosphorus"
                              value="Total Phosphorus"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Total Phosphorus",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="total-phosphorus" className="text-sm font-medium leading-none">
                            Total Phosphorus - ₹400 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="cholrides"
                              value="Chlorides as Cl"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Chlorides as Cl",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="chlorides" className="text-sm font-medium leading-none">
                            Chlorides as Cl - ₹400 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="nitrate"
                              value="Nitrate as No3"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Nitrate as No3",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="nitrate" className="text-sm font-medium leading-none">
                            Nitrate as No3 - ₹400 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mercury"
                              value="Mercury as Hg (mg/l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Mercury as Hg (mg/l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="mercury" className="text-sm font-medium leading-none">
                            Mercury as Hg (mg/l) - ₹750 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="cadmium"
                              value="Cadmium as Cd (mg/l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Cadmium as Cd (mg/l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="cadmium" className="text-sm font-medium leading-none">
                            Cadmium as Cd (mg/l) - ₹750 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="selenium"
                              value="Selenium as Se (mg/l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Selenium as Se (mg/l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="selenium" className="text-sm font-medium leading-none">
                            Selenium as Se (mg/l) - ₹750 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="arsenic"
                              value="Arsenic as As (mg/l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Arsenic as As (mg/l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="arsenic" className="text-sm font-medium leading-none">
                            Arsenic as As (mg/l) - ₹750 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="cyanide"
                              value="Cyanide as CN( mg/l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Cyanide as CN( mg/l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="cyanide" className="text-sm font-medium leading-none">
                            Cyanide as CN( mg/l) - ₹750 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="lead"
                              value="Lead as Pb (mg/l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Lead as Pb (mg/l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="lead" className="text-sm font-medium leading-none">
                            Lead as Pb (mg/l) - ₹750 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="zinc"
                              value="Zinc as Zn (mg/l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Zinc as Zn (mg/l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="zinc" className="text-sm font-medium leading-none">
                            Zinc as Zn (mg/l) - ₹750 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="chromium"
                              value="Chromium as Cr6+( mg/l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Chromium as Cr6+( mg/l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="chromium" className="text-sm font-medium leading-none">
                            Chromium as Cr6+( mg/l) - ₹750 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="aluminium"
                              value="Aluminium as Al(mg/l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Aluminium as Al(mg/l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="aluminium" className="text-sm font-medium leading-none">
                            Aluminium as Al(mg/l) - ₹750 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="barium"
                              value="Barium as Ba (mg / l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Barium as Ba (mg / l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="barium" className="text-sm font-medium leading-none">
                            Barium as Ba (mg / l) - ₹750 + 18% GST
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="nickel"
                              value="Nickel as Ni (mg/l)"
                              onCheckedChange={(checked) =>
                                handleExtraParameterChange({
                                  target: {
                                    value: "Nickel as Ni (mg/l)",
                                    checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="nickel" className="text-sm font-medium leading-none">
                            Nickel as Ni (mg/l) - ₹750 + 18% GST
                            </label>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* New Sample Details Fields */}
                <div className="grid lg:grid-cols-2 gap-3 mt-4 mb-4">
                  <FormField
                    control={form.control}
                    name="sampleQuantity"
                    render={() => (
                      <FormItem>
                        <FormLabel>Sample Quantity</FormLabel>
                        <FormControl>
                          <Input
                            name="sampleQuantity"
                            onChange={handleInputChange}
                            placeholder="Enter sample quantity"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sampleMark"
                    render={() => (
                      <FormItem>
                        <FormLabel>Sample Mark</FormLabel>
                        <FormControl>
                          <Input name="sampleMark" onChange={handleInputChange} placeholder="Enter sample mark" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="samplingLocation"
                    render={() => (
                      <FormItem>
                        <FormLabel>Sampling Location</FormLabel>
                        <FormControl>
                          <Input
                            name="samplingLocation"
                            onChange={handleInputChange}
                            placeholder="Enter sampling location"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={
                                  "w-full flex pl-3 text-left font-normal" + !field.value && "text-muted-foreground"
                                }
                              >
                                {field.value ? format(field.value, "PPP") : <span>Select due date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              onDayClick={(e) => dueDatePicker(e)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Discount and Hike */}
                <div className="grid lg:grid-cols-2 gap-3 mt-4 mb-4">
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={() => (
                      <FormItem>
                        <FormLabel>Discount Percentage</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            name="discountPercentage"
                            onChange={handleInputChange}
                            placeholder="Enter discount percentage"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hikePercentage"
                    render={() => (
                      <FormItem>
                        <FormLabel>Hike Percentage</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            name="hikePercentage"
                            onChange={handleInputChange}
                            placeholder="Enter hike percentage"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-3 items-center mt-4">
                  <FormField
                    control={form.control}
                    name="Price"
                    render={() => (
                      <FormItem className="w-full flex items-center gap-2">
                        <FormLabel className="min-w-16">Price</FormLabel>
                        <FormControl>
                          <Input name="Price" value={formData.Price} onChange={handleInputChange} placeholder="Price" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="GST"
                    render={() => (
                      <FormItem className="w-full flex items-center gap-2">
                        <FormLabel className="min-w-16">GST</FormLabel>
                        <FormControl>
                          <Input name="GST" value={formData.GST} onChange={handleInputChange} placeholder="GST" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center font-semibold"> = </div>
                  <FormField
                    control={form.control}
                    name="Amount"
                    render={() => (
                      <FormItem className="w-full flex items-center gap-2">
                        <FormLabel className="min-w-16">Amount</FormLabel>
                        <FormControl>
                          <Input name="Amount" value={formData.Amount} readOnly placeholder="Amount" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dateOfService"
                  render={({ field }) => (
                    <FormItem className="flex gap-3 items-center mt-3">
                      <FormLabel className="text-nowrap">Preferred Date of Service</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={
                                "w-full flex pl-3 text-left font-normal" + !field.value && "text-muted-foreground"
                              }
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                  )}
                />
                <FormField
                  control={form.control}
                  name="allotted"
                  render={() => (
                    <FormItem className="flex gap-3 mt-3 mb-3 items-center">
                      <FormLabel className="text-nowrap">Allotted to</FormLabel>
                      <FormControl>
                        <Select onValueChange={handleSelectChangeAllocate}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceSelected == "Water: General Parameters" ||
                            serviceSelected == "Water Complete Analysis as per 10500: 2012" ||
                            serviceSelected == "Water - Construction Parameters" ||
                            serviceSelected == "Food Chemical Parameters" ||
                            serviceSelected == "Sludge Analysis Parameters" ||
                            serviceSelected == "Soil Testing Parameters" ||
                            serviceSelected == "Oil - Diesel Testing Parameters" ||
                            serviceSelected == "Oil - Nutrition Value + FSSAI Parameters" ||
                            serviceSelected == "Coal Analysis Parameters" ||
                            serviceSelected ==
                              'Effluent Water Analysis Parameters" ||  || \
                          serviceSelected == "Effluent Water Analysis Parameters' ||
                            serviceSelected == "Sewage Water Chemical Parameters" ||
                            serviceSelected == "Feldspar Analysis Parameter" ||
                            serviceSelected == "Quartz Sample Analysis Parameters" ||
                            serviceSelected == "Lime Stone Sample Analysis Parameters" ? (
                              <>
                                <SelectItem value="Select">Select</SelectItem>
                                {staffOptions.option1.map((option, index) => (
                                  <SelectItem value={option} key={index}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </>
                            ) : serviceSelected == "Water - Microbiological Analysis" ||
                              serviceSelected == "Water –Complete Microbiological Analysis" ||
                              serviceSelected == "Food Microbiological Parameters" ||
                              serviceSelected == "Plate - Microbiological Analysis" ||
                              serviceSelected == "Swab - Microbiological Analysis" ||
                              serviceSelected == "Sewage Water Microbiological Parameters" ? (
                              <>
                                <SelectItem value="Select">Select</SelectItem>
                                {staffOptions.option2.map((option, index) => (
                                  <SelectItem value={option} key={index}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </>
                            ) : serviceSelected == "Water: General Parameters & Microbiology" ||
                              serviceSelected == "Sewage Water Microbiol" ? (
                              <>
                                <SelectItem value="Select">Select</SelectItem>
                                {staffOptions.option4.map((option, index) => (
                                  <SelectItem value={option} key={index}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </>
                            ) : serviceSelected == "DM Water Analysis" ||
                              serviceSelected == "Sewage Water Microbiol" ? (
                              <>
                                <SelectItem value="Select">Select</SelectItem>
                                {staffOptions.option5.map((option, index) => (
                                  <SelectItem value={option} key={index}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </>
                            ) : serviceSelected == "Ambient Air Quality Monitoring Parameters" ||
                              serviceSelected == "DG Stack Emission Parameters" ||
                              serviceSelected == "Ambient Noise Monitoring Parameters" ||
                              serviceSelected == "DG Noise Monitoring Parameters" ||
                              serviceSelected == "Lux Monitoring Parameters" ||
                              serviceSelected == "Indoor Air Quality" ||
                              serviceSelected == "Compressor Air Monitoring Parameters" ||
                              serviceSelected == "Weather Monitoring Parameters" ||
                              serviceSelected == "Oxygen Purity Parameters" ? (
                              <>
                                <SelectItem value="Select">Select</SelectItem>
                                {staffOptions.option3.map((option, index) => (
                                  <SelectItem value={option} key={index}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </>
                            ) : (
                              <SelectItem value="Select">Select</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="drawnBy"
                  render={() => (
                    <FormItem className="flex gap-4 items-center">
                      <FormLabel className="lg:text-nowrap"> Drawn By </FormLabel>
                      <FormControl>
                        <Select onValueChange={handleSelectChangeDrawn}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EES">EES</SelectItem>
                            <SelectItem value="Customer">Customer</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courierDrawnBy"
                  render={() => (
                    <FormItem className="flex gap-4 items-center">
                      <FormLabel className="lg:text-nowrap"> Courier Drawn By </FormLabel>
                      <FormControl>
                        <Select onValueChange={handleSelectChangeCourierDrawn}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EES">EES</SelectItem>
                            <SelectItem value="Customer">Customer</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
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
                  render={() => (
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
                  )}
                />
                {pickUp === "Yes" ? (
                  <FormField
                    control={form.control}
                    name="pickupAddress"
                    render={() => (
                      <FormItem className="flex gap-3 items-center mb-3">
                        <FormLabel className="text-nowrap">Pickup Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pickup address.." className="h-24" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : pickUp === "No" ? (
                  <FormField
                    control={form.control}
                    name="dropOffAddress"
                    render={() => (
                      <FormItem className="flex gap-3 items-center mb-3">
                        <FormLabel className="text-nowrap">Drop-off Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter drop-off address.." className="h-24" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  ""
                )}
                <FormField
                  control={form.control}
                  name="pickupDate"
                  render={({ field }) => (
                    <FormItem className="flex gap-3 items-center mb-3">
                      <FormLabel className="text-nowrap">Pickup/Drop-Off Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={
                                  "w-full flex pl-3 text-left font-normal" + !field.value && "text-muted-foreground"
                                }
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pickup date</span>}
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
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader></CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="remarks"
                  render={() => (
                    <FormItem className="flex gap-3 mb-3 items-start">
                      <FormLabel className="text-nowrap pt-3">Remarks or Special Request</FormLabel>
                      <FormControl>
                        <Input name="remarks" onChange={handleInputChange} placeholder="type here.." className="h-24" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Priority */}

                <FormField
                  control={form.control}
                  name="priority"
                  render={() => (
                    <FormItem className="flex gap-3 items-center mb-3">
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <Select onValueChange={handleSelectChangePriority}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
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
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Submit */}
          <Button type="submit" onClick={handleSubmit}>
            {!isLoading ? (
              "Submit"
            ) : (
              <>
                {" "}
                <Loader2 className="animate-spin" /> Submit{" "}
              </>
            )}
          </Button>
          <Button variant="outline" type="reset">
            Reset
          </Button>
        </form>
      </Form>
    </div>
  )
}

export async function createEESRecord(requestData, srn) {
  const apiUrl = "https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_Create_Record"
  requestData["Type"] = "Ticket"
  requestData["TicketID"] = srn
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const responseData = await response.json()
    console.log("Response:", responseData)
    return responseData
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export default ServiceRequestForm
