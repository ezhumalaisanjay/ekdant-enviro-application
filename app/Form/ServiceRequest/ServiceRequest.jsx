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
import { CalendarIcon, Loader2 } from "lucide-react"
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
    Price: "",
    GST: "",
    Amount: "",
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

  useEffect(() => {
    if (serviceSelected === "Water: General Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.firstOptions[0].parameter,
        Price: parameterOptions.firstOptions[1].Price,
        GST: parameterOptions.firstOptions[1].GST,
      }))
    } else if (serviceSelected === "Water: General Parameters & Microbiology") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.firstonOptions[0].parameter,
        Price: parameterOptions.firstonOptions[1].Price,
        GST: parameterOptions.firstonOptions[1].GST,
      }))
    } else if (serviceSelected === "DM Water Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.firstondsOptions[0].parameter,
        Price: parameterOptions.firstondsOptions[1].Price,
        GST: parameterOptions.firstondsOptions[1].GST,
      }))
    } else if (serviceSelected === "Water Complete Analysis as per 10500: 2012") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.secondOptions[0].parameter,
        Price: parameterOptions.secondOptions[1].Price,
        GST: parameterOptions.secondOptions[1].GST,
      }))
    } else if (serviceSelected === "Water - Construction Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.thirdOptions[0].parameter,
        Price: parameterOptions.thirdOptions[1].Price,
        GST: parameterOptions.thirdOptions[1].GST,
      }))
    } else if (serviceSelected === "Water - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fourthOptions[0].parameter,
        Price: parameterOptions.fourthOptions[1].Price,
        GST: parameterOptions.fourthOptions[1].GST,
      }))
    } else if (serviceSelected === "Water –Complete Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fifthOptions[0].parameter,
        Price: parameterOptions.fifthOptions[1].Price,
        GST: parameterOptions.fifthOptions[1].GST,
      }))
    } else if (serviceSelected === "Food Microbiological Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.sixthOptions[0].parameter,
        Price: parameterOptions.sixthOptions[1].Price,
        GST: parameterOptions.sixthOptions[1].GST,
      }))
    } else if (serviceSelected === "Food Chemical Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.seventhOptions[0].parameter,
        Price: parameterOptions.seventhOptions[1].Price,
        GST: parameterOptions.seventhOptions[1].GST,
      }))
    } else if (serviceSelected === "Sludge Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.eighthOptions[0].parameter,
        Price: parameterOptions.eighthOptions[1].Price,
        GST: parameterOptions.eighthOptions[1].GST,
      }))
    } else if (serviceSelected === "Soil Testing Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.ninethOptions[0].parameter,
        Price: parameterOptions.ninethOptions[1].Price,
        GST: parameterOptions.ninethOptions[1].GST,
      }))
    } else if (serviceSelected === "Oil - Diesel Testing Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.tenthOptions[0].parameter,
        Price: parameterOptions.tenthOptions[1].Price,
        GST: parameterOptions.tenthOptions[1].GST,
      }))
    } else if (serviceSelected === "Oil - Nutrition Value + FSSAI Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.eleventhOptions[0].parameter,
        Price: parameterOptions.eleventhOptions[1].Price,
        GST: parameterOptions.eleventhOptions[1].GST,
      }))
    } else if (serviceSelected === "Coal Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twelfthOptions[0].parameter,
        Price: parameterOptions.twelfthOptions[1].Price,
        GST: parameterOptions.twelfthOptions[1].GST,
      }))
    } else if (serviceSelected === "Effluent Water Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.thirteenthOptions[0].parameter,
        Price: parameterOptions.thirteenthOptions[1].Price,
        GST: parameterOptions.thirteenthOptions[1].GST,
      }))
    } else if (serviceSelected === "Sewage Water Chemical Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fourteenthOptions[0].parameter,
        Price: parameterOptions.fourteenthOptions[1].Price,
        GST: parameterOptions.fourteenthOptions[1].GST,
      }))
    } else if (serviceSelected === "Ambient Air Quality Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.fifteenthOptions[0].parameter,
        Price: parameterOptions.fifteenthOptions[1].Price,
        GST: parameterOptions.fifteenthOptions[1].GST,
      }))
    } else if (serviceSelected === "DG Stack Emission Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.sixteenthOptions[0].parameter,
        Price: parameterOptions.sixteenthOptions[1].Price,
        GST: parameterOptions.sixteenthOptions[1].GST,
      }))
    } else if (serviceSelected === "Ambient Noise Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.seventeenthOptions[0].parameter,
        Price: parameterOptions.seventeenthOptions[1].Price,
        GST: parameterOptions.seventeenthOptions[1].GST,
      }))
    } else if (serviceSelected === "DG Noise Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.eighteenthOptions[0].parameter,
        Price: parameterOptions.eighteenthOptions[1].Price,
        GST: parameterOptions.eighteenthOptions[1].GST,
      }))
    } else if (serviceSelected === "Lux Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.nineteenthOptions[0].parameter,
        Price: parameterOptions.nineteenthOptions[1].Price,
        GST: parameterOptions.nineteenthOptions[1].GST,
      }))
    } else if (serviceSelected === "Indoor Air Quality") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twenteenthOptions[0].parameter,
        Price: parameterOptions.twenteenthOptions[1].Price,
        GST: parameterOptions.twenteenthOptions[1].GST,
      }))
    } else if (serviceSelected === "Compressor Air Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyFirstOptions[0].parameter,
        Price: parameterOptions.twentyFirstOptions[1].Price,
        GST: parameterOptions.twentyFirstOptions[1].GST,
      }))
    } else if (serviceSelected === "Feldspar Analysis Parameter") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentySecondOptions[0].parameter,
        Price: parameterOptions.twentySecondOptions[1].Price,
        GST: parameterOptions.twentySecondOptions[1].GST,
      }))
    } else if (serviceSelected === "Quartz Sample Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyThirdOptions[0].parameter,
        Price: parameterOptions.twentyThirdOptions[1].Price,
        GST: parameterOptions.twentyThirdOptions[1].GST,
      }))
    } else if (serviceSelected === "Lime Stone Sample Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyFourthOptions[0].parameter,
        Price: parameterOptions.twentyFourthOptions[1].Price,
        GST: parameterOptions.twentyFourthOptions[1].GST,
      }))
    } else if (serviceSelected === "Plate - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyFifthOptions[0].parameter,
        Price: parameterOptions.twentyFifthOptions[1].Price,
        GST: parameterOptions.twentyFifthOptions[1].GST,
      }))
    } else if (serviceSelected === "Swab - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentySixthOptions[0].parameter,
        Price: parameterOptions.twentySixthOptions[1].Price,
        GST: parameterOptions.twentySixthOptions[1].GST,
      }))
    } else if (serviceSelected === "Sewage Water Microbiological Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentySeventhOptions[0].parameter,
        Price: parameterOptions.twentySeventhOptions[1].Price,
        GST: parameterOptions.twentySeventhOptions[1].GST,
      }))
    } else if (serviceSelected === "Weather Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyEighthOptions[0].parameter,
        Price: parameterOptions.twentyEighthOptions[1].Price,
        GST: parameterOptions.twentyEighthOptions[1].GST,
      }))
    } else if (serviceSelected === "Oxygen Purity Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: parameterOptions.twentyNinethOptions[0].parameter,
        Price: parameterOptions.twentyNinethOptions[1].Price,
        GST: parameterOptions.twentyNinethOptions[1].GST,
      }))
    }

    serviceTypes.map((service) => {
      if (service.name == serviceSelected) {
        console.log(service.code)
      }
    })
  }, [serviceSelected])

  useEffect(() => {
    const calculateTotal = (price, gstPercentage, discountPercentage, hikePercentage) => {
      price = Number.parseFloat(price)
      gstPercentage = Number.parseFloat(gstPercentage)
      discountPercentage = Number.parseFloat(discountPercentage)
      hikePercentage = Number.parseFloat(hikePercentage)

      if (isNaN(price) || isNaN(gstPercentage) || price <= 0 || gstPercentage <= 0) {
        console.log("Invalid input")
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

  const handleExtraParameterChange = (e) => {
    const { value, checked } = e.target

    // Define price mapping for extra parameters
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
    }

    // Update the extraIndividualParameters array
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        extraIndividualParameters: [...prevState.extraIndividualParameters, value],
      }))

      // Add the price of the selected parameter
      if (priceMapping[value]) {
        const additionalPrice = priceMapping[value].price
        setFormData((prevState) => {
          // Ensure prevState.Price is a valid number, default to 0 if not
          const currentPrice = prevState.Price ? Number.parseFloat(prevState.Price) : 0
          return {
            ...prevState,
            Price: (currentPrice + additionalPrice).toString(),
          }
        })
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        extraIndividualParameters: prevState.extraIndividualParameters.filter((param) => param !== value),
      }))

      // Subtract the price of the deselected parameter
      if (priceMapping[value]) {
        const subtractPrice = priceMapping[value].price
        setFormData((prevState) => {
          // Ensure prevState.Price is a valid number, default to 0 if not
          const currentPrice = prevState.Price ? Number.parseFloat(prevState.Price) : 0
          return {
            ...prevState,
            Price: Math.max(0, currentPrice - subtractPrice).toString(),
          }
        })
      }
    }
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
                      </div>
                    </FormItem>
                  )}
                />

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

